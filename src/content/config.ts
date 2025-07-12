import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    cover: z.string(),
  }),
});

const talks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slides: z.string().optional(),
    repository: z.string().optional(),
    recording: z.string().optional(),
  }),
});

const activitiesAndAppearances = defineCollection({
  loader: file("src/content/activities-and-appearances/activities-and-appearances.json"),
  schema: z.object({
    language: z.enum(["en", "pl"]),
    date: z.coerce.date(),
    name: z.string(),
    link: z.string().optional(),
  }),
});

export const collections = { blog, talks, activitiesAndAppearances };
