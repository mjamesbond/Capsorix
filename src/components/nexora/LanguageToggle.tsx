import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * LanguageToggle
 * ---------------
 * A single, fully-integrated control. Not a button, not a dropdown — a slim
 * instrument that lives inside the navbar's surface language.
 *
 * Anatomy:
 *   • Hairline pill aligned to the navbar's glass treatment
 *   • A precision gold thumb that travels under the active glyph
 *   • A vertical hairline divider — visible only at rest
 *   • Soft gold halo on hover (no flashing, no glow pulse)
 *   • Micro "snap" on toggle: thumb compresses 4% then returns
 */
const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  const isAr = lang === "ar";
  const thumbRef = useRef<HTMLSpanElement>(null);
  const firstRun = useRef(true);

  // Micro snap on toggle — runs only after the first paint.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const el = thumbRef.current;
    if (!el) return;
    el.classList.remove("lang-thumb-snap");
    // Force reflow so the animation can replay
    void el.offsetWidth;
    el.classList.add("lang-thumb-snap");
  }, [lang]);

  return (
    <div
      role="group"
      aria-label="Language"
      className={`lang-switch group relative inline-flex items-center h-8 w-[4.75rem] rounded-full ${className}`}
    >
      {/* Hairline shell — picks up the navbar's tone, never competes with it */}
      <span aria-hidden className="lang-switch__shell" />

      {/* Vertical divider — fades out under the thumb, present only at rest */}
      <span
        aria-hidden
        className="absolute top-1.5 bottom-1.5 left-1/2 -translate-x-1/2 w-px bg-border/50 transition-opacity duration-500 group-hover:opacity-0"
      />

      {/* Precision thumb */}
      <span
        ref={thumbRef}
        aria-hidden
        className="lang-switch__thumb"
        style={{ transform: isAr ? "translateX(100%)" : "translateX(0)" }}
      >
        <span className="lang-switch__thumb-inner" />
      </span>

      <button
        type="button"
        onClick={() => !isAr || setLang("en")}
        aria-pressed={!isAr}
        aria-label="Switch to English"
        className={`lang-switch__btn ${!isAr ? "is-active" : ""}`}
        dir="ltr"
      >
        <span className="text-[10px] font-semibold tracking-[0.22em]">EN</span>
      </button>
      <button
        type="button"
        onClick={() => isAr || setLang("ar")}
        aria-pressed={isAr}
        aria-label="التبديل إلى العربية"
        className={`lang-switch__btn ${isAr ? "is-active" : ""}`}
        dir="rtl"
      >
        <span className="text-[15px] font-semibold leading-none font-arabic">ع</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
