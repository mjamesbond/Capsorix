import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { articleSchema, type ArticleMetadata, type CanonCollection, type KnowledgeArticle, type TocEntry } from "./schema";

export const PILOT_BODY_SHA256 = "337e137cd3380508008849f24028dddc3d23b64ca8fb9122783f31ce352c7101";
const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const plain = (s: string) => s.replace(/[*_`[\]]/g, "").replace(/\([^)]*\)/g, "");
export const headingId = (s: string) => plain(s).normalize("NFKD").toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

export function parseFrontMatter(source: string) {
  if (!source.startsWith("---\n")) throw new Error("Missing YAML front matter");
  const end = source.indexOf("\n---\n", 4);
  if (end < 0) throw new Error("Unclosed YAML front matter");
  const yaml = source.slice(4, end); const data: Record<string, unknown> = {}; let list: string[] | null = null;
  for (const raw of yaml.split("\n")) {
    const item = raw.match(/^ {2}- (.+)$/);
    if (item && list) { list.push(parseScalar(item[1]) as string); continue; }
    const m = raw.match(/^([A-Za-z][A-Za-z0-9]*):(?: (.*))?$/); if (!m) throw new Error(`Invalid front matter line: ${raw}`);
    if (m[2] === undefined || m[2] === "") { list=[]; data[m[1]]=list; } else { list=null; data[m[1]]=parseScalar(m[2]); }
  }
  return { data, body: source.slice(end + 5) };
}
function parseScalar(value: string): unknown { if (value === "null") return null; if (value === "[]") return []; if (/^\d+$/.test(value)) return Number(value); if (value.startsWith('"') && value.endsWith('"')) return value.slice(1,-1); return value; }

const inline = (value: string) => {
  let s=esc(value);
  s=s.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>");
  s=s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>');
  s=s.replace(/\[\^([^\]]+)\]/g,'<sup><a href="#fn-$1" id="fnref-$1">$1</a></sup>'); return s;
};
export function renderMarkdown(body: string) {
  const lines=body.replace(/\r\n/g,"\n").split("\n"), toc:TocEntry[]=[]; const out:string[]=[]; const footnotes:string[]=[]; let i=0;
  while(i<lines.length){ const l=lines[i]; if(!l.trim()){i++;continue;}
    const fn=l.match(/^\[\^([^\]]+)\]:\s*(.*)$/); if(fn){footnotes.push(`<li id="fn-${esc(fn[1])}">${inline(fn[2])} <a href="#fnref-${esc(fn[1])}" aria-label="Back to reference">↩</a></li>`);i++;continue;}
    const h=l.match(/^(#{1,6})\s+(.+)$/); if(h){const level=h[1].length,id=headingId(h[2]);if(level===2||level===3)toc.push({id,text:plain(h[2]),level:level as 2|3});out.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);i++;continue;}
    if(/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(l)){out.push("<hr>");i++;continue;}
    if(l.startsWith("> ")){const q:string[]=[];while(i<lines.length&&lines[i].startsWith("> "))q.push(lines[i++].slice(2));out.push(`<blockquote><p>${inline(q.join(" "))}</p></blockquote>`);continue;}
    if(/^[-*+] /.test(l)){const a:string[]=[];while(i<lines.length&&/^[-*+] /.test(lines[i]))a.push(`<li>${inline(lines[i++].slice(2))}</li>`);out.push(`<ul>${a.join("")}</ul>`);continue;}
    if(/^\d+\. /.test(l)){const a:string[]=[];while(i<lines.length&&/^\d+\. /.test(lines[i]))a.push(`<li>${inline(lines[i++].replace(/^\d+\. /,""))}</li>`);out.push(`<ol>${a.join("")}</ol>`);continue;}
    if(l.includes("|")&&i+1<lines.length&&/^\s*\|?\s*:?-+/.test(lines[i+1])){const rows:string[][]=[];const split=(x:string)=>x.replace(/^\s*\||\|\s*$/g,"").split("|").map(v=>v.trim());const heads=split(l);i+=2;while(i<lines.length&&lines[i].includes("|"))rows.push(split(lines[i++]));out.push(`<div class="knowledge-table-wrap"><table><thead><tr>${heads.map(x=>`<th>${inline(x)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${inline(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);continue;}
    const p=[l];i++;while(i<lines.length&&lines[i].trim()&&!/^(#{1,6})\s|^> |^[-*+] |^\d+\. |^\[\^[^\]]+\]:/.test(lines[i]))p.push(lines[i++]);out.push(`<p>${inline(p.join("\n"))}</p>`);
  }
  if(footnotes.length)out.push(`<section class="footnotes" aria-label="Footnotes"><ol>${footnotes.join("")}</ol></section>`);
  return { html:out.join("\n"), toc };
}
export function validateArticles(items: KnowledgeArticle[]) { const seen=(key:"slug"|"order"|"canonicalPath")=>{const s=new Set<string|number>();for(const x of items){if(s.has(x[key]))throw new Error(`Duplicate ${key}: ${x[key]}`);s.add(x[key]);}}; seen("slug");seen("order");seen("canonicalPath");const slugs=new Set(items.map(x=>x.slug));for(const x of items)for(const r of x.related)if(!slugs.has(r))throw new Error(`Unresolved related reference: ${r}`);return [...items].sort((a,b)=>a.order-b.order); }
export function processArticle(source:string): KnowledgeArticle { const {data,body}=parseFrontMatter(source);const metadata=articleSchema.parse(data) as ArticleMetadata;const headings=[...body.matchAll(/^#\s+(.+)$/gm)].map(x=>plain(x[1]));if(headings.length>1)throw new Error("Multiple body H1 headings");if(headings[0]&&headings[0]!==metadata.title)throw new Error("Body H1 must match metadata title");const rendered=renderMarkdown(body);return {...metadata,...rendered,readingMinutes:Math.max(1,Math.ceil(body.trim().split(/\s+/).length/220)),bodyHash:createHash("sha256").update(body).digest("hex"),hasBodyH1:headings.length===1}; }
export function loadKnowledge(root=process.cwd()){const dir=path.join(root,"content/knowledge/en/canon");const articles=validateArticles(readdirSync(dir).filter(f=>f.endsWith(".md")&&!f.startsWith("_")).map(f=>processArticle(readFileSync(path.join(dir,f),"utf8"))));const collection:CanonCollection={id:"foundational-canon",basePath:"/knowledge/canon",language:"en",totalSize:10,reserved:[{order:9,title:"Designing Products That Don’t Exist Yet",slug:"designing-products-that-dont-exist-yet",status:"unavailable"}]};return {collection,articles};}
