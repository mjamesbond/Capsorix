import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import SubpageShell from "@/components/capsorix/SubpageShell";
export default function KnowledgeShell({children}:{children:ReactNode}) { return <SubpageShell><div className="pt-28"><nav aria-label="Knowledge" className="container flex gap-6 border-b border-border py-5 text-sm"><Link to="/knowledge" className="font-display text-lg text-primary">Knowledge</Link><Link to="/knowledge/canon" className="text-muted-foreground hover:text-foreground">Canon</Link></nav>{children}</div></SubpageShell>; }
