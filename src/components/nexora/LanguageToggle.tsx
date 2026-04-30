import { useI18n } from "@/i18n/I18nProvider";

/**
 * LanguageToggle — a single elegant pill with a sliding gold thumb.
 * Two characters only: EN / ع. No dropdown, no labels, no flags.
 */
const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex items-center h-9 w-[5.25rem] rounded-full glass-strong gold-border-glow overflow-hidden ${className}`}
    >
      {/* Sliding gold thumb */}
      <span
        aria-hidden
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-gold shadow-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: "0.25rem",
          transform: isAr ? "translateX(100%)" : "translateX(0)",
        }}
      />

      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isAr}
        className={`relative z-10 flex-1 h-full text-[11px] font-semibold tracking-[0.2em] transition-colors duration-500 ${
          !isAr ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
        }`}
        dir="ltr"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={isAr}
        className={`relative z-10 flex-1 h-full text-base font-semibold transition-colors duration-500 font-arabic ${
          isAr ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
        }`}
        dir="rtl"
      >
        ع
      </button>
    </div>
  );
};

export default LanguageToggle;
