import { commercialSnowServices } from "@/content/commercial-snow-page-data";
import { ROUTES } from "@/lib/routes";

const HUB = ROUTES.service("snow-removal");

export type SnowSubServicePageDef = {
  slug: string;
  hubFragment: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
};

function slugFromServiceHref(href: string): string {
  const m = href.match(/^\/services\/([^/]+)\/?$/);
  return m ? m[1] : href.replace(/^\//, "").replace(/\/$/, "");
}

/** Commercial snow line pages linked from the hub (strategy doc URLs). */
export function getAllSnowSubServiceDefs(): SnowSubServicePageDef[] {
  return commercialSnowServices.map((svc) => {
    const slug = slugFromServiceHref(svc.moreHref);
    const metaTitle = `${svc.heading} | Ground Level Contracting`;
    const metaDescription =
      `${svc.heading} for businesses in Barrie, Orillia, Innisfil, Wasaga Beach & Simcoe County. Commercial-only snow removal, ice management & SLAs. Call 705-619-4902.`.slice(
        0,
        160,
      );
    return {
      slug,
      hubFragment: svc.fragment,
      heading: svc.heading,
      metaTitle,
      metaDescription,
    };
  });
}

export function getSnowSubServiceDef(slug: string): SnowSubServicePageDef | undefined {
  return getAllSnowSubServiceDefs().find((d) => d.slug === slug);
}

export type SnowLocationPageDef = {
  slug: string;
  label: string;
  placeName: string;
  metaTitle: string;
  metaDescription: string;
};

const LOCATION_DEFS: SnowLocationPageDef[] = [
  {
    slug: "commercial-snow-removal-barrie-ontario",
    label: "commercial snow removal in Barrie",
    placeName: "Barrie",
    metaTitle: "Commercial Snow Removal Barrie Ontario | Ground Level Contracting",
    metaDescription:
      "24/7 commercial snow removal & ice management for Barrie, Ontario businesses. Parking lots, industrial yards, SLAs. Licensed & insured. 705-619-4902.",
  },
  {
    slug: "commercial-snow-removal-orillia-ontario",
    label: "serving Orillia businesses",
    placeName: "Orillia",
    metaTitle: "Commercial Snow Removal Orillia Ontario | Ground Level Contracting",
    metaDescription:
      "Commercial snow removal & ice control for Orillia businesses and institutions. Simcoe County contractor. GPS-tracked fleets & contracts. 705-619-4902.",
  },
  {
    slug: "commercial-snow-removal-innisfil-ontario",
    label: "Innisfil commercial properties",
    placeName: "Innisfil",
    metaTitle: "Commercial Snow Removal Innisfil Ontario | Ground Level Contracting",
    metaDescription:
      "Commercial snow plowing & ice management for Innisfil properties. Seasonal contracts, emergency response, Simcoe County coverage. 705-619-4902.",
  },
  {
    slug: "commercial-snow-removal-wasaga-beach-ontario",
    label: "Wasaga Beach business snow services",
    placeName: "Wasaga Beach",
    metaTitle: "Commercial Snow Removal Wasaga Beach Ontario | Ground Level Contracting",
    metaDescription:
      "Business snow removal & de-icing for Wasaga Beach, Ontario. Commercial lots, retail & institutional sites across Simcoe County. 705-619-4902.",
  },
  {
    slug: "commercial-snow-removal-simcoe-county",
    label: "throughout Simcoe County",
    placeName: "Simcoe County",
    metaTitle: "Commercial Snow Removal Simcoe County | Ground Level Contracting",
    metaDescription:
      "County-wide commercial snow removal: Barrie, Orillia, Innisfil, Wasaga Beach & Simcoe County. Industrial, retail & portfolio programs. 705-619-4902.",
  },
];

export function getAllSnowLocationDefs(): SnowLocationPageDef[] {
  return LOCATION_DEFS;
}

export function getSnowLocationDef(slug: string): SnowLocationPageDef | undefined {
  return LOCATION_DEFS.find((d) => d.slug === slug);
}

export function hubUrlWithFragment(fragment: string): string {
  return `${HUB}#${fragment}`;
}

export function snowHubUrl(): string {
  return HUB;
}
