"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Maximize2, Minimize2 } from "lucide-react";
import {
  GALLERY_CATEGORY_LABELS,
  GALLERY_ALL_PHOTOS_FILTER,
  GALLERY_CATEGORY_FILTERS,
  GALLERY_SHOWCASE_CATEGORY_ORDER,
  getGalleryBrowsePool,
  getGalleryFeaturedImages,
  getGalleryImageBySrc,
  getGalleryImagesByCategory,
  getShuffledLightboxImages,
  pickRandomGalleryImageExcluding,
  type GalleryCategory,
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
import { scrollToSiteSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type LightboxScope = "featured" | "gallery";

const SHOWCASE_ROTATE_MS = 8000;
const SHOWCASE_FADE_MS = 1500;

function GalleryTile({
  image,
  onOpen,
  className,
  categoryLabel,
}: {
  image: GalleryImage;
  onOpen: (image: GalleryImage) => void;
  className?: string;
  categoryLabel?: string;
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
            {categoryLabel ?? GALLERY_CATEGORY_LABELS[image.category]}
          </p>
          <p className="font-serif text-[1rem] leading-snug text-foreground">{image.caption}</p>
        </div>
      </div>
    </button>
  );
}

function RotatingCategoryTile({
  category,
  onOpen,
  paused = false,
}: {
  category: GalleryCategory;
  onOpen: (image: GalleryImage) => void;
  paused?: boolean;
}) {
  const categoryPool = useMemo(() => getGalleryImagesByCategory(category), [category]);
  const [image, setImage] = useState<GalleryImage>(() => {
    const initial = pickRandomGalleryImageExcluding(categoryPool);
    return initial ?? categoryPool[0];
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused || categoryPool.length <= 1) return;

    let fadeTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setVisible(false);
      fadeTimeout = window.setTimeout(() => {
        setImage((current) => pickRandomGalleryImageExcluding(categoryPool, current.src) ?? current);
        setVisible(true);
      }, SHOWCASE_FADE_MS);
    }, SHOWCASE_ROTATE_MS);

    return () => {
      window.clearInterval(interval);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [category, categoryPool, paused]);

  if (!image) return null;

  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      className="group relative overflow-hidden rounded-3xl border border-border/30 bg-card text-left transition-all duration-700 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={cn(
            "object-cover transition-opacity duration-[1500ms] group-hover:scale-105 group-hover:transition-transform group-hover:duration-700",
            visible ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent transition-opacity duration-[1500ms]",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/70 opacity-100 backdrop-blur-sm transition-opacity duration-[1500ms] md:opacity-0 md:group-hover:opacity-100",
            visible ? "opacity-100 md:opacity-0" : "opacity-0"
          )}
        >
          <Expand className="h-4 w-4 text-primary" />
        </div>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-[1500ms]",
            visible ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
            {GALLERY_CATEGORY_LABELS[category]}
          </p>
          <p className="font-serif text-[1rem] leading-snug text-foreground">{image.caption}</p>
        </div>
      </div>
    </button>
  );
}

export function PropertyGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxScope, setLightboxScope] = useState<LightboxScope>("gallery");
  const [lightboxBrowseImages, setLightboxBrowseImages] = useState<GalleryImage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const featuredImages = useMemo(() => getGalleryFeaturedImages(), []);
  const totalBrowseCount = useMemo(() => getGalleryBrowsePool().length, []);
  const lightboxOpen = lightboxSrc !== null;

  const scopedLightboxImages = lightboxScope === "featured" ? featuredImages : lightboxBrowseImages;
  const activeImage = lightboxSrc ? getGalleryImageBySrc(lightboxSrc) : null;
  const lightboxIndex = activeImage
    ? scopedLightboxImages.findIndex((image) => image.src === lightboxSrc)
    : -1;
  const lightboxScopeLabel = lightboxScope === "featured" ? "Featured Views" : "Full Gallery";

  const openLightbox = (filter: GalleryFilterId, startSrc?: string) => {
    const images = getShuffledLightboxImages(filter);
    if (images.length === 0) return;

    const startImage =
      (startSrc ? images.find((image) => image.src === startSrc) : undefined) ??
      (startSrc ? getGalleryImageBySrc(startSrc) : undefined) ??
      images[0];

    if (!startImage) return;

    const orderedImages = startSrc
      ? [startImage, ...images.filter((image) => image.src !== startImage.src)]
      : images;

    setActiveFilter(filter);
    setLightboxScope("gallery");
    setLightboxBrowseImages(orderedImages);
    setLightboxSrc(startImage.src);
  };

  const openFeaturedImage = (image: GalleryImage) => {
    setLightboxScope("featured");
    setLightboxSrc(image.src);
  };

  const openGalleryImage = (image: GalleryImage) => {
    openLightbox(image.category, image.src);
  };

  const openFullGallery = () => {
    openLightbox("all");
  };

  const scrollToBrowse = () => {
    scrollToSiteSection("gallery");
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setIsExpanded(false);
    setActiveFilter(null);
  };

  const handleLightboxOpenChange = (open: boolean) => {
    if (!open) closeLightbox();
  };

  const showPrevious = () => {
    if (lightboxIndex < 0) return;
    setLightboxSrc(
      scopedLightboxImages[(lightboxIndex - 1 + scopedLightboxImages.length) % scopedLightboxImages.length].src
    );
  };

  const showNext = () => {
    if (lightboxIndex < 0) return;
    setLightboxSrc(scopedLightboxImages[(lightboxIndex + 1) % scopedLightboxImages.length].src);
  };

  const handleFilterClick = (filter: GalleryFilterId) => {
    openLightbox(filter);
  };

  const activeFilterLabel =
    activeFilter && activeFilter !== "all"
      ? GALLERY_CATEGORY_LABELS[activeFilter as GalleryCategory]
      : null;

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

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-serif text-[1.35rem] font-normal text-foreground sm:text-[1.5rem]">
              Featured Views
            </h3>
            <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
              A curated set of highlights. Browse the full gallery below for additional photos not shown here.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={scrollToBrowse}
              className="h-11 border-border/40 px-5 text-[11px] uppercase tracking-[0.1em] hover:border-primary/40 hover:bg-primary/5"
            >
              Browse All Photos
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={openFullGallery}
              className="h-11 border-primary/40 px-5 text-[11px] uppercase tracking-[0.1em] text-primary hover:border-primary hover:bg-primary/5"
            >
              View All {totalBrowseCount} Photos
            </Button>
          </div>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <GalleryTile
            image={featuredImages[0]}
            onOpen={openFeaturedImage}
            className="lg:col-span-7"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2 lg:gap-4">
            {featuredImages.slice(1).map((image) => (
              <GalleryTile key={image.src} image={image} onOpen={openFeaturedImage} />
            ))}
          </div>
        </div>

        <div id="gallery-browse" className="scroll-mt-site-header">
          <div className="mb-10">
            <h3 className="font-serif text-[1.35rem] font-normal text-foreground sm:text-[1.5rem]">
              Browse All Photos
            </h3>
            <p className="mt-2 max-w-2xl text-[13px] font-light leading-relaxed text-muted-foreground">
              Six category highlights below. Select a category or photo to open the full gallery lightbox.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-3">
              {GALLERY_CATEGORY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleFilterClick(filter.id)}
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
            <button
              type="button"
              onClick={() => handleFilterClick(GALLERY_ALL_PHOTOS_FILTER.id)}
              className={cn(
                "ml-auto shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-500",
                activeFilter === GALLERY_ALL_PHOTOS_FILTER.id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {GALLERY_ALL_PHOTOS_FILTER.label}
            </button>
          </div>

          <p className="mb-8 text-[12px] font-light tracking-[0.04em] text-muted-foreground/80">
            {activeFilterLabel
              ? `Viewing ${activeFilterLabel} in the lightbox`
              : `${GALLERY_SHOWCASE_CATEGORY_ORDER.length} category highlights`}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {GALLERY_SHOWCASE_CATEGORY_ORDER.map((category) => (
              <RotatingCategoryTile
                key={category}
                category={category}
                onOpen={openGalleryImage}
                paused={lightboxOpen}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={lightboxSrc !== null} onOpenChange={handleLightboxOpenChange}>
        <DialogContent
          showCloseButton
          className={cn(
            "flex max-w-none flex-col gap-0 overflow-hidden border-border/40 bg-background p-0 transition-all duration-300",
            isExpanded
              ? "fixed !top-1 !left-1 !h-[calc(100dvh-0.5rem)] !w-[calc(100vw-0.5rem)] !max-w-none !translate-x-0 !translate-y-0 sm:!top-2 sm:!left-2 sm:!h-[calc(100vh-1rem)] sm:!w-[calc(100vw-1rem)]"
              : "max-h-[95dvh] w-[min(1200px,calc(100vw-1rem))] sm:w-[min(1200px,calc(100vw-2rem))]"
          )}
        >
          {activeImage && lightboxIndex >= 0 && (
            <>
              <DialogTitle className="sr-only">{activeImage.alt}</DialogTitle>
              <DialogDescription className="sr-only">{activeImage.caption}</DialogDescription>

              <div className="relative shrink-0 border-b border-border/20">
                <p className="py-2.5 text-center text-[12px] font-medium text-muted-foreground">
                  {lightboxIndex + 1} / {scopedLightboxImages.length}
                </p>

                <div className="flex flex-col gap-3 border-t border-border/10 px-4 py-3 pr-14 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
                      {lightboxScopeLabel} · {GALLERY_CATEGORY_LABELS[activeImage.category]}
                    </p>
                    <p className="mt-1 font-serif text-base text-foreground sm:text-lg">{activeImage.caption}</p>
                  </div>
                  <div className="flex shrink-0 sm:items-end">
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
                </div>
              </div>

              <div
                className={cn(
                  "relative bg-muted",
                  isExpanded ? "flex min-h-0 flex-1 items-center justify-center" : "aspect-[16/10] w-full shrink-0"
                )}
              >
                <div className={cn("relative", isExpanded ? "h-full w-full" : "absolute inset-0")}>
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    className="bg-background object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {scopedLightboxImages.length > 1 && (
                  <>
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
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
