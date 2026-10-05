// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL at build time when the domain is known. Social metadata and the
// sitemap need an absolute origin; localhost is the dev fallback only.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
});
