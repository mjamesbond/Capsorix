import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { dict, type Dict, type Lang } from "./dictionary";

interface I18nCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "nexora-lang";

const getInitial = (): Lang => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ar" || stored === "en" || stored === "fr") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("fr")) return "fr";
  return "en";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getInitial);
  const [transitioning, setTransitioning] = useState(false);

  // Apply <html lang/dir> + persist
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.dataset.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: Lang) => {
    if (next === lang) return;
    // Brief, controlled crossfade — handled via a body class.
    setTransitioning(true);
    document.body.classList.add("lang-switching");
    window.setTimeout(() => {
      setLangState(next);
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          document.body.classList.remove("lang-switching");
          setTransitioning(false);
        }, 320);
      });
    }, 220);
  };

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: dict[lang],
      setLang,
      toggle: () => {
        const order: Lang[] = ["en", "fr", "ar"];
        const idx = order.indexOf(lang);
        setLang(order[(idx + 1) % order.length]);
      },
    }),
    [lang],
  );

  // Suppress lint: transitioning intentionally unused outside body class.
  void transitioning;

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
};
