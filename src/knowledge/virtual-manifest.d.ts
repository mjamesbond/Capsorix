import type { CanonCollection, KnowledgeArticle } from "./schema";

declare module "virtual:knowledge-manifest" {
  export const collection: CanonCollection;
  export const articles: KnowledgeArticle[];
}

export {};
