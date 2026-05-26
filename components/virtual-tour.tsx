"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, Play, Phone } from "lucide-react";
import { MATTERPORT_EMBED_URL } from "@/lib/property-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/components/ui/use-mobile";
import { cn } from "@/lib/utils";

type VirtualTourProps = {
  onScheduleTour: () => void;
};

export function VirtualTour({ onScheduleTour }: VirtualTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && isMobile) {
      setIsExpanded(true);
    }
  }, [isOpen, isMobile]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setIsExpanded(false);
  };

  return (
    <>
      <section id="tour" className="section-pad relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/[0.02] blur-[100px]" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <div className="mb-10 flex items-center gap-6">
                <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-primary">
                  Immersive Experience
                </span>
                <span className="h-px max-w-[120px] flex-1 bg-border/30" />
              </div>
              <h2 className="mb-8 font-serif text-[2rem] font-normal leading-[1.1] text-foreground md:text-[2.5rem] lg:text-[3rem]">
                Explore Every Detail
              </h2>
              <p className="mb-8 max-w-lg text-[15px] font-light leading-[1.9] text-muted-foreground">
                Walk through this distinguished 1912 residence from anywhere in the world. Our
                high-definition Matterport 3D tour captures every architectural detail, room layout,
                and character element to help you evaluate the property&apos;s conversion potential.
              </p>

              <div className="mb-12 space-y-5">
                {[
                  "Full interior walkthrough of all ±3,955 SF",
                  "Room-by-room measurement and layout views",
                  "Exterior grounds and parking area coverage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-[13px] font-light text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-14 w-full rounded-xl bg-primary px-8 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-500 hover:bg-primary/90 hover:shadow-primary/30 sm:w-auto"
                >
                  <Play className="mr-3 h-4 w-4" />
                  Launch Virtual Tour
                </Button>
                <Button
                  variant="outline"
                  onClick={onScheduleTour}
                  className="h-14 w-full rounded-xl border-border/50 px-8 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 sm:w-auto"
                >
                  <Phone className="mr-3 h-4 w-4" />
                  Schedule In-Person Tour
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-primary/[0.02] transition-all duration-700 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label="Launch Matterport virtual tour"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[60px] rounded-tr-3xl bg-gradient-to-bl from-primary/[0.08] to-transparent" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-[40px] rounded-bl-3xl bg-gradient-to-tr from-primary/[0.05] to-transparent" />

                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/gross-house-exterior.jpg"
                    alt="Preview of the Historic Gross House Matterport virtual tour"
                    fill
                    className="object-cover opacity-40 transition-opacity duration-700 group-hover:opacity-50"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="relative mb-8">
                    <div
                      className="absolute inset-0 h-28 w-28 animate-ping rounded-full bg-primary/10 opacity-20"
                      style={{ animationDuration: "2s" }}
                    />
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 transition-all duration-700 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10">
                      <Play className="ml-1 h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <p className="mb-2 font-serif text-[1.25rem] text-foreground">Matterport 3D Tour</p>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground/70">
                    Click to launch immersive walkthrough
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-6">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-light text-muted-foreground/80">Interactive 3D Walkthrough</span>
                    <span className="font-medium tracking-[0.05em] text-primary/80">HD Quality</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton
          className={cn(
            "flex max-w-none flex-col gap-0 overflow-hidden border-border/40 bg-background p-0 transition-all duration-300",
            isExpanded
              ? "fixed !top-1 !left-1 !h-[calc(100dvh-0.5rem)] !w-[calc(100vw-0.5rem)] !max-w-none !translate-x-0 !translate-y-0 sm:!top-2 sm:!left-2 sm:!h-[calc(100vh-1rem)] sm:!w-[calc(100vw-1rem)]"
              : "w-[min(calc(100vw-1rem),calc(100dvh*4/3))] sm:w-[min(calc(100vw-2rem),calc(90vh*4/3))]"
          )}
        >
          <DialogTitle className="sr-only">Matterport Virtual Tour</DialogTitle>
          <DialogDescription className="sr-only">
            Interactive 3D walkthrough of The Historic Gross House
          </DialogDescription>

          <div className="flex shrink-0 flex-col gap-3 border-b border-border/20 px-4 py-3 pr-14 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                Matterport 3D Tour
              </p>
              <p className="font-serif text-base text-foreground sm:text-lg">The Historic Gross House</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              className="h-10 w-full border-border/50 text-[10px] uppercase tracking-[0.12em] sm:w-auto"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Exit Full Screen
                </>
              ) : (
                <>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Full Screen
                </>
              )}
            </Button>
          </div>

          <div
            className={cn(
              isExpanded
                ? "flex min-h-0 flex-1 items-center justify-center"
                : "relative w-full aspect-[4/3] shrink-0"
            )}
          >
            <div
              className={cn(
                "relative",
                isExpanded
                  ? "aspect-video h-full max-h-full w-auto max-w-full min-h-0"
                  : "absolute inset-0 h-full w-full"
              )}
            >
              <iframe
                src={MATTERPORT_EMBED_URL}
                title="Matterport virtual tour of The Historic Gross House"
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
