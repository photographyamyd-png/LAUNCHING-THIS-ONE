import { ExcavationFaqEditorial } from "@/components/services/excavation-faq-editorial";
import { ExcavationGeoHub } from "@/components/services/excavation-geo-hub";
import { ExcavationParallaxCta } from "@/components/services/excavation-parallax-cta";
import { ExcavationSeoResearch } from "@/components/services/excavation-seo-research";
import { ExcavationServiceCanon } from "@/components/services/excavation-service-canon";
import { ExcavationTrustStrip } from "@/components/services/excavation-trust-strip";
import { JsonLdExcavationHub } from "@/components/seo/json-ld-excavation-hub";
import { ParallaxTypeBand } from "@/components/sections/parallax-type-band";
import { SectionRenderer } from "@/components/sections/section-renderer";
import hub from "@/content/pages/excavation-hub-seo.json";
import home from "@/content/pages/home.json";
import navigation from "@/content/navigation.json";
import type {
  HomePageContent,
  HomeSectionBlock,
  NavigationConfig,
  SiteConfig,
} from "@/content/types";
import type { Metadata } from "next";
import site from "@/content/site.json";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import { getServiceBySlug } from "@/lib/service-pages";

const siteData = site as SiteConfig;
const service = getServiceBySlug("excavation-site-preparation")!;
const homeContent = structuredClone(home) as HomePageContent;
const navData = navigation as NavigationConfig;
const seo = hub.meta as { title: string; description: string };
const hubHero = hub.hero as {
  eyebrow: string;
  title: { line1: string; line2: string; line3: string; emphasizeLine: 1 | 2 | 3 };
  subheadline: string;
  lede: string;
  primaryCtaLabel: string;
  coverageTags: string[];
};

const hubParallax = hub as {
  parallaxBackgroundImage?: string;
  parallaxBand?: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    image: string;
    imageAlt: string;
  };
};

function getHomeSection<T extends HomeSectionBlock["type"]>(
  type: T,
): Extract<HomeSectionBlock, { type: T }> | null {
  const section = homeContent.sections.find((s) => s.type === type);
  return section && section.type === type ? (section as Extract<HomeSectionBlock, { type: T }>) : null;
}

const hero = getHomeSection("hero");
if (hero) {
  hero.props.eyebrow = hubHero.eyebrow;
  hero.props.title = hubHero.title;
  hero.props.subheadline = hubHero.subheadline;
  hero.props.lede = hubHero.lede;
  hero.props.primaryCta = {
    label: hubHero.primaryCtaLabel,
    href: `tel:${siteData.telephone.replace(/\s/g, "")}`,
  };
  hero.props.secondaryCta = { label: "All services", href: ROUTES.services };
  hero.props.coverage = {
    label: "Service coverage",
    tags: hubHero.coverageTags,
  };
  if (hubParallax.parallaxBackgroundImage) {
    hero.props.parallaxBackgroundImage = hubParallax.parallaxBackgroundImage;
  }
}

const marquee = getHomeSection("marquee");
if (marquee) {
  marquee.props.items = [
    "Excavation & site preparation",
    "Barrie · Orillia · Wasaga Beach · Innisfil",
    "Grading · Trenching · Pool digs · Hydrovac",
    "Simcoe County contractor",
    "Licensed & insured crews",
    "Free estimates",
    "Commercial & residential",
    "From concept to creation",
  ];
}

const about = getHomeSection("about");
if (about) {
  about.props.eyebrow = "Service overview";
  about.props.headingBefore = "Precision ";
  about.props.headingAccent = "earthworks";
  about.props.headingAfter = " for every build phase";
  about.props.body =
    (service.hero.body && service.hero.body[0]) ||
    hubHero.lede;
  about.props.credentials = service.deliverables.slice(0, 4).map((item) => ({
    title: item.split(" ").slice(0, 2).join(" "),
    sub: item,
  }));
  about.props.cta = {
    label: hubHero.primaryCtaLabel,
    href: `tel:${siteData.telephone.replace(/\s/g, "")}`,
  };
}

const stats = getHomeSection("stats");
if (stats) {
  const third = stats.props.cells[2];
  if (third) {
    third.sub = "Barrie, Orillia, Wasaga Beach, Innisfil & Simcoe County";
  }
}

const sectionOrder = ["hero", "marquee", "about", "stats"] as const;
const orderedSections = sectionOrder
  .map((type) => homeContent.sections.find((section) => section.type === type))
  .filter(Boolean) as HomePageContent["sections"];

const schemaSite: SiteConfig = { ...siteData, url: getSiteUrl() };

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: ROUTES.service("excavation-site-preparation"),
});

export default function ExcavationSitePreparationPage() {
  const band = hubParallax.parallaxBand;

  return (
    <>
      <JsonLdExcavationHub site={schemaSite} />
      <main id="main-content">
        <SectionRenderer sections={orderedSections} megaCards={navData.megaMenu.cards} />
        {band ? (
          <ParallaxTypeBand
            id="excavation-type-band"
            tone="dark"
            eyebrow={band.eyebrow}
            title={band.title}
            subtitle={band.subtitle}
            imageSrc={band.image}
            imageAlt={band.imageAlt}
          />
        ) : null}
        <ExcavationServiceCanon />
        <ExcavationSeoResearch />
        <ExcavationTrustStrip />
        <ExcavationParallaxCta
          phoneDisplay={siteData.telephoneDisplay}
          phoneHref={`tel:${siteData.telephone.replace(/\s/g, "")}`}
        />
        <ExcavationGeoHub />
        <ExcavationFaqEditorial />
      </main>
    </>
  );
}
