import { getListingJsonLd } from "@/lib/listing-structured-data";

export function ListingJsonLd() {
  const data = getListingJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
