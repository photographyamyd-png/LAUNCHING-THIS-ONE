import registry from "@/content/services-registry.json";
import type { ServiceDetailContent, ServicesRegistry } from "@/content/types";

const data = registry as ServicesRegistry;

export function getAllServicePages(): ServiceDetailContent[] {
  return data.services;
}

export function getServiceBySlug(
  slug: string,
): ServiceDetailContent | undefined {
  return data.services.find((s) => s.slug === slug);
}
