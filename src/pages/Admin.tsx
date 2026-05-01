import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, LogOut, Filter, Mail, Phone, Calendar, X, RefreshCw, Inbox, ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

type ProjectRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
  created_at: string;
};

const PROJECT_TYPES = ["All", "Mobile App", "Website", "Both", "Custom"] as const;

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof PROJECT_TYPES)[number]>("All");
  const [active, setActive] = useState<ProjectRequest | null>(null);

  useEffect(() => {
    document.title = "Requests — Capsorix Studio";
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("project_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Couldn’t load requests", description: error.message, variant: "destructive" });
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (typeFilter !== "All" && r.project_type !== typeFilter) return false;
      if (!q) return true;
      return (
        r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    });
  }, [rows, query, typeFilter]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Studio header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground hover:text-primary-glow transition-colors"
            >
              ← Capsorix
            </Link>
            <span className="hidden sm:inline text-border/60">|</span>
            <h1 className="font-display text-lg md:text-xl font-medium truncate">
              Studio <span className="text-gradient-gold italic">requests</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[11px] text-muted-foreground truncate max-w-[16rem]" dir="ltr">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-foreground/85 hover:text-primary-glow hover:border-primary/40 transition-all duration-300 gold-ring"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-primary mb-2">
              Inbox
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-[1.1]">
              {rows.length} {rows.length === 1 ? "request" : "requests"}
              <span className="text-muted-foreground text-base font-normal ms-3">
                · {filtered.length} shown
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, brief…"
                className="w-72 max-w-full rounded-full bg-input/60 border border-border/60 pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as (typeof PROJECT_TYPES)[number])}
                className="appearance-none rounded-full bg-input/60 border border-border/60 pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={fetchRows}
              disabled={refreshing}
              aria-label="Refresh"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-foreground/80 hover:text-primary-glow hover:border-primary/40 transition-all gold-ring disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Table card */}
        <div className="glass rounded-2xl border border-border/50 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-sm text-muted-foreground">Loading requests…</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Inbox className="w-10 h-10 mx-auto mb-4 text-muted-foreground/60" />
              <p className="text-foreground/85 font-medium">
                {rows.length === 0 ? "No requests yet" : "Nothing matches those filters"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {rows.length === 0
                  ? "Submissions from the contact form will appear here."
                  : "Try clearing the search or changing the project type."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] tracking-[0.25em] uppercase text-muted-foreground border-b border-border/50">
                    <th className="px-5 py-4 font-medium">Client</th>
                    <th className="px-5 py-4 font-medium">Project</th>
                    <th className="px-5 py-4 font-medium">Budget</th>
                    <th className="px-5 py-4 font-medium">Timeline</th>
                    <th className="px-5 py-4 font-medium">Received</th>
                    <th className="px-5 py-4 font-medium text-right">·</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setActive(r)}
                      className="cursor-pointer hover:bg-input/30 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-foreground/95">{r.full_name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[18rem]" dir="ltr">
                          {r.email}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] text-foreground/85">
                          {r.project_type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-foreground/85">{r.budget_range}</td>
                      <td className="px-5 py-4 text-foreground/85">{r.timeline}</td>
                      <td className="px-5 py-4 text-muted-foreground text-xs">{fmt(r.created_at)}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-muted-foreground/70 group-hover:text-primary-glow text-xs">→</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail panel */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-background/70 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto glass-strong rounded-t-3xl md:rounded-3xl border border-border/50 gold-border-glow shadow-elegant animate-scale-in"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary">Request</p>
                <h3 className="font-display text-xl font-medium truncate">{active.full_name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 hover:text-primary-glow hover:border-primary/40 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${active.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-input/40 px-4 py-3 hover:border-primary/40 transition-all group"
                >
                  <Mail className="w-4 h-4 text-primary-glow" />
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Email</div>
                    <div className="text-sm truncate group-hover:text-primary-glow transition-colors" dir="ltr">
                      {active.email}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ms-auto" />
                </a>
                {active.phone && (
                  <a
                    href={`tel:${active.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-input/40 px-4 py-3 hover:border-primary/40 transition-all group"
                  >
                    <Phone className="w-4 h-4 text-primary-glow" />
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Phone</div>
                      <div className="text-sm truncate group-hover:text-primary-glow transition-colors" dir="ltr">
                        {active.phone}
                      </div>
                    </div>
                  </a>
                )}
              </div>

              <dl className="rounded-xl border border-border/50 bg-input/30 divide-y divide-border/30 text-sm">
                {[
                  ["Project", active.project_type],
                  ["Budget", active.budget_range],
                  ["Timeline", active.timeline],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
                    <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{k}</dt>
                    <dd className="text-foreground/90">{v}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Received
                  </dt>
                  <dd className="text-foreground/90">{fmt(active.created_at)}</dd>
                </div>
              </dl>

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Brief</p>
                <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap break-words">
                  {active.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] text-muted-foreground tracking-wider truncate" dir="ltr">
                  {active.id}
                </span>
                <a
                  href={`mailto:${active.email}?subject=Re%3A%20Your%20Capsorix%20project%20request`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-primary-foreground font-medium px-5 py-2.5 text-sm gold-ring hover:opacity-95 transition-all"
                >
                  Reply by email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
