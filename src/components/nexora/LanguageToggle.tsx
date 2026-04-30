import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { Lang } from "@/i18n/dictionary";

/**
 * LanguageToggle — Quadrilingual segmented instrument.
 * ---------------------------------------------------
 * Four states, one continuous surface. The gold thumb travels precisely
 * under the active glyph (1/4 width, snapping at 0% / 100% / 200% / 300%).
 *
 *   [  EN  ·  FR  ·  DE  ·  ع  ]
 *
 * Each label keeps its own typographic voice — Latin for EN/FR/DE,
 * Arabic letterform for AR — so every glyph reads as native at rest.
 * Hairline dividers fade away on hover; the thumb performs a subtle
 * compression snap (≈4%) when the language flips.
 */

const ORDER: Lang[] = ["en", "fr", "de", "ar"];

const labelFor = (l: Lang) => {
  if (l === "en")
    return {
      text: "EN",
      className: "text-[10px] font-semibold tracking-[0.22em]",
      dir: "ltr" as const,
      aria: "Switch to English",
    };
  if (l === "fr")
    return {
      text: "FR",
      className: "text-[10px] font-semibold tracking-[0.22em]",
      dir: "ltr" as const,
      aria: "Passer en français",
    };
  if (l === "de")
    return {
      text: "DE",
      className: "text-[10px] font-semibold tracking-[0.22em]",
      dir: "ltr" as const,
      aria: "Auf Deutsch umschalten",
    };
  return {
    text: "ع",
    className: "text-[15px] font-semibold leading-none font-arabic",
    dir: "rtl" as const,
    aria: "التبديل إلى العربية",
  };
};

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  const idx = Math.max(0, ORDER.indexOf(lang));
  const thumbRef = useRef<HTMLSpanElement>(null);
  const firstRun = useRef(true);

  // Micro-snap on toggle — skip first paint so the thumb just lands.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const el = thumbRef.current;
    if (!el) return;
    el.classList.remove("lang-thumb-snap");
    void el.offsetWidth; // force reflow
    el.classList.add("lang-thumb-snap");
  }, [lang]);

  return (
    <div
      role="group"
      aria-label="Language"
      className={`lang-switch lang-switch--quad group relative inline-flex items-center h-8 w-[9.5rem] rounded-full ${className}`}
    >
      {/* Hairline shell */}
      <span aria-hidden className="lang-switch__shell" />

      {/* Three vertical hairlines — fade out on hover */}
      <span
        aria-hidden
        className="absolute top-1.5 bottom-1.5 left-1/4 w-px bg-border/50 transition-opacity duration-500 group-hover:opacity-0"
      />
      <span
        aria-hidden
        className="absolute top-1.5 bottom-1.5 left-2/4 w-px bg-border/50 transition-opacity duration-500 group-hover:opacity-0"
      />
      <span
        aria-hidden
        className="absolute top-1.5 bottom-1.5 left-3/4 w-px bg-border/50 transition-opacity duration-500 group-hover:opacity-0"
      />

      {/* Precision thumb — 1/4 width, slides between four positions */}
      <span
        ref={thumbRef}
        aria-hidden
        className="lang-switch__thumb lang-switch__thumb--quad"
        style={{ transform: `translateX(${idx * 100}%)` }}
      >
        <span className="lang-switch__thumb-inner" />
      </span>

      {ORDER.map((l) => {
        const { text, className: cls, dir, aria } = labelFor(l);
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => !active && setLang(l)}
            aria-pressed={active}
            aria-label={aria}
            className={`lang-switch__btn lang-switch__btn--quad ${active ? "is-active" : ""}`}
            dir={dir}
          >
            <span className={cls}>{text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
