import type { MetadataRoute } from "next";
import { PROPERTY_LISTING_DESCRIPTION } from "@/lib/property-listing";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PROPERTY_SITE_NAME,
    short_name: "Gross House",
    description: PROPERTY_LISTING_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#a8894f",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
