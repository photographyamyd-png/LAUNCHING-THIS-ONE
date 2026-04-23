import { buildServiceSchema } from "@/lib/schema";
import type { SiteConfig } from "@/content/types";

type Props = {
  site: SiteConfig;
  serviceName: string;
  serviceUrl: string;
  description: string;
};

export function JsonLdService({
  site,
  serviceName,
  serviceUrl,
  description,
}: Props) {
  const data = buildServiceSchema({
    name: serviceName,
    url: serviceUrl,
    description,
    providerName: site.name,
    providerUrl: site.url,
    areaServed: site.areaServed,
    hasOfferCatalogName: serviceName,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
