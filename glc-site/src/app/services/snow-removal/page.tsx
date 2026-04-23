import { CommercialSnowHero } from "@/components/services/commercial-snow-hero";
import { CommercialSnowPageMain } from "@/components/services/commercial-snow-page-main";
import { JsonLdCommercialSnow } from "@/components/seo/json-ld-commercial-snow";
import { commercialSnowFaqs } from "@/content/commercial-snow-faqs";
import {
  commercialSnowMeta,
  commercialSnowSchemaOfferEntries,
} from "@/content/commercial-snow-page-data";
import type { SiteConfig } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import site from "@/content/site.json";

const siteData = site as SiteConfig;

export const metadata: Metadata = pageMetadata({
  title: commercialSnowMeta.title,
  description: commercialSnowMeta.description,
  path: ROUTES.service("snow-removal"),
});

export default function SnowRemovalPage() {
  const schemaSite: SiteConfig = { ...siteData, url: getSiteUrl() };

  return (
    <>
      <JsonLdCommercialSnow
        site={schemaSite}
        faqItems={commercialSnowFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
        offers={commercialSnowSchemaOfferEntries()}
      />
      <main id="main-content">
        <CommercialSnowHero />
        <CommercialSnowPageMain />
      </main>
    </>
  );
}
