import { useI18n } from "@/i18n/I18nProvider";
import type { Lang } from "@/i18n/dictionary";

/**
 * SkipLink — invisible until focused, then surfaces as a polished
 * gold pill in the top-left (top-right in RTL). Lets keyboard and
 * screen-reader users bypass the navbar and jump straight to the
 * page's primary content. Required for WCAG 2.4.1 (Bypass Blocks).
 *
 * Why this lives outside the i18n dictionary:
 *   This is the only piece of chrome that must render before the
 *   I18nProvider is fully painted on first focus. Keeping the labels
 *   inline avoids type-bloating the four-language Dict for a single
 *   ten-character string and isolates a11y from translation churn.
 */
const LABELS: Record<Lang, string> = {
  en: "Skip to content",
  fr: "Aller au contenu",
  de: "Zum Inhalt springen",
  ar: "تخطّي إلى المحتوى",
};

const SkipLink = () => {
  const { lang } = useI18n();
  return (
    <a
      href="#main"
      className="skip-link"
      // Native anchor focus is enough; no JS hijacking — the browser
      // moves both focus and scroll to #main on activation.
    >
      {LABELS[lang]}
    </a>
  );
};

export default SkipLink;
