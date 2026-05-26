import Link from "next/link";
import { SITE_CREDITS, SITE_CREDITS_COPYRIGHT_SECTION_ID } from "@/lib/site-credits";
import { cn } from "@/lib/utils";

type SiteCreditsProps = {
  className?: string;
  align?: "center" | "left";
};

export function SiteCredits({ className, align = "center" }: SiteCreditsProps) {
  return (
    <p
      className={cn(
        "max-w-3xl text-[11px] font-light leading-[1.7] text-muted-foreground/60",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      Website, photography, aerial drone imagery, and Matterport virtual tour production by{" "}
      <a
        href={SITE_CREDITS.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground/80 transition-colors hover:text-foreground"
      >
        {SITE_CREDITS.companyName}
      </a>{" "}
      ({SITE_CREDITS.creatorName}). Commercial UAS operations conducted under FAA Part 107 certificate #
      {SITE_CREDITS.faaPart107CertificateNumber}.{" "}
      <Link
        href={`/terms#${SITE_CREDITS_COPYRIGHT_SECTION_ID}`}
        className="text-muted-foreground/80 transition-colors hover:text-foreground"
      >
        Copyright &amp; permitted use
      </Link>
    </p>
  );
}
