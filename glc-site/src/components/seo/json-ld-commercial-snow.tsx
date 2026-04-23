import type { SiteConfig } from "@/content/types";
import { buildCommercialSnowGraphSchema } from "@/lib/schema";
import { canonicalUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

type Props = {
  site: SiteConfig;
  faqItems: Array<{ question: string; answer: string }>;
  offers: Array<{ name: string; url: string }>;
};

export function JsonLdCommercialSnow({ site, faqItems, offers }: Props) {
  const pageUrl = canonicalUrl(ROUTES.service("snow-removal"));
  const data = buildCommercialSnowGraphSchema(site, pageUrl, faqItems, offers);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
