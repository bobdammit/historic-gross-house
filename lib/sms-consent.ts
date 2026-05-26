import { BROKERAGE, LISTING_AGENT } from "@/lib/broker-info";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

/** Checkbox label shown next to the phone field on the contact form. */
export const CONTACT_SMS_OPT_IN_LABEL = `I agree to receive text messages from ${LISTING_AGENT.name} at ${BROKERAGE.name} about ${PROPERTY_SITE_NAME}. Message frequency varies. Message and data rates may apply. Reply STOP to opt out.`;

export function formatSmsOptInForBroker(optIn: boolean) {
  return optIn
    ? "Yes — visitor opted in; you may text them about this listing"
    : "No — visitor did not opt in to text messages";
}

export function formatSmsOptInForAlert(optIn: boolean) {
  return optIn ? "Text OK" : "No text opt-in";
}
