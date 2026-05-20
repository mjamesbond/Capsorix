import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Testimonials — a single, large quote at a time.
 *
 * One quote on screen keeps the page calm and lets each statement land.
 * Auto-advances every 9 seconds; pauses on user interaction so the
 * dot/arrow controls always feel like the source of truth.
 */
const Testimonials = () => {
  const { t, lang } = useI18n();
  const items = t.testimonials.items;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setIdx((n) => (n + 1) % items.length);
    }, 9000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const go = (delta: number) => {
    setPaused(true);
    setIdx((n) => (n + delta + items.length) % items.length);
  };

  const select = (i: number) => {
    setPaused(true);
    setIdx(i);
  };

  const current = items[idx];
  const isRtl = lang === "ar";

  return (
    <section className="relative section section-fade" data-lang={lang}>
      <div className="container">
        <Reveal className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">
            {t.testimonials.kicker}
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
            {t.testimonials.titleA}
            <span className="text-gradient-gold italic">{t.testimonials.titleB}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.testimonials.lead}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative max-w-4xl mx-auto">
            {/* Decorative oversized quote mark — anchored top-left (or top-right in RTL) */}
            <Quote
              aria-hidden
              className={`absolute -top-6 ${
                isRtl ? "-right-2 rotate-180" : "-left-2"
              } w-20 h-20 text-primary/20`}
              strokeWidth={1}
            />

            <article
              key={current.name}
              className="relative glass-strong rounded-3xl p-10 md:p-14 gold-border-glow shadow-elegant overflow-hidden animate-fade-in"
            >
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

              <div className="relative">
                <p className="font-display text-2xl md:text-[1.75rem] leading-[1.45] text-foreground/95 mb-10">
                  <span className="text-primary-glow">“</span>
                  {current.quote}
                  <span className="text-primary-glow">”</span>
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-gradient-gold-soft border border-primary/50 flex items-center justify-center gold-ring">
                    <span className="font-display text-sm text-primary-glow tracking-wider" dir="ltr">
                      {current.initials}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{current.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span>{current.role}</span>
                      <span className="mx-2 text-primary/50">·</span>
                      <span>{current.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.name}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`${i + 1} / ${items.length}`}
                    aria-current={i === idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === idx
                        ? "w-8 bg-gradient-gold shadow-gold"
                        : "w-3 bg-border/60 hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.testimonials.prev}
                  className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary-glow hover:border-primary/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.testimonials.next}
                  className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary-glow hover:border-primary/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;