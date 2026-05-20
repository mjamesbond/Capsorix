import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/theme/ThemeProvider";
import { useI18n } from "@/i18n/I18nProvider";

const COPY = {
  en: { day: "Day", night: "Night", aria: (next: string) => `Switch to ${next} mode` },
  ar: { day: "نهار", night: "ليل", aria: (next: string) => `التبديل إلى الوضع ${next}` },
  fr: { day: "Jour", night: "Nuit", aria: (next: string) => `Passer au mode ${next}` },
  de: { day: "Tag", night: "Nacht", aria: (next: string) => `In den ${next}-Modus wechseln` },
};

/**
 * Premium theme toggle — a single bespoke control matching the Capsorix
 * language switcher: glass rail + animated gold thumb that slides between
 * Sun and Moon. Persists, honours OS preference (via ThemeProvider), and
 * announces state changes for assistive tech.
 */
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const { lang } = useI18n();
  const copy = COPY[lang] ?? COPY.en;
  const isDark = theme === "dark";

  // Drives a one-shot snap micro-animation on the thumb each toggle —
  // never on initial paint so the navbar feels still on first load.
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (!snap) return;
    const id = window.setTimeout(() => setSnap(false), 600);
    return () => window.clearTimeout(id);
  }, [snap]);

  const onClick = () => {
    setSnap(true);
    toggle();
  };

  const nextLabel = isDark ? copy.day : copy.night;

  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={isDark}
      aria-label={copy.aria(nextLabel)}
      title={copy.aria(nextLabel)}
      className={`theme-switch lang-switch ${snap ? "lang-thumb-snap" : ""}`}
    >
      <span className="lang-switch__shell" aria-hidden />
      <span
        className="lang-switch__thumb"
        aria-hidden
        style={{
          // The rail has two equal slots — slide the thumb between them.
          // Direction-aware: in RTL the geometry naturally mirrors because
          // the rail itself is logically positioned.
          transform: isDark ? "translateX(100%)" : "translateX(0%)",
        }}
      >
        <span className="lang-switch__thumb-inner" />
      </span>

      <span
        className={`lang-switch__btn ${!isDark ? "is-active" : ""}`}
        aria-hidden
      >
        <Sun className="w-3.5 h-3.5" strokeWidth={2} />
      </span>
      <span
        className={`lang-switch__btn ${isDark ? "is-active" : ""}`}
        aria-hidden
      >
        <Moon className="w-3.5 h-3.5" strokeWidth={2} />
      </span>
    </button>
  );
};

export default ThemeToggle;
