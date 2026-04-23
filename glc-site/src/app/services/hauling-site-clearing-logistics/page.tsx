import { ServicePageView } from "@/components/services/service-page-view";
import { servicePageMetadata } from "@/lib/service-page-meta";
import { getServiceBySlug } from "@/lib/service-pages";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

export const metadata = servicePageMetadata("hauling-site-clearing-logistics");

export default function HaulingSiteClearingLogisticsPage() {
  const s = getServiceBySlug("hauling-site-clearing-logistics")!;
  return <ServicePageView service={s} site={site as SiteConfig} />;
}
