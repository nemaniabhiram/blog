import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const dedupeLowercase = (arr: string[]) =>
  Array.from(new Set(arr.map((s) => s.toLowerCase())));

const post = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(600),
      description: z.string().min(10).max(160),
      publishDate: z.coerce.date(),
      coverImage: z.object({ src: image(), alt: z.string() }).optional(),
      tags: z.array(z.string()).default([]).transform(dedupeLowercase),
      ogImage: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { post };
