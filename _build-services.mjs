import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getResolvedSections } from './glc-site/src/lib/section-engine.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'services');
const LOGO_IMG_REL_SERVICES = '../Public Images/Ground Level Contracting Logo (1 of 1).png';

const services = [
  {
    file: 'excavation-site-prep',
    variant: 'HEAVY_CONTENT',
    title: 'Excavation & Site Preparation',
    h1: 'Excavation &amp; <em>Site Preparation</em>',
    lede: 'Mass grading, cut-and-fill, topsoil stripping, and commercial site clearing sized to your development schedule.',
    body: [
      'We mobilize excavators, dozers, and hauling assets to prepare raw land for commercial construction — from initial tree and stump removal through precision rough grading.',
      'Our crews coordinate with your surveyor and GC to maintain pad elevations, manage spoils, and keep haul routes efficient so your foundation contractor can start on time.',
    ],
    bullets: [
      'Commercial mass grading and fine grading',
      'Topsoil stripping and stockpiling',
      'Rock breaking and trench work',
      'Erosion control and silt management',
      'Cut-and-fill balanced to geotech specs',
    ],
  },
  {
    file: 'foundations-civil',
    variant: 'TRUST_FIRST',
    title: 'Foundations & Civil Infrastructure',
    h1: 'Foundations &amp; <em>Civil Infrastructure</em>',
    lede: 'Footing trenches, frost walls, shoring, and underground civil infrastructure for commercial and industrial builds.',
    body: [
      'Ground Level excavates to structural drawings with tight tolerances for footings, elevator pits, and mechanical trenches. We coordinate penetrations and backfill schedules with your structural and MEP trades.',
      'From site servicing to storm and sanitary laterals, we install the underground infrastructure your build depends on — documented and inspection-ready.',
    ],
    bullets: [
      'Footing and frost wall excavation',
      'Shoring and benching for deep excavations',
      'Elevator pit and loading dock excavation',
      'Utility trenching for site servicing',
      'Structural backfill and compaction',
    ],
  },
  {
    file: 'septic-utilities',
    variant: 'HEAVY_CONTENT',
    title: 'Septic & Utility Systems',
    h1: 'Septic &amp; <em>Utility Systems</em>',
    lede: 'Septic fields, holding tanks, and utility corridors excavated to Ontario Building Code and project specifications.',
    body: [
      'We excavate for septic distribution, treatment beds, and underground utilities with attention to bedding, slope, and inspection access.',
      'Our team sequences work to avoid unnecessary compaction and keeps trenches dry and safe for pipe and tank placement.',
    ],
    bullets: [
      'Septic system excavation and backfill',
      'Hydro and communication trenching',
      'Water service and storm connections',
      'Code-compliant bedding and cover',
      'As-built documentation support',
    ],
  },
  {
    file: 'drainage-hardscaping',
    variant: 'HEAVY_CONTENT',
    overrides: {
      prioritize: ['STICKY_TABS'],
    },
    title: 'Drainage & Hardscaping',
    h1: 'Drainage &amp; <em>Hardscaping</em>',
    lede: 'Surface grading, storm infrastructure, and hardscape prep for lots, lots, and commercial exteriors.',
    body: [
      'We establish positive drainage away from structures, install catch basins and storm pipe runs, and prepare subgrades for pavers, asphalt, and retaining walls.',
      'Armor stone, interlock, and segmental retaining walls are supported by proper excavation, geotextile, and drainage detail — executed to engineer drawings.',
    ],
    bullets: [
      'Storm and French drain systems',
      'Catch basins and manhole leads',
      'Grading for parking and loading areas',
      'Retaining wall and paver base prep',
      'Erosion protection and swales',
    ],
  },
  {
    file: 'hauling-clearing',
    variant: 'TRUST_FIRST',
    title: 'Hauling, Site Clearing & Logistics',
    h1: 'Hauling, Clearing &amp; <em>Logistics</em>',
    lede: 'Material import and export, demolition debris, tree clearing, and day-to-day site logistics for active commercial jobs.',
    body: [
      'Our fleet supports ongoing excavation with tri-axle and dump truck hauling for topsoil, fill, granular, and export spoils.',
      'We clear vegetation, remove stumps, and manage debris streams so your site stays organized and inspection-ready.',
    ],
    bullets: [
      'Import and export of granular and fill',
      'Demolition and concrete debris hauling',
      'Tree clearing and brush removal',
      'Rock breaking and hammer work',
      'Site traffic and staging coordination',
    ],
  },
  {
    file: 'snow-removal',
    variant: 'VISUAL_FIRST',
    title: 'Snow Removal Services',
    h1: 'Commercial <em>Snow Removal</em>',
    lede: 'Seasonal contracts for plowing, salting, and ice control for commercial lots, roadways, and industrial yards.',
    body: [
      'Ground Level provides reliable winter maintenance for properties across Barrie, Simcoe County, and surrounding regions — with clear routes, documented service, and rapid response during storms.',
      'Ask about seasonal contracts and dispatch priority for multi-site portfolios.',
    ],
    bullets: [
      'Parking lot and roadway plowing',
      'Salt and ice melt application',
      'Loader and skid-steer stacking',
      'Sidewalk and entrance clearing',
      '24/7 storm monitoring options',
    ],
  },
];

function navLinks(current) {
  return services
    .map((s) => {
      const cls = s.file === current ? ' class="is-current"' : '';
      const label = s.title.replace(/ & /g, ' &amp; ');
      return `        <li><a${cls} href="${s.file}.html">${label}</a></li>`;
    })
    .join('\n');
}

function serviceCards() {
  return services
    .map((s, i) => {
      const label = s.title.replace(/ & /g, ' &amp; ');
      return `            <a href="${s.file}.html" class="pmnav-mega__card pmnav-mega-close-link"><span class="pmnav-mega__card-icon pmnav-mega__card-icon--num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span><span class="pmnav-mega__card-title">${label} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></span><span class="pmnav-mega__card-desc">View service details</span></span></a>`;
    })
    .join('\n');
}

function serviceDrawerLinks() {
  return services
    .map((s) => `<a href="${s.file}.html" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">${s.title.replace(/ & /g, ' &amp; ')}</a>`)
    .join('\n        ');
}

function servicesGridCards() {
  return services
    .map(
      (s, i) =>
        `<a class="service-card" href="${s.file}.html"><div class="service-card__num">${String(i + 1).padStart(2, '0')}</div><h3 class="service-card__title">${s.title.replace(/ & /g, ' &amp; ')}</h3><p class="service-card__desc">Detailed scope, deliverables, and support for project managers and site supervisors.</p><span class="service-card__link">Open <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></a>`
    )
    .join('\n      ');
}

function head(title, description) {
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@1,8..60,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/glc-base.css">
<link rel="stylesheet" href="../assets/glc-mega-nav.css">
<link rel="stylesheet" href="../assets/glc-accordion.css">
</head>`;
}

function pmnavShell() {
  return `<nav id="pmnav" class="pmnav-root" aria-label="Main">
  <div class="pmnav-header" id="pmnav-header-root">
    <div class="pmnav-header__utility" aria-label="Utility">
      <div class="pmnav-header__container">
        <div class="pmnav-header__utility-inner">
          <div class="pmnav-header__utility-left">
            <svg class="pmnav-header__utility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Barrie &bull; Midland &bull; Orillia &bull; Simcoe County</span>
          </div>
          <div class="pmnav-header__utility-right">
            <a href="tel:+17056194902" class="pmnav-header__utility-link">705-619-4902</a>
            <span class="pmnav-header__utility-sep pmnav-header__utility-sep--hide-sm" aria-hidden="true">|</span>
            <div class="gl-util-rotator pmnav-header__utility-rotator" aria-live="polite">
              <span class="gl-util-rotator__line is-visible">Available for Site Dispatch — Commercial Projects</span>
              <span class="gl-util-rotator__line">Licensed &amp; Insured — Barrie, Midland, Orillia &amp; Simcoe County</span>
              <span class="gl-util-rotator__line">From Concept to Creation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pmnav-header__gold-strip" aria-hidden="true"></div>

    <div class="pmnav-header__nav-row">
      <div class="pmnav-header__container">
        <div class="pmnav-header__nav-row-inner">
          <a href="../index.html" class="pmnav-header__logo">
            <img class="pmnav-header__logo-img" src="${LOGO_IMG_REL_SERVICES}" alt="" width="120" height="48" decoding="async"/>
            <span class="pmnav-header__logo-text">
              <span class="pmnav-header__logo-name">Ground Level</span>
              <span class="pmnav-header__logo-tag">Contracting Inc. · From Concept to Creation</span>
            </span>
          </a>
          <div class="pmnav-header__nav-main">
            <a href="../index.html#about" class="pmnav-header__nav-link">About</a>
            <div class="pmnav-header__nav-item-wrap">
              <button type="button" class="pmnav-header__nav-link" id="pmnav-trigger-primary" aria-expanded="false" aria-haspopup="true" aria-controls="pmnav-mega-primary">
                Services
                <svg class="pmnav-header__nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
            <div class="pmnav-header__nav-item-wrap">
              <button type="button" class="pmnav-header__nav-link" id="pmnav-trigger-secondary" aria-expanded="false" aria-haspopup="true" aria-controls="pmnav-mega-secondary">
                Company
                <svg class="pmnav-header__nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
            <a href="../index.html#process" class="pmnav-header__nav-link">Process</a>
            <a href="../index.html#coverage" class="pmnav-header__nav-link">Coverage</a>
            <a href="../index.html#testimonials" class="pmnav-header__nav-link">Projects</a>
          </div>
          <div class="pmnav-header__cta-wrap">
            <a href="tel:+17056194902" class="pmnav-btn pmnav-btn--primary pmnav-btn--sm pmnav-mega-close-link">Get a Quote</a>
          </div>
        </div>
      </div>
    </div>

    <div class="pmnav-header__mobile-bar">
      <a href="../index.html" aria-label="Ground Level Contracting Home">
        <img class="pmnav-header__mobile-logo" src="${LOGO_IMG_REL_SERVICES}" alt="" width="100" height="40" decoding="async"/>
      </a>
      <button type="button" class="pmnav-header__menu-toggle" id="pmnav-mobile-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="pmnav-mobile-drawer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      </button>
    </div>
  </div>

  <button type="button" class="pmnav-header__backdrop" id="pmnav-backdrop" tabindex="-1" aria-hidden="true" aria-label="Close menus"></button>

  <div class="pmnav-mega pmnav-mega--primary" id="pmnav-mega-primary" role="region" aria-labelledby="pmnav-mega-primary-title" aria-hidden="true">
    <div class="pmnav-header__container pmnav-mega__inner">
      <div class="pmnav-mega__grid-services">
        <div class="pmnav-mega__sidebar">
          <p class="pmnav-mega__kicker" id="pmnav-mega-primary-title">What we do</p>
          <p class="pmnav-mega__lead">Six core service lines for commercial excavation, civil infrastructure, and site logistics across Barrie, Midland, Orillia, and Simcoe County.</p>
          <a href="index.html" class="pmnav-mega__link-inline pmnav-mega-close-link">View all services
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="pmnav-mega__cards-wrap">
          <div class="pmnav-mega__cards">
${serviceCards()}
          </div>
        </div>
      </div>
      <div class="pmnav-mega__footer-bar">Commercial projects · Barrie, Midland, Orillia &amp; Simcoe County</div>
    </div>
  </div>

  <div class="pmnav-mega pmnav-mega--secondary" id="pmnav-mega-secondary" role="region" aria-labelledby="pmnav-mega-secondary-title" aria-hidden="true">
    <div class="pmnav-header__container pmnav-mega__inner">
      <h2 class="visually-hidden" id="pmnav-mega-secondary-title">Company and project navigation</h2>
      <div class="pmnav-mega__grid-company">
        <div>
          <div class="pmnav-mega__col-title">Explore</div>
          <ul class="pmnav-mega__list">
            <li class="pmnav-mega__list-item"><a href="../index.html#about" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">About Ground Level</div><div class="pmnav-mega__list-item-desc">Who we are and how we work with your team</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#why" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Why Ground Level</div><div class="pmnav-mega__list-item-desc">Commercial focus, safety, and field experience</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#process" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Our Process</div><div class="pmnav-mega__list-item-desc">From mobilization through handoff</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#testimonials" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Client Projects</div><div class="pmnav-mega__list-item-desc">Feedback from PMs and site supervisors</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
          </ul>
        </div>
        <div>
          <div class="pmnav-mega__col-title">Services hub</div>
          <ul class="pmnav-mega__list">
            <li class="pmnav-mega__list-item"><a href="index.html" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Full services index</div><div class="pmnav-mega__list-item-desc">Dedicated pages for each line</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#services" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Services overview</div><div class="pmnav-mega__list-item-desc">Jump to all six lines on homepage</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="mailto:info@groundlevelcontracting.com" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Email the office</div><div class="pmnav-mega__list-item-desc">info@groundlevelcontracting.com</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
          </ul>
        </div>
        <div>
          <div class="pmnav-mega__col-title">Coverage</div>
          <ul class="pmnav-mega__list">
            <li class="pmnav-mega__list-item"><a href="../index.html#coverage" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Coverage area map</div><div class="pmnav-mega__list-item-desc">Regions we mobilize to commercially</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#coverage" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Barrie &amp; Simcoe County</div><div class="pmnav-mega__list-item-desc">Core market service corridor</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
            <li class="pmnav-mega__list-item"><a href="../index.html#coverage" class="pmnav-mega__list-item-btn pmnav-mega-close-link"><span><div class="pmnav-mega__list-item-title">Midland &amp; Orillia</div><div class="pmnav-mega__list-item-desc">Lake Country commercial corridors</div></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></a></li>
          </ul>
        </div>
      </div>
      <div class="pmnav-mega__dispatch pmnav-mega__dispatch--full">
        <div class="pmnav-mega__dispatch-inner">
          <div class="pmnav-mega__dispatch-copycol">
            <div class="pmnav-mega__dispatch-title">Ready to build?</div>
            <div class="pmnav-mega__dispatch-headline">Start with a site consultation</div>
            <p class="pmnav-mega__dispatch-copy">Commercial excavation and civil infrastructure across Barrie, Midland, Orillia, and Simcoe County. Call dispatch or email — we respond to active tender and site schedules.</p>
            <div class="pmnav-mega__dispatch-actions">
              <a href="tel:+17056194902" class="pmnav-mega__dispatch-cta pmnav-mega-close-link">Call 705-619-4902</a>
              <a href="mailto:info@groundlevelcontracting.com" class="pmnav-mega__dispatch-cta pmnav-mega__dispatch-cta--outline pmnav-mega-close-link">Email us</a>
              <a href="tel:+17056194902" class="pmnav-mega__dispatch-cta pmnav-mega__dispatch-cta--gold pmnav-mega-close-link">Get a quote</a>
            </div>
          </div>
          <figure class="pmnav-mega__dispatch-media">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&amp;q=80&amp;auto=format" alt="" loading="lazy" decoding="async"/>
          </figure>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="pmnav-mobile-overlay" id="pmnav-mobile-overlay" aria-hidden="true"></div>
<aside class="pmnav-mobile-drawer" id="pmnav-mobile-drawer" aria-label="Mobile menu" aria-hidden="true">
  <div class="pmnav-mobile-drawer__accent" aria-hidden="true"></div>
  <div class="pmnav-mobile-drawer__head">
    <span class="pmnav-mobile-drawer__title">Menu</span>
    <button type="button" class="pmnav-mobile-drawer__close" id="pmnav-mobile-close" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="pmnav-mobile-drawer__scroll">
    <a href="../index.html#about" class="pmnav-mobile-drawer__link pmnav-drawer-close">About</a>
    <div class="pmnav-drawer-accordion">
      <button type="button" class="pmnav-mobile-drawer__accordion-toggle" aria-expanded="false" aria-controls="pmnav-acc-primary-panel">
        Services
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="pmnav-mobile-drawer__sub" id="pmnav-acc-primary-panel" hidden>
        <a href="index.html" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>All services</a>
        ${serviceDrawerLinks()}
      </div>
    </div>
    <div class="pmnav-drawer-accordion">
      <button type="button" class="pmnav-mobile-drawer__accordion-toggle" aria-expanded="false" aria-controls="pmnav-acc-secondary-panel">
        Company
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="pmnav-mobile-drawer__sub" id="pmnav-acc-secondary-panel" hidden>
        <a href="../index.html#why" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">Why Ground Level</a>
        <a href="../index.html#process" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">Our Process</a>
        <a href="../index.html#coverage" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">Coverage</a>
        <a href="../index.html#testimonials" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">Projects</a>
        <a href="mailto:info@groundlevelcontracting.com" class="pmnav-mobile-drawer__sub-link pmnav-drawer-close">Email</a>
      </div>
    </div>
    <a href="../index.html#process" class="pmnav-mobile-drawer__link pmnav-drawer-close">Process</a>
    <a href="../index.html#coverage" class="pmnav-mobile-drawer__link pmnav-drawer-close">Coverage</a>
    <a href="../index.html#testimonials" class="pmnav-mobile-drawer__link pmnav-drawer-close">Projects</a>
  </div>
  <div class="pmnav-mobile-drawer__foot">
    <a href="tel:+17056194902" class="pmnav-mobile-drawer__cta-primary pmnav-drawer-close">Call 705-619-4902</a>
    <a href="tel:+17056194902" class="pmnav-mobile-drawer__cta-primary pmnav-drawer-close pmnav-mobile-drawer__cta--dark">Get a Quote</a>
  </div>
</aside>`;
}

function commonFooter() {
  return `<footer id="footer" aria-label="Site footer">
  <div class="footer__main">
    <div class="footer__brand">
      <div class="footer__logo-row">
        <div class="footer__logo-mark-wrap"><img src="${LOGO_IMG_REL_SERVICES}" alt="" width="40" height="40" decoding="async" /></div>
        <div><div class="footer__wordmark-name">Ground Level Contracting</div><div class="footer__wordmark-sub">From Concept to Creation</div></div>
      </div>
      <p class="footer__tagline">Commercial excavation and civil infrastructure across Barrie, Midland, Orillia, and Simcoe County.</p>
    </div>
    <div>
      <div class="footer__col-title">Services</div>
      <ul class="footer__links">
        ${services.map((x) => `<li><a href="${x.file}.html">${x.title.replace(/ & /g, ' &amp; ')}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Company</div>
      <ul class="footer__links">
        <li><a href="../index.html#about">About Us</a></li>
        <li><a href="../index.html#why">Why Ground Level</a></li>
        <li><a href="../index.html#process">Our Process</a></li>
        <li><a href="../index.html#coverage">Coverage Area</a></li>
        <li><a href="../index.html#testimonials">Client Projects</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Coverage</div>
      <ul class="footer__links">
        <li><a href="../index.html#coverage">Barrie, ON</a></li>
        <li><a href="../index.html#coverage">Midland</a></li>
        <li><a href="../index.html#coverage">Orillia</a></li>
        <li><a href="../index.html#coverage">Simcoe County</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bar">
    <div class="footer__bar-inner">
      <p class="footer__copy">&copy; 2026 <span>Ground Level Contracting Inc.</span> — Barrie, Ontario. All rights reserved.</p>
      <div class="footer__legal"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></div>
    </div>
  </div>
</footer>`;
}

function scripts() {
  return `<script src="../assets/glc-mega-nav.js" defer></script>
<script src="../assets/glc.js" defer></script>
<script type="module" src="../assets/glc-accordion.js"></script>`;
}

function getServiceSections(service) {
  return getResolvedSections({ ...service, slug: service.file });
}

function buildNewSectionFromHomePatterns({ service, basePattern = 'ASYMMETRIC_FEATURE_SPLIT', variation = 'default' }) {
  const variations = {
    reverse: 'about--reverse',
    offset: 'about--offset',
    layered: 'about--layered',
    default: '',
  };
  const modifier = variations[variation] || '';
  return `<section id="about" aria-labelledby="about-heading" class="gl-section ${modifier}" data-base-pattern="${basePattern}">
  <div class="about__inner">
    <div class="about__media reveal">
      <div class="about__media-shell"><div class="about__photo-placeholder"></div></div>
      <div class="about__media-stat" aria-hidden="true"><div class="about__media-stat-num">01</div><div class="about__media-stat-label">Service Focus</div></div>
      <div class="about__media-badge" aria-hidden="true"><div class="about__media-badge-text">Built from Home Page Pattern</div></div>
    </div>
    <div class="about__copy">
      <div class="eyebrow about__eyebrow reveal">Service Brief</div>
      <h2 id="about-heading" class="about__heading reveal reveal--delay-1">${service.title.replace('&', '<span>&amp;</span>')}</h2>
      <div class="about__divider reveal reveal--delay-2"></div>
      <p class="about__body reveal reveal--delay-2">${service.body[0]}</p>
      <div class="about__credentials reveal reveal--delay-3">
        <div class="about__credential"><div class="about__credential-title">Commercial Delivery</div><div class="about__credential-sub">Field-ready execution</div></div>
        <div class="about__credential"><div class="about__credential-title">Regional Coverage</div><div class="about__credential-sub">Barrie, Midland, Orillia</div></div>
      </div>
    </div>
  </div>
</section>`;
}

function renderHeroSplit(service) {
  return `<section class="service-page-hero" aria-labelledby="service-hero-title">
  <div class="service-page-hero__bg" aria-hidden="true"></div>
  <div class="service-page-hero__inner">
    <p class="service-page-hero__breadcrumb"><a href="../index.html">Home</a> · <a href="index.html">Services</a></p>
    <h1 id="service-hero-title" class="service-page-hero__title">${service.h1}</h1>
    <p class="service-page-hero__lede">${service.lede}</p>
  </div>
</section>`;
}

function renderAsymmetricFeatureSplitDefault(service) {
  return `<section id="about" aria-labelledby="service-about-heading">
  <div class="about__inner">
    <div class="about__media reveal">
      <div class="about__media-shell"><div class="about__photo-placeholder"></div></div>
      <div class="about__media-stat" aria-hidden="true"><div class="about__media-stat-num">02</div><div class="about__media-stat-label">Execution Phases</div></div>
      <div class="about__media-badge" aria-hidden="true"><div class="about__media-badge-text">Asymmetric Feature Split</div></div>
    </div>
    <div class="about__copy">
      <div class="eyebrow about__eyebrow reveal">Service Scope</div>
      <h2 id="service-about-heading" class="about__heading reveal reveal--delay-1">Built for <span>commercial schedules</span></h2>
      <div class="about__divider reveal reveal--delay-2"></div>
      <p class="about__body reveal reveal--delay-2">${service.body[0]}</p>
      <p class="about__body reveal reveal--delay-2">${service.body[1] || ''}</p>
    </div>
  </div>
</section>`;
}

function renderAsymmetricFeatureSplitReverse(service) {
  return `<section id="about" aria-labelledby="service-about-heading" class="gl-section gl-section--loose">
  <div class="about__inner">
    <div class="about__copy">
      <div class="eyebrow about__eyebrow reveal">Service Scope</div>
      <h2 id="service-about-heading" class="about__heading reveal reveal--delay-1">Built for <span>commercial schedules</span></h2>
      <div class="about__divider reveal reveal--delay-2"></div>
      <p class="about__body reveal reveal--delay-2">${service.body[0]}</p>
      <p class="about__body reveal reveal--delay-2">${service.body[1] || ''}</p>
    </div>
    <div class="about__media reveal">
      <div class="about__media-shell"><div class="about__photo-placeholder"></div></div>
      <div class="about__media-stat" aria-hidden="true"><div class="about__media-stat-num">02</div><div class="about__media-stat-label">Execution Phases</div></div>
      <div class="about__media-badge" aria-hidden="true"><div class="about__media-badge-text">Asymmetric Feature Split</div></div>
    </div>
  </div>
</section>`;
}

function renderAsymmetricFeatureSplitStacked(service) {
  return `<section id="about" aria-labelledby="service-about-heading" class="gl-section gl-section--tight">
  <div class="about__inner">
    <div class="about__copy">
      <div class="eyebrow about__eyebrow reveal">Service Scope</div>
      <h2 id="service-about-heading" class="about__heading reveal reveal--delay-1">Built for <span>commercial schedules</span></h2>
      <div class="about__divider reveal reveal--delay-2"></div>
      <p class="about__body reveal reveal--delay-2">${service.body[0]}</p>
      <p class="about__body reveal reveal--delay-2">${service.body[1] || ''}</p>
    </div>
    <div class="about__media reveal">
      <div class="about__media-shell"><div class="about__photo-placeholder"></div></div>
    </div>
  </div>
</section>`;
}

function renderAsymmetricFeatureSplitOffset(service) {
  return `<section id="about" aria-labelledby="service-about-heading" class="gl-section gl-section--loose">
  <div class="about__inner">
    <div class="about__media reveal reveal--delay-1">
      <div class="about__media-shell"><div class="about__photo-placeholder"></div></div>
      <div class="about__media-badge" aria-hidden="true"><div class="about__media-badge-text">Offset Layout</div></div>
    </div>
    <div class="about__copy">
      <div class="eyebrow about__eyebrow reveal">Service Scope</div>
      <h2 id="service-about-heading" class="about__heading reveal reveal--delay-2">Built for <span>commercial schedules</span></h2>
      <div class="about__divider reveal reveal--delay-2"></div>
      <p class="about__body reveal reveal--delay-3">${service.body[0]}</p>
      <p class="about__body reveal reveal--delay-3">${service.body[1] || ''}</p>
    </div>
  </div>
</section>`;
}

function renderStickyTabsDefault(service) {
  return `<section class="service-detail">
  <div class="service-detail__inner">
    <aside class="service-detail__sidebar" aria-label="All services">
      <h3>Service lines</h3>
      <ul>
${navLinks(service.file)}
      </ul>
    </aside>
    <div class="service-detail__body">
      <h2>What we deliver</h2>
      <ul class="service-detail__list">
        ${service.bullets.map((b) => `<li>${b}</li>`).join('\n        ')}
      </ul>
      <h2>Ready to scope your site?</h2>
      <p>Call <a href="tel:+17056194902" class="service-detail__accent-link">705-619-4902</a> or email <a href="mailto:info@groundlevelcontracting.com" class="service-detail__contact-link">info@groundlevelcontracting.com</a> — we respond quickly for commercial dispatch and scheduled quotes.</p>
      <p class="service-detail__cta-row"><a href="../index.html#process" class="btn-ghost-dark">How we work <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></p>
    </div>
  </div>
</section>`;
}

function renderStickyTabsRight(service) {
  return `<section class="service-detail">
  <div class="service-detail__inner">
    <div class="service-detail__body">
      <h2>What we deliver</h2>
      <ul class="service-detail__list">
        ${service.bullets.map((b) => `<li>${b}</li>`).join('\n        ')}
      </ul>
      <h2>Ready to scope your site?</h2>
      <p>Call <a href="tel:+17056194902" class="service-detail__accent-link">705-619-4902</a> or email <a href="mailto:info@groundlevelcontracting.com" class="service-detail__contact-link">info@groundlevelcontracting.com</a> — we respond quickly for commercial dispatch and scheduled quotes.</p>
      <p class="service-detail__cta-row"><a href="../index.html#process" class="btn-ghost-dark">How we work <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></p>
    </div>
    <aside class="service-detail__sidebar" aria-label="All services">
      <h3>Service lines</h3>
      <ul>
${navLinks(service.file)}
      </ul>
    </aside>
  </div>
</section>`;
}

function renderStickyTabsMinimal(service) {
  return `<section class="service-detail">
  <div class="service-detail__inner">
    <div class="service-detail__body">
      <h2>What we deliver</h2>
      <ul class="service-detail__list">
        ${service.bullets.map((b) => `<li>${b}</li>`).join('\n        ')}
      </ul>
      <p class="service-detail__cta-row"><a href="../index.html#process" class="btn-ghost-dark">How we work <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></p>
    </div>
  </div>
</section>`;
}

function renderProcessTimeline() {
  return `<section id="process" aria-labelledby="process-heading">
  <div class="process__inner">
    <div class="process__header">
      <div class="eyebrow process__eyebrow reveal">How This Service Runs</div>
      <h2 id="process-heading" class="process__heading reveal reveal--delay-1">Clear <span>step-by-step</span> delivery</h2>
    </div>
    <div class="process__steps">
      <div class="process__step reveal"><div class="process__step-circle" aria-hidden="true"><span class="process__step-num">01</span></div><div class="process__step-well"><div class="process__step-title">Discovery</div><p class="process__step-desc">Scope review, constraints, and access planning for your active site.</p></div></div>
      <div class="process__step reveal reveal--delay-1"><div class="process__step-circle" aria-hidden="true"><span class="process__step-num">02</span></div><div class="process__step-well"><div class="process__step-title">Mobilization</div><p class="process__step-desc">Crew and equipment staged with safety protocols and schedule alignment.</p></div></div>
      <div class="process__step reveal reveal--delay-2"><div class="process__step-circle" aria-hidden="true"><span class="process__step-num">03</span></div><div class="process__step-well"><div class="process__step-title">Execution</div><p class="process__step-desc">Work delivered to grade/spec with daily field coordination.</p></div></div>
      <div class="process__step reveal reveal--delay-3"><div class="process__step-circle" aria-hidden="true"><span class="process__step-num">04</span></div><div class="process__step-well"><div class="process__step-title">Handoff</div><p class="process__step-desc">Final checks, documentation support, and turnover readiness.</p></div></div>
    </div>
  </div>
</section>`;
}

function renderProofStrip() {
  return `<section id="stats" aria-label="Proof strip">
  <div class="stats__rail-top"></div>
  <div class="stats__inner">
    <div class="stat-cell reveal"><span class="stat-cell__num" data-target="15"><span>0</span><span>+</span></span><span class="stat-cell__label">Years of Experience</span><span class="stat-cell__sub">Field-proven capability</span></div>
    <div class="stat-cell reveal reveal--delay-1"><span class="stat-cell__num" data-target="500"><span>0</span><span>+</span></span><span class="stat-cell__label">Projects Completed</span><span class="stat-cell__sub">Commercial-focused delivery</span></div>
    <div class="stat-cell reveal reveal--delay-2"><span class="stat-cell__num" data-target="4"><span>0</span><span> Regions</span></span><span class="stat-cell__label">Coverage Areas</span><span class="stat-cell__sub">Barrie, Midland, Orillia, Simcoe</span></div>
    <div class="stat-cell reveal reveal--delay-3"><span class="stat-cell__num" data-target="100"><span>0</span><span>%</span></span><span class="stat-cell__label">Schedule Accountability</span><span class="stat-cell__sub">Built for PM workflows</span></div>
  </div>
</section>`;
}

function renderCtaBand() {
  return `<section id="cta-band" aria-labelledby="cta-heading">
  <div class="cta-band__left-block" aria-hidden="true"></div>
  <div class="cta-band__inner">
    <div class="cta-band__copy">
      <div class="cta-band__eyebrow">Next step</div>
      <h2 id="cta-heading" class="cta-band__heading">Discuss your <em>commercial</em> site</h2>
      <p class="cta-band__sub">Ground Level Contracting — Barrie, Midland, Orillia &amp; Simcoe County.</p>
    </div>
    <div class="cta-band__actions">
      <div class="cta-band__phone-label">Call Direct</div>
      <a href="tel:+17056194902" class="cta-band__phone">705-619-4902</a>
      <a href="mailto:info@groundlevelcontracting.com" class="btn-ghost-dark">Email Us <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
  </div>
</section>`;
}

const SECTION_VARIANTS = {
  HERO_SPLIT: {
    default: (section, service) => renderHeroSplit(service),
  },
  ASYMMETRIC_FEATURE_SPLIT: {
    default: (section, service) => renderAsymmetricFeatureSplitDefault(service),
    reverse: (section, service) => renderAsymmetricFeatureSplitReverse(service),
    stacked: (section, service) => renderAsymmetricFeatureSplitStacked(service),
    offset: (section, service) => renderAsymmetricFeatureSplitOffset(service),
  },
  STICKY_TABS: {
    default: (section, service) => renderStickyTabsDefault(service),
    right: (section, service) => renderStickyTabsRight(service),
    minimal: (section, service) => renderStickyTabsMinimal(service),
  },
  PROCESS_TIMELINE: {
    default: () => renderProcessTimeline(),
  },
  PROOF_STRIP: {
    default: () => renderProofStrip(),
  },
  CTA_BAND: {
    default: () => renderCtaBand(),
  },
};

function renderSection(type, section, service, usedSections) {
  if (usedSections.has(type)) {
    throw new Error(`Duplicate section type detected: ${type}`);
  }
  usedSections.add(type);
  const variant = section.variant || 'default';
  const renderer = SECTION_VARIANTS[type]?.[variant] || SECTION_VARIANTS[type]?.default;
  if (!renderer) {
    return buildNewSectionFromHomePatterns({
      service,
      basePattern: type,
      variation: variant,
    });
  }
  return renderer(section, service);
}

function renderServiceSections(service) {
  const usedSections = new Set();
  return getServiceSections(service)
    .map((section) => renderSection(section.type, section, service, usedSections))
    .join('\n\n');
}

function page(service) {
  return `<!DOCTYPE html>
<html lang="en">
${head(`${service.title} | Ground Level Contracting`, `${service.title} — commercial excavation and civil services for Barrie, Midland, Orillia, and Simcoe County.`)}
<body class="page-service">
${pmnavShell()}

${renderServiceSections(service)}

${commonFooter()}
${scripts()}
</body>
</html>`;
}

const hubHtml = `<!DOCTYPE html>
<html lang="en">
${head('Services | Ground Level Contracting', 'Commercial excavation, civil infrastructure, utilities, drainage, hauling, and winter maintenance across Barrie, Midland, Orillia, and Simcoe County.')}
<body class="page-service">
${pmnavShell()}

<section class="service-page-hero" aria-labelledby="services-hub-title">
  <div class="service-page-hero__bg" aria-hidden="true"></div>
  <div class="service-page-hero__inner">
    <p class="service-page-hero__breadcrumb"><a href="../index.html">Home</a> · Services</p>
    <h1 id="services-hub-title" class="service-page-hero__title">Six core <em>service lines</em></h1>
    <p class="service-page-hero__lede">Commercial excavation, civil infrastructure, utilities, drainage, hauling, and winter maintenance — across Barrie, Midland, Orillia, and Simcoe County.</p>
  </div>
</section>

<section class="service-detail services-hub">
  <div class="container">
    <div class="services-hub__grid">
      ${servicesGridCards()}
    </div>
  </div>
</section>

${commonFooter()}
${scripts()}
</body>
</html>`;

for (const s of services) {
  fs.writeFileSync(path.join(outDir, `${s.file}.html`), page(s), 'utf8');
}

fs.writeFileSync(path.join(outDir, 'index.html'), hubHtml, 'utf8');
console.log('Wrote', services.length, 'service pages + hub');
