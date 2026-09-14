import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
    prev: z.object({ title: z.string(), href: z.string() }).optional(),
    next: z.object({ title: z.string(), href: z.string() }).optional(),
  }),
});

export const collections = { docs };
