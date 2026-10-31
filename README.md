# Abhishek Kumar | Portfolio

A fully static portfolio built with [Astro](https://astro.build): a "case file" site with light and dark themes, three case studies and a skills connection map. No backend, no analytics, no third-party runtime requests (fonts are self-hosted).

## Run locally

```sh
npm install
npm run dev       # dev server on http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the built site
```

## Edit content

All copy lives in `src/data/`. Components only render it.

| File | What it holds |
|---|---|
| `site.ts` | name, role, links, meta, hero, section intros, About |
| `projects.ts` | the three case studies (text, metrics, results, diagram steps) |
| `skills.ts` | skills graph nodes and which projects use them |
| `education.ts` | education and certifications (add a `url` to a certification to link it) |

## Resume

Drop your PDF at `public/resume.pdf`. The Resume button already points to `/resume.pdf`; until the file exists it will 404.

## Optional slots

- Case-study screenshots: search for `SCREENSHOT SLOT` in `src/pages/projects/[slug].astro`.
- Profile photo: search for `OPTIONAL PHOTO SLOT` in `src/components/About.astro`.

## Deploy to Cloudflare

Live at https://portfolio.abhibarnwal707.workers.dev (Cloudflare Workers static assets, connected to this GitHub repo).

1. Push to `main`; Cloudflare builds with `npm run build` and serves `dist/`.
2. `wrangler.jsonc` sets the asset directory and serves `404.html` for unknown URLs. Its `name` must match the Worker name in the dashboard.
3. Set the `NODE_VERSION` build variable to your local Node major (`node -v`, currently 24).
4. If you add a custom domain, update `SITE` in `astro.config.mjs` (canonical URLs, sitemap, social card).

`public/_headers` sets long-lived caching for `/_astro/*`, `nosniff`, a strict referrer policy and a restrictive permissions policy. There is no CSP because the inline theme script would need a hash or nonce.

Deploying to Cloudflare Pages instead also works: framework preset Astro, build command `npm run build`, output directory `dist`.
