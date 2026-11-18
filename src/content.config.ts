import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    author: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    oneLineSummary: z.string().optional(),
    tags: z.array(z.string().min(1)).default([]),
    status: z.enum(['draft', 'published']),
    updatedDate: z.coerce.date().optional(),
    ogImage: z.string().optional(),
    /** Product image shown on list cards (never an illustration). */
    thumbnail: z.string().optional(),
    /** Set when the original lives elsewhere (external original URL). */
    canonical: z.string().url().optional(),
    tistoryUrl: z.string().url().optional()
  })
});

export const collections = { posts };
