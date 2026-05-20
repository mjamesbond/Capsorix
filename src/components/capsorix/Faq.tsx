import { useState } from "react";
import { Plus, ArrowRight, HelpCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * FAQ — quiet accordion answering the objections we hear most.
 *
 * One item open at a time keeps focus single-pointed. The plus icon
 * rotates 45° on open — no layout shift, no harsh chrome.
 */
const Faq = () => {
  const { t, lang } = useI18n();
  const items = t.faq.items;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section section-fade scroll-mt-24" data-lang={lang}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Header column */}
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">
              {t.faq.kicker}
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              {t.faq.titleA}
              <span className="text-gradient-gold italic">{t.faq.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">{t.faq.lead}</p>

            {/* Quiet CTA card */}
            <div className="hidden lg:block relative glass rounded-2xl p-6 border border-border/40 gold-border-glow">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-gold-soft border border-primary/40 flex items-center justify-center icon-tile">
                  <HelpCircle className="w-4 h-4 text-primary-glow" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground mb-3">{t.faq.stillCurious}</p>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 text-sm text-primary-glow font-medium"
                  >
                    {t.faq.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <Reveal stagger={80}>
              <ul className="space-y-3">
                {items.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <li
                      key={item.q}
                      className={`group glass rounded-2xl border transition-all duration-500 overflow-hidden ${
                        isOpen
                          ? "border-primary/40 gold-border-glow shadow-elegant"
                          : "border-border/50 hover:border-primary/25"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full text-start flex items-center gap-5 px-6 md:px-7 py-5 md:py-6"
                      >
                        <span
                          className={`shrink-0 font-mono text-[11px] tracking-widest tabular-nums transition-colors ${
                            isOpen ? "text-primary-glow" : "text-muted-foreground/70"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`flex-1 font-display text-lg md:text-xl leading-snug transition-colors ${
                            isOpen ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
                          }`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
                            isOpen
                              ? "rotate-45 border-primary/50 bg-primary/10 text-primary-glow"
                              : "border-border/60 text-muted-foreground"
                          }`}
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-700 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 md:px-7 pb-6 md:pb-7">
                            <div className="ms-9 border-s border-primary/20 ps-5">
                              <p className="text-[15px] text-muted-foreground leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Mobile-only CTA — keeps the desktop narrative-card hidden, surfaces the same intent on small screens */}
            <div className="lg:hidden mt-8 relative glass rounded-2xl p-5 border border-border/40 gold-border-glow flex items-center gap-4">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-gold-soft border border-primary/40 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-primary-glow" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{t.faq.stillCurious}</p>
              </div>
              <a
                href="#contact"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs text-primary-glow font-medium tracking-wide"
              >
                {t.faq.ctaLabel}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;