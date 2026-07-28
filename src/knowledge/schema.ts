import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase ASCII kebab case");
export const articleSchema = z.object({
  title: z.string().min(1), subtitle: z.string().min(1).nullable(), slug,
  description: z.string().min(1), section: z.literal("canon"), language: z.literal("en"),
  status: z.enum(["draft", "ready", "published", "archived"]), order: z.number().int().positive(),
  publishedAt: z.string().date().nullable(), updatedAt: z.string().date(),
  authors: z.array(slug).min(1), concepts: z.array(slug), methods: z.array(slug),
  related: z.array(slug), image: z.string().min(1).nullable(), imageAlt: z.string().min(1).nullable(),
  canonicalPath: z.string(),
}).strict().superRefine((value, ctx) => {
  if (value.status === "published" && !value.publishedAt) ctx.addIssue({ code: "custom", path: ["publishedAt"], message: "published content requires publishedAt" });
  if (value.canonicalPath !== `/knowledge/canon/${value.slug}`) ctx.addIssue({ code: "custom", path: ["canonicalPath"], message: "canonicalPath must match slug" });
  if ((value.image === null) !== (value.imageAlt === null)) ctx.addIssue({ code: "custom", path: ["image"], message: "image and imageAlt must both be set or null" });
  if (value.related.includes(value.slug)) ctx.addIssue({ code: "custom", path: ["related"], message: "article cannot relate to itself" });
});
export type ArticleMetadata = z.infer<typeof articleSchema>;
export type TocEntry = { id: string; text: string; level: 2 | 3 };
export type KnowledgeArticle = ArticleMetadata & { html: string; toc: TocEntry[]; readingMinutes: number; bodyHash: string; hasBodyH1: boolean };
export type CanonCollection = { id: string; basePath: string; language: "en"; totalSize: number; reserved: { order: number; title: string; slug: string; status: "unavailable" }[] };
