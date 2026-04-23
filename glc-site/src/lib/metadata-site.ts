import type { Metadata } from "next";
import type { SiteConfig } from "@/content/types";
import { getSiteOrigin } from "@/lib/site-url";
import { canonicalUrl } from "@/lib/seo";

export function defaultMetadata(site: SiteConfig): Metadata {
  const origin = getSiteOrigin();
  const homeCanonical = canonicalUrl("/");
  return {
    metadataBase: new URL(`${origin}/`),
    title: {
      default: `${site.name} | Commercial Excavation — Barrie, Midland, Orillia & Simcoe County`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      locale: site.locale.replace("-", "_"),
      url: homeCanonical,
      siteName: site.name,
      title: site.name,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
    },
    alternates: {
      canonical: homeCanonical,
    },
  };
}
