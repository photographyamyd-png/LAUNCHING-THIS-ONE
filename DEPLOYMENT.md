# Deployment guide — Ground Level Contracting

The **production website** is the Next.js 15 app in **`glc-site/`**. Build output is **`glc-site/.next`**.

## Recommended: Vercel (Next.js–native)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Set **Root Directory** to **`glc-site`**.
4. Framework preset: **Next.js** (auto-detected).
5. Build command: `npm run build` (default).
6. Output: default (Next handles it).

Environment variables: add any API keys or `NEXT_PUBLIC_*` URLs in the Vercel project settings.

## Alternative: any Node host (VPS, Railway, Render, etc.)

1. On the server, use Node **20+**.
2. `cd glc-site && npm ci && npm run build`.
3. Start with `npm run start` (runs `next start` on port **3040** locally—production hosts usually inject `PORT`; put Nginx/Caddy in front for HTTPS and domain).

For zero-downtime or containers, consider Next.js **standalone** output (optional `output: 'standalone'` in `next.config.ts`)—only if your platform requires it.

## What not to deploy as the “main” site

- Do **not** point the primary domain at a bucket of loose HTML files from the repo root (`index.html`, `GLC_MASTER_SYSTEM.html`) unless you intentionally want a static-only host separate from Next.js.
- **`GLC_MASTER_SYSTEM.html`** is a **design system reference**; the live marketing site should be **`glc-site`**.

## Pre-launch checklist

- [ ] `npm run build` completes with no errors (run from repo root).
- [ ] `npm run start` and click through `/`, `/services/`, `/contact/`, a service detail page.
- [ ] Confirm `glc-site/public/` assets (logos, favicons) load on the production domain.
- [ ] Set canonical URLs / `site.json` or env to match **https://your-domain.com** (see `glc-site/src/content/site.json` and SEO helpers).
- [ ] `robots.txt` and `sitemap.xml` (already under App Router) return 200 on production.

## Single local workflow

From the **repository root**:

```bash
npm run dev
```

One URL for this project: **`http://localhost:3040`** (see `glc-site/package.json` scripts). No separate `serve` process required for the main site.
