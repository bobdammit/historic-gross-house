import { PROPERTY_SITE_NAME } from "@/lib/property-content";

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const toNumber = process.env.NOTIFY_PHONE ?? "+19123221377";

  if (!accountSid || !authToken || !fromNumber) {
    return null;
  }

  return { accountSid, authToken, fromNumber, toNumber };
}

export async function sendBrokerText(message: string) {
  const config = getTwilioConfig();

  if (!config) {
    console.info("[broker-sms-skipped]", message);
    return;
  }

  const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64");
  const body = new URLSearchParams({
    To: config.toNumber,
    From: config.fromNumber,
    Body: message,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`SMS delivery failed: ${errorBody}`);
  }

  const result = (await response.json()) as {
    sid?: string;
    status?: string;
    to?: string;
    error_code?: number | null;
  };

  console.info("[broker-sms-sent]", {
    sid: result.sid,
    status: result.status,
    to: result.to,
  });

  return result;
}

export async function notifyBrokerByText(message: string) {
  try {
    await sendBrokerText(message);
  } catch (error) {
    console.error("[broker-sms]", error);
  }
}

export function buildContactSmsAlert(options: {
  name: string;
  phone: string;
  email: string;
  inquiryLabel: string;
}) {
  return `${options.inquiryLabel}: ${options.name} · ${options.phone} · ${options.email} — ${PROPERTY_SITE_NAME}`;
}

export function buildMaterialsSmsAlert(options: {
  name: string;
  phone: string;
  email: string;
  intent: string;
}) {
  const intent = options.intent === "Not provided" ? "Materials request" : options.intent;
  return `Materials request: ${options.name} · ${options.phone} · ${intent} — ${PROPERTY_SITE_NAME}`;
}
