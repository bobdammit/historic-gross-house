"use client";

import type { LucideIcon } from "lucide-react";
import { Building2, Download, ExternalLink, FileText, Lock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMERCIAL_FLYER, GATED_DOCUMENTS, type GatedDocument } from "@/lib/documents";
import { useMaterialsGateway } from "@/components/materials-gateway";

function getDocumentIcon(document: GatedDocument): LucideIcon {
  if (document.group === "map") return MapPin;
  if (document.group === "layout") return Building2;
  return FileText;
}

function DocumentCard({
  document,
  unlocked,
  onOpen,
  onRequestAccess,
}: {
  document: GatedDocument;
  unlocked: boolean;
  onOpen: (slug: string) => void;
  onRequestAccess: () => void;
}) {
  const Icon = getDocumentIcon(document);

  return (
    <button
      type="button"
      disabled={unlocked && !document.available}
      onClick={() => {
        if (!document.available) {
          if (!unlocked) onRequestAccess();
          return;
        }

        if (unlocked) {
          onOpen(document.slug);
          return;
        }

        onRequestAccess();
      }}
      className="rounded-2xl border border-border/30 bg-card/80 p-6 text-left transition-all duration-700 hover:border-primary/25 hover:bg-card disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border/30 disabled:hover:bg-card/80 sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8">
          <Icon className="h-5 w-5 text-primary/80" />
        </div>
        {unlocked && document.available ? (
          <Download className="h-4 w-4 text-primary/60" />
        ) : (
          <Lock className="h-4 w-4 text-muted-foreground/30" />
        )}
      </div>
      <h3 className="mb-2 text-[15px] font-medium text-foreground">{document.title}</h3>
      <p className="text-[13px] font-light leading-[1.7] text-muted-foreground/80">
        {document.available
          ? document.description
          : `${document.description} Available after materials request.`}
      </p>
    </button>
  );
}

function DocumentGroup({
  title,
  documents,
  unlocked,
  onOpen,
  onRequestAccess,
}: {
  title: string;
  documents: GatedDocument[];
  unlocked: boolean;
  onOpen: (slug: string) => void;
  onRequestAccess: () => void;
}) {
  if (documents.length === 0) return null;

  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-8 flex items-center gap-4">
        <span className="section-heading font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
          {title}
        </span>
        <span className="h-px max-w-[120px] flex-1 bg-border/20" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((document) => (
          <DocumentCard
            key={document.slug}
            document={document}
            unlocked={unlocked}
            onOpen={onOpen}
            onRequestAccess={onRequestAccess}
          />
        ))}
      </div>
    </div>
  );
}

export function DocumentsSection() {
  const { unlocked, openGateway, openDocument } = useMaterialsGateway();
  const offeringMemorandum = GATED_DOCUMENTS.find((document) => document.slug === "offering-memorandum");
  const supportingDocuments = GATED_DOCUMENTS.filter((document) => document.category === "supporting");
  const reportDocuments = supportingDocuments.filter((document) => document.group === "report");
  const layoutDocuments = supportingDocuments.filter((document) => document.group === "layout");
  const mapDocuments = supportingDocuments.filter((document) => document.group === "map");

  return (
    <section id="documents" className="section-pad relative overflow-hidden bg-secondary/50">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.015] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-14 max-w-4xl lg:mb-20">
          <div className="mb-10 flex items-center gap-6">
            <span className="section-heading font-medium uppercase tracking-[0.4em] text-primary">
              Due Diligence
            </span>
            <span className="h-px max-w-[200px] flex-1 bg-border/30" />
          </div>
          <h2 className="mb-8 font-serif text-[2rem] font-normal leading-[1.1] text-foreground md:text-[2.5rem] lg:text-[3rem]">
            Documents & Reports
          </h2>
          <p className="max-w-xl text-[15px] font-light leading-[1.9] text-muted-foreground">
            Start with the public property overview flyer. Request access to unlock the full offering
            memorandum, market reports, floor plan, and trade area maps.
          </p>
        </div>

        <div className="max-w-5xl">
          <div className="relative mb-10 rounded-3xl border border-border/30 bg-card/80 p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border/20 bg-primary/8">
                  <FileText className="h-9 w-9 text-primary/80" />
                </div>
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <h3 className="font-serif text-[1.35rem] font-normal text-foreground">
                      {COMMERCIAL_FLYER.title}
                    </h3>
                    <span className="rounded-full border border-border/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Public
                    </span>
                  </div>
                  <p className="mb-6 max-w-md text-[14px] font-light leading-[1.9] text-muted-foreground">
                    {COMMERCIAL_FLYER.description}
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="h-14 w-full shrink-0 rounded-xl border-primary/40 px-10 text-[11px] uppercase tracking-[0.12em] hover:border-primary hover:bg-primary/5 sm:w-auto"
              >
                <a href={COMMERCIAL_FLYER.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-3 h-4 w-4" />
                  View Property Flyer
                </a>
              </Button>
            </div>
          </div>

          {offeringMemorandum && (
            <div className="relative mb-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.02] p-6 sm:p-10 lg:p-14">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[80px] rounded-tr-3xl bg-gradient-to-bl from-primary/[0.06] to-transparent" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/15 to-primary/5">
                    <FileText className="h-9 w-9 text-primary" />
                  </div>
                  <div>
                    <div className="mb-4 flex items-center gap-4">
                      <h3 className="font-serif text-[1.35rem] font-normal text-foreground">
                        {offeringMemorandum.title}
                      </h3>
                      <span className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {unlocked ? "Unlocked" : "Access Required"}
                      </span>
                    </div>
                    <p className="mb-6 max-w-md text-[14px] font-light leading-[1.9] text-muted-foreground">
                      {offeringMemorandum.description}
                    </p>
                    <p className="text-[12px] text-muted-foreground/70">{offeringMemorandum.meta}</p>
                  </div>
                </div>

                {unlocked ? (
                  <Button
                    onClick={() => openDocument(offeringMemorandum.slug)}
                    className="h-14 w-full shrink-0 rounded-xl bg-primary px-10 text-[11px] uppercase tracking-[0.12em] text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 sm:w-auto"
                  >
                    <Download className="mr-3 h-4 w-4" />
                    Open Offering Memorandum
                  </Button>
                ) : (
                  <Button
                    onClick={openGateway}
                    className="h-14 w-full shrink-0 rounded-xl bg-primary px-10 text-[11px] uppercase tracking-[0.12em] text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 sm:w-auto"
                  >
                    <Lock className="mr-3 h-4 w-4" />
                    Request Full OM
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="mt-16">
            <DocumentGroup
              title="Market Reports"
              documents={reportDocuments}
              unlocked={unlocked}
              onOpen={openDocument}
              onRequestAccess={openGateway}
            />
            <DocumentGroup
              title="Property Layout"
              documents={layoutDocuments}
              unlocked={unlocked}
              onOpen={openDocument}
              onRequestAccess={openGateway}
            />
            <DocumentGroup
              title="Trade Area Maps"
              documents={mapDocuments}
              unlocked={unlocked}
              onOpen={openDocument}
              onRequestAccess={openGateway}
            />
          </div>

          <div className="mt-14 rounded-2xl border border-border/20 bg-card/30 p-8 backdrop-blur-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8">
                  <ExternalLink className="h-5 w-5 text-primary/60" />
                </div>
                <div>
                  <p className="mb-1 text-[14px] font-medium text-foreground">Additional Materials Available</p>
                  <p className="text-[13px] font-light text-muted-foreground/70">
                    Historical records, title documentation, and environmental reports available upon request.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={openGateway}
                className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary/80"
              >
                {unlocked ? "Open Materials" : "Request Data Room Access"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
