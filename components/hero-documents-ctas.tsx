"use client";

import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMaterialsGateway } from "@/components/materials-gateway";
import { COMMERCIAL_FLYER } from "@/lib/documents";

export function HeroDocumentsCtas({
  onScheduleShowing,
}: {
  onScheduleShowing: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { unlocked, openGateway, openDocument } = useMaterialsGateway();

  return (
    <div className="rounded-2xl border border-border/25 bg-card/50 p-5 backdrop-blur-sm max-lg:bg-card/80 max-lg:shadow-sm sm:p-6 lg:bg-background/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
        <Button
          size="lg"
          asChild
          className="group h-16 w-full bg-primary px-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_0_40px_-8px] shadow-primary/50 transition-all duration-500 hover:bg-primary/90 hover:shadow-[0_0_48px_-6px] hover:shadow-primary/60 sm:min-w-[280px] sm:w-auto"
        >
          <a href="#contact" onClick={onScheduleShowing}>
            Schedule a Showing
            <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Button>

        <Button
          size="lg"
          variant="outline"
          asChild
          className="group h-16 w-full border-primary/45 bg-background/40 px-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary hover:bg-primary/10 hover:text-foreground sm:min-w-[260px] sm:w-auto"
        >
          <a href={COMMERCIAL_FLYER.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-3 h-4 w-4 text-primary transition-transform duration-500 group-hover:scale-110" />
            View Property Flyer
          </a>
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            if (unlocked) {
              openDocument("offering-memorandum");
              return;
            }
            openGateway();
          }}
          className="group h-16 w-full border-border/40 bg-background/30 px-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground sm:min-w-[240px] sm:w-auto"
        >
          <Lock className="mr-3 h-4 w-4 text-primary transition-transform duration-500 group-hover:scale-110" />
          {unlocked ? "Open Full OM" : "Request Full OM"}
        </Button>
      </div>
      <p className="mt-4 text-[12px] font-light leading-[1.65] tracking-[0.04em] text-muted-foreground max-lg:text-foreground/70 sm:text-muted-foreground/80">
        View the public property flyer instantly. Request access to unlock the full offering memorandum and
        supporting reports.
      </p>
    </div>
  );
}
