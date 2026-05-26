import { PROPERTY_SITE_NAME } from "@/lib/property-content";
import { BROKERAGE, LISTING_AGENT } from "@/lib/broker-info";

export type BrokerNotification = {
  subject: string;
  lines: string[];
};

export type VisitorConfirmationKind = "general" | "showing" | "materials";

function getFromAddress() {
  return process.env.FROM_EMAIL ?? "onboarding@resend.dev";
}

function getResendApiKey() {
  return process.env.RESEND_API_KEY;
}

async function sendEmail(to: string[], subject: string, text: string) {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    console.info("[email]", { to, subject, text });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${PROPERTY_SITE_NAME} <${getFromAddress()}>`,
      to,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email delivery failed: ${errorBody}`);
  }
}

import { validateEmailAddress, validatePhone } from "@/lib/form-validation";

export function validateEmail(email: string) {
  return validateEmailAddress(email);
}

export function validateRequiredContactFields(fields: {
  name?: string;
  email?: string;
  phone?: string;
}) {
  const name = fields.name?.trim();
  const email = fields.email?.trim();
  const phone = fields.phone?.trim();

  if (!name || !email || !phone) {
    return { ok: false as const, error: "Name, email, and phone are required." };
  }

  if (!email.includes("@") || !validateEmail(email)) {
    return { ok: false as const, error: "Please enter a valid email address with an @ symbol." };
  }

  if (!validatePhone(phone)) {
    return { ok: false as const, error: "Please enter a 10-digit phone number using numbers only." };
  }

  return {
    ok: true as const,
    values: { name, email, phone },
  };
}

export function buildVisitorConfirmationEmail(name: string, kind: VisitorConfirmationKind) {
  const greeting = `Hi ${name},`;

  const contactIntro =
    kind === "showing"
      ? "Thank you for requesting a showing for The Historic Gross House at 290 East King Avenue, Kingsland, Georgia."
      : `Thank you for your interest in ${PROPERTY_SITE_NAME} at 290 East King Avenue, Kingsland, Georgia.`;

  const materialsIntro = `Thank you for requesting offering materials for ${PROPERTY_SITE_NAME} at 290 East King Avenue, Kingsland, Georgia.`;

  const subject =
    kind === "materials"
      ? `Your materials request — ${PROPERTY_SITE_NAME}`
      : kind === "showing"
        ? `Your showing request — ${PROPERTY_SITE_NAME}`
        : `Thank you for your inquiry — ${PROPERTY_SITE_NAME}`;

  const lines =
    kind === "materials"
      ? [
          greeting,
          "",
          materialsIntro,
          "",
          `We received your request, and ${LISTING_AGENT.name} will be in touch with you ASAP.`,
          "Your offering materials are now available on the site for this browser session.",
          "",
          `If you need immediate assistance, you can reach ${LISTING_AGENT.name} at ${LISTING_AGENT.cell} or ${LISTING_AGENT.email}.`,
          "",
          BROKERAGE.name,
          BROKERAGE.fullAddress,
          BROKERAGE.phone,
          "",
          "Best regards,",
          LISTING_AGENT.name,
          `${LISTING_AGENT.displayTitle} · ${BROKERAGE.name}`,
        ]
      : [
          greeting,
          "",
          contactIntro,
          "",
          `We received your inquiry, and ${LISTING_AGENT.name} will be in touch with you ASAP.`,
          "",
          `If you need immediate assistance, you can reach ${LISTING_AGENT.name} at ${LISTING_AGENT.cell} or ${LISTING_AGENT.email}.`,
          "",
          BROKERAGE.name,
          BROKERAGE.fullAddress,
          BROKERAGE.phone,
          "",
          "Best regards,",
          LISTING_AGENT.name,
          `${LISTING_AGENT.displayTitle} · ${BROKERAGE.name}`,
        ];

  return { subject, text: lines.join("\n") };
}

export async function notifyBroker(notification: BrokerNotification) {
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "bob@piljay.com";

  if (!getResendApiKey()) {
    console.info("[broker-notification]", {
      to: notifyEmail,
      subject: notification.subject,
      body: notification.lines.join("\n"),
    });
    return { delivered: false as const, logged: true as const };
  }

  await sendEmail([notifyEmail], notification.subject, notification.lines.join("\n"));
  return { delivered: true as const, logged: false as const };
}

export async function sendVisitorConfirmation(
  email: string,
  name: string,
  kind: VisitorConfirmationKind
) {
  const { subject, text } = buildVisitorConfirmationEmail(name, kind);

  try {
    await sendEmail([email], subject, text);
  } catch (error) {
    console.error("[visitor-confirmation-email]", error);
  }
}
