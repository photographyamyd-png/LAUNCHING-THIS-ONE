import type { SiteConfig } from "@/content/types";

export type ServiceOfferEntry = {
  name: string;
  url: string;
};

/** LocalBusiness JSON-LD with OfferCatalog (hasOfferCatalog) for service names. */
export function buildLocalBusinessSchema(
  site: SiteConfig,
  offers: ServiceOfferEntry[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.telephone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    },
    areaServed: site.areaServed,
    slogan: site.slogan,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.name} — Excavation & Site Preparation`,
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: o.name,
          url: o.url,
        },
      })),
    },
  };
}

export function buildServiceSchema(input: {
  name: string;
  url: string;
  description: string;
  providerName: string;
  providerUrl: string;
  areaServed: string[];
  hasOfferCatalogName?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "LocalBusiness",
      name: input.providerName,
      url: input.providerUrl,
    },
    areaServed: input.areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: input.hasOfferCatalogName ?? input.name,
    },
  };
}

export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ExcavationOfferForSchema = { name: string; idFragment: string };

/**
 * Page-scoped @graph: GeneralContractor (excavation OfferCatalog) + FAQPage + WebPage.
 * Aligns with site.json NAP; offer URLs use page URL + hash fragments for hub anchors.
 */
export function buildExcavationHubGraphSchema(
  site: SiteConfig,
  pageUrl: string,
  faqItems: Array<{ question: string; answer: string }>,
  offers: ExcavationOfferForSchema[],
): Record<string, unknown> {
  const origin = site.url.replace(/\/$/, "");
  const page = pageUrl.replace(/\/$/, "");
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.streetAddress,
    addressLocality: site.address.addressLocality,
    addressRegion: site.address.addressRegion,
    postalCode: site.address.postalCode,
    addressCountry: site.address.addressCountry,
  };

  const faqMainEntity = faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": `${page}#excavationOfferCatalog`,
        name: site.name,
        description:
          "Excavation & site preparation contractor serving Barrie, Orillia, Wasaga Beach, Innisfil & Simcoe County.",
        url: `${origin}/`,
        telephone: site.telephone,
        address,
        areaServed: [
          "Barrie",
          "Orillia",
          "Wasaga Beach",
          "Innisfil",
          "Simcoe County",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Excavation & Site Preparation Services",
          itemListElement: offers.map((o, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.name,
                url: `${page}/#${o.idFragment}`,
              },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${page}#faq`,
        url: `${page}/`,
        mainEntity: faqMainEntity,
      },
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: `${page}/`,
        name: "Excavation & Site Preparation",
        isPartOf: { "@type": "WebSite", url: `${origin}/` },
        about: { "@id": `${page}#excavationOfferCatalog` },
      },
    ],
  };
}

export type CommercialSnowOfferForSchema = { name: string; url: string };

/**
 * Commercial snow removal hub: GeneralContractor + OfferCatalog (8 sub-services) + FAQPage + WebPage.
 * NAP aligns with site.json; offer URLs are page-local fragments or absolute paths as provided.
 */
export function buildCommercialSnowGraphSchema(
  site: SiteConfig,
  pageUrl: string,
  faqItems: Array<{ question: string; answer: string }>,
  offers: CommercialSnowOfferForSchema[],
): Record<string, unknown> {
  const origin = site.url.replace(/\/$/, "");
  const page = pageUrl.replace(/\/$/, "");
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.streetAddress,
    addressLocality: site.address.addressLocality,
    addressRegion: site.address.addressRegion,
    postalCode: site.address.postalCode,
    addressCountry: site.address.addressCountry,
  };

  const faqMainEntity = faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": `${page}#commercialSnowOfferCatalog`,
        name: site.name,
        description:
          "24/7 commercial snow removal and ice management for businesses in Barrie, Orillia, Simcoe County, Innisfil, and Wasaga Beach.",
        url: `${origin}/`,
        telephone: site.telephone,
        address,
        areaServed: [
          "Barrie",
          "Orillia",
          "Simcoe County",
          "Innisfil",
          "Wasaga Beach",
          "Midland",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Commercial Snow Removal & Ice Management",
          itemListElement: offers.map((o, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.name,
                url: o.url.startsWith("http")
                  ? o.url
                  : `${origin}${o.url.startsWith("/") ? o.url : `/${o.url}`}`,
              },
            },
          })),
        },
      },
      {
        "@type": "Service",
        "@id": `${page}#commercialSnowService`,
        name: "Commercial Snow Removal & Ice Management",
        description:
          "Commercial-only snow plowing, ice management, emergency response, and snow hauling for industrial, retail, office, and institutional properties across Simcoe County.",
        url: `${page}/`,
        provider: { "@id": `${page}#commercialSnowOfferCatalog` },
        areaServed: [
          "Barrie",
          "Orillia",
          "Simcoe County",
          "Innisfil",
          "Wasaga Beach",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${page}#faq`,
        url: `${page}/`,
        mainEntity: faqMainEntity,
      },
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: `${page}/`,
        name: "Commercial Snow Removal — Barrie & Simcoe County",
        isPartOf: { "@type": "WebSite", url: `${origin}/` },
        about: { "@id": `${page}#commercialSnowService` },
      },
    ],
  };
}
