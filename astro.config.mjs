// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(owner): replace with the final *.pages.dev (or custom) URL after the first Cloudflare deploy.
const SITE = 'https://abhishek-kumar.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
});
