export type GalleryCategory =
  | "exterior"
  | "interior"
  | "detail"
  | "aerial"
  | "grounds"
  | "baths-closets";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
};

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  exterior: "Exterior",
  interior: "Interiors",
  detail: "Architectural Details",
  aerial: "Aerial Views",
  grounds: "Grounds & Parking",
  "baths-closets": "Baths/Closets",
};

export const GALLERY_SHOWCASE_CATEGORY_ORDER: GalleryCategory[] = [
  "exterior",
  "interior",
  "detail",
  "aerial",
  "grounds",
  "baths-closets",
];

const CATEGORY_CAPTIONS: Record<GalleryCategory, string[]> = {
  exterior: [
    "Primary street elevation — strong first impression for client-facing use",
    "Secondary elevation — corner lot depth and on-site presence",
    "Panoramic street view — scale of the 0.55-acre corner site",
    "Front entry — distinguished arrival experience for clients and patients",
    "Corner lot frontage — professional visibility on East King Avenue",
  ],
  interior: [
    "Main level room — reception or waiting area potential",
    "Private office or consultation room layout",
    "Flexible suite — exam rooms, team offices, or support space",
    "Conference-scale room — meeting or collaborative workspace potential",
    "Secondary office suite — natural light and room to subdivide",
    "Administrative or records area potential",
    "Client-facing space with historic interior character",
    "Additional private office or treatment room layout",
    "Open floor plan segment — adaptable professional use",
    "Support space — staff, storage, or break area potential",
    "Multi-purpose room — training, conference, or open office layout",
  ],
  detail: [
    "Original woodwork — character that modern office build-outs cannot replicate",
    "Architectural millwork — distinctive environment for professional services",
    "Period finish details — premium feel for medical, legal, or professional offices",
    "Craftsmanship throughout — memorable client-facing interior presence",
    "Original stairwell — vertical circulation with 1912 architectural character",
  ],
  aerial: [
    "Aerial perspective — lot size, roof footprint, and parking layout",
    "Site context from above — corner positioning and surrounding development",
  ],
  grounds: [
    "Detached garage — additional storage or support space potential",
    "On-site outbuilding — utility, storage, or ancillary use",
    "Parking and site layout — on-site capacity for staff and clients",
    "Grounds and ancillary structures — support space around the main residence",
  ],
  "baths-closets": [
    "Master bath — dual vanities, corner tub, and private suite layout potential",
    "Bathroom — fixture layout and finish potential for professional conversion",
    "Built-in closet — storage and support space within the floor plan",
    "Closet or bath area — ancillary space within the residential floor plan",
  ],
};

const GALLERY_BROWSE_FILENAMES = [
  "baths-01.jpg",
  "baths-02.jpg",
  "baths-03.jpg",
  "baths-04.jpg",
  "baths-05.jpg",
  "baths-06.jpg",
  "baths-07.jpg",
  "baths-08.jpg",
  "baths-09.jpg",
  "baths-10.jpg",
  "closet-01.jpg",
  "closet-02.jpg",
  "closet-03.jpg",
  "detail-01.jpg",
  "detail-02.jpg",
  "detail-03.jpg",
  "detail-04.jpg",
  "detail-05.jpg",
  "detail-06.jpg",
  "detail-07.jpg",
  "detail-08.jpg",
  "detail-09.jpg",
  "detail-10.jpg",
  "detail-11.jpg",
  "detail-12.jpg",
  "detail-13.jpg",
  "detail-14.jpg",
  "detail-15.jpg",
  "detail-16.jpg",
  "detail-17 (1).jpg",
  "detail-18.jpg",
  "detail-19.jpg",
  "drone-01.jpg",
  "drone-02.jpg",
  "drone-03.jpg",
  "drone-04.jpg",
  "exterior-01.jpg",
  "exterior-02.jpg",
  "exterior-03.jpg",
  "exterior-04.jpg",
  "exterior-05.jpg",
  "exterior-06.jpg",
  "exterior-07.jpg",
  "exterior-08.jpg",
  "exterior-09.jpg",
  "exterior-10.jpg",
  "exterior-11.jpg",
  "exterior-12.jpg",
  "exterior-13.jpg",
  "exterior-14.jpg",
  "grounds-01.jpg",
  "grounds-02.jpg",
  "grounds-03.jpg",
  "grounds-04.jpg",
  "grounds-05.jpg",
  "grounds-06.jpg",
  "grounds-07.jpg",
  "grounds-08.jpg",
  "grounds-09.jpg",
  "grounds-10.jpg",
  "grounds-11.jpg",
  "grounds-12.jpg",
  "grounds-13.jpg",
  "grounds-14.jpg",
  "interior-01.jpg",
  "interior-02.jpg",
  "interior-03.jpg",
  "interior-04.jpg",
  "interior-05.jpg",
  "interior-06.jpg",
  "interior-07.jpg",
  "interior-08.jpg",
  "interior-09.jpg",
  "interior-10.jpg",
  "interior-11.jpg",
  "interior-12.jpg",
  "interior-13.jpg",
  "interior-14.jpg",
  "interior-15.jpg",
  "interior-16.jpg",
  "interior-17.jpg",
  "interior-18.jpg",
  "interior-19.jpg",
  "interior-20.jpg",
  "interior-21.jpg",
  "interior-22.jpg",
  "interior-23.jpg",
  "interior-24.jpg",
  "interior-25.jpg",
  "interior-26.jpg",
  "interior-27.jpg",
  "interior-28.jpg",
  "interior-29.jpg",
  "interior-30.jpg",
  "interior-31.jpg",
  "interior-32.jpg",
  "interior-33.jpg",
  "interior-34.jpg",
  "interior-35.jpg",
  "interior-36.jpg",
  "interior-37.jpg",
  "interior-38.jpg",
  "interior-39.jpg",
] as const;

const GALLERY_CAPTION_OVERRIDES: Record<string, string> = {
  "interior-05.jpg":
    "Upper level room — long narrow suite with low arched ceiling; records room or non-critical office potential",
};

const GALLERY_ALT_OVERRIDES: Record<string, string> = {
  "interior-05.jpg": "Upper level room at the Historic Gross House",
};

function categoryFromFilename(filename: string): GalleryCategory | null {
  if (filename.startsWith("exterior-")) return "exterior";
  if (filename.startsWith("interior-")) return "interior";
  if (filename.startsWith("detail-")) return "detail";
  if (filename.startsWith("drone-")) return "aerial";
  if (filename.startsWith("grounds-")) return "grounds";
  if (filename.startsWith("baths-") || filename.startsWith("closet-")) return "baths-closets";
  return null;
}

function captionIndexFromFilename(filename: string) {
  const match = filename.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 1;
}

function captionFor(category: GalleryCategory, filename: string) {
  if (GALLERY_CAPTION_OVERRIDES[filename]) {
    return GALLERY_CAPTION_OVERRIDES[filename];
  }

  const captions = CATEGORY_CAPTIONS[category];
  const index = captionIndexFromFilename(filename);
  return captions[(index - 1) % captions.length];
}

function altFor(category: GalleryCategory, filename: string) {
  if (GALLERY_ALT_OVERRIDES[filename]) {
    return GALLERY_ALT_OVERRIDES[filename];
  }

  const label = GALLERY_CATEGORY_LABELS[category];
  const index = captionIndexFromFilename(filename);
  return `${label} photo ${index} at the Historic Gross House`;
}

function buildBrowseImage(filename: string): GalleryImage | null {
  const category = categoryFromFilename(filename);
  if (!category) return null;

  return {
    src: `/images/${filename}`,
    alt: altFor(category, filename),
    caption: captionFor(category, filename),
    category,
  };
}

const GALLERY_BROWSE_IMAGES = GALLERY_BROWSE_FILENAMES.map(buildBrowseImage).filter(
  (image): image is GalleryImage => Boolean(image)
);

const GALLERY_FEATURED_MAIN: GalleryImage = {
  src: "/images/gross-house-exterior.jpg",
  alt: "The Historic Gross House exterior on East King Avenue",
  caption: "Corner lot frontage — professional visibility on East King Avenue",
  category: "exterior",
};

export const GALLERY_IMAGES: GalleryImage[] = [GALLERY_FEATURED_MAIN, ...GALLERY_BROWSE_IMAGES];

/** Hero gallery layout — main image plus a mixed secondary set (not all exterior/detail). */
export const GALLERY_LANDING_MAIN_SRC = "/images/gross-house-exterior.jpg";

export const GALLERY_LANDING_SECONDARY_SRCS = [
  "/images/interior-01.jpg",
  "/images/interior-03.jpg",
  "/images/detail-02.jpg",
  "/images/interior-04.jpg",
] as const;

export const GALLERY_LANDING_SRCS = new Set<string>([
  GALLERY_LANDING_MAIN_SRC,
  ...GALLERY_LANDING_SECONDARY_SRCS,
]);

export function getGalleryImageBySrc(src: string) {
  return GALLERY_IMAGES.find((image) => image.src === src);
}

export function getGalleryBrowsePool(): GalleryImage[] {
  return GALLERY_BROWSE_IMAGES.filter((image) => !GALLERY_LANDING_SRCS.has(image.src));
}

export function getGalleryFeaturedImages(): GalleryImage[] {
  const main = getGalleryImageBySrc(GALLERY_LANDING_MAIN_SRC) ?? GALLERY_FEATURED_MAIN;
  const secondary = GALLERY_LANDING_SECONDARY_SRCS.map((src) => getGalleryImageBySrc(src)).filter(
    (image): image is GalleryImage => Boolean(image)
  );

  return [main, ...secondary];
}

export const GALLERY_CATEGORY_FILTERS = Object.entries(GALLERY_CATEGORY_LABELS).map(([id, label]) => ({
  id,
  label,
})) as {
  id: GalleryCategory;
  label: string;
}[];

export const GALLERY_ALL_PHOTOS_FILTER = { id: "all", label: "All Photos" } as const;

export const GALLERY_FILTERS = [...GALLERY_CATEGORY_FILTERS, GALLERY_ALL_PHOTOS_FILTER] as const;

export type GalleryFilterId = (typeof GALLERY_FILTERS)[number]["id"];

export function shuffleGalleryImages<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function pickRandomGalleryImage(items: readonly GalleryImage[]): GalleryImage | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)] ?? null;
}

export function pickRandomGalleryImageExcluding(
  items: readonly GalleryImage[],
  excludeSrc?: string
): GalleryImage | null {
  const pool = excludeSrc ? items.filter((image) => image.src !== excludeSrc) : [...items];

  if (pool.length === 0) {
    return excludeSrc ? items.find((image) => image.src === excludeSrc) ?? null : null;
  }

  return pickRandomGalleryImage(pool);
}

export function getGalleryImagesByCategory(category: GalleryCategory): GalleryImage[] {
  return getGalleryBrowsePool().filter((image) => image.category === category);
}

/** One random photo per showcase category for the six-tile grid. */
export function getRandomShowcaseGridImages(): GalleryImage[] {
  return GALLERY_SHOWCASE_CATEGORY_ORDER.map((category) => {
    const pool = getGalleryImagesByCategory(category);
    return pickRandomGalleryImage(pool);
  }).filter((image): image is GalleryImage => Boolean(image));
}

/** Shuffled lightbox set for a filter — all non-static photos, or one category only. */
export function getShuffledLightboxImages(filter: GalleryFilterId): GalleryImage[] {
  const pool =
    filter === "all"
      ? getGalleryBrowsePool()
      : getGalleryBrowsePool().filter((image) => image.category === filter);

  return shuffleGalleryImages(pool);
}

export const CONVERSION_PRECEDENT = {
  src: "/images/239-e-king-ave-kingsland.jpg",
  alt: "239 East King Avenue — residential-to-commercial conversion precedent across the street",
  address: "239 East King Avenue, Kingsland, GA",
  yearBuilt: "1934",
  currentUse: "Professional attorney offices",
  headline: "Proven Conversion Precedent Across the Street",
  description:
    "Directly across from The Historic Gross House, this 1934 residence was successfully converted into professional attorney offices — demonstrating market acceptance, zoning viability, and the adaptive reuse potential of East King Avenue properties.",
};
