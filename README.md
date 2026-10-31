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

## Deploy to Cloudflare Pages

1. Push the repo to GitHub.
2. Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings: **Framework preset** Astro, **Build command** `npm run build`, **Build output directory** `dist`.
4. Environment variable: `NODE_VERSION` set to the Node major you use locally (`node -v`, currently 24).
5. After the first deploy, copy the `*.pages.dev` URL into `site` in `astro.config.mjs`, commit and push. This sets canonical URLs, the sitemap and the social-card image URLs.
6. Pushes to `main` now deploy automatically.

`public/_headers` sets long-lived caching for `/_astro/*`, `nosniff`, a strict referrer policy and a restrictive permissions policy. There is no CSP because the inline theme script would need a hash or nonce.
