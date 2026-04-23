const SECTION_COMPOSITIONS = {
  HEAVY_CONTENT: [
    { type: "HERO_SPLIT", intent: "intro" },
    { type: "STICKY_TABS", intent: "education" },
    { type: "ASYMMETRIC_FEATURE_SPLIT", intent: "visual" },
    { type: "PROCESS_TIMELINE", intent: "education" },
    { type: "PROOF_STRIP", intent: "proof" },
    { type: "CTA_BAND", intent: "conversion" },
  ],
  VISUAL_FIRST: [
    { type: "HERO_SPLIT", intent: "intro" },
    { type: "ASYMMETRIC_FEATURE_SPLIT", intent: "visual" },
    { type: "PROOF_STRIP", intent: "proof" },
    { type: "PROCESS_TIMELINE", intent: "education" },
    { type: "CTA_BAND", intent: "conversion" },
  ],
  TRUST_FIRST: [
    { type: "HERO_SPLIT", intent: "intro" },
    { type: "PROOF_STRIP", intent: "proof" },
    { type: "ASYMMETRIC_FEATURE_SPLIT", intent: "visual" },
    { type: "STICKY_TABS", intent: "education" },
    { type: "CTA_BAND", intent: "conversion" },
  ],
};

const LAYOUT_VARIANTS = [
  "split-default",
  "split-reverse",
  "split-asym-left",
  "split-asym-right",
  "split-offset",
  "stacked-tight",
  "stacked-feature",
  "stacked-card-grid",
  "stacked-highlight",
  "stacked-layered",
  "contrast-band",
  "contrast-split",
  "contrast-inset",
  "contrast-left-bar",
  "contrast-overlay",
  "grid-2-col",
  "grid-3-col",
  "grid-masonry",
  "grid-feature-first",
  "grid-inline-icons",
  "timeline-flow",
  "sticky-split",
  "media-bleed",
  "hero-layered",
  "cta-emphasis",
];

const SERVICE_VARIANT_MAP = {
  "excavation-site-prep": "HEAVY_CONTENT",
  "excavation-site-preparation": "HEAVY_CONTENT",
  "foundations-civil": "TRUST_FIRST",
  "foundations-civil-infrastructure": "TRUST_FIRST",
  "septic-utilities": "HEAVY_CONTENT",
  "site-preparation-grading": "HEAVY_CONTENT",
  "drainage-hardscaping": "HEAVY_CONTENT",
  "hauling-clearing": "TRUST_FIRST",
  "hauling-site-clearing-logistics": "TRUST_FIRST",
  "snow-removal": "VISUAL_FIRST",
};

const SERVICE_LAYOUT_TRACKS = {
  "excavation-site-preparation": [
    "split-default",
    "split-reverse",
    "split-asym-left",
    "split-asym-right",
    "split-offset",
    "stacked-feature",
    "stacked-card-grid",
    "contrast-inset",
    "grid-2-col",
    "timeline-flow",
    "sticky-split",
    "media-bleed",
  ],
  "foundations-civil-infrastructure": [
    "split-default",
    "split-reverse",
    "stacked-feature",
    "contrast-left-bar",
    "grid-2-col",
    "timeline-flow",
  ],
  "site-preparation-grading": [
    "split-default",
    "split-reverse",
    "stacked-card-grid",
    "contrast-inset",
    "grid-inline-icons",
    "split-asym-left",
    "timeline-flow",
  ],
  "drainage-hardscaping": [
    "split-default",
    "split-reverse",
    "split-offset",
    "contrast-band",
    "grid-3-col",
    "media-bleed",
  ],
  "hauling-site-clearing-logistics": [
    "split-default",
    "split-reverse",
    "stacked-highlight",
    "contrast-left-bar",
    "grid-2-col",
    "sticky-split",
  ],
  "snow-removal": [
    "hero-layered",
    "split-default",
    "split-reverse",
    "contrast-overlay",
    "grid-feature-first",
    "split-asym-right",
    "cta-emphasis",
  ],
};

function getServiceId(service) {
  return service.slug || service.file || "";
}

function resolveVariant(service) {
  return service.variant || SERVICE_VARIANT_MAP[getServiceId(service)] || "HEAVY_CONTENT";
}

function prioritizeSections(sections, service) {
  const priority = service.overrides?.prioritize;
  if (!priority?.length) return sections;
  const hero = sections.find((section) => section.type === "HERO_SPLIT");
  const prioritized = [];
  const rest = [];
  sections.forEach((section) => {
    if (section.type === "HERO_SPLIT") return;
    if (priority.includes(section.type)) prioritized.push(section);
    else rest.push(section);
  });
  return hero ? [hero, ...prioritized, ...rest] : [...prioritized, ...rest];
}

function expandSectionsByContent(service, baseSections) {
  const subServices = service.subServiceSections ?? [];
  if (!subServices.length) return baseSections;

  return subServices.flatMap((section, sectionIndex) => {
    const paragraphs = section.paragraphs ?? [];
    if (paragraphs.length <= 2) {
      return [{ ...section, __sourceIndex: sectionIndex }];
    }

    const chunks = [];
    for (let i = 0; i < paragraphs.length; i += 2) {
      chunks.push(paragraphs.slice(i, i + 2));
    }

    return chunks.map((chunk, chunkIndex) => ({
      ...section,
      id: chunkIndex === 0 ? section.id : `${section.id}-part-${chunkIndex + 1}`,
      heading: chunkIndex === 0 ? section.heading : `${section.heading} (Part ${chunkIndex + 1})`,
      paragraphs: chunk,
      closing: chunkIndex === chunks.length - 1 ? section.closing : undefined,
      __sourceIndex: sectionIndex,
      __chunkIndex: chunkIndex,
    }));
  });
}

function normalizeLayoutVariant(layout) {
  if (!layout) return null;
  const normalized = String(layout).trim();
  if (LAYOUT_VARIANTS.includes(normalized)) return normalized;
  if (normalized === "default") return "split-default";
  if (normalized === "reverse") return "split-reverse";
  if (normalized === "offset") return "split-offset";
  return null;
}

function findNextUnusedLayout(usedLayouts, indexHint = 0) {
  for (let i = 0; i < LAYOUT_VARIANTS.length; i += 1) {
    const candidate = LAYOUT_VARIANTS[(indexHint + i) % LAYOUT_VARIANTS.length];
    if (!usedLayouts.has(candidate)) return candidate;
  }
  // Fallback for oversized lists: reuse deterministically once full set exhausted.
  return LAYOUT_VARIANTS[indexHint % LAYOUT_VARIANTS.length];
}

function getLayoutPool(service) {
  const serviceId = getServiceId(service);
  const preferred = (SERVICE_LAYOUT_TRACKS[serviceId] || []).filter((layout) =>
    LAYOUT_VARIANTS.includes(layout),
  );
  const remaining = LAYOUT_VARIANTS.filter((layout) => !preferred.includes(layout));
  return [...preferred, ...remaining];
}

function assignLayoutVariants(sections, service) {
  const layoutPool = getLayoutPool(service);
  const usedLayouts = new Set();
  return sections.map((section, index) => {
    const explicitLayout = normalizeLayoutVariant(section.layoutVariant || section.layout || null);
    let layout = explicitLayout || layoutPool[index % layoutPool.length];
    if (usedLayouts.has(layout)) {
      layout =
        layoutPool.find((candidate) => !usedLayouts.has(candidate)) ||
        findNextUnusedLayout(usedLayouts, index);
    }
    usedLayouts.add(layout);
    return {
      ...section,
      layout,
      layoutVariant: layout,
      density: section.density || "normal",
    };
  });
}

function assignVariants(sections) {
  return sections.map((section) => ({ ...section, variant: section.layout || "default" }));
}

function enforceUniqueLayouts(sections) {
  const usedLayouts = new Set();
  sections.forEach((section) => {
    if (!section.layout) return;
    if (usedLayouts.has(section.layout)) {
      throw new Error(`Duplicate layout detected: ${section.layout}`);
    }
    usedLayouts.add(section.layout);
  });
}

function validateSectionComposition(sections) {
  const intents = sections.map((s) => s.intent);
  for (let i = 0; i < intents.length - 2; i += 1) {
    if (intents[i] === intents[i + 1] && intents[i] === intents[i + 2]) {
      throw new Error(`Flat rhythm detected: 3 "${intents[i]}" sections in a row`);
    }
  }
  const ctaIndex = sections.findIndex((s) => s.type === "CTA_BAND");
  if (ctaIndex > 0) {
    const prevIntent = sections[ctaIndex - 1].intent;
    if (!["proof", "education"].includes(prevIntent)) {
      throw new Error("CTA must follow proof or education section");
    }
  }
  const types = new Set();
  sections.forEach((section) => {
    if (types.has(section.type)) throw new Error(`Duplicate section type detected: ${section.type}`);
    types.add(section.type);
  });
}

function getResolvedSections(service) {
  const composition = SECTION_COMPOSITIONS[resolveVariant(service)] || SECTION_COMPOSITIONS.HEAVY_CONTENT;
  let sections = composition.map((section) => ({ ...section }));
  sections = prioritizeSections(sections, service);
  sections = assignVariants(sections);
  validateSectionComposition(sections);
  return sections;
}

function getResolvedSubServiceSections(service) {
  let sections = expandSectionsByContent(service, service.subServiceSections ?? []);
  sections = assignLayoutVariants(sections, service);
  enforceUniqueLayouts(sections);
  return sections;
}

export {
  SECTION_COMPOSITIONS,
  LAYOUT_VARIANTS,
  getResolvedSections,
  getResolvedSubServiceSections,
  expandSectionsByContent,
  assignLayoutVariants,
  enforceUniqueLayouts,
  prioritizeSections,
  assignVariants,
  validateSectionComposition,
};
