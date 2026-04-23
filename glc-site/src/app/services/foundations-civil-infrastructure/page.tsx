import { ServicePageView } from "@/components/services/service-page-view";
import { servicePageMetadata } from "@/lib/service-page-meta";
import { getServiceBySlug } from "@/lib/service-pages";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

export const metadata = servicePageMetadata("foundations-civil-infrastructure");

export default function FoundationsCivilInfrastructurePage() {
  const s = getServiceBySlug("foundations-civil-infrastructure")!;
  return <ServicePageView service={s} site={site as SiteConfig} />;
}
