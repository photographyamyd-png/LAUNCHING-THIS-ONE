import type { HomePageContent } from "@/content/types";
import home from "@/content/pages/home.json";
import navigation from "@/content/navigation.json";
import type { NavigationConfig } from "@/content/types";
import { SectionRenderer } from "@/components/sections/section-renderer";
import type { Metadata } from "next";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";
import { canonicalUrl, pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const homeContent = home as HomePageContent;
const navData = navigation as NavigationConfig;
const siteData = site as SiteConfig;

const homeSeo = pageMetadata({
  title: "Excavation & Site Preparation Barrie | Simcoe County | Orillia | Innisfil",
  description:
    "Professional excavation, grading, trenching & site prep across Barrie, Orillia, Wasaga Beach, Innisfil & Simcoe County. Residential, commercial & industrial. Free quotes.",
  path: ROUTES.home,
  ogTitle: "Expert Excavation & Site Prep — Serving All of Simcoe County",
  ogDescription:
    "From single-lot grading to full commercial site prep — we dig deep across Barrie, Orillia, Wasaga Beach & beyond. Call for a free estimate.",
});

export const metadata: Metadata = {
  ...homeSeo,
  openGraph: {
    ...homeSeo.openGraph,
    siteName: siteData.name,
    title: "Expert Excavation & Site Prep — Serving All of Simcoe County",
    url: canonicalUrl(ROUTES.home),
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <SectionRenderer
        sections={homeContent.sections}
        megaCards={navData.megaMenu.cards}
      />
    </main>
  );
}
