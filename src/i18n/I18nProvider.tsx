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
const STORAGE_KEY = "capsorix-lang";
const LEGACY_STORAGE_KEY = "nexora-lang";

const isLang = (v: unknown): v is Lang => v === "ar" || v === "en" || v === "fr" || v === "de";

const getInitial = (): Lang => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  // Migrate any prior selection so returning visitors keep their language.
  const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (isLang(legacy)) {
    window.localStorage.setItem(STORAGE_KEY, legacy);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    return legacy;
  }
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("de")) return "de";
  return "en";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getInitial);
  const [transitioning, setTransitioning] = useState(false);

  // Apply <html lang/dir> + persist. Per-route <title>, meta description,
  // and og:* are owned by RouteSeo in App.tsx so each route can publish
  // its own metadata while still respecting the active language.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.dataset.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const localeMap: Record<Lang, string> = { en: "en_US", fr: "fr_FR", de: "de_DE", ar: "ar_AR" };
    if (ogLocale) ogLocale.setAttribute("content", localeMap[lang]);
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
        const order: Lang[] = ["en", "fr", "de", "ar"];
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
