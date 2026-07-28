declare module "virtual:knowledge-manifest" {
  import type { CanonCollection, KnowledgeArticle } from "./schema";

  export const collection: Readonly<CanonCollection>;
  export const articles: KnowledgeArticle[];
}
