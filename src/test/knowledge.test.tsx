import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { articleSchema } from "@/knowledge/schema";
import ArticleHeader from "@/components/knowledge/ArticleHeader";
import { canonCatalog, loadKnowledge, parseFrontMatter, processArticle, publicMarkdown, renderMarkdown, validateArticles, PILOT_BODY_SHA256 } from "@/knowledge/content";
const metadata={title:"A Valid Title",subtitle:null,slug:"a-valid-title",description:"Description",section:"canon",language:"en",status:"ready",order:5,publishedAt:null,updatedAt:"2026-07-28",authors:["capsorix-editorial"],concepts:[],methods:[],related:[],image:null,imageAlt:null,canonicalPath:"/knowledge/canon/a-valid-title"};
const source=(overrides:Record<string,unknown>={},body="# A Valid Title\n\nText")=>{const d={...metadata,...overrides};const lines=Object.entries(d).map(([k,v])=>Array.isArray(v)?(v.length?`${k}:\n${v.map(x=>`  - "${x}"`).join("\n")}`:`${k}: []`):v===null?`${k}: null`:typeof v==="number"?`${k}: ${v}`:`${k}: "${v}"`);return `---\n${lines.join("\n")}\n---\n${body}`};
describe("knowledge content validation",()=>{
 it("accepts valid front matter",()=>expect(processArticle(source()).slug).toBe("a-valid-title"));
 it("rejects missing required metadata",()=>expect(()=>articleSchema.parse({...metadata,title:undefined})).toThrow());
 it("rejects duplicate slugs",()=>{const a=processArticle(source());expect(()=>validateArticles([a,{...a,order:6}])).toThrow(/Duplicate slug/)});
 it("rejects duplicate order",()=>{const a=processArticle(source());expect(()=>validateArticles([a,{...a,slug:"another",canonicalPath:"/knowledge/canon/another"}])).toThrow(/Duplicate order/)});
 it("allows sparse ordering with order 9 absent",()=>expect(validateArticles([processArticle(source({order:10}))])[0].order).toBe(10));
 it("rejects canonical path mismatch",()=>expect(()=>processArticle(source({canonicalPath:"/wrong"}))).toThrow());
 it("rejects published content without publishedAt",()=>expect(()=>processArticle(source({status:"published"}))).toThrow());
 it("rejects image and alt mismatch",()=>expect(()=>processArticle(source({image:"/x.webp"}))).toThrow());
 it("rejects unresolved relationships",()=>{const a=processArticle(source({related:["missing"]}));expect(()=>validateArticles([a])).toThrow(/Unresolved/)});
 it("rejects multiple body H1 headings",()=>expect(()=>processArticle(source({},"# A Valid Title\n# Again"))).toThrow(/Multiple/));
 it("rejects an H1/title mismatch",()=>expect(()=>processArticle(source({},"# Different"))).toThrow(/match/));
 it("supports a missing body H1",()=>expect(processArticle(source({},"## Opening\nText")).hasBodyH1).toBe(false));
 it("renders GFM tables responsively",()=>expect(renderMarkdown("| A | B |\n|---|---|\n| 1 | 2 |").html).toContain("<table>"));
 it("renders standard footnotes",()=>expect(renderMarkdown("Claim[^1]\n\n[^1]: Note").html).toContain('class="footnotes"'));
 it("preserves Unicode superscripts",()=>expect(renderMarkdown("Evidence¹ and finding²").html).toContain("Evidence¹"));
 it("excludes only recognised editorial annotations from the public projection",()=>{const raw="# Title\n\n> Image suggestion: private\n> continuation\n\nProse\n\n## Publishing Notes\nprivate\n\n### Still private\nprivate\n\n## Public section\nPublic";const result=publicMarkdown(raw);expect(result).not.toContain("Image suggestion:");expect(result).not.toContain("Publishing Notes");expect(result).not.toContain("Still private");expect(result).toContain("Prose");expect(result).toContain("## Public section")});
 it("escapes unsafe raw HTML",()=>expect(renderMarkdown('<script>alert("x")</script>').html).not.toContain("<script>"));
 it("preserves the pilot body SHA-256",()=>{const raw=readFileSync("content/knowledge/en/canon/05-the-decisions-a-system-makes-before-anyone-agrees-to-them.md","utf8");const {body}=parseFrontMatter(raw);expect(createHash("sha256").update(body).digest("hex")).toBe(PILOT_BODY_SHA256)});
 it("loads every available canonical position in order",()=>{const k=loadKnowledge();expect(k.articles.map(a=>a.order)).toEqual([1,2,3,4,5,6,7,8,10]);expect(k.collection.totalSize).toBe(10)});
 it("loads exactly nine available Canon records",()=>expect(loadKnowledge().articles).toHaveLength(9));
 it("keeps canonical position 9 reserved and unavailable",()=>expect(loadKnowledge().collection.reserved).toEqual([{order:9,title:"Designing Products That Don’t Exist Yet",slug:"designing-products-that-dont-exist-yet",status:"unavailable"}]));
 it("keeps Article 10 at canonical position 10",()=>expect(loadKnowledge().articles.find(a=>a.slug==="ai-is-cheap-to-try-and-expensive-to-depend-on")?.order).toBe(10));
 it("navigates from Article 8 directly to Article 10",()=>{const articles=loadKnowledge().articles.filter(a=>a.status!=="draft"&&a.status!=="archived");const index=articles.findIndex(a=>a.order===8);expect(articles[index+1].order).toBe(10)});
 it("uses the virtual module instead of a mutable source manifest",()=>{expect(existsSync("src/knowledge/manifest.ts")).toBe(false);for(const page of ["src/pages/knowledge/CanonIndex.tsx","src/pages/knowledge/CanonArticle.tsx"]){const source=readFileSync(page,"utf8");expect(source).toContain('from "virtual:knowledge-manifest"');expect(source).not.toContain("@/knowledge/manifest")}const plugin=readFileSync("src/knowledge/build.ts","utf8");expect(plugin).toContain('const virtualManifestId = "virtual:knowledge-manifest"');expect(plugin).not.toContain('writeFileSync("src/knowledge/manifest.ts"')});
 it("generates complete static article HTML",()=>{const p="dist/knowledge/canon/the-decisions-a-system-makes-before-anyone-agrees-to-them/index.html";if(existsSync(p))expect(readFileSync(p,"utf8")).toContain("Technology as a settled claim about the world")});
 it("retains the pilot as ready",()=>expect(loadKnowledge().articles.find(a=>a.order===5)?.status).toBe("ready"));
 it("preserves Article 5 verified concepts and methods",()=>{const article=loadKnowledge().articles.find(a=>a.order===5)!;expect(article.concepts).toEqual(["institutional-assumptions","encoding","reversibility","requirements-compression","authority-models","work-as-done"]);expect(article.methods).toEqual(["requirement-decompression","six-load-bearing-decisions","encoding-threshold","disposability-test"])});
 it("does not render empty concept or method labels",()=>{const article=processArticle(source());const html=renderToStaticMarkup(<ArticleHeader article={article} total={10}/>);expect(html).not.toContain('aria-label="Concepts"');expect(html).not.toContain('aria-label="Methods"')});
 it("selects exactly one explicit authoritative source for Article 5",()=>{const entries=canonCatalog.filter(([order])=>order===5);expect(entries).toHaveLength(1);expect(entries[0][1]).toBe("content/knowledge/en/canon/05-the-decisions-a-system-makes-before-anyone-agrees-to-them.md")});
 it("uses per-record runtime SEO and a fixed canonical origin",()=>{const app=readFileSync("src/App.tsx","utf8");expect(app).toContain('import { articles } from "virtual:knowledge-manifest"');expect(app).toContain('`${article.title} | Capsorix`');expect(app).toContain("article.description");expect(app).toContain('const CANONICAL_ORIGIN = "https://capsorix.tech"');expect(app).not.toContain("window.location.origin");expect(app).toContain('article?.status === "ready" ? "noindex,follow" : "index,follow"')});
 it("retains Article JSON-LD in runtime SEO",()=>{const app=readFileSync("src/App.tsx","utf8");for(const type of ["Article","BreadcrumbList","Organization","WebSite"])expect(app).toContain(`"@type": "${type}"`)});
 it("exposes every imported published article to RSS generation",()=>expect(loadKnowledge().articles.filter(a=>a.status==="published").map(a=>a.order)).toEqual([1,2,3,4,6,7,10]));
 it("keeps existing production routes declared",()=>{const app=readFileSync("src/App.tsx","utf8");for(const route of ["/ios","/android","/web","/about","/careers"])expect(app).toContain(`path="${route}"`) });
 it("keeps every Markdown article byte-for-byte unchanged",()=>{const hashes={
  "Capsorix Final Canon/ai-is-cheap-to-try-and-expensive-to-depend-on.md":"4598f3d8584882c8533237f33031f2781fa94d5d1bc18275b4a7c1963cc0376a",
  "Capsorix Final Canon/anatomy-of-an-ambitious-idea-final.md":"6868b61bd236d14e0ef0f117a0861a7dc472bc0973a6b77874eb5db6bfe9a1ea",
  "Capsorix Final Canon/before-technology-what-must-be-understood-before-a-product-can-be-engineered.md":"b56fad818f013041b244e41ba6fee6d1684f62389fe6a804d0f3b21fe787e2f7",
  "Capsorix Final Canon/capsorix-article-08-ARTICLE-ONLY.md":"ff0dbe22841d8025cdc68025a18f4c500c64558cc51ff6bf779f679537099a1e",
  "Capsorix Final Canon/digital-transformation-is-not-a-software-project.md":"ea547cac3cc183d3f8ef5bb35c11de948fd0b980cc7494a9d19c13c9a2736af9",
  "Capsorix Final Canon/from-impossible-idea-to-real-product.md":"c0eac4293f71b64ae58f028f174813d3fa8fc531e2a785657b443f5ed9e3b456",
  "Capsorix Final Canon/great-products-begin-before-technology.md":"337e137cd3380508008849f24028dddc3d23b64ca8fb9122783f31ce352c7101",
  "Capsorix Final Canon/the-person-who-is-secretly-the-software.md":"b3f201a4ece4b44e58326227838464d06b5464dd6df3b1d6dc30510124eaae7b",
  "Capsorix Final Canon/the-product-is-only-as-mature-as-the-organisation-that-owns-it.md":"72df018fa89bb06795437f0a7a99fa8be7dac929a85f20e54f625a7644839979",
  "content/knowledge/en/canon/05-the-decisions-a-system-makes-before-anyone-agrees-to-them.md":"c2ed0ca4dfd13e08077073e7171dae00f1556487817903843ade1c234a381a7a",
 };for(const [file,hash] of Object.entries(hashes))expect(createHash("sha256").update(readFileSync(file)).digest("hex"),file).toBe(hash)});
});
