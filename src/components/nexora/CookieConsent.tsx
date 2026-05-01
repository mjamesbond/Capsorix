import { useEffect, useState } from "react";
import { Cookie, Check, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Capsorix cookie banner — minimal, GDPR-friendly, single source of truth.
 *
 * The site itself uses only one essential cookie (the language preference),
 * so the banner is purely an acknowledgement, not a preferences panel.
 * Either action records the user's choice and dismisses the banner forever.
 *
 * Surfaces:
 *  - Bottom-anchored card on desktop and mobile, never overlapping the form CTA.
 *  - Restrained gold accent, glass surface — same grammar as the rest of the site.
 *  - Slow, controlled fade-in 700 ms after first paint so it doesn't fight the hero.
 */
const STORAGE_KEY = "capsorix-cookie-consent";

const CookieConsent = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return; // Privacy mode — never show.
    }
    const id = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  const close = (choice: "accepted" | "essential") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }));
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.title}
      className="fixed inset-x-0 bottom-0 z-[55] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none animate-fade-in"
    >
      <div className="container max-w-5xl pointer-events-auto">
        <div className="relative glass-strong rounded-2xl border border-border/50 gold-border-glow shadow-elegant overflow-hidden">
          {/* Top gold hairline */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <span className="mt-0.5 w-10 h-10 shrink-0 rounded-xl bg-gradient-gold-soft border border-primary/50 flex items-center justify-center gold-ring">
                <Cookie className="w-4 h-4 text-primary-glow" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">{t.cookies.title}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {t.cookies.body}
                  <span className="text-foreground/90">{t.cookies.bodyStrong}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto">
              <button
                type="button"
                onClick={() => close("essential")}
                className="inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t.cookies.decline}
              </button>
              <button
                type="button"
                onClick={() => close("accepted")}
                className="btn-shimmer inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-full bg-gold-animated px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.02] gold-ring"
              >
                <Check className="w-3.5 h-3.5" />
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;