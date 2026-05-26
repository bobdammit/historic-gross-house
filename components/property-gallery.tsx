"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import {
  GALLERY_CATEGORY_LABELS,
  GALLERY_FILTERS,
  GALLERY_IMAGES,
  GALLERY_LANDING_MAIN_SRC,
  GALLERY_LANDING_SECONDARY_SRCS,
  getGalleryGridImages,
  getGalleryImageBySrc,
  type GalleryFilterId,
  type GalleryImage,
} from "@/lib/gallery-images";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

function GalleryTile({
  image,
  onOpen,
  className,
}: {
  image: GalleryImage;
  onOpen: (image: GalleryImage) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/30 bg-card text-left transition-all duration-700 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/70 opacity-100 backdrop-blur-sm transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
          <Expand className="h-4 w-4 text-primary" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
            {GALLERY_CATEGORY_LABELS[image.category]}
          </p>
          <p className="font-serif text-[1rem] leading-snug text-foreground">{image.caption}</p>
        </div>
      </div>
    </button>
  );
}

export function PropertyGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const lightboxImages = useMemo(
    () =>
      activeFilter === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((image) => image.category === activeFilter),
    [activeFilter]
  );

  const gridImages = useMemo(() => getGalleryGridImages(activeFilter), [activeFilter]);
  const visibleImages = gridImages.slice(0, visibleCount);
  const landingMain = getGalleryImageBySrc(GALLERY_LANDING_MAIN_SRC) ?? GALLERY_IMAGES[0];
  const landingSecondary = GALLERY_LANDING_SECONDARY_SRCS.map((src) => getGalleryImageBySrc(src)).filter(
    (image): image is GalleryImage => Boolean(image)
  );
  const activeImage = lightboxSrc ? getGalleryImageBySrc(lightboxSrc) : null;
  const lightboxIndex =
    activeImage ? lightboxImages.findIndex((image) => image.src === lightboxSrc) : -1;

  const openLandingImage = (image: GalleryImage) => {
    setActiveFilter("all");
    setVisibleCount(INITIAL_VISIBLE);
    setLightboxSrc(image.src);
  };

  const openLightbox = (image: GalleryImage) => setLightboxSrc(image.src);
  const closeLightbox = () => setLightboxSrc(null);

  const showPrevious = () => {
    if (lightboxIndex < 0) return;
    setLightboxSrc(lightboxImages[(lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length].src);
  };

  const showNext = () => {
    if (lightboxIndex < 0) return;
    setLightboxSrc(lightboxImages[(lightboxIndex + 1) % lightboxImages.length].src);
  };

  const handleFilterChange = (filter: GalleryFilterId) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_VISIBLE);
    setLightboxSrc(null);
  };

  return (
    <section id="gallery" className="section-pad relative bg-secondary/50">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-12 max-w-4xl lg:mb-16">
          <div className="mb-10 flex items-center gap-6">
            <span className="section-heading font-medium uppercase tracking-[0.4em] text-primary">
              Property Photography
            </span>
            <span className="h-px max-w-[200px] flex-1 bg-border/30" />
          </div>
          <h2 className="mb-8 font-serif text-[2rem] font-normal leading-[1.1] text-foreground md:text-[2.5rem] lg:text-[3rem]">
            See the Conversion Potential
          </h2>
          <p className="max-w-2xl text-[15px] font-light leading-[1.9] text-muted-foreground">
            These photographs document the property as it exists today — a distinguished 1912 residence
            with the scale, character, and site attributes to support professional or medical office
            conversion. Captions describe adaptive reuse potential, not current use.
          </p>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <GalleryTile
            image={landingMain}
            onOpen={openLandingImage}
            className="lg:col-span-7"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2 lg:gap-4">
            {landingSecondary.map((image) => (
              <GalleryTile
                key={image.src}
                image={image}
                onOpen={openLandingImage}
              />
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterChange(filter.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-500",
                activeFilter === filter.id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="mb-8 text-[12px] font-light tracking-[0.04em] text-muted-foreground/80">
          Showing {visibleImages.length} of {gridImages.length} photos
          {activeFilter !== "all" ? ` in ${GALLERY_CATEGORY_LABELS[activeFilter as keyof typeof GALLERY_CATEGORY_LABELS]}` : ""}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleImages.map((image) => (
            <GalleryTile key={image.src} image={image} onOpen={openLightbox} />
          ))}
        </div>

        {visibleCount < gridImages.length && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
              className="h-12 border-primary/40 px-10 text-[11px] uppercase tracking-[0.12em] hover:border-primary hover:bg-primary/5"
            >
              Load More Photos
            </Button>
          </div>
        )}
      </div>

      <Dialog open={lightboxSrc !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          showCloseButton
          className="max-h-[95dvh] w-[min(1200px,calc(100vw-1rem))] max-w-none gap-0 overflow-hidden border-border/40 bg-background p-0 sm:w-[min(1200px,calc(100vw-2rem))]"
        >
          {activeImage && lightboxIndex >= 0 && (
            <>
              <DialogTitle className="sr-only">{activeImage.alt}</DialogTitle>
              <DialogDescription className="sr-only">{activeImage.caption}</DialogDescription>

              <div className="relative aspect-[16/10] w-full bg-muted">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain bg-background"
                  sizes="100vw"
                  priority
                />

                <div className="absolute inset-x-0 top-0 flex flex-col gap-3 bg-gradient-to-b from-background/90 to-transparent p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:p-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
                      {GALLERY_CATEGORY_LABELS[activeImage.category]}
                    </p>
                    <p className="mt-1 max-w-2xl font-serif text-lg text-foreground">
                      {activeImage.caption}
                    </p>
                  </div>
                  <p className="shrink-0 text-[12px] text-muted-foreground">
                    {lightboxIndex + 1} / {lightboxImages.length}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={showPrevious}
                  className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/40 sm:left-4"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/40 sm:right-4"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
