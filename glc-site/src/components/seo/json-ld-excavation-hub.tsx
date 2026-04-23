import hub from "@/content/pages/excavation-hub-seo.json";
import type { SiteConfig } from "@/content/types";
import { buildExcavationHubGraphSchema } from "@/lib/schema";
import { canonicalUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const services = hub.services as Array<{ id: string; title: string }>;
const faq = hub.faq as Array<{ question: string; answer: string }>;

type Props = {
  site: SiteConfig;
};

export function JsonLdExcavationHub({ site: siteProp }: Props) {
  const pageUrl = canonicalUrl(ROUTES.service("excavation-site-preparation"));
  const data = buildExcavationHubGraphSchema(
    siteProp,
    pageUrl,
    faq,
    services.map((s) => ({ name: s.title, idFragment: s.id })),
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
