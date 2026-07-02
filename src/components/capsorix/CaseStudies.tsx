import { useState } from "react";
import { ArrowRight, Lock, Smartphone, Tablet, MonitorSmartphone, Layers, ExternalLink, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import haqakLogo from "@/assets/haqak-logo.webp";
import elbakreyLogo from "@/assets/elbakrey-logo.webp";
import flowpilotLogo from "@/assets/flowpilot-logo.webp";
import veloriaLogo from "@/assets/veloria-logo.webp";

/**
 * CaseStudies — flagship, expandable showcases.
 *
 * Each item collapses into a clean summary card; opening one reveals the
 * brief, our approach, the tech stack, and quantified outcomes.
 * Single source of truth — content lives in the localized dictionary.
 */
const ICONS = [Smartphone, Tablet, MonitorSmartphone];
const LOGOS: Record<string, string> = {
  haqak: haqakLogo,
  elbakrey: elbakreyLogo,
  flowpilot: flowpilotLogo,
  veloria: veloriaLogo,
};

const CaseStudies = () => {
  const { t, lang } = useI18n();
  const items = t.caseStudies.items;
  const [open, setOpen] = useState(0);

  return (
    <section
      id="work"
      className="relative section section-fade scroll-mt-24"
      data-lang={lang}
    >
      <div className="container">
        {/* Header */}
        <Reveal className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">
            {t.caseStudies.kicker}
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
            {t.caseStudies.titleA}
            <span className="text-gradient-gold italic">{t.caseStudies.titleB}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.caseStudies.lead}</p>
        </Reveal>

        {/* Showcase rows */}
        <div className="space-y-5">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Layers;
            const isOpen = open === i;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <article
                  className={`relative glass rounded-3xl border border-border/50 overflow-hidden transition-all duration-700 ${
                    isOpen ? "gold-border-glow shadow-elegant" : "hover:border-primary/30"
                  }`}
                >
                  {/* Subtle ambient gold wash when open */}
                  {isOpen && (
                    <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
                  )}

                  {/* Header row — always visible */}
                  <div
                    className="group relative w-full p-5 sm:p-6 md:p-8 flex flex-col items-center md:flex-row md:items-center gap-5 sm:gap-6 md:gap-8"
                  >
                    {/* Numeral — clickable to toggle */}
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? "Collapse" : "Expand"}
                      className="shrink-0 flex items-center gap-5 text-start"
                    >
                      <span className="font-display text-3xl md:text-4xl text-gradient-gold tabular-nums leading-none">
                        0{i + 1}
                      </span>
                      <span className="hidden md:block w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                    </button>

                    {/* Logo — large, premium, on dark contrast plate for guaranteed legibility */}
                    {item.logo && LOGOS[item.logo] ? (
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="shrink-0 relative flex items-center justify-center group/logo"
                        aria-label={item.client}
                      >
                        {/* Soft radial backlight */}
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute inset-0 -m-6 rounded-full blur-3xl opacity-60 group-hover/logo:opacity-90 transition-opacity duration-700 ${
                            item.logo === "haqak"
                              ? "bg-[radial-gradient(closest-side,rgba(255,180,80,0.45),transparent_70%)]"
                              : item.logo === "flowpilot"
                              ? "bg-[radial-gradient(closest-side,rgba(120,150,255,0.35),transparent_70%)]"
                              : "bg-[radial-gradient(closest-side,rgba(201,168,76,0.35),transparent_70%)]"
                          }`}
                        />
                        {/* Dark contrast plate — keeps the mark legible on any card background */}
                        <span
                          aria-hidden
                          className="relative flex items-center justify-center rounded-2xl bg-[#0a0e1a]/95 border border-primary/30 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 transition-transform duration-700 group-hover/logo:scale-[1.03]"
                        >
                          <img
                            src={LOGOS[item.logo]}
                            alt={item.client}
                            width={item.logo === "haqak" ? 640 : item.logo === "flowpilot" ? 617 : 640}
                            height={item.logo === "haqak" ? 512 : item.logo === "flowpilot" ? 154 : 231}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Hard fallback: if the CDN image fails to load (network/CORS/cache),
                              // swap to a styled text mark so the brand is never invisible.
                              const img = e.currentTarget;
                              const parent = img.parentElement;
                              if (!parent) return;
                              img.style.display = "none";
                              if (!parent.querySelector("[data-logo-fallback]")) {
                                const span = document.createElement("span");
                                span.dataset.logoFallback = "true";
                                span.textContent = item.client;
                                span.className =
                                  "font-display text-base md:text-lg tracking-[0.18em] uppercase text-gradient-gold whitespace-nowrap";
                                parent.appendChild(span);
                              }
                            }}
                            className={`relative object-contain ${
                              item.logo === "haqak"
                                ? "h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto"
                                : "h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto"
                            }`}
                            style={
                              item.logo === "haqak"
                                ? { filter: "drop-shadow(0 4px 18px rgba(255,140,40,0.35))" }
                                : item.logo === "flowpilot"
                                ? { filter: "drop-shadow(0 4px 18px rgba(120,150,255,0.35)) brightness(1.02)" }
                                : { filter: "drop-shadow(0 4px 18px rgba(201,168,76,0.35)) brightness(1.05)" }
                            }
                          />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="shrink-0 w-12 h-12 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center icon-tile"
                      >
                        <Icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                      </button>
                    )}

                    {/* Title block — clickable */}
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex-1 min-w-0 text-center md:text-start"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-primary">
                          {item.tag}
                        </span>
                        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/80" dir="ltr">
                          {item.href ? <ExternalLink className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {item.client}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </button>

                    {/* Actions — visit + toggle, always visible, always clickable */}
                    <div className="shrink-0 self-start md:self-center flex items-center gap-3">
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hidden sm:inline-flex items-center gap-2 px-4 h-10 rounded-full border border-primary/40 bg-primary/5 text-primary-glow hover:bg-primary/15 hover:border-primary/70 hover:text-primary transition-all duration-500 text-xs font-medium tracking-wide shadow-[0_0_0_0_rgba(201,168,76,0)] hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.5)]"
                          dir="ltr"
                          aria-label={`${item.visitLabel ?? "Visit"} — ${item.client}`}
                        >
                          {item.visitLabel ?? "Visit"}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted-foreground transition-all duration-500 ${
                          isOpen ? "rotate-90 border-primary/50 text-primary-glow bg-primary/5" : "hover:border-primary/40 hover:text-primary-glow"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    className={`grid transition-all duration-700 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8 md:pb-10">
                        <div className="border-t border-border/40 pt-8 grid lg:grid-cols-12 gap-10">
                          {/* Left: narrative */}
                          <div className="lg:col-span-7 space-y-6">
                            <p className="text-base text-foreground/85 leading-relaxed">
                              {item.summary}
                            </p>
                            <div>
                              <p className="text-[10px] tracking-[0.3em] uppercase text-primary/90 mb-2">
                                {t.caseStudies.challengeLabel}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.challenge}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] tracking-[0.3em] uppercase text-primary/90 mb-2">
                                {t.caseStudies.approachLabel}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.approach}
                              </p>
                            </div>
                          </div>

                          {/* Right: metrics + meta */}
                          <div className="lg:col-span-5 space-y-6">
                            <ul className="grid grid-cols-3 gap-3">
                              {item.metrics.map((m) => (
                                <li
                                  key={m.label}
                                  className="rounded-2xl border border-border/50 bg-input/30 p-4 text-center"
                                >
                                  <p className="font-display text-2xl text-gradient-gold leading-none mb-2 tabular-nums">
                                    {m.value}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground leading-snug">
                                    {m.label}
                                  </p>
                                </li>
                              ))}
                            </ul>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-xl border border-border/40 p-4">
                                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">
                                  {t.caseStudies.durationLabel}
                                </p>
                                <p className="text-sm font-medium text-foreground/95">{item.duration}</p>
                              </div>
                              <div className="rounded-xl border border-border/40 p-4">
                                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">
                                  {t.caseStudies.stackLabel}
                                </p>
                                <p className="text-sm font-medium text-foreground/95" dir="ltr">
                                  {item.stack.slice(0, 2).join(" · ")}
                                </p>
                              </div>
                            </div>

                            <ul className="flex flex-wrap gap-2" dir="ltr">
                              {item.stack.map((s) => (
                                <li
                                  key={s}
                                  className="text-[11px] px-3 py-1.5 rounded-full border border-border/50 bg-input/30 text-foreground/80 tracking-wide"
                                >
                                  {s}
                                </li>
                              ))}
                            </ul>

                            {item.status && (
                              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                                <p className="text-[10px] tracking-[0.3em] uppercase text-primary/90 mb-1.5 inline-flex items-center gap-1.5">
                                  <ShieldCheck className="w-3 h-3" />
                                  {t.caseStudies.statusLabel ?? "Status"}
                                </p>
                                <p className="text-sm text-foreground/90 leading-relaxed">{item.status}</p>
                              </div>
                            )}

                            {item.href ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
                                dir="ltr"
                              >
                                {item.visitLabel ?? "Visit live site"}
                                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-500 group-hover/link:translate-x-0.5" />
                              </a>
                            ) : (
                              <p className="text-[11px] text-muted-foreground/70 inline-flex items-center gap-2">
                                <Lock className="w-3 h-3 text-primary-glow" />
                                {t.caseStudies.confidentialNote}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;