import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { subscribeScroll } from "@/lib/scroll-engine";
import { useI18n } from "@/i18n/I18nProvider";

const labels: Record<string, string> = {
  en: "Back to top",
  ar: "العودة للأعلى",
  fr: "Haut de page",
  de: "Nach oben",
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    return subscribeScroll(({ eased }) => {
      const next = eased > 600;
      setVisible((prev) => (prev === next ? prev : next));
    });
  }, []);

  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const label = labels[lang] ?? labels.en;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`fixed bottom-6 end-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full glass-strong border border-primary/30 text-primary-glow shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={1.6} />
    </button>
  );
};

export default BackToTop;
