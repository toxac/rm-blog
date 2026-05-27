import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Modern Content Layer loader targeting your local markdown files
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  
  schema:({image}) => z.object({
    title: z.string(),
    slug: z.string(), // Your explicit custom SEO slug string
    pubDate: z.coerce.date(), // Using coerce guarantees string dates from Markdown convert safely to JS Date objects
    description: z.string().max(160), // Hardened for SEO layout limits
    author: z.string(),
    tags: z.array(z.string()),
    heroImage:  image().optional(),
    categories: z.array(z.enum(['projects', 'events', 'resources', "reflections"])),
  }),
});

export const collections = { blog };