import type { ProcessProps, ServiceDetailContent, ServiceHubStat } from "@/content/types";

/** Fallback hub bridge when `hubStats` omitted from registry (keeps pages rendering). */
export function resolveHubStats(service: ServiceDetailContent): ServiceHubStat[] {
  if (service.hubStats?.length) return service.hubStats;
  const bySlug: Record<string, ServiceHubStat[]> = {
    "excavation-site-preparation": [
      { value: "500+", label: "Projects", sub: "Commercial scale" },
      { value: "15+", label: "Years", sub: "Field leadership" },
      { value: "4", label: "Regions", sub: "Central Ontario" },
    ],
    "foundations-civil-infrastructure": [
      { value: "200+", label: "Foundations", sub: "Delivered" },
      { value: "100%", label: "Civil certified", sub: "QC documentation" },
      { value: "All", label: "Soil types", sub: "Engineered specs" },
    ],
    "site-preparation-grading": [
      { value: "GPS", label: "Survey tie-in", sub: "Machine control" },
      { value: "Spec", label: "Compaction", sub: "Geotech aligned" },
      { value: "Pad", label: "Building lines", sub: "Trade-ready" },
    ],
    "drainage-hardscaping": [
      { value: "Storm +", label: "Surface", sub: "Drainage" },
      { value: "Armor", label: "Stone", sub: "Hardscape prep" },
      { value: "Interlock", label: "Ready", sub: "Subgrade" },
    ],
    "hauling-site-clearing-logistics": [
      { value: "All", label: "Materials", sub: "Import / export" },
      { value: "Full", label: "Logistics", sub: "Site coordination" },
      { value: "Same-day", label: "Dispatch", sub: "When scheduled" },
    ],
    "snow-removal": [
      { value: "Seasonal", label: "Contracts", sub: "Commercial" },
      { value: "24hr", label: "Response", sub: "Storm windows" },
      { value: "Lots +", label: "Roads", sub: "Industrial" },
    ],
  };
  return (
    bySlug[service.slug] ?? [
      { value: "15+", label: "Years", sub: "Experience" },
      { value: "500+", label: "Projects", sub: "Delivered" },
      { value: "4", label: "Regions", sub: "Coverage" },
    ]
  );
}

export function resolveProcessSection(service: ServiceDetailContent): ProcessProps | null {
  if (service.processSection) return service.processSection;
  return {
    eyebrow: "Our process",
    heading: "Plan, execute, document — ",
    headingAccent: "every phase",
    steps: [
      { num: "01", title: "Scope alignment", desc: "Review drawings, access, utilities, and inspection milestones with your team." },
      { num: "02", title: "Mobilize", desc: "Equipment and crew scheduled to minimize downtime on your site." },
      { num: "03", title: "Deliver work", desc: "Excavation, placement, and compaction to engineer and municipal requirements." },
      { num: "04", title: "Handoff", desc: "Clean site, documented as-builts, and readiness for the next trade." },
    ],
  };
}
