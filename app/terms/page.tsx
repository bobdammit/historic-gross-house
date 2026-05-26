import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout";
import { SITE_CREDITS, SITE_CREDITS_COPYRIGHT_SECTION_ID } from "@/lib/site-credits";
import { SITE_LEGAL } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_LEGAL.siteName}`,
  description: `Terms and conditions for the ${SITE_LEGAL.siteName} property listing website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p className="mb-10 text-[15px] font-light leading-[1.85] text-muted-foreground">
        Effective date: {SITE_LEGAL.effectiveDate}
      </p>

      <LegalSection title="Agreement">
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the website for {SITE_LEGAL.siteName}{" "}
          at {SITE_LEGAL.propertyAddress} (the &ldquo;Site&rdquo;), operated by {SITE_LEGAL.operatorName}.
        </p>
        <p>
          By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site.
        </p>
      </LegalSection>

      <LegalSection title="Purpose of the Site">
        <p>
          The Site provides information about a commercial real estate listing. Property details, photographs,
          documents, and related materials are provided for informational purposes only and do not constitute a binding
          offer, contract, or guarantee.
        </p>
        <p>
          Listing services are offered through {SITE_LEGAL.listingAgent}, {SITE_LEGAL.brokerageName},{" "}
          {SITE_LEGAL.brokeragePhone}, {SITE_LEGAL.brokerageAddress}.
        </p>
      </LegalSection>

      <LegalSection title="Inquiries and Forms">
        <p>
          When you submit a contact form or request marketing materials, you agree to provide accurate information and
          to use the Site only for legitimate inquiries related to this property.
        </p>
        <p>
          Submitting a form authorizes us to contact you by email regarding your inquiry. Submitting a form does{" "}
          <strong className="font-medium text-foreground">not</strong> enroll you in marketing text messages.
        </p>
      </LegalSection>

      <LegalSection title="Messaging Program Disclosure">
        <p>
          <strong className="font-medium text-foreground">Program name:</strong> {SITE_LEGAL.siteName} Listing Agent
          Alerts
        </p>
        <p>
          <strong className="font-medium text-foreground">Program description:</strong> This Site may send internal
          operational SMS alerts only to the listing agent&apos;s mobile number when a visitor submits a contact or
          materials request form. Visitors to the Site do not receive SMS messages from this program.
        </p>
        <p>
          <strong className="font-medium text-foreground">Message frequency:</strong> Messages are sent only when a
          form is submitted and are expected to be infrequent.
        </p>
        <p>
          <strong className="font-medium text-foreground">Message and data rates may apply</strong> for any SMS
          message sent or received through connected carrier services.
        </p>
        <p>
          <strong className="font-medium text-foreground">Support contact:</strong> {SITE_LEGAL.listingAgent} ·{" "}
          <a href={`mailto:${SITE_LEGAL.listingAgentEmail}`} className="text-primary hover:underline">
            {SITE_LEGAL.listingAgentEmail}
          </a>{" "}
          ·{" "}
          <a href={`tel:${SITE_LEGAL.listingAgentPhoneTel}`} className="text-primary hover:underline">
            {SITE_LEGAL.listingAgentPhone}
          </a>
        </p>
        <p>
          If you receive a message from this program in error, reply <strong>STOP</strong> to opt out or{" "}
          <strong>HELP</strong> for help.
        </p>
      </LegalSection>

      <LegalSection title="Documents and Materials">
        <p>
          Offering materials, floor plans, market reports, and other documents made available on the Site are
          confidential marketing materials intended for qualified inquiry purposes unless otherwise marked public. You
          may not reproduce, distribute, or rely on them without independent verification.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          Information on the Site is believed to be reliable but is not guaranteed. Square footage, income, expenses,
          zoning, condition, and availability may change without notice. Users should verify all information
          independently and consult appropriate professionals before making any decision.
        </p>
      </LegalSection>

      <LegalSection title="Copyright, Photography & Media" id={SITE_CREDITS_COPYRIGHT_SECTION_ID}>
        <p>
          Unless otherwise noted, all visual media and creative work on this Site — including still photographs,
          aerial drone imagery, the Matterport three-dimensional virtual tour, graphic design, and the website itself —
          were created by {SITE_CREDITS.creatorName} of {SITE_CREDITS.companyName} (&ldquo;Piljay
          Photography&rdquo;).
        </p>
        <p>
          Piljay Photography owns all copyrights and related rights in that work. No ownership interest in those
          materials is transferred to visitors, brokers, or third parties by viewing the Site or inquiring about the
          listing.
        </p>
        <p>
          Aerial imagery was captured under {SITE_CREDITS.creatorName}&apos;s FAA Part 107 Remote Pilot Certificate
          (certificate number {SITE_CREDITS.faaPart107CertificateNumber}) for lawful commercial UAS operations.
        </p>
        <p>
          You may view Site content for personal evaluation of this property listing. You may not copy, download,
          scrape, redistribute, publish, or create derivative works from Site photographs, video, tour media, or
          design assets without prior written permission from {SITE_CREDITS.companyName}, except where a separate
          written license or agreement expressly allows it.
        </p>
        <p>
          Requests regarding reproduction, licensing, or attribution may be directed to{" "}
          <a href={`mailto:${SITE_CREDITS.contactEmail}`} className="text-primary hover:underline">
            {SITE_CREDITS.contactEmail}
          </a>{" "}
          or{" "}
          <a
            href={SITE_CREDITS.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {SITE_CREDITS.companyName}
          </a>
          .
        </p>
        <p>
          The Matterport platform and player are third-party services; Piljay Photography produced the scan and tour
          experience presented on this Site. Matterport&apos;s own terms apply to use of their embedded player and
          tools.
        </p>
      </LegalSection>

      <LegalSection title="Other Intellectual Property">
        <p>
          Listing text, brokerage branding, and materials supplied by the listing agent or brokerage may be subject to
          separate ownership. Where those materials appear alongside Piljay Photography work, each party retains its
          respective rights.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {SITE_LEGAL.operatorName}, the listing agent, and the brokerage will
          not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the
          Site or reliance on Site content.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          The Site may link to or embed third-party services such as virtual tour providers, maps, email delivery, or
          messaging infrastructure. Those services are subject to their own terms and privacy practices.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about these Terms may be directed to:</p>
        <p>
          {SITE_LEGAL.listingAgent}
          <br />
          {SITE_LEGAL.operatorName}
          <br />
          Email:{" "}
          <a href={`mailto:${SITE_LEGAL.listingAgentEmail}`} className="text-primary hover:underline">
            {SITE_LEGAL.listingAgentEmail}
          </a>
          <br />
          Phone:{" "}
          <a href={`tel:${SITE_LEGAL.listingAgentPhoneTel}`} className="text-primary hover:underline">
            {SITE_LEGAL.listingAgentPhone}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
