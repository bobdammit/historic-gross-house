import { BROKERAGE, LISTING_AGENT } from "@/lib/broker-info";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";
import { getSiteUrl } from "@/lib/site-metadata";

export const SITE_LEGAL = {
  siteName: PROPERTY_SITE_NAME,
  propertyAddress: "290 East King Avenue, Kingsland, GA 31548",
  operatorName: process.env.NEXT_PUBLIC_SITE_OPERATOR_NAME ?? LISTING_AGENT.name,
  listingAgent: LISTING_AGENT.name,
  listingAgentEmail: LISTING_AGENT.email,
  listingAgentPhone: LISTING_AGENT.cell,
  listingAgentPhoneTel: LISTING_AGENT.cellTel,
  brokerageName: BROKERAGE.name,
  brokeragePhone: BROKERAGE.phone,
  brokerageAddress: BROKERAGE.fullAddress,
  effectiveDate: "May 25, 2026",
} as const;

export function legalPageUrl(path: "/privacy" | "/terms") {
  return `${getSiteUrl()}${path}`;
}
