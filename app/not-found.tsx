import Link from "next/link";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="section-heading mb-4 font-medium uppercase tracking-[0.35em] text-primary">
        {PROPERTY_SITE_NAME}
      </p>
      <h1 className="mb-4 font-serif text-3xl font-normal text-foreground">Page not found</h1>
      <p className="mb-10 max-w-md text-[15px] font-light leading-relaxed text-muted-foreground">
        This address is not part of the listing site. Return to the property overview to view photos,
        documents, and contact information.
      </p>
      <Link
        href="/"
        className="rounded-xl border border-primary/40 bg-primary px-8 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to listing
      </Link>
    </main>
  );
}
