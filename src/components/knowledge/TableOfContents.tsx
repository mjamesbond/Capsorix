import type { TocEntry } from "@/knowledge/schema";
export default function TableOfContents({entries}:{entries:TocEntry[]}) { return <nav aria-label="Table of contents" className="knowledge-toc"><p className="text-xs uppercase tracking-[.25em] text-primary">Contents</p><ol>{entries.map(e=><li key={e.id} className={e.level===3?"pl-4":""}><a href={`#${e.id}`}>{e.text}</a></li>)}</ol></nav>; }
