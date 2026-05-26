"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GATED_DOCUMENTS, getGatedDocumentUrl } from "@/lib/documents";
import { emailInputProps, normalizePhoneInput, phoneInputProps } from "@/lib/form-validation";
import { scrollToSiteSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

export const MATERIALS_REQUEST_SECTION_ID = "documents-request";

type MaterialsGatewayContextValue = {
  unlocked: boolean;
  submitted: boolean;
  isSubmitting: boolean;
  error: string | null;
  openGateway: () => void;
  submitRequest: (payload: MaterialsFormData) => Promise<boolean>;
  openDocument: (slug: string) => void;
};

export type MaterialsFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  intent: string;
};

const MaterialsGatewayContext = createContext<MaterialsGatewayContextValue | null>(null);

export function MaterialsGatewayProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/materials/status")
      .then((response) => response.json())
      .then((data) => {
        if (data.unlocked) setUnlocked(true);
      })
      .catch(() => undefined);
  }, []);

  const openGateway = useCallback(() => {
    scrollToSiteSection(MATERIALS_REQUEST_SECTION_ID);
  }, []);

  const submitRequest = useCallback(async (payload: MaterialsFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/request-materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to submit your request. Please try again.");
        return false;
      }

      setUnlocked(true);
      setSubmitted(true);
      return true;
    } catch {
      setError("Unable to submit your request. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const openDocument = useCallback(
    (slug: string) => {
      if (!unlocked) {
        openGateway();
        return;
      }

      window.open(getGatedDocumentUrl(slug), "_blank", "noopener,noreferrer");
    },
    [openGateway, unlocked]
  );

  const value = useMemo(
    () => ({
      unlocked,
      submitted,
      isSubmitting,
      error,
      openGateway,
      submitRequest,
      openDocument,
    }),
    [unlocked, submitted, isSubmitting, error, openGateway, submitRequest, openDocument]
  );

  return <MaterialsGatewayContext.Provider value={value}>{children}</MaterialsGatewayContext.Provider>;
}

export function useMaterialsGateway() {
  const context = useContext(MaterialsGatewayContext);

  if (!context) {
    throw new Error("useMaterialsGateway must be used within MaterialsGatewayProvider");
  }

  return context;
}

export function MaterialsRequestPanel({ className }: { className?: string }) {
  const { unlocked, submitted, isSubmitting, error, submitRequest } = useMaterialsGateway();
  const [form, setForm] = useState<MaterialsFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    intent: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitRequest(form);
  };

  if (unlocked) {
    if (!submitted) return null;

    return (
      <div
        className={cn(
          "rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-[13px] leading-[1.75] text-foreground/90",
          className
        )}
      >
        Thank you. Your request has been received, your downloads are now available below, and a
        confirmation email is on its way. Bob will follow up ASAP.
      </div>
    );
  }

  return (
    <div className={cn("rounded-3xl border border-border/30 bg-card/80 p-6 sm:p-8 lg:p-10", className)}>
      <div className="mb-8 max-w-2xl">
        <p className="section-heading mb-4 font-medium uppercase tracking-[0.35em] text-primary">
          Request Access
        </p>
        <h3 className="mb-3 font-serif text-[1.5rem] font-normal text-foreground">
          Unlock offering materials
        </h3>
        <p className="text-[14px] font-light leading-[1.85] text-muted-foreground">
          Share your contact information to access the full offering memorandum and supporting due
          diligence materials. Complete the form below — no pop-up window required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" id="materials-name" required>
            <input
              id="materials-name"
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className={inputClassName}
              placeholder="Your name"
            />
          </Field>
          <Field label="Phone" id="materials-phone" required>
            <input
              id="materials-phone"
              required
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: normalizePhoneInput(event.target.value) }))
              }
              className={inputClassName}
              placeholder="9123221377"
              {...phoneInputProps}
            />
          </Field>
        </div>

        <Field label="Email" id="materials-email" required>
          <input
            id="materials-email"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className={inputClassName}
            placeholder="your@email.com"
            {...emailInputProps}
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Company" id="materials-company">
            <input
              id="materials-company"
              value={form.company}
              onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
              className={inputClassName}
              placeholder="Company or organization"
            />
          </Field>
          <Field label="I am a..." id="materials-intent">
            <select
              id="materials-intent"
              value={form.intent}
              onChange={(event) => setForm((current) => ({ ...current, intent: event.target.value }))}
              className={inputClassName}
            >
              <option value="">Select one</option>
              <option value="Investor">Investor</option>
              <option value="Owner-user">Owner-user</option>
              <option value="Broker">Broker</option>
              <option value="Other">Other</option>
            </select>
          </Field>
        </div>

        {error && <p className="text-[13px] text-red-400">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full bg-primary text-[12px] uppercase tracking-[0.1em] text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-10"
        >
          {isSubmitting ? "Submitting..." : "Unlock Materials"}
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-5 flex items-center gap-3 text-[12px] text-muted-foreground/80">
        <Lock className="h-4 w-4 shrink-0 text-primary/70" />
        Full offering memorandum and supporting reports unlock immediately after submission.
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border/30 bg-input px-5 py-3.5 text-[15px] font-light text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none";
