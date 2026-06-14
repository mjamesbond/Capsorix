import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { loadDict, peekDict, type Dict, type Lang } from "./dictionary";

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

const INITIAL_LANG = getInitial();
// Kick the active locale chunk off the wire as soon as the module evaluates,
// well before React mounts — the dict is usually ready before first paint.
const initialDictPromise = loadDict(INITIAL_LANG);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(INITIAL_LANG);
  const [dict, setDict] = useState<Dict | null>(() => peekDict(INITIAL_LANG) ?? null);
  const pendingLang = useRef<Lang | null>(null);

  // Resolve the initial dict (it was kicked off at module load).
  useEffect(() => {
    if (dict) return;
    let cancelled = false;
    initialDictPromise.then((d) => {
      if (!cancelled) setDict(d);
    });
    return () => { cancelled = true; };
  }, [dict]);

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
    pendingLang.current = next;
    // Brief, controlled crossfade — handled via a body class. We hold the
    // visible swap until the next locale's chunk is loaded so the UI never
    // shows half-translated text.
    document.body.classList.add("lang-switching");
    loadDict(next).then((d) => {
      if (pendingLang.current !== next) return;
      window.setTimeout(() => {
        setDict(d);
        setLangState(next);
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            document.body.classList.remove("lang-switching");
          }, 320);
        });
      }, 220);
    });
  };

  const value = useMemo<I18nCtx | null>(
    () => {
      if (!dict) return null;
      return {
        lang,
        dir: lang === "ar" ? "rtl" : "ltr",
        t: dict,
        setLang,
        toggle: () => {
          const order: Lang[] = ["en", "fr", "de", "ar"];
          const idx = order.indexOf(lang);
          setLang(order[(idx + 1) % order.length]);
        },
      };
    },
    [lang, dict],
  );

  // Hold the first paint of children until the initial locale is ready.
  // This is a single ~25KB chunk that downloads in parallel with everything
  // else, so the wait is typically zero on warm caches.
  if (!value) return null;

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
};
