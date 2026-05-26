import Image from "next/image";
import { Landmark } from "lucide-react";
import { CONVERSION_PRECEDENT } from "@/lib/gallery-images";

export function ConversionPrecedent() {
  return (
    <section id="precedent" className="border-y border-border/20 bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20">
            <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <Landmark className="h-3.5 w-3.5" />
              Comparable Property — Not This Listing
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src={CONVERSION_PRECEDENT.src}
                alt={CONVERSION_PRECEDENT.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
                Directly Across East King Avenue
              </p>
              <p className="font-serif text-lg text-foreground">{CONVERSION_PRECEDENT.address}</p>
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center gap-6">
              <span className="section-heading font-medium uppercase tracking-[0.4em] text-primary">
                Conversion Precedent
              </span>
              <span className="h-px max-w-[120px] flex-1 bg-border/30" />
            </div>
            <h2 className="mb-6 font-serif text-[2rem] font-normal leading-[1.1] text-foreground md:text-[2.5rem]">
              {CONVERSION_PRECEDENT.headline}
            </h2>
            <p className="mb-10 max-w-xl text-[15px] font-light leading-[1.9] text-muted-foreground">
              {CONVERSION_PRECEDENT.description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary/80">
                  Year Built
                </p>
                <p className="text-[1.125rem] text-foreground">{CONVERSION_PRECEDENT.yearBuilt}</p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary/80">
                  Current Use
                </p>
                <p className="text-[1.125rem] text-foreground">{CONVERSION_PRECEDENT.currentUse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
