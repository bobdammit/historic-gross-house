"use client";

import Image from "next/image";
import { 
  Building2, 
  MapPin, 
  Car, 
  Phone, 
  Mail,
  CheckCircle2,
  TrendingUp,
  Users,
  Home,
} from "lucide-react";
import { PropertyGallery } from "@/components/property-gallery";
import { ConversionPrecedent } from "@/components/conversion-precedent";
import { VirtualTour } from "@/components/virtual-tour";
import { MaterialsGatewayProvider } from "@/components/materials-gateway";
import { HeroDocumentsCtas } from "@/components/hero-documents-ctas";
import { DocumentsSection } from "@/components/documents-section";
import { ContactForm } from "@/components/contact-form";
import { SiteNav } from "@/components/site-nav";
import { BROKERAGE, LISTING_AGENT } from "@/lib/broker-info";
import { PROPERTY_MAP_EMBED_URL } from "@/lib/property-content";
import { useState } from "react";

const SHOWING_MESSAGE =
  "I'm interested in scheduling a showing for The Historic Gross House at 290 East King Avenue.";

export default function GrossHousePage() {
  const [contactPrefill, setContactPrefill] = useState("");
  const [contactInquiryType, setContactInquiryType] = useState<"general" | "showing">("general");
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const requestShowing = () => {
    setContactPrefill(SHOWING_MESSAGE);
    setContactInquiryType("showing");
    scrollToSection("contact");
  };

  const handleScheduleShowing = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    requestShowing();
  };

  const handleGeneralContact = () => {
    setContactPrefill("");
    setContactInquiryType("general");
    scrollToSection("contact");
  };

  return (
    <MaterialsGatewayProvider>
    <main className="min-h-screen bg-background">
      <SiteNav onNavigate={scrollToSection} onContact={handleGeneralContact} />

      {/* Hero Section */}
      <section className="relative flex min-h-[100dvh] items-end pb-20 pt-28 sm:pb-24 lg:pb-32 lg:pt-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gross-house-exterior.jpg"
            alt="The Historic Gross House - 290 East King Avenue, Kingsland, Georgia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-16">
          <div className="max-w-2xl">
            {/* Property Tag */}
            <div className="mb-10 flex flex-wrap items-center gap-4 sm:mb-14 sm:gap-6">
              <span className="inline-flex items-center px-5 py-2.5 text-[9px] font-semibold tracking-[0.3em] bg-primary/90 text-primary-foreground uppercase">
                For Sale
              </span>
              <span className="h-px w-16 bg-primary/30" />
              <span className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase">Kingsland, Georgia</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="mb-8 font-serif font-normal tracking-[-0.02em] text-foreground sm:mb-10">
              <span className="mb-4 block text-[2.35rem] leading-[1.02] text-foreground sm:mb-5 sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                The Historic Gross House · Est. 1912
              </span>
              <span className="block max-w-lg text-[13px] font-sans font-light uppercase leading-[1.7] tracking-[0.15em] text-muted-foreground sm:text-[15px] sm:tracking-[0.18em] md:text-[16px]">
                A Landmark Estate Built for Commercial Conversion
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-10 max-w-md text-[12px] font-light leading-[1.75] text-muted-foreground/90 sm:mb-14 sm:text-[13px] sm:leading-[1.8]">
              Acquire a distinguished 1912 residence with exceptional potential for professional or medical office conversion. 
              Nearly 4,000 SF on a 0.55-acre corner lot with ample parking, proven conversion precedent across the street, 
              and motivated sellers ready to transact.
            </p>

            {/* Address */}
            <div className="mb-12 flex items-start gap-4 sm:mb-16 sm:items-center sm:gap-5">
              <span className="mt-2 h-px w-10 shrink-0 bg-primary/50 sm:mt-0 sm:w-12" />
              <span className="text-[13px] tracking-[0.03em] text-foreground/90 sm:text-[14px] sm:tracking-[0.04em]">
                290 East King Avenue, Kingsland, GA 31548
              </span>
            </div>

            <HeroDocumentsCtas onScheduleShowing={handleScheduleShowing} />
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section id="stats" className="relative border-y border-border/20 bg-card/80">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "$574,900", label: "Asking Price", highlight: true },
              { value: "±3,955 SF", label: "Building Size" },
              { value: "0.55 Acre", label: "Corner Lot" },
              { value: "1912", label: "Year Built" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`border-border/20 py-10 text-center sm:py-14 lg:py-16 ${
                  index % 2 === 0 ? "border-r" : ""
                } ${index < 2 ? "border-b lg:border-b-0" : ""} ${index === 2 ? "lg:border-r" : ""}`}
              >
                <p
                  className={`mb-2 font-serif text-[1.5rem] font-normal tracking-[-0.02em] sm:mb-3 sm:text-[1.75rem] lg:text-[2.25rem] ${
                    stat.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyGallery />

      <ConversionPrecedent />

      {/* Key Highlights Section */}
      <section id="highlights" className="section-pad relative bg-background">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="mb-16 max-w-4xl lg:mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="section-heading font-medium tracking-[0.4em] text-primary uppercase">Investment Overview</span>
              <span className="h-px flex-1 bg-border/30 max-w-[200px]" />
            </div>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1] mb-8">
              Six Compelling Reasons to Consider This Property
            </h2>
            <p className="text-muted-foreground text-[15px] leading-[1.9] max-w-xl font-light">
              A convergence of historic character, strategic location, and favorable market conditions creates a distinctive investment opportunity.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Card - Spans 2 columns */}
            <div className="group relative rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-transparent p-8 transition-all duration-700 hover:border-primary/20 sm:p-10 lg:col-span-2 lg:p-16">
              <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors duration-700">
                  <Building2 className="h-9 w-9 text-primary/80" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[1.5rem] lg:text-[1.75rem] font-serif font-normal text-foreground mb-6 leading-[1.2]">
                    Prime Conversion Potential
                  </h3>
                  <p className="text-muted-foreground leading-[1.9] mb-8 text-[15px] font-light max-w-xl">
                    This distinguished property presents strong potential for adaptive reuse as professional or medical office space. 
                    With nearly 4,000 SF of character-rich interiors across multiple rooms, the layout readily accommodates 
                    exam rooms, private offices, reception areas, and support spaces.
                  </p>
                  <div className="flex items-center gap-4 text-primary/70 text-[12px] font-medium tracking-[0.05em]">
                    <span className="w-12 h-px bg-primary/30" />
                    Ideal for medical, legal, or professional services
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card p-8 transition-all duration-700 hover:border-primary/20 sm:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-8 group-hover:bg-primary/12 transition-colors duration-700">
                <Car className="h-6 w-6 text-primary/80" />
              </div>
              <h3 className="text-[1.125rem] font-medium text-foreground mb-4 leading-[1.3]">
                Ample On-Site Parking
              </h3>
              <p className="text-muted-foreground leading-[1.85] text-[14px] font-light">
                The generous 0.55-acre corner lot accommodates 12-15 on-site parking spaces—exceeding typical requirements for professional office use.
              </p>
            </div>

            {/* Standard Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card p-8 transition-all duration-700 hover:border-primary/20 sm:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-8 group-hover:bg-primary/12 transition-colors duration-700">
                <CheckCircle2 className="h-6 w-6 text-primary/80" />
              </div>
              <h3 className="text-[1.125rem] font-medium text-foreground mb-4 leading-[1.3]">
                Proven Conversion Precedent
              </h3>
              <p className="text-muted-foreground leading-[1.85] text-[14px] font-light">
                A successful residential-to-commercial conversion directly across the street demonstrates clear market acceptance and zoning viability.
              </p>
            </div>

            {/* Standard Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card p-8 transition-all duration-700 hover:border-primary/20 sm:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-8 group-hover:bg-primary/12 transition-colors duration-700">
                <TrendingUp className="h-6 w-6 text-primary/80" />
              </div>
              <h3 className="text-[1.125rem] font-medium text-foreground mb-4 leading-[1.3]">
                Recent Capital Improvements
              </h3>
              <p className="text-muted-foreground leading-[1.85] text-[14px] font-light">
                Major systems updated: new roof, modern HVAC, and fresh exterior paint significantly reduce immediate capital expenditure for new ownership.
              </p>
            </div>

            {/* Standard Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card p-8 transition-all duration-700 hover:border-primary/20 sm:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-8 group-hover:bg-primary/12 transition-colors duration-700">
                <Home className="h-6 w-6 text-primary/80" />
              </div>
              <h3 className="text-[1.125rem] font-medium text-foreground mb-4 leading-[1.3]">
                Historic Character, Modern Function
              </h3>
              <p className="text-muted-foreground leading-[1.85] text-[14px] font-light">
                Original 1912 architectural details create a distinctive environment that modern construction cannot replicate—with contemporary updates.
              </p>
            </div>

            {/* Standard Card */}
            <div className="group relative rounded-3xl border border-border/30 bg-card p-8 transition-all duration-700 hover:border-primary/20 sm:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-8 group-hover:bg-primary/12 transition-colors duration-700">
                <Users className="h-6 w-6 text-primary/80" />
              </div>
              <h3 className="text-[1.125rem] font-medium text-foreground mb-4 leading-[1.3]">
                As-Is from Motivated Sellers
              </h3>
              <p className="text-muted-foreground leading-[1.85] text-[14px] font-light">
                Offered in current condition by sellers prepared to work toward a mutually beneficial transaction—creating negotiation opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Market Section */}
      <section id="location" className="section-pad bg-secondary/50">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="mb-16 max-w-4xl lg:mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="section-heading font-medium tracking-[0.4em] text-primary uppercase">Market Analysis</span>
              <span className="h-px flex-1 bg-border/30 max-w-[200px]" />
            </div>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1] mb-8">
              Strategic Location in Camden County
            </h2>
            <p className="text-muted-foreground text-[15px] leading-[1.9] max-w-xl font-light">
              Positioned in the heart of Kingsland&apos;s commercial district, benefiting from proximity to Naval Submarine Base Kings Bay and growing regional demand for professional services.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Map - Wider */}
            <div className="lg:col-span-3 bg-card border border-border/30 rounded-3xl overflow-hidden">
              <div className="aspect-[16/10] relative bg-muted">
                <iframe
                  src={PROPERTY_MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location Map"
                />
              </div>
              <div className="p-6 sm:p-10">
                <h3 className="text-[1.125rem] font-medium text-foreground mb-4">Prime Commercial Corridor</h3>
                <p className="text-muted-foreground text-[14px] leading-[1.85] font-light">
                  Situated on East King Avenue in the heart of Kingsland&apos;s commercial district, 
                  offering excellent visibility, accessibility, and proximity to key services.
                </p>
              </div>
            </div>

            {/* Demographics - Narrower */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border/30 rounded-3xl p-10">
                <h3 className="section-heading mb-10 font-medium tracking-[0.1em] text-primary uppercase">Demographics</h3>
                <div className="space-y-0">
                  {[
                    { label: "Population (5-Mile)", value: "25,000+" },
                    { label: "Median Income", value: "$52,000" },
                    { label: "Kings Bay Naval Base", value: "8 Miles" },
                    { label: "I-95 Access", value: "2 Miles" },
                  ].map((item, index, arr) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center py-5 ${index !== arr.length - 1 ? 'border-b border-border/20' : ''}`}
                    >
                      <span className="text-muted-foreground text-[13px] font-light">{item.label}</span>
                      <span className="text-foreground font-medium text-[14px]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border/30 rounded-3xl p-10">
                <h3 className="section-heading mb-10 font-medium tracking-[0.1em] text-primary uppercase">Economic Drivers</h3>
                <ul className="space-y-5">
                  {[
                    "Naval Submarine Base Kings Bay",
                    "Growing retirement community",
                    "Jacksonville, FL metro proximity",
                    "Healthcare services demand"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="w-1 h-1 rounded-full bg-primary/60 mt-2.5 shrink-0" />
                      <span className="text-muted-foreground text-[13px] leading-[1.7] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VirtualTour onScheduleTour={requestShowing} />

      <DocumentsSection />

      {/* Contact Section */}
      <section id="contact" className="section-pad bg-background">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="mb-16 max-w-4xl lg:mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="section-heading font-medium tracking-[0.4em] text-primary uppercase">Connect</span>
              <span className="h-px flex-1 bg-border/30 max-w-[200px]" />
            </div>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1]">
              Contact the Listing Broker
            </h2>
          </div>

          <div className="max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="mb-10">
                  <h3 className="text-[1.75rem] font-serif font-normal leading-[1.3] text-foreground mb-3">
                    {LISTING_AGENT.displayTitle}
                  </h3>
                  <p className="text-[13px] font-light tracking-[0.04em] text-muted-foreground">
                    GA License #{LISTING_AGENT.gaLicenseNumber}
                  </p>
                </div>

                <div className="space-y-8 mb-10">
                  <a
                    href={`tel:${LISTING_AGENT.cellTel}`}
                    className="group flex items-center gap-6 text-foreground hover:text-primary transition-colors duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-500">
                      <Phone className="h-5 w-5 text-primary/80" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Cell</p>
                      <p className="text-[16px] font-medium tracking-[0.02em]">{LISTING_AGENT.cell}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${LISTING_AGENT.email}`}
                    className="group flex items-center gap-6 text-foreground hover:text-primary transition-colors duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-500">
                      <Mail className="h-5 w-5 text-primary/80" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Email</p>
                      <p className="text-[16px] font-medium tracking-[0.02em]">{LISTING_AGENT.email}</p>
                    </div>
                  </a>
                </div>

                <div className="mb-10 border-t border-border/20 pt-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground mb-6">
                    Listing Brokerage
                  </p>
                  <h4 className="text-[1.25rem] font-serif font-normal text-foreground mb-6">{BROKERAGE.name}</h4>

                  <div className="space-y-6">
                    <a
                      href={`tel:${BROKERAGE.phoneTel}`}
                      className="group flex items-center gap-5 text-foreground hover:text-primary transition-colors duration-500"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-500">
                        <Phone className="h-4 w-4 text-primary/80" />
                      </div>
                      <div>
                        <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Office</p>
                        <p className="text-[15px] font-medium tracking-[0.02em]">{BROKERAGE.phone}</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-5 text-foreground">
                      <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-primary/80" />
                      </div>
                      <div>
                        <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Office Address</p>
                        <p className="text-[15px] font-medium tracking-[0.02em]">{BROKERAGE.addressLine1}</p>
                        <p className="text-[14px] font-light text-muted-foreground">{BROKERAGE.cityStateZip}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-[14px] leading-[1.9] font-light border-l-2 border-primary/20 pl-6">
                  For property tours, additional information, or to submit an offer, please contact me directly. All
                  inquiries are handled with discretion.
                </p>
              </div>

              {/* Contact Form */}
              <div className="rounded-3xl border border-border/30 bg-card p-6 sm:p-10 lg:col-span-3 lg:p-14">
                <ContactForm
                  key={`${contactInquiryType}-${contactPrefill}`}
                  prefillMessage={contactPrefill}
                  inquiryType={contactInquiryType}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/50 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-8 text-center lg:grid lg:grid-cols-3 lg:items-center lg:gap-10 lg:text-left">
            <div className="lg:justify-self-start">
              <p className="mb-2 font-serif text-[1.125rem] text-foreground">The Historic Gross House</p>
              <p className="text-[13px] font-light text-muted-foreground">290 East King Avenue, Kingsland, GA 31548</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground/70 lg:justify-self-center">
              <a href="/privacy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="/terms" className="transition-colors hover:text-foreground">
                Terms &amp; Conditions
              </a>
            </div>

            <div className="lg:justify-self-end lg:text-right">
              <p className="mb-1 text-[12px] font-light text-muted-foreground">{BROKERAGE.name}</p>
              <p className="mb-1 text-[12px] font-light text-muted-foreground">
                {BROKERAGE.phone} · {BROKERAGE.fullAddress}
              </p>
              <p className="mt-3 text-[11px] font-light tracking-[0.03em] text-muted-foreground/50 whitespace-nowrap">
                © {new Date().getFullYear()} All rights reserved. Information deemed reliable but not guaranteed.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </MaterialsGatewayProvider>
  );
}
