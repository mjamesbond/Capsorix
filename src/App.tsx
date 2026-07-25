import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ScrollProgress from "./components/capsorix/ScrollProgress";
import CookieConsent from "./components/capsorix/CookieConsent";
import SkipLink from "./components/capsorix/SkipLink";
import SubpageSkeleton from "./components/capsorix/SubpageSkeleton";
import PerfHud from "./components/capsorix/PerfHud";
import BackToTop from "./components/capsorix/BackToTop";
import { I18nProvider, useI18n } from "./i18n/I18nProvider";
import type { Lang } from "./i18n/dictionary";
import { ThemeProvider } from "./theme/ThemeProvider";

// Subpages and the 404 are deferred — the landing page stays the only
// thing in the initial bundle, keeping first paint lean.
const IOS = lazy(() => import("./pages/IOS.tsx"));
const Android = lazy(() => import("./pages/Android.tsx"));
const Web = lazy(() => import("./pages/Web.tsx"));
const WorkplaceCulture = lazy(() => import("./pages/WorkplaceCulture.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const CompanyValues = lazy(() => import("./pages/CompanyValues.tsx"));
const ChoosingSoftwarePartner = lazy(() => import("./pages/ChoosingSoftwarePartner.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
// NeuralLayer is heavy (canvas + rAF). Defer until the browser is idle so
// it never delays first paint or blocks initial interaction.
const NeuralLayer = lazy(() => import("./components/capsorix/NeuralLayer"));

const RouteFallback = () => <SubpageSkeleton />;

/** Mount a child only after the browser is idle / first paint is done. */
const DeferredMount = ({ children, delay = 600 }: { children: React.ReactNode; delay?: number }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cancel) cancel(id);
      };
    }
    const t = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  if (!ready) return null;
  return <>{children}</>;
};

const queryClient = new QueryClient();

type RouteKey = "home" | "ios" | "android" | "web" | "workplace" | "careers" | "values" | "notfound";

const ROUTE_META: Record<RouteKey, Record<Lang, { title: string; description: string }>> = {
  home: {
    en: { title: "Capsorix — Premium Software Studio for iOS, Android & Web", description: "Capsorix builds elite iOS, Android, and web platforms end-to-end. Senior-led product engineering, designed and shipped with care." },
    fr: { title: "Capsorix — Studio logiciel premium iOS, Android & Web", description: "Capsorix conçoit des applications iOS, Android et plateformes web haut de gamme, de bout en bout. Ingénierie produit par une équipe senior." },
    de: { title: "Capsorix — Premium-Softwarestudio für iOS, Android & Web", description: "Capsorix entwickelt erstklassige iOS-, Android- und Web-Plattformen end-to-end. Produkt-Engineering aus einer Hand von Senior-Ingenieuren." },
    ar: { title: "كابسوريكس — استوديو برمجيات iOS وأندرويد والويب", description: "تبني كابسوريكس تطبيقات iOS وأندرويد ومنصات ويب من الطراز الرفيع، بقيادة مهندسين كبار من الفكرة إلى الإطلاق." },
  },
  ios: {
    en: { title: "iOS App Development — Capsorix", description: "Native Swift and SwiftUI apps engineered to Apple's bar. Capsorix ships considered iOS products from concept to App Store launch." },
    fr: { title: "Développement d'applications iOS — Capsorix", description: "Applications iOS natives en Swift et SwiftUI, conçues au niveau d'Apple. Capsorix livre des produits iOS soignés, du concept à l'App Store." },
    de: { title: "iOS-App-Entwicklung — Capsorix", description: "Native iOS-Apps mit Swift und SwiftUI, gebaut nach Apples Standard. Capsorix liefert durchdachte iOS-Produkte bis zum App-Store-Launch." },
    ar: { title: "تطوير تطبيقات iOS — كابسوريكس", description: "تطبيقات iOS أصلية بـ Swift و SwiftUI مهندسة على معايير آبل. تصمّم كابسوريكس وتطلق منتجات iOS متقنة حتى متجر التطبيقات." },
  },
  android: {
    en: { title: "Android App Development — Capsorix", description: "Kotlin and Jetpack Compose apps with clean architecture and Material 3 polish. Capsorix delivers Android products built to last." },
    fr: { title: "Développement d'applications Android — Capsorix", description: "Applications Kotlin et Jetpack Compose à l'architecture propre et au design Material 3. Capsorix livre des produits Android durables." },
    de: { title: "Android-App-Entwicklung — Capsorix", description: "Android-Apps mit Kotlin und Jetpack Compose, sauberer Architektur und Material-3-Finish. Capsorix liefert langlebige Android-Produkte." },
    ar: { title: "تطوير تطبيقات أندرويد — كابسوريكس", description: "تطبيقات أندرويد بـ Kotlin و Jetpack Compose بمعمارية نظيفة وتشطيب Material 3. تقدّم كابسوريكس منتجات أندرويد مصممة لتدوم." },
  },
  web: {
    en: { title: "Web Platform Engineering — Capsorix", description: "Production-grade websites, dashboards, and web platforms. Capsorix engineers fast, beautiful, conversion-focused web experiences." },
    fr: { title: "Ingénierie de plateformes web — Capsorix", description: "Sites, dashboards et plateformes web de niveau production. Capsorix conçoit des expériences web rapides, élégantes et orientées conversion." },
    de: { title: "Webplattform-Engineering — Capsorix", description: "Produktionsreife Websites, Dashboards und Web-Plattformen. Capsorix entwickelt schnelle, ästhetische und conversion-starke Web-Erlebnisse." },
    ar: { title: "هندسة منصات الويب — كابسوريكس", description: "مواقع ولوحات تحكم ومنصات ويب جاهزة للإنتاج. تهندس كابسوريكس تجارب ويب سريعة وأنيقة تركّز على التحويل." },
  },
  workplace: {
    en: { title: "Workplace & Culture — Capsorix", description: "Inside Capsorix: our remote-first culture, workplace policies, growth model, values, and the standards behind every product we build." },
    fr: { title: "Culture d'entreprise — Capsorix", description: "Découvrez la culture Capsorix: travail remote-first, politique d'équipe, croissance professionnelle et standards d'exécution." },
    de: { title: "Arbeitskultur — Capsorix", description: "Einblick in Capsorix: Remote-First-Kultur, Arbeitsplatzprinzipien, Wachstum und Werte für exzellente Produktarbeit." },
    ar: { title: "بيئة وثقافة العمل — كابسوريكس", description: "تعرّف على ثقافة كابسوريكس: بيئة عمل عن بُعد، معايير تنفيذ عالية، تطوير مهني، وقيم واضحة." },
  },
  careers: {
    en: { title: "Careers — Capsorix", description: "Join Capsorix. Explore open roles, our hiring process, and how we build high-trust teams for premium digital products." },
    fr: { title: "Carrières — Capsorix", description: "Rejoignez Capsorix. Consultez nos opportunités, notre processus de recrutement et notre culture d'excellence." },
    de: { title: "Karriere — Capsorix", description: "Arbeiten bei Capsorix: offene Rollen, Hiring-Prozess und ein Team mit hoher Verantwortung und klaren Standards." },
    ar: { title: "الوظائف — كابسوريكس", description: "انضم إلى كابسوريكس. اطّلع على الفرص المتاحة وآلية التوظيف وثقافة العمل المبنية على الثقة والمسؤولية." },
  },
  values: {
    en: { title: "Company Values — Capsorix", description: "The Capsorix values framework: principles, behaviors, and accountability standards that guide how we design, build, and lead." },
    fr: { title: "Valeurs d'entreprise — Capsorix", description: "Le cadre de valeurs Capsorix: principes concrets, comportements attendus et culture de responsabilité." },
    de: { title: "Unternehmenswerte — Capsorix", description: "Das Werte-Framework von Capsorix: Prinzipien, Verhaltensweisen und Verantwortungsstandards." },
    ar: { title: "قيم الشركة — كابسوريكس", description: "إطار قيم كابسوريكس: مبادئ واضحة وسلوكيات عملية ومعايير للمسؤولية وجودة التنفيذ." },
  },
  notfound: {
    en: { title: "Page Not Found — Capsorix", description: "The page you requested could not be found. Return to Capsorix to explore our premium iOS, Android, and web engagements." },
    fr: { title: "Page introuvable — Capsorix", description: "La page demandée est introuvable. Retournez à Capsorix pour découvrir nos prestations iOS, Android et web haut de gamme." },
    de: { title: "Seite nicht gefunden — Capsorix", description: "Die angeforderte Seite wurde nicht gefunden. Zurück zu Capsorix für unsere Premium-iOS-, Android- und Web-Projekte." },
    ar: { title: "الصفحة غير موجودة — كابسوريكس", description: "الصفحة المطلوبة غير موجودة. عُد إلى كابسوريكس لاستكشاف أعمالنا المميزة في iOS وأندرويد والويب." },
  },
};

const routeKeyFromPath = (pathname: string): RouteKey => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return "home";
  if (clean === "/ios") return "ios";
  if (clean === "/android") return "android";
  if (clean === "/web") return "web";
  if (clean === "/workplace-culture") return "workplace";
  if (clean === "/careers") return "careers";
  if (clean === "/company-values") return "values";
  return "notfound";
};

const ROUTE_OG_IMAGES: Record<RouteKey, string> = {
  home: "https://capsorix.tech/og.webp",
  ios: "https://capsorix.tech/og.webp",
  android: "https://capsorix.tech/og.webp",
  web: "https://capsorix.tech/og.webp",
  workplace: "https://capsorix.tech/og.webp",
  careers: "https://capsorix.tech/og.webp",
  values: "https://capsorix.tech/og.webp",
  notfound: "https://capsorix.tech/og.webp",
};

const upsertRouteJsonLd = (path: string, key: RouteKey, lang: Lang) => {
  const existing = document.getElementById("route-jsonld");
  const inLanguage = lang === "ar" ? "ar" : lang === "fr" ? "fr" : lang === "de" ? "de" : "en";
  const baseGraph = [
    {
      "@type": "Organization",
      "@id": "https://capsorix.tech/#organization",
      name: "Capsorix",
      url: "https://capsorix.tech/",
      logo: "https://capsorix.tech/favicon.png",
      sameAs: ["https://www.linkedin.com/company/capsorix", "https://x.com/capsorix"],
    },
  ];

  const pageNode = {
    "@type": "WebPage",
    "@id": `https://capsorix.tech${path}#webpage`,
    url: `https://capsorix.tech${path}`,
    name: ROUTE_META[key][lang].title,
    description: ROUTE_META[key][lang].description,
    inLanguage,
    isPartOf: { "@id": "https://capsorix.tech/#website" },
    about: { "@id": "https://capsorix.tech/#organization" },
  };

  const graph = [...baseGraph, pageNode];
  if (key === "careers") {
    graph.push({
      "@type": "JobPosting",
      title: "Senior Product Engineer (Open Application)",
      description:
        "Build premium web and product systems at Capsorix with full-cycle ownership, remote-first collaboration, and high-quality engineering standards.",
      datePosted: "2026-01-01",
      validThrough: "2027-01-01T23:59",
      employmentType: "FULL_TIME",
      hiringOrganization: { "@id": "https://capsorix.tech/#organization" },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
      directApply: true,
    });
  }

  const schema = { "@context": "https://schema.org", "@graph": graph };
  if (existing) {
    existing.textContent = JSON.stringify(schema);
    return;
  }
  const script = document.createElement("script");
  script.id = "route-jsonld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const RouteSeo = () => {
  const { pathname } = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const canonicalUrl = `${window.location.origin}${path}`;
    const key = routeKeyFromPath(pathname);
    const { title, description } = ROUTE_META[key][lang];

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", ROUTE_OG_IMAGES[key]);
    setMeta('meta[name="twitter:image"]', "content", ROUTE_OG_IMAGES[key]);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    upsertRouteJsonLd(path, key, lang);
  }, [pathname, lang]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteSeo />
            <SkipLink />
            <DeferredMount>
              <Suspense fallback={null}>
                <NeuralLayer />
              </Suspense>
            </DeferredMount>
            <ScrollProgress />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ios" element={<IOS />} />
                <Route path="/android" element={<Android />} />
                <Route path="/web" element={<Web />} />
                <Route path="/workplace-culture" element={<WorkplaceCulture />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/company-values" element={<CompanyValues />} />
                <Route path="/guides/how-to-choose-a-software-development-company" element={<ChoosingSoftwarePartner />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
            <BackToTop />
            <PerfHud />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
