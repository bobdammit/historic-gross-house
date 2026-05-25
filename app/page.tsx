"use client";

import Image from "next/image";
import { 
  Building2, 
  MapPin, 
  Car, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle2,
  Download,
  Play,
  TrendingUp,
  Users,
  Home,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrossHousePage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-px h-8 bg-primary/40" />
            <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Exclusive Listing</span>
          </div>
          <div className="hidden lg:flex items-center gap-14">
            {["Overview", "Location", "Tour", "Documents", "Inquire"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === "Overview" ? "highlights" : item === "Inquire" ? "contact" : item.toLowerCase())} 
                className="text-[12px] text-muted-foreground hover:text-foreground transition-all duration-500 tracking-[0.08em] uppercase"
              >
                {item}
              </button>
            ))}
          </div>
          <Button 
            onClick={() => scrollToSection("contact")}
            className="bg-transparent border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-[11px] tracking-[0.1em] uppercase px-8 h-11 transition-all duration-500"
          >
            Contact
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end pb-24 lg:pb-32">
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
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-2xl">
            {/* Property Tag */}
            <div className="flex items-center gap-6 mb-14">
              <span className="inline-flex items-center px-5 py-2.5 text-[9px] font-semibold tracking-[0.3em] bg-primary/90 text-primary-foreground uppercase">
                For Sale
              </span>
              <span className="h-px w-16 bg-primary/30" />
              <span className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase">Kingsland, Georgia</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="mb-12 font-serif font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
                The Historic Gross House · Est. 1912
              </span>
              <span className="block text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]">
                A Landmark Estate Built for Commercial Conversion
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-[16px] lg:text-[17px] text-muted-foreground leading-[1.9] mb-14 max-w-lg font-light">
              Acquire a distinguished 1912 residence with exceptional potential for professional or medical office conversion. 
              Nearly 4,000 SF on a 0.55-acre corner lot with ample parking, proven conversion precedent across the street, 
              and motivated sellers ready to transact.
            </p>

            {/* Address */}
            <div className="flex items-center gap-5 mb-16">
              <span className="w-12 h-px bg-primary/50" />
              <span className="text-foreground/90 text-[14px] tracking-[0.04em]">290 East King Avenue, Kingsland, GA 31548</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <Button 
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="group h-16 w-full bg-primary px-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_0_40px_-8px] shadow-primary/50 transition-all duration-500 hover:bg-primary/90 hover:shadow-[0_0_48px_-6px] hover:shadow-primary/60 sm:min-w-[260px] sm:w-auto"
              >
                Schedule a Showing
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("documents")}
                className="group h-16 w-full border-primary/45 bg-background/30 px-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary hover:bg-primary/10 hover:text-foreground sm:min-w-[240px] sm:w-auto"
              >
                <Download className="mr-3 h-4 w-4 text-primary transition-transform duration-500 group-hover:scale-110" />
                Download OM
              </Button>
            </div>
            <p className="mt-5 text-[12px] font-light tracking-[0.04em] text-muted-foreground/80">
              Request a private tour or download the offering memorandum to begin your review.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section id="stats" className="relative bg-card/80 border-y border-border/20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "$574,900", label: "Asking Price", highlight: true },
              { value: "±3,955 SF", label: "Building Size" },
              { value: "0.55 Acre", label: "Corner Lot" },
              { value: "1912", label: "Year Built" },
            ].map((stat, index) => (
              <div 
                key={index}
                className={`py-14 lg:py-16 text-center ${index !== 3 ? 'border-r border-border/20' : ''}`}
              >
                <p className={`text-[1.75rem] lg:text-[2.25rem] font-serif font-normal mb-3 tracking-[-0.02em] ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="highlights" className="py-36 lg:py-48 bg-background relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="max-w-4xl mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Investment Overview</span>
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
            <div className="lg:col-span-2 group relative bg-gradient-to-br from-card via-card to-transparent border border-border/30 hover:border-primary/20 rounded-3xl p-12 lg:p-16 transition-all duration-700">
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
            <div className="group relative bg-card border border-border/30 hover:border-primary/20 rounded-3xl p-10 transition-all duration-700">
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
            <div className="group relative bg-card border border-border/30 hover:border-primary/20 rounded-3xl p-10 transition-all duration-700">
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
            <div className="group relative bg-card border border-border/30 hover:border-primary/20 rounded-3xl p-10 transition-all duration-700">
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
            <div className="group relative bg-card border border-border/30 hover:border-primary/20 rounded-3xl p-10 transition-all duration-700">
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
            <div className="group relative bg-card border border-border/30 hover:border-primary/20 rounded-3xl p-10 transition-all duration-700">
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
      <section id="location" className="py-36 lg:py-48 bg-secondary/50">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="max-w-4xl mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Market Analysis</span>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.7!2d-81.6847!3d30.8001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5e13d4b8f0001%3A0x1!2s290%20E%20King%20Ave%2C%20Kingsland%2C%20GA%2031548!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location Map"
                />
              </div>
              <div className="p-10">
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
                <h3 className="text-[13px] font-medium text-primary tracking-[0.1em] uppercase mb-10">Demographics</h3>
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
                <h3 className="text-[13px] font-medium text-primary tracking-[0.1em] uppercase mb-10">Economic Drivers</h3>
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

      {/* Virtual Tour Section */}
      <section id="tour" className="py-36 lg:py-48 bg-background relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Immersive Experience</span>
                <span className="h-px flex-1 bg-border/30 max-w-[120px]" />
              </div>
              <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1] mb-8">
                Explore Every Detail
              </h2>
              <p className="text-muted-foreground text-[15px] leading-[1.9] mb-8 font-light max-w-lg">
                Walk through this distinguished 1912 residence from anywhere in the world. Our high-definition 
                Matterport 3D tour captures every architectural detail, room layout, and character element 
                to help you evaluate the property&apos;s conversion potential.
              </p>
              
              <div className="space-y-5 mb-12">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary/40" />
                  <span className="text-[13px] text-foreground/90 font-light">Full interior walkthrough of all ±3,955 SF</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary/40" />
                  <span className="text-[13px] text-foreground/90 font-light">Room-by-room measurement and layout views</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary/40" />
                  <span className="text-[13px] text-foreground/90 font-light">Exterior grounds and parking area coverage</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-[11px] tracking-[0.12em] uppercase font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-500">
                  <Play className="h-4 w-4 mr-3" />
                  Launch Virtual Tour
                </Button>
                <Button variant="outline" className="border-border/50 hover:border-primary/40 hover:bg-primary/5 px-8 h-14 text-[11px] tracking-[0.12em] uppercase font-medium rounded-xl transition-all duration-500">
                  <Phone className="h-4 w-4 mr-3" />
                  Schedule In-Person Tour
                </Button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-card via-card to-primary/[0.02] border border-border/30 hover:border-primary/30 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-700">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.08] to-transparent rounded-bl-[60px] rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/[0.05] to-transparent rounded-tr-[40px] rounded-bl-3xl" />
                
                {/* Play area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    {/* Pulse rings */}
                    <div className="absolute inset-0 w-28 h-28 rounded-full bg-primary/10 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-700">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                  </div>
                  <p className="text-foreground font-serif text-[1.25rem] mb-2">Matterport 3D Tour</p>
                  <p className="text-muted-foreground/70 text-[12px] tracking-[0.1em] uppercase">Click to Explore</p>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-6">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground/80 font-light">Interactive 3D Walkthrough</span>
                    <span className="text-primary/80 font-medium tracking-[0.05em]">HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="py-36 lg:py-48 bg-secondary/50 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.015] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative">
          {/* Bespoke Section Header */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Due Diligence</span>
              <span className="h-px flex-1 bg-border/30 max-w-[200px]" />
            </div>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1] mb-8">
              Documents & Reports
            </h2>
            <p className="text-muted-foreground text-[15px] leading-[1.9] max-w-xl font-light">
              Download comprehensive materials to support your investment analysis and due diligence process.
            </p>
          </div>

          <div className="max-w-5xl">
            {/* Featured Document - Offering Memorandum */}
            <div className="relative bg-gradient-to-br from-card via-card to-primary/[0.02] border border-primary/20 rounded-3xl p-10 lg:p-14 mb-10 group transition-all duration-700 hover:border-primary/40">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/[0.06] to-transparent rounded-bl-[80px] rounded-tr-3xl" />
              
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-700">
                    <FileText className="h-9 w-9 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-[1.35rem] font-serif font-normal text-foreground">
                        Offering Memorandum
                      </h3>
                      <span className="px-3 py-1.5 bg-primary/15 text-primary text-[9px] font-semibold tracking-[0.2em] uppercase rounded-full border border-primary/20">
                        Complete Package
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[14px] leading-[1.9] max-w-md font-light mb-6">
                      Comprehensive investment package including property overview, market analysis, 
                      financial projections, comparable sales data, and adaptive reuse considerations.
                    </p>
                    <div className="flex items-center gap-6 text-[12px] text-muted-foreground/70">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        PDF Format
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        24 Pages
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-[11px] tracking-[0.12em] uppercase font-medium shrink-0 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-500">
                  <Download className="h-4 w-4 mr-3" />
                  Download OM
                </Button>
              </div>
            </div>

            {/* Supporting Documents Header */}
            <div className="flex items-center gap-4 mb-8 mt-16">
              <span className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground/60 uppercase">Supporting Reports</span>
              <span className="h-px flex-1 bg-border/20 max-w-[120px]" />
            </div>

            {/* Supporting Documents */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-card/80 border border-border/30 hover:border-primary/25 rounded-2xl p-8 cursor-pointer group transition-all duration-700 hover:bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-700">
                    <MapPin className="h-5 w-5 text-primary/80" />
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500" />
                </div>
                <h3 className="text-[15px] font-medium text-foreground mb-2 group-hover:text-primary/90 transition-colors duration-700">
                  Property Survey
                </h3>
                <p className="text-[13px] text-muted-foreground/80 leading-[1.7] font-light">
                  Detailed boundary survey with easements, setbacks, and improvement locations.
                </p>
              </div>

              <div className="bg-card/80 border border-border/30 hover:border-primary/25 rounded-2xl p-8 cursor-pointer group transition-all duration-700 hover:bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-700">
                    <Building2 className="h-5 w-5 text-primary/80" />
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500" />
                </div>
                <h3 className="text-[15px] font-medium text-foreground mb-2 group-hover:text-primary/90 transition-colors duration-700">
                  Floor Plans
                </h3>
                <p className="text-[13px] text-muted-foreground/80 leading-[1.7] font-light">
                  Existing layout documentation with conceptual conversion diagrams.
                </p>
              </div>

              <div className="bg-card/80 border border-border/30 hover:border-primary/25 rounded-2xl p-8 cursor-pointer group transition-all duration-700 hover:bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-700">
                    <FileText className="h-5 w-5 text-primary/80" />
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500" />
                </div>
                <h3 className="text-[15px] font-medium text-foreground mb-2 group-hover:text-primary/90 transition-colors duration-700">
                  Zoning Analysis
                </h3>
                <p className="text-[13px] text-muted-foreground/80 leading-[1.7] font-light">
                  Current zoning classification, permitted uses, and conversion pathway.
                </p>
              </div>
            </div>

            {/* Data Room Access */}
            <div className="mt-14 p-8 border border-border/20 rounded-2xl bg-card/30 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-[14px] text-foreground font-medium mb-1">Additional Materials Available</p>
                    <p className="text-[13px] text-muted-foreground/70 font-light">
                      Historical records, title documentation, and environmental reports available upon request.
                    </p>
                  </div>
                </div>
                <button className="text-[11px] tracking-[0.1em] uppercase text-primary hover:text-primary/80 font-medium transition-colors duration-300 whitespace-nowrap">
                  Request Data Room Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-36 lg:py-48 bg-background">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Bespoke Section Header */}
          <div className="max-w-4xl mb-28">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-[9px] font-medium tracking-[0.4em] text-primary uppercase">Connect</span>
              <span className="h-px flex-1 bg-border/30 max-w-[200px]" />
            </div>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal text-foreground leading-[1.1]">
              Contact the Listing Broker
            </h2>
          </div>

          <div className="max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="mb-14">
                  <h3 className="text-[1.75rem] font-serif font-normal text-foreground mb-2">Bob Piljay</h3>
                  <p className="text-primary font-medium tracking-[0.08em] text-[13px] uppercase">Associate Broker</p>
                  <p className="text-muted-foreground text-[14px] mt-1 font-light">Watson Realty Corp</p>
                </div>

                <div className="space-y-8 mb-14">
                  <a 
                    href="tel:+19123221377" 
                    className="group flex items-center gap-6 text-foreground hover:text-primary transition-colors duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-500">
                      <Phone className="h-5 w-5 text-primary/80" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Cell</p>
                      <p className="text-[16px] font-medium tracking-[0.02em]">(912) 322-1377</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:bob@piljay.com" 
                    className="group flex items-center gap-6 text-foreground hover:text-primary transition-colors duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-500">
                      <Mail className="h-5 w-5 text-primary/80" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase mb-1">Email</p>
                      <p className="text-[16px] font-medium tracking-[0.02em]">bob@piljay.com</p>
                    </div>
                  </a>
                </div>

                <p className="text-muted-foreground text-[14px] leading-[1.9] font-light border-l-2 border-primary/20 pl-6">
                  For property tours, additional information, or to submit an offer, 
                  please contact Bob directly. All inquiries are handled with discretion.
                </p>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3 bg-card border border-border/30 rounded-3xl p-10 lg:p-14">
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-[11px] font-medium text-foreground/80 tracking-[0.1em] uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-5 py-4 bg-input border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors duration-500 text-[15px] font-light"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-[11px] font-medium text-foreground/80 tracking-[0.1em] uppercase">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-5 py-4 bg-input border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors duration-500 text-[15px] font-light"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="text-[11px] font-medium text-foreground/80 tracking-[0.1em] uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-5 py-4 bg-input border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors duration-500 text-[15px] font-light"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="text-[11px] font-medium text-foreground/80 tracking-[0.1em] uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-5 py-4 bg-input border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors duration-500 resize-none text-[15px] font-light"
                      placeholder="I'm interested in learning more about this property..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-[13px] tracking-[0.08em] uppercase font-medium mt-4"
                  >
                    Send Inquiry
                    <ArrowRight className="ml-4 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card/50 border-t border-border/20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <p className="text-foreground font-serif text-[1.125rem] mb-2">The Historic Gross House</p>
              <p className="text-[13px] text-muted-foreground font-light">290 East King Avenue, Kingsland, GA 31548</p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-[12px] text-muted-foreground mb-2 font-light">
                Listed Exclusively by Watson Realty Corp
              </p>
              <p className="text-[11px] text-muted-foreground/50 tracking-[0.03em] font-light">
                © {new Date().getFullYear()} All rights reserved. Information deemed reliable but not guaranteed.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
