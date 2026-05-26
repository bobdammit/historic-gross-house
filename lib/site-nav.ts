export type SiteNavItem = {
  label: string;
  sectionId: string;
};

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: "Overview", sectionId: "highlights" },
  { label: "Gallery", sectionId: "gallery" },
  { label: "Location", sectionId: "location" },
  { label: "Tour", sectionId: "tour" },
  { label: "Documents", sectionId: "documents" },
  { label: "Inquire", sectionId: "contact" },
];
