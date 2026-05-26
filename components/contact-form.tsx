"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { emailInputProps, normalizePhoneInput, phoneInputProps } from "@/lib/form-validation";
import { LISTING_AGENT } from "@/lib/broker-info";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

type ContactFormProps = {
  prefillMessage?: string;
  inquiryType?: "general" | "showing";
};

export function ContactForm({ prefillMessage = "", inquiryType = "general" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(prefillMessage);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillMessage) {
      setMessage(prefillMessage);
    }
  }, [prefillMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          inquiryType,
          smsOptIn,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to send your inquiry. Please try again.");
        return;
      }

      setSubmitted(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Unable to send your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-8">
        <p className="mb-2 text-[16px] font-medium text-foreground">Thank you for reaching out.</p>
        <p className="text-[14px] font-light leading-[1.8] text-muted-foreground">
          Your inquiry has been sent to Bob Piljay, and a confirmation email is on its way to you. He will
          follow up ASAP.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="contact-name" className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-border/30 bg-input px-5 py-4 text-[15px] font-light text-foreground transition-colors duration-500 placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="contact-phone" className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
            Phone *
          </label>
          <input
            type="tel"
            id="contact-phone"
            required
            value={phone}
            onChange={(event) => setPhone(normalizePhoneInput(event.target.value))}
            className="w-full rounded-xl border border-border/30 bg-input px-5 py-4 text-[15px] font-light text-foreground transition-colors duration-500 placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
            placeholder="9123221377"
            {...phoneInputProps}
          />
          <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
            <Checkbox
              id="contact-sms-opt-in"
              checked={smsOptIn}
              onCheckedChange={(checked) => setSmsOptIn(checked === true)}
              className="mt-0.5 size-5 border-2 border-primary bg-background shadow-sm data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/50"
            />
            <label
              htmlFor="contact-sms-opt-in"
              className="cursor-pointer text-[12px] font-light leading-[1.65] text-muted-foreground"
            >
              I authorize{" "}
              <span className="font-medium text-primary">{LISTING_AGENT.name}</span>, the listing agent
              for this property, to text me personally about {PROPERTY_SITE_NAME}. Texts come{" "}
              <span className="font-medium text-foreground">only from Bob</span>—not a marketing
              list, autodialer, or third party. Message frequency varies. Message and data rates may
              apply. Reply STOP to opt out.{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms
              </Link>{" "}
              ·{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy
              </Link>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="contact-email" className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
          Email *
        </label>
        <input
          id="contact-email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-border/30 bg-input px-5 py-4 text-[15px] font-light text-foreground transition-colors duration-500 placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
          placeholder="your@email.com"
          {...emailInputProps}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="contact-message" className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none rounded-xl border border-border/30 bg-input px-5 py-4 text-[15px] font-light text-foreground transition-colors duration-500 placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
          placeholder="I'm interested in learning more about this property..."
        />
      </div>

      {error && <p className="text-[13px] text-red-400">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 h-14 w-full bg-primary text-[13px] font-medium uppercase tracking-[0.08em] text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? "Sending..." : inquiryType === "showing" ? "Request Showing" : "Send Inquiry"}
        <ArrowRight className="ml-4 h-4 w-4" />
      </Button>
    </form>
  );
}
