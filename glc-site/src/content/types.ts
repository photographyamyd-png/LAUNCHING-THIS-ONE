/** Discriminated union for homepage orderable sections + CMS-ready extension. */

export type AccordionContentItem = {
  id: number;
  title: string;
  imageUrl: string;
};

export type HeroProps = {
  eyebrow: string;
  title: {
    line1: string;
    line2: string;
    line3: string;
    /** Which line is wrapped in <em> (1-based). */
    emphasizeLine: 1 | 2 | 3;
  };
  /** Optional H2 subheadline (e.g. excavation hub SEO hero). */
  subheadline?: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: Array<{ value: string; label: string }>;
  coverage: { label: string; tags: string[] };
  serviceBarSlugTitles: Array<{ slug: string; title: string }>;
  /**
   * Full-bleed photo on the deep background plane (scroll parallax + slow drift).
   * When omitted, hero-v2 uses the default engineered texture fill.
   */
  parallaxBackgroundImage?: string;
};

export type MarqueeProps = {
  items: string[];
};

/**
 * Featured accordion layout archetypes — mirrors `featured-accordion-pattern-registry.json` slugs.
 * Wire through `home.json` → `accordion.props.layoutVariant` when a non-default layout is implemented.
 */
export type FeaturedAccordionLayoutVariant =
  | "split-copy-left-strip-right"
  | "split-strip-left-copy-right"
  | "stack-strip-top-copy-bottom"
  | "tab-stage-copy-above"
  | "split-copy-left-vertical-expanders"
  | "river-zigzag-rows"
  | "stage-hero-filmstrip"
  | "grid-bento-asymmetric"
  | "step-connector-rail"
  | "morph-circle-row"
  | "panel-diagonal-split"
  | "rail-index-numbers"
  | "bleed-band-float-card"
  | "editorial-magazine-stack"
  | "grid-equal-five"
  | "split-photo-chips"
  | "grid-l-tetris"
  | "hub-cross-corners"
  | "flow-masonry"
  | "masthead-vertical-strip";

export type AccordionSectionProps = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  cta: { label: string; href: string };
  items: AccordionContentItem[];
  /** When omitted, production uses split-copy-left-strip-right (current FeaturedAccordion markup). */
  layoutVariant?: FeaturedAccordionLayoutVariant;
};

export type AboutProps = {
  eyebrow: string;
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  body: string;
  credentials: Array<{ title: string; sub: string }>;
  cta: { label: string; href: string };
  mediaStat: { value: string; label: string };
  badgeText: string;
};

export type ServicesSectionProps = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
};

export type StatCellProps = {
  target: number;
  /** Appended after the animated number (e.g. "+", " Regions", "%"). */
  afterNumber: string;
  /** Mirrors display suffix for counters (e.g. "+", " Regions", "%"). */
  format?: string;
  label: string;
  sub: string;
};

export type StatsProps = {
  cells: StatCellProps[];
};

export type WhyProps = {
  eyebrow: string;
  headingBefore: string;
  headingEmphasis: string;
  headingAfter: string;
  body: string;
  reasons: Array<{ num: string; title: string; text: string }>;
  cta: { label: string; href: string };
  floatChip: { line1: string; line2: string };
};

export type ProcessProps = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  steps: Array<{ num: string; title: string; desc: string }>;
};

export type CoverageProps = {
  eyebrow: string;
  headingBefore: string;
  headingEmphasis: string;
  headingAfter: string;
  body: string;
  areas: Array<{ name: string; sub: string }>;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type TestimonialsProps = {
  eyebrow: string;
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  sub: string;
  items: Testimonial[];
};

export type CtaBandProps = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingEmphasis: string;
  sub: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  emailCta: { label: string; href: string };
};

export type HomeSectionBlock =
  | { type: "hero"; props: HeroProps }
  | { type: "marquee"; props: MarqueeProps }
  | { type: "accordion"; props: AccordionSectionProps }
  | { type: "about"; props: AboutProps }
  | { type: "services"; props: ServicesSectionProps }
  | { type: "stats"; props: StatsProps }
  | { type: "why"; props: WhyProps }
  | { type: "process"; props: ProcessProps }
  | { type: "coverage"; props: CoverageProps }
  | { type: "testimonials"; props: TestimonialsProps }
  | { type: "ctaBand"; props: CtaBandProps };

export type HomePageContent = {
  sections: HomeSectionBlock[];
};

export type SiteConfig = {
  name: string;
  legalName: string;
  url: string;
  telephone: string;
  telephoneDisplay: string;
  email: string;
  slogan: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  areaServed: string[];
  locale: string;
  copyrightYear: number;
  og?: {
    image?: string;
  };
};

export type NavLink = {
  label: string;
  href: string;
};

export type MegaMenuCard = {
  slug: string;
  num: string;
  title: string;
  description: string;
  /** Lines for the homepage services grid `h3` (line breaks between). */
  gridTitle: string[];
  /** Long description under the service grid card title. */
  gridDescription: string;
};

export type CompanyMegaColumn = {
  title: string;
  links: NavLink[];
};

export type CompanyMegaConfig = {
  kicker: string;
  intro: string;
  columns: CompanyMegaColumn[];
  dispatchBand: {
    kicker: string;
    title: string;
    sub: string;
    phoneDisplay: string;
    phoneHref: string;
  };
};

export type NavigationConfig = {
  utility: {
    locationLine: string;
    phoneDisplay: string;
    phoneHref: string;
  };
  utilityRotator: string[];
  primary: NavLink[];
  megaMenu: {
    kicker: string;
    intro: string;
    viewAllHref: string;
    viewAllLabel: string;
    cards: MegaMenuCard[];
  };
  companyMega: CompanyMegaConfig;
  mobile: {
    links: NavLink[];
  };
  footer: {
    tagline: string;
    columns: Array<{ title: string; links: NavLink[] }>;
    legal: Array<{ label: string; href: string }>;
  };
};

export type ServiceScopeStripLink = {
  label: string;
  /** In-page anchor, e.g. #what-we-deliver */
  href: string;
};

/** Hub bridge chips (B9) — aligns with `.cursorrules` service stat lines. */
export type ServiceHubStat = {
  value: string;
  label: string;
  sub?: string;
};

export type ServiceDetailContent = {
  slug: string;
  /** hasOfferCatalog / Service schema name */
  schemaOfferName: string;
  meta: {
    title: string;
    description: string;
    canonicalPath?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageAlt?: string;
  };
  /** Full-bleed hero photograph (optional). */
  heroImage?: string;
  /** Overview hub stat bridge (optional; defaults per slug in UI if omitted). */
  hubStats?: ServiceHubStat[];
  /** Four-step process rail (`#process`). */
  processSection?: ProcessProps;
  hero: {
    breadcrumbParent: string;
    titleBefore: string;
    titleEmphasis: string;
    lede: string;
    taglineLines?: string[];
    body?: string[];
  };
  scopeStrip: ServiceScopeStripLink[];
  intro: string[];
  deliverablesHeading: string;
  deliverables: string[];
  closingHeading: string;
  trustBlock?: {
    id: string;
    heading: string;
    paragraphs: string[];
  };
  subServiceSections?: Array<{
    id: string;
    heading: string;
    paragraphs: string[];
    closing?: string;
    image?: string;
    /** Resolved layout id for `ServiceLayoutVariantSection` (see `section-engine.js`). */
    layout?: string;
    layoutVariant?: "default" | "reverse" | "offset" | string;
    intent?: "intro" | "education" | "visual" | "proof" | "conversion";
    density?: "normal" | "dense" | "light";
  }>;
  faq?: Array<{ question: string; answer: string }>;
  ctaOverride?: {
    heading: string;
    buttonLabel: string;
    supportingCopy: string;
    trustSignals?: string[];
  };
  /**
   * Full-bleed parallax “type” band — breaks long service-page rhythm (foundations hub).
   */
  parallaxBand?: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    image: string;
    imageAlt: string;
  };
};

export type ServicesRegistry = {
  services: ServiceDetailContent[];
};
