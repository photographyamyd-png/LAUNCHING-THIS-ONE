/**
 * One-off: emit the same JSON-LD @graph as JsonLdExcavationHub (for validator paste).
 * Run: node scripts/emit-excavation-schema.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const site = JSON.parse(
  readFileSync(join(__dirname, "../src/content/site.json"), "utf8"),
);
const hub = JSON.parse(
  readFileSync(
    join(__dirname, "../src/content/pages/excavation-hub-seo.json"),
    "utf8",
  ),
);

const origin = site.url.replace(/\/$/, "");
const pageUrl = `${origin}/services/excavation-site-preparation/`;
const page = pageUrl.replace(/\/$/, "");

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.streetAddress,
  addressLocality: site.address.addressLocality,
  addressRegion: site.address.addressRegion,
  postalCode: site.address.postalCode,
  addressCountry: site.address.addressCountry,
};

const offers = hub.services.map((s, i) => ({
  "@type": "ListItem",
  position: i + 1,
  item: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      url: `${page}/#${s.id}`,
    },
  },
}));

const faqMainEntity = hub.faq.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: item.answer,
  },
}));

const data = {
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
        itemListElement: offers,
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

console.log(JSON.stringify(data, null, 2));
