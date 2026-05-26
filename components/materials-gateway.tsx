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
import { ArrowRight, FileText, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { GATED_DOCUMENTS, getGatedDocumentUrl } from "@/lib/documents";
import { emailInputProps, normalizePhoneInput, phoneInputProps } from "@/lib/form-validation";

type MaterialsGatewayContextValue = {
  unlocked: boolean;
  isSubmitting: boolean;
  error: string | null;
  openGateway: () => void;
  closeGateway: () => void;
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
  const [isOpen, setIsOpen] = useState(false);
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
    setError(null);
    setIsOpen(true);
  }, []);

  const closeGateway = useCallback(() => {
    setIsOpen(false);
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
      isSubmitting,
      error,
      openGateway,
      closeGateway,
      submitRequest,
      openDocument,
    }),
    [unlocked, isSubmitting, error, openGateway, closeGateway, submitRequest, openDocument]
  );

  return (
    <MaterialsGatewayContext.Provider value={value}>
      {children}
      <MaterialsGatewayDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        unlocked={unlocked}
        submitted={submitted}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={submitRequest}
        onOpenDocument={openDocument}
      />
    </MaterialsGatewayContext.Provider>
  );
}

export function useMaterialsGateway() {
  const context = useContext(MaterialsGatewayContext);

  if (!context) {
    throw new Error("useMaterialsGateway must be used within MaterialsGatewayProvider");
  }

  return context;
}

function MaterialsGatewayDialog({
  isOpen,
  onOpenChange,
  unlocked,
  submitted,
  isSubmitting,
  error,
  onSubmit,
  onOpenDocument,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  unlocked: boolean;
  submitted: boolean;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (payload: MaterialsFormData) => Promise<boolean>;
  onOpenDocument: (slug: string) => void;
}) {
  const [form, setForm] = useState<MaterialsFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    intent: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    if (unlocked) return;
    setForm({ name: "", email: "", phone: "", company: "", intent: "" });
  }, [isOpen, unlocked]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  const availableDocuments = GATED_DOCUMENTS.filter((document) => document.available);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] w-[calc(100vw-1rem)] overflow-y-auto border-border/40 bg-background sm:max-h-[90vh] sm:w-[min(640px,calc(100vw-2rem))]">
        <DialogTitle className="font-serif text-[1.5rem] font-normal text-foreground">
          {unlocked ? "Your Materials Are Ready" : "Request Offering Materials"}
        </DialogTitle>
        <DialogDescription className="text-[14px] leading-[1.8] text-muted-foreground">
          {unlocked
            ? "Your access is active for this browser session. Open the offering memorandum and supporting reports below."
            : "Share your contact information to access the full offering memorandum and supporting due diligence materials."}
        </DialogDescription>

        {!unlocked ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
              className="h-12 w-full bg-primary text-[12px] uppercase tracking-[0.1em] text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Unlock Materials"}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            {submitted && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-[13px] text-foreground/90">
                Thank you. Your request has been received, your downloads are now available, and a
                confirmation email is on its way to you. Bob will follow up ASAP.
              </div>
            )}

            {availableDocuments.map((document) => (
              <button
                key={document.slug}
                type="button"
                onClick={() => onOpenDocument(document.slug)}
                className="flex w-full items-center justify-between rounded-2xl border border-border/30 bg-card/50 px-5 py-4 text-left transition-colors hover:border-primary/30 hover:bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-foreground">{document.title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{document.meta ?? "PDF"}</p>
                  </div>
                </div>
                <Unlock className="h-4 w-4 text-primary" />
              </button>
            ))}
          </div>
        )}

        {!unlocked && (
          <div className="mt-4 flex items-center gap-3 text-[12px] text-muted-foreground/80">
            <Lock className="h-4 w-4 text-primary/70" />
            Full offering memorandum and supporting reports are available after submission.
          </div>
        )}
      </DialogContent>
    </Dialog>
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
