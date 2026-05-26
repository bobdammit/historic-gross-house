import { NextResponse } from "next/server";
import { notifyBroker, sendVisitorConfirmation, validateRequiredContactFields } from "@/lib/notify-broker";
import { buildContactSmsAlert, notifyBrokerByText } from "@/lib/notify-sms";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

type ContactRequest = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  inquiryType?: "general" | "showing";
};

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validation = validateRequiredContactFields(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { name, email, phone } = validation.values;
  const message = body.message?.trim() || "No message provided.";
  const inquiryType = body.inquiryType === "showing" ? "showing" : "general";
  const inquiryLabel = inquiryType === "showing" ? "Showing request" : "General inquiry";

  try {
    await notifyBroker({
      subject: `${inquiryLabel} — ${name} · ${PROPERTY_SITE_NAME}`,
      lines: [
        `New ${inquiryLabel.toLowerCase()} from the ${PROPERTY_SITE_NAME} microsite:`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Inquiry type: ${inquiryLabel}`,
        "",
        "Message:",
        message,
      ],
    });
  } catch (error) {
    console.error("[contact-inquiry-email]", error);
    return NextResponse.json(
      { error: "Unable to send your inquiry right now. Please call or email Bob directly." },
      { status: 502 }
    );
  }

  await sendVisitorConfirmation(email, name, inquiryType === "showing" ? "showing" : "general");
  await notifyBrokerByText(
    buildContactSmsAlert({ name, phone, email, inquiryLabel })
  );

  return NextResponse.json({ success: true });
}
