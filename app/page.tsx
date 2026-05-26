import { HomePage } from "@/components/home-page";
import { PROPERTY_LISTING, PROPERTY_LISTING_DESCRIPTION } from "@/lib/property-listing";
import { PROPERTY_SITE_NAME } from "@/lib/property-content";

export default function Page() {
  return (
    <>
      <section className="sr-only">
        <h1>{PROPERTY_SITE_NAME}</h1>
        <p>{PROPERTY_LISTING_DESCRIPTION}</p>
        <p>
          {PROPERTY_LISTING.fullAddress} · ${PROPERTY_LISTING.price.toLocaleString("en-US")} ·
          Approximately {PROPERTY_LISTING.buildingSizeSqFt.toLocaleString("en-US")} square feet ·
          {PROPERTY_LISTING.lotSizeAcres}-acre lot · Built {PROPERTY_LISTING.yearBuilt}
        </p>
      </section>
      <HomePage />
    </>
  );
}
