# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Authority (conflict resolution)

**When anything in this file disagrees with `.cursorrules` or `GLC_MASTER_SYSTEM.html`, the latter two win.** That pair is the canonical build contract (INHERIT + INJECT laws, Hard Rules 01–15, full `:root` token block, nav/footer verbatim, PCL→GLC pattern map, page migration sequences).

Use this `CLAUDE.md` for workflow (previews, component folders, section-uniqueness rules) and treat **`design_system.json` + `assets/glc-base.css` as implementations that must stay aligned with `.cursorrules`**—not the other way around.

---

## Commands

All commands run from the **repo root** and delegate to `glc-site/`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server at **`http://localhost:3040`** (webpack; stable) |
| `npm run dev:turbo` | Same port with **Turbopack** (run from `glc-site/`; optional) |
| `npm run dev:alt` | Second dev instance at port 3041 |
| `npm run build` | Production build (`glc-site/.next`) |
| `npm run start` | Serve production build locally (run build first) |
| `npm run lint` | ESLint for `glc-site/` |
| `npm run dev:legacy-static` | Static file server at `http://localhost:3456` for legacy HTML files |
| `npm run build:services` | Regenerate static service pages via `_build-services.mjs` |
| `npm run build:accordion` | Build the embeddable accordion widget from `web/` |

**First-time setup:** `cd glc-site && npm install && cd .. && npm run dev`

---

## Architecture

### Two parallel layers

**Production app** — `glc-site/` is the only thing deployed. It is a Next.js 15 App Router app using React 19, TypeScript, and Tailwind v4. Deploy `glc-site/` only.

**Static reference layer** — `index.html`, `assets/`, `services/*.html`, and the preview HTML files at repo root are legacy experiments and design references. They are not part of the production build. Use `npm run dev:legacy-static` to preview them.

### `glc-site/` structure

```
src/
  app/           # Next.js App Router pages (home, /about, /services, /contact, etc.)
  components/
    layout/      # site-header.tsx, site-footer.tsx, mega-menu-*.tsx, mobile-drawer.tsx
    sections/    # Page section components (hero, stats, services-grid, accordion, etc.)
    ui/          # Primitives: Button, SmartLink, IconArrow, StatCounter, etc.
    seo/         # JSON-LD schema components
  content/       # JSON data files (single source of truth)
    site.json        # Business info (name, address, phone, URL)
    navigation.json  # Nav links, mega-menu cards, footer columns — drives all nav components
    pages/           # Per-page content JSON
    services-registry.json  # Service definitions
  lib/           # Utilities: routes.ts, metadata-site.ts, site-url.ts, schema.ts
  styles/
    glc-base.css    # ALL custom CSS — design tokens, header, mega menu, sections, mobile
```

### Styling system

This project does **not** use Tailwind utility classes for components. The entire design system lives in `glc-site/src/styles/glc-base.css` (imported in `app/layout.tsx`). Tailwind v4 is present but minimal. The same CSS is mirrored in `assets/glc-base.css` for the legacy static layer.

**Do not add Tailwind utilities to components.** Use the `--var()` token system and existing class names from `glc-base.css`.

### Navigation / Mega menu

State lives in `site-header.tsx` (`SiteHeader`):
- `megaMode: null | "services" | "company"` — which mega panel is open
- `drawerOpen: boolean` — mobile drawer state
- `coarsePointer` — touch detection, set once on mount

The mega panel opens via CSS `:hover` on `.gl-nav-mega-wrap` for fine-pointer devices. For coarse (touch), the `onClick` handler toggles `megaMode`, which adds `is-open` class. Closing on route change requires a `useEffect` on `pathname` calling `closeMega()` + `closeDrawer()`.

### Content data flow

`navigation.json` → imported in `app/layout.tsx` → passed as props to `<Header>` → threaded into `MegaMenuServices`, `MegaMenuCompany`, and `MobileDrawer`. To add or edit nav links / mega-menu cards, edit `navigation.json` only.

`site.json` → used in `lib/metadata-site.ts` for SEO metadata and in `components/seo/json-ld-local-business.tsx` for structured data.

### Static previews (legacy)

| Page | URL |
|------|-----|
| Static homepage | `http://localhost:3456/index.html` |
| All section previews | `http://localhost:3456/glc-all-section-previews.html` |
| Services variants (A–L) | `http://localhost:3456/services-variants-preview.html` |
| Featured accordion (20 layouts) | `http://localhost:3456/featured-accordion-variants-preview.html` |

---

## Design System Rules (Non-Negotiable)

### Token enforcement

Use CSS custom properties from `glc-base.css` / `design_system.json`, which mirror `.cursorrules` Part 2:

- **Colors:** `var(--charcoal)` `#202020`, `var(--charcoal-deep)` `#1E1C1A`, `var(--yellow-core)` `#F2B705`, `var(--gold)` `#D9A004`
- **Typography:** `Oswald` (display), `Plus Jakarta Sans` (body), `Source Serif 4` (pull-quotes/accent only)
- **Layout:** `--container-max: 1200px`, `--section-v: 96px` (mobile: `64px`), `--ease-expo: cubic-bezier(0.22, 1, 0.36, 1)`
- **Radius:** zero everywhere except decorative circles

### Required CSS imports (static pages only)

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@1,8..60,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/glc-base.css">
<link rel="stylesheet" href="assets/glc-mega-nav.css">
<link rel="stylesheet" href="assets/glc-accordion.css">
```

In `glc-site/` these are handled by `app/layout.tsx` (fonts via `next/font/google`, CSS via imports).

### Section uniqueness rules

- A page must never reuse the same section layout twice.
- Every new section must generate 2–3 labeled design variations (Option A/B/C).
- Large content blocks must be structured into tabs, accordions, multi-column layouts, or progressive disclosure — never dumped as raw text.
- Every section needs at least one of: layering, asymmetry, interaction, or visual anchors. Flat stacked text is invalid.
- New sections must validate against `index.html` visual hierarchy: eyebrow → heading → supporting copy → CTA, matching spacing rhythm and color usage.
