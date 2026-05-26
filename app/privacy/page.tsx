import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout";
import { SITE_LEGAL } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_LEGAL.siteName}`,
  description: `Privacy policy for the ${SITE_LEGAL.siteName} property listing website.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p className="mb-10 text-[15px] font-light leading-[1.85] text-muted-foreground">
        Effective date: {SITE_LEGAL.effectiveDate}
      </p>

      <LegalSection title="Overview">
        <p>
          This Privacy Policy describes how {SITE_LEGAL.operatorName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) collects, uses, and protects information when you visit the website for{" "}
          {SITE_LEGAL.siteName} at {SITE_LEGAL.propertyAddress} (the &ldquo;Site&rdquo;).
        </p>
        <p>
          The Site is operated to provide information about a commercial real estate listing. Listing services are
          provided by {SITE_LEGAL.listingAgent} of {SITE_LEGAL.brokerageName}.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>When you use the Site, we may collect the following information that you voluntarily provide:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name and stated intent (when requesting marketing materials)</li>
          <li>Message content submitted through contact or inquiry forms</li>
        </ul>
        <p>
          We may also collect basic technical information such as browser type, device information, and pages visited
          through standard server logs or analytics tools used to understand Site performance.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <p>We use the information you provide to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Respond to inquiries about the property</li>
          <li>Send confirmation emails after you submit a form</li>
          <li>Notify the listing agent of new inquiries by email and, when enabled, internal SMS alert</li>
          <li>Grant temporary access to downloadable marketing materials you request</li>
          <li>Improve the Site and maintain its security</li>
        </ul>
      </LegalSection>

      <LegalSection title="Text Messaging">
        <p>
          This Site does <strong className="font-medium text-foreground">not</strong> send marketing or promotional
          text messages to visitors. If SMS notifications are enabled, they are sent only to the listing agent&apos;s
          business mobile number as an internal operational alert when a form is submitted.
        </p>
        <p>
          Website visitors receive email confirmation only and are not enrolled in an SMS program by submitting a
          contact or materials request form.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Access Tokens">
        <p>
          If you request gated marketing materials, the Site may set a temporary browser cookie that grants access for
          up to 24 hours. This cookie is used solely to remember that you completed the materials request form and does
          not track you across other websites.
        </p>
      </LegalSection>

      <LegalSection title="How We Share Information">
        <p>
          We do <strong className="font-medium text-foreground">not</strong> sell, rent, or share your personal
          information with third parties for their own marketing purposes.
        </p>
        <p>We may share information only as needed to operate the Site, including with:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>The listing agent and brokerage handling this property inquiry</li>
          <li>Service providers that help deliver email, hosting, analytics, or messaging infrastructure</li>
          <li>Authorities when required by law or to protect legal rights</li>
        </ul>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          Inquiry information is retained only as long as reasonably necessary to respond to your request, manage the
          listing, and meet applicable business or legal requirements.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices">
        <p>
          You may choose not to submit personal information through the Site. If you do submit a form, you may contact
          us to request correction or deletion of your information, subject to legal and business record-keeping
          requirements.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use reasonable administrative and technical measures to protect information submitted through the Site.
          No method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The Site is intended for adults interested in commercial real estate and is not directed to children under
          13. We do not knowingly collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The effective date at the top of this page will reflect
          the latest version.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>For privacy questions about this Site, contact:</p>
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
