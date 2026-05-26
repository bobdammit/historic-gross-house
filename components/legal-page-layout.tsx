import Link from "next/link";
import type { ReactNode } from "react";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

type LegalPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/20 bg-card/40">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-12">
          <div>
            <p className="section-heading mb-2 font-medium uppercase tracking-[0.35em] text-primary">
              {PROPERTY_SITE_NAME}
            </p>
            <h1 className="font-serif text-[1.75rem] font-normal tracking-[-0.02em] text-foreground md:text-[2.25rem]">
              {title}
            </h1>
          </div>
          <Link
            href="/"
            className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            Back to site
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">{children}</article>

      <footer className="border-t border-border/20 bg-card/30 py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-8 text-[13px] font-light text-muted-foreground lg:px-12 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {PROPERTY_SITE_NAME}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-serif text-[1.35rem] font-normal text-foreground">{title}</h2>
      <div className="space-y-4 text-[15px] font-light leading-[1.85] text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
