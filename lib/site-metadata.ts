import type { Metadata } from "next";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

const DEFAULT_SITE_URL = "https://historic-gross-house.vercel.app";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE_URL;
}

const siteTitle = `${PROPERTY_SITE_NAME} | Commercial Conversion Opportunity`;
const siteDescription =
  "1912 landmark estate in downtown Kingsland, GA with strong potential for professional or medical office conversion. ±3,955 SF · $574,900.";

const ogImagePath = "/images/open-graph.jpg";
const ogImageAlt = `${PROPERTY_SITE_NAME} — Commercial Conversion Opportunity`;

export const siteMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "commercial real estate",
    "Kingsland Georgia",
    "historic property",
    "adaptive reuse",
    "professional office",
    "medical office",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: PROPERTY_SITE_NAME,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImagePath],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};
