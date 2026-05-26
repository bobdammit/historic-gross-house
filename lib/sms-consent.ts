import { LISTING_AGENT } from "@/lib/broker-info";

export function formatSmsOptInForBroker(optIn: boolean) {
  return optIn
    ? "Yes — visitor opted in; you may text them about this listing"
    : "No — visitor did not opt in to text messages";
}

export function formatSmsOptInForAlert(optIn: boolean) {
  return optIn ? "Text OK" : "No text opt-in";
}
