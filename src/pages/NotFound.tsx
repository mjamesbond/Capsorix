import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass, Home, Mail } from "lucide-react";
import Navbar from "@/components/nexora/Navbar";
import Footer from "@/components/nexora/Footer";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Premium 404 — same Capsorix grammar as the rest of the site:
 * dark canvas, gold accents, controlled motion. Localized in EN/FR/DE/AR.
 */
const NotFound = () => {
  const location = useLocation();
  const { t, lang } = useI18n();

  useEffect(() => {
    // Keep the diagnostic, but quieter — this is expected user navigation noise.
    console.warn("[404]", location.pathname);
    // Hint search engines that this URL should not be indexed.
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, follow";
    tag.dataset.notfound = "true";
    document.head.appendChild(tag);
    return () => {
      document.head.querySelectorAll('meta[data-notfound="true"]').forEach((n) => n.remove());
    };
  }, [location.pathname]);

  const nf = t.notFound;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden page-enter" data-lang={lang}>
      <Navbar />
      <main className="relative">
        {/* Ambient gold wash — single, restrained */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[40rem] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.10), transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 top-24 section-divider" />

        <section className="container relative pt-40 pb-32 md:pt-48 md:pb-40">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-6">
                {nf.kicker}
              </p>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.02] mb-8">
                {nf.titleA}
                <span className="text-gradient-gold italic">{nf.titleB}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                {nf.lead}
              </p>

              {/* Requested path receipt */}
              <div className="mb-10 inline-flex items-center gap-4 rounded-xl border border-border/50 bg-input/40 px-4 py-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  {nf.pathLabel}
                </span>
                <span className="font-mono text-sm text-foreground/90 tracking-wider truncate max-w-[18rem]" dir="ltr">
                  {location.pathname}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/"
                  className="btn-shimmer group inline-flex items-center gap-3 rounded-full bg-gold-animated px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.02] gold-ring"
                >
                  <Home className="w-4 h-4" />
                  <span>{nf.primary}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180" />
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 gold-ring"
                >
                  <Mail className="w-4 h-4 text-primary-glow" />
                  {nf.secondary}
                </Link>
              </div>
            </div>

            {/* Right: 404 medallion + suggestions */}
            <div className="lg:col-span-5">
              <div className="relative glass-strong rounded-3xl p-8 md:p-10 gold-border-glow gold-ring shadow-elegant overflow-hidden">
                <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

                {/* 404 medallion */}
                <div className="relative mx-auto mb-8 w-40 h-40">
                  <span className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="absolute inset-3 rounded-full border border-primary/30" />
                  <span className="absolute inset-6 rounded-full bg-gradient-gold-soft border border-primary/50 gold-ring flex items-center justify-center">
                    <span className="font-display text-4xl text-gradient-gold tracking-tight">{nf.code}</span>
                  </span>
                </div>

                <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-primary/90 mb-5 text-center inline-flex items-center gap-2 w-full justify-center">
                  <Compass className="w-3.5 h-3.5" />
                  {nf.suggestionsKicker}
                </p>

                <ul className="space-y-2">
                  {nf.suggestions.map((s) => (
                    <li key={s.href}>
                      <Link
                        to={s.href}
                        className="group flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-input/30 px-4 py-3.5 hover:border-primary/50 hover:bg-input/50 transition-all duration-300"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground group-hover:text-primary-glow transition-colors">
                            {s.label}
                          </span>
                          <span className="text-xs text-muted-foreground leading-relaxed">{s.desc}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-glow transition-all duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
