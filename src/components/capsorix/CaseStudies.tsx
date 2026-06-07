import { useState } from "react";
import { ArrowRight, Lock, Smartphone, Tablet, MonitorSmartphone, Layers, ExternalLink, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import haqakLogo from "@/assets/haqak-logo.png.asset.json";
import elbakreyLogo from "@/assets/elbakrey-logo.png.asset.json";

/**
 * CaseStudies — flagship, expandable showcases.
 *
 * Each item collapses into a clean summary card; opening one reveals the
 * brief, our approach, the tech stack, and quantified outcomes.
 * Single source of truth — content lives in the localized dictionary.
 */
const ICONS = [Smartphone, Tablet, MonitorSmartphone];
const LOGOS: Record<string, { url: string }> = {
  haqak: haqakLogo,
  elbakrey: elbakreyLogo,
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
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="relative w-full text-start p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
                  >
                    {/* Numeral */}
                    <div className="shrink-0 flex items-center gap-5">
                      <span className="font-display text-3xl md:text-4xl text-gradient-gold tabular-nums leading-none">
                        0{i + 1}
                      </span>
                      <span className="hidden md:block w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>

                    {/* Icon tile */}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center icon-tile">
                      <Icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                    </div>

                    {/* Title block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-primary">
                          {item.tag}
                        </span>
                        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
                          <Lock className="w-3 h-3" />
                          {item.client}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Toggle indicator */}
                    <div className="shrink-0 self-start md:self-center">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted-foreground transition-all duration-500 ${
                          isOpen ? "rotate-90 border-primary/50 text-primary-glow bg-primary/5" : ""
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </span>
                    </div>
                  </button>

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

                            <p className="text-[11px] text-muted-foreground/70 inline-flex items-center gap-2">
                              <Lock className="w-3 h-3 text-primary-glow" />
                              {t.caseStudies.confidentialNote}
                            </p>
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