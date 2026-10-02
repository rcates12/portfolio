import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    mode: z.string(),
    order: z.number(),
    lead: z.string(),
    card: z.object({
      line: z.string(),
      image: z.string(),
    }),
    hero: z.object({
      asset: z.string(),
      describe: z.string(),
      alt: z.string().default(''),
    }),
    // Ordered pairs, not named fields: 01-03 end on "Live", 04 ends on
    // "Status" because it never launched.
    snapshot: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
