import { BROKERAGE, LISTING_AGENT } from "@/lib/broker-info";
import { PROPERTY_LISTING, PROPERTY_LISTING_DESCRIPTION } from "@/lib/property-listing";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";
import { getSiteUrl } from "@/lib/site-metadata";

export function getListingJsonLd() {
  const siteUrl = getSiteUrl();
  const imageBase = siteUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: PROPERTY_SITE_NAME,
        description: PROPERTY_LISTING_DESCRIPTION,
        inLanguage: "en-US",
        publisher: {
          "@id": `${siteUrl}/#brokerage`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${PROPERTY_SITE_NAME} | Commercial Conversion Opportunity`,
        description: PROPERTY_LISTING_DESCRIPTION,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#listing` },
        inLanguage: "en-US",
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#brokerage`,
        name: BROKERAGE.name,
        telephone: BROKERAGE.phoneTel,
        address: {
          "@type": "PostalAddress",
          streetAddress: BROKERAGE.addressLine1,
          addressLocality: "Saint Marys",
          addressRegion: "GA",
          postalCode: "31558",
          addressCountry: "US",
        },
      },
      {
        "@type": "RealEstateListing",
        "@id": `${siteUrl}/#listing`,
        name: PROPERTY_LISTING.siteName,
        description: PROPERTY_LISTING_DESCRIPTION,
        url: siteUrl,
        datePosted: PROPERTY_LISTING.datePosted,
        image: [
          `${imageBase}/images/og-share.jpg`,
          `${imageBase}/images/gross-house-exterior.jpg`,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: PROPERTY_LISTING.streetAddress,
          addressLocality: PROPERTY_LISTING.addressLocality,
          addressRegion: PROPERTY_LISTING.addressRegion,
          postalCode: PROPERTY_LISTING.postalCode,
          addressCountry: PROPERTY_LISTING.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: PROPERTY_LISTING.geo.latitude,
          longitude: PROPERTY_LISTING.geo.longitude,
        },
        yearBuilt: PROPERTY_LISTING.yearBuilt,
        floorSize: {
          "@type": "QuantitativeValue",
          value: PROPERTY_LISTING.buildingSizeSqFt,
          unitCode: "FTK",
          unitText: "square feet",
        },
        offers: {
          "@type": "Offer",
          price: PROPERTY_LISTING.price,
          priceCurrency: PROPERTY_LISTING.priceCurrency,
          availability: "https://schema.org/InStock",
          url: siteUrl,
          seller: {
            "@type": "RealEstateAgent",
            name: LISTING_AGENT.name,
            telephone: LISTING_AGENT.cellTel,
            email: LISTING_AGENT.email,
            identifier: `GA License ${LISTING_AGENT.gaLicenseNumber}`,
            worksFor: { "@id": `${siteUrl}/#brokerage` },
          },
        },
        broker: {
          "@type": "RealEstateAgent",
          name: LISTING_AGENT.name,
          telephone: LISTING_AGENT.cellTel,
          email: LISTING_AGENT.email,
          worksFor: { "@id": `${siteUrl}/#brokerage` },
        },
      },
    ],
  };
}
