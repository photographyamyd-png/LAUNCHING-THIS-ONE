# Ground Level Contracting — Website

## Production app (single source for local + deploy)

All **development**, **build**, and **production start** commands run the **Next.js** application in **`glc-site/`**. Use the repository root scripts only—do not rely on multiple localhost setups.

| Command | Purpose |
|--------|---------|
| `npm install` | Run once inside **`glc-site`** (see below). |
| `npm run dev` | From **repo root** — starts Next.js dev server at **`http://localhost:3040`** (GLC-only port; avoids clashes with other apps on 3000). |
| `npm run build` | Production build (`glc-site/.next`). |
| `npm run start` | Serves the production build locally (run `build` first). |
| `npm run lint` | ESLint for `glc-site`. |

### First-time setup

```bash
cd glc-site
npm install
cd ..
npm run dev
```

Open **`http://localhost:3040`** — that is the live site preview for this repo.

### Repository layout

| Path | Role |
|------|------|
| **`glc-site/`** | **Deploy this.** App Router, components, `public/` static assets, SEO routes. |
| **`glc-site/public/`** | Static files served at the site root (e.g. `/images/ground-level-logo.png`). |
| **`GLC_MASTER_SYSTEM.html`** (repo root) | **Design reference** (single-file tokens/layout). Not the production app—port patterns into `glc-site` as you build. |
| **`index.html`**, **`assets/`**, **`services/*.html`** | Legacy/static experiments; not used by `npm run dev` unless you intentionally run `npm run dev:legacy-static`. |

### Deploying to a live URL

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for hosting options (e.g. Vercel, Node) and checklist.

### Optional: preview old static HTML

Only if you need a simple static server for files in the repo root:

```bash
npm run dev:legacy-static
```

Pick another port in the command if needed. This is **not** part of the production pipeline.
