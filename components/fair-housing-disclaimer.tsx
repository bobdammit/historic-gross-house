import { FAIR_HOUSING_DISCLAIMER, FAIR_HOUSING_HEADLINE } from "@/lib/fair-housing";
import { cn } from "@/lib/utils";

type FairHousingDisclaimerProps = {
  className?: string;
  align?: "center" | "left";
};

export function FairHousingDisclaimer({ className, align = "center" }: FairHousingDisclaimerProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      role="note"
      aria-label={FAIR_HOUSING_HEADLINE}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
        {FAIR_HOUSING_HEADLINE}
      </p>
      <p className="text-[11px] font-light leading-[1.75] text-muted-foreground/70">{FAIR_HOUSING_DISCLAIMER}</p>
    </div>
  );
}
