declare module "virtual:knowledge-manifest" {
  export const collection: import("./schema").CanonCollection;
  export const articles: import("./schema").KnowledgeArticle[];
}
