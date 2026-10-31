// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed Cloudflare URL; change this if you add a custom domain.
const SITE = 'https://portfolio.abhibarnwal707.workers.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
});
