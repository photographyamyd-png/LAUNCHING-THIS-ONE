import type { MetadataRoute } from "next";
import registry from "@/content/services-registry.json";
import type { ServicesRegistry } from "@/content/types";
import { getAllSnowLocationDefs, getAllSnowSubServiceDefs } from "@/lib/commercial-snow-routes";
import { ROUTES } from "@/lib/routes";
import { canonicalUrl } from "@/lib/seo";

const data = registry as ServicesRegistry;

export default function sitemap(): MetadataRoute.Sitemap {
  const last = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl(ROUTES.home), lastModified: last, changeFrequency: "weekly", priority: 1 },
    {
      url: canonicalUrl(ROUTES.about),
      lastModified: last,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: canonicalUrl(ROUTES.contact),
      lastModified: last,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: canonicalUrl(ROUTES.services),
      lastModified: last,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: canonicalUrl(ROUTES.privacy),
      lastModified: last,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl(ROUTES.terms),
      lastModified: last,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...data.services.map((s) => ({
      url: canonicalUrl(ROUTES.service(s.slug)),
      lastModified: last,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllSnowSubServiceDefs().map((d) => ({
      url: canonicalUrl(ROUTES.service(d.slug)),
      lastModified: last,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...getAllSnowLocationDefs().map((d) => ({
      url: canonicalUrl(ROUTES.snowLocation(d.slug)),
      lastModified: last,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
