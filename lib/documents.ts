export const COMMERCIAL_FLYER = {
  url: "/documents/290-e-king-ave-kingsland-commercial-flyer.pdf",
  title: "Commercial Property Flyer",
  description: "One-page overview of the conversion opportunity at 290 East King Avenue.",
};

export type GatedDocumentGroup = "report" | "layout" | "map";

export type GatedDocument = {
  slug: string;
  title: string;
  description: string;
  filename: string;
  available: boolean;
  category: "primary" | "supporting";
  group?: GatedDocumentGroup;
  meta?: string;
};

export const GATED_DOCUMENTS: GatedDocument[] = [
  {
    slug: "offering-memorandum",
    title: "Offering Memorandum",
    description:
      "Comprehensive investment package including property overview, market analysis, financial projections, comparable sales data, and adaptive reuse considerations.",
    filename: "gross-house-offering-memorandum.pdf",
    available: true,
    category: "primary",
    meta: "PDF · Full package",
  },
  {
    slug: "market-profile",
    title: "Market Profile",
    description: "Demographic and market overview for the Kingsland trade area surrounding 290 East King Avenue.",
    filename: "Market_Profile_290_E_King_Ave_Kingsland_Georgia_31548_2.pdf",
    available: true,
    category: "supporting",
    group: "report",
    meta: "PDF · Market analysis",
  },
  {
    slug: "economic-development-profile",
    title: "Economic Development Profile",
    description: "Local economic indicators, employment trends, and development context for Kingsland, Georgia.",
    filename: "Economic_Development_Profile_2_290_E_King_Ave_Kingsland_Georgia_31548_2.pdf",
    available: true,
    category: "supporting",
    group: "report",
    meta: "PDF · Economic overview",
  },
  {
    slug: "floor-plan",
    title: "Floor Plan",
    description: "Existing layout documentation for the residence with room dimensions and conversion context.",
    filename: "290_E_King_Ave_Kingsland_GA_Floorplan.pdf",
    available: true,
    category: "supporting",
    group: "layout",
    meta: "PDF · Property layout",
  },
  {
    slug: "total-population-map",
    title: "Total Population Map",
    description: "Trade area map showing total population density around the property.",
    filename: "290_E_King_Ave_Total_Population_Map.pdf",
    available: true,
    category: "supporting",
    group: "map",
    meta: "PDF · Demographic map",
  },
  {
    slug: "daytime-population-map",
    title: "Daytime Population Map",
    description: "Trade area map showing daytime population concentration for commercial demand analysis.",
    filename: "290_E_King_Ave_Daytime_Population_Map.pdf",
    available: true,
    category: "supporting",
    group: "map",
    meta: "PDF · Demographic map",
  },
  {
    slug: "median-income-map",
    title: "Median Income Map",
    description: "Trade area map illustrating median household income patterns near the subject property.",
    filename: "290_E_King_Ave_Median_Income_Map.pdf",
    available: true,
    category: "supporting",
    group: "map",
    meta: "PDF · Demographic map",
  },
];

export const MATERIALS_ACCESS_COOKIE = "materials_access";

export function getGatedDocumentUrl(slug: string) {
  return `/api/documents/${slug}`;
}
