import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/site-url";

/** Canonical URL for a path (leading slash; respects trailing-slash site config). */
export function canonicalUrl(path: string): string {
  const origin = getSiteOrigin();
  if (!path || path === "/") {
    return `${origin}/`;
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.includes("#")) {
    return `${origin}${p}`;
  }
  return p.endsWith("/") ? `${origin}${p}` : `${origin}${p}/`;
}

export type PageSeoInput = {
  title: string;
  description: string;
  /** Path starting with / (e.g. /about/ or /services/excavation-site-preparation/). */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageSeoInput): Metadata {
  const canonical = canonicalUrl(path);
  const ogT = ogTitle ?? title;
  const ogD = ogDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogT,
      description: ogD,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: ogT,
      description: ogD,
    },
  };
}
