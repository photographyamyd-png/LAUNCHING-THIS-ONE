import { ServicePageView } from "@/components/services/service-page-view";
import { servicePageMetadata } from "@/lib/service-page-meta";
import { getServiceBySlug } from "@/lib/service-pages";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

export const metadata = servicePageMetadata("drainage-hardscaping");

export default function DrainageHardscapingPage() {
  const s = getServiceBySlug("drainage-hardscaping")!;
  return <ServicePageView service={s} site={site as SiteConfig} />;
}
