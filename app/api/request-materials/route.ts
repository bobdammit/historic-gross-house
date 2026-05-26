import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { MATERIALS_ACCESS_COOKIE } from "@/lib/documents";
import { materialsAccessCookieOptions } from "@/lib/materials-access";
import { notifyBroker, sendVisitorConfirmation, validateRequiredContactFields } from "@/lib/notify-broker";
import { buildMaterialsSmsAlert, notifyBrokerByText } from "@/lib/notify-sms";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

type MaterialsRequest = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  intent?: string;
};

export async function POST(request: Request) {
  let body: MaterialsRequest;

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
  const company = body.company?.trim() || "Not provided";
  const intent = body.intent?.trim() || "Not provided";

  try {
    await notifyBroker({
      subject: `Materials Request — ${name} · ${PROPERTY_SITE_NAME}`,
      replyTo: email,
      lines: [
        `New offering memorandum / materials request from the ${PROPERTY_SITE_NAME} microsite:`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company}`,
        `Intent: ${intent}`,
      ],
    });
  } catch (error) {
    console.error("[materials-request-email]", error);
    return NextResponse.json(
      { error: "Unable to submit your request right now. Please call or email Bob directly." },
      { status: 502 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(MATERIALS_ACCESS_COOKIE, "granted", materialsAccessCookieOptions());

  await sendVisitorConfirmation(email, name, "materials");
  await notifyBrokerByText(
    buildMaterialsSmsAlert({ name, phone, email, intent })
  );

  return NextResponse.json({ success: true, unlocked: true });
}
