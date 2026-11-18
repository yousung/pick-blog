import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import rehypeAffiliate from './src/lib/rehype-affiliate.mjs';

// Posts that declare an external canonical URL stay out of the sitemap.
import { readCanonicalSlugs } from './src/lib/canonical-slugs.mjs';
const externalCanonical = await readCanonicalSlugs(new URL('./src/content/posts/', import.meta.url));

export default defineConfig({
  site: 'https://pick.lovizu.com',
  output: 'static',
  image: { service: passthroughImageService() },
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !externalCanonical.some((slug) => path === `/posts/${slug}/`);
      }
    })
  ],
  markdown: {
    rehypePlugins: [rehypeRaw, rehypeAffiliate]
  }
});
