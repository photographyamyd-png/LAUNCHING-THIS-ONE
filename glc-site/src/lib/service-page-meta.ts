import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { getServiceBySlug } from "@/lib/service-pages";
import type { Metadata } from "next";

export function servicePageMetadata(slug: string): Metadata {
  const s = getServiceBySlug(slug);
  if (!s) {
    return { title: "Not found" };
  }
  return pageMetadata({
    title: s.meta.title,
    description: s.meta.description,
    path: s.meta.canonicalPath ?? ROUTES.service(slug),
    ogTitle: s.meta.ogTitle,
    ogDescription: s.meta.ogDescription,
  });
}
