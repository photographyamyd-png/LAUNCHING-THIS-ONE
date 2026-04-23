import { ServicePageView } from "@/components/services/service-page-view";
import { servicePageMetadata } from "@/lib/service-page-meta";
import { getServiceBySlug } from "@/lib/service-pages";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

export const metadata = servicePageMetadata("site-preparation-grading");

export default function SitePreparationGradingPage() {
  const s = getServiceBySlug("site-preparation-grading")!;
  return <ServicePageView service={s} site={site as SiteConfig} />;
}
