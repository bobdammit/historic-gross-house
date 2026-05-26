export type GalleryCategory =
  | "exterior"
  | "interior"
  | "detail"
  | "aerial"
  | "grounds";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  featured?: boolean;
};

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  exterior: "Exterior",
  interior: "Interiors",
  detail: "Architectural Details",
  aerial: "Aerial Views",
  grounds: "Grounds & Parking",
};

const interiorCaptions = [
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
  "Upper level room — executive office or private suite potential",
  "Multi-purpose room — training, conference, or open office layout",
];

function interiorCaption(index: number) {
  return interiorCaptions[(index - 1) % interiorCaptions.length];
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/gross-house-exterior.jpg",
    alt: "The Historic Gross House exterior on East King Avenue",
    caption: "Corner lot frontage — professional visibility on East King Avenue",
    category: "exterior",
    featured: true,
  },
  {
    src: "/images/exterior-01.jpg",
    alt: "Historic Gross House exterior view",
    caption: "Primary street elevation — strong first impression for client-facing use",
    category: "exterior",
    featured: true,
  },
  {
    src: "/images/exterior-02.jpg",
    alt: "Historic Gross House exterior angle",
    caption: "Secondary elevation — corner lot depth and on-site presence",
    category: "exterior",
  },
  {
    src: "/images/exterior-pano.jpg",
    alt: "Panoramic exterior view of the property",
    caption: "Panoramic street view — scale of the 0.55-acre corner site",
    category: "exterior",
    featured: true,
  },
  {
    src: "/images/front-porch.jpg",
    alt: "Front entry and porch of the Historic Gross House",
    caption: "Front entry — distinguished arrival experience for clients and patients",
    category: "exterior",
  },
  {
    src: "/images/drone-01.jpg",
    alt: "Aerial view of the Historic Gross House property",
    caption: "Aerial perspective — lot size, roof footprint, and parking layout",
    category: "aerial",
    featured: true,
  },
  {
    src: "/images/drone-02.jpg",
    alt: "Drone view of the corner lot and surroundings",
    caption: "Site context from above — corner positioning and surrounding development",
    category: "aerial",
  },
  {
    src: "/images/detached-garage.jpg",
    alt: "Detached garage on the property",
    caption: "Detached garage — additional storage or support space potential",
    category: "grounds",
  },
  {
    src: "/images/shed.jpg",
    alt: "Outbuilding on the property grounds",
    caption: "On-site outbuilding — utility, storage, or ancillary use",
    category: "grounds",
  },
  {
    src: "/images/stairwell.jpg",
    alt: "Historic interior stairwell",
    caption: "Original stairwell — vertical circulation with 1912 architectural character",
    category: "detail",
    featured: true,
  },
  {
    src: "/images/detail-01.jpg",
    alt: "Historic architectural woodwork detail",
    caption: "Original woodwork — character that modern office build-outs cannot replicate",
    category: "detail",
    featured: true,
  },
  {
    src: "/images/detail-02.jpg",
    alt: "Historic interior architectural detail",
    caption: "Architectural millwork — distinctive environment for professional services",
    category: "detail",
  },
  {
    src: "/images/detail-03.jpg",
    alt: "Historic trim and finish detail",
    caption: "Period finish details — premium feel for medical, legal, or professional offices",
    category: "detail",
  },
  {
    src: "/images/detail-04.jpg",
    alt: "Historic interior craftsmanship detail",
    caption: "Craftsmanship throughout — memorable client-facing interior presence",
    category: "detail",
  },
  ...Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const id = num.toString().padStart(2, "0");
    return {
      src: `/images/interior-${id}.jpg`,
      alt: `Interior room ${num} at the Historic Gross House`,
      caption: interiorCaption(num),
      category: "interior" as const,
      featured: num === 1,
    };
  }),
];

export const GALLERY_FILTERS = [
  { id: "all", label: "All Photos" },
  ...Object.entries(GALLERY_CATEGORY_LABELS).map(([id, label]) => ({
    id,
    label,
  })),
] as const;

export type GalleryFilterId = (typeof GALLERY_FILTERS)[number]["id"];

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
