import type { SiteConfig } from "@/content/types";
import registry from "@/content/services-registry.json";
import type { ServicesRegistry } from "@/content/types";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { ROUTES } from "@/lib/routes";

type Props = {
  site: SiteConfig;
};

const servicesData = registry as ServicesRegistry;

export function JsonLdLocalBusiness({ site }: Props) {
  const offers = servicesData.services.map((s) => ({
    name: s.schemaOfferName,
    url: `${site.url.replace(/\/$/, "")}${ROUTES.service(s.slug)}`,
  }));

  const data = buildLocalBusinessSchema(site, offers);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
