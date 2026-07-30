import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index.tsx";
import ScrollProgress from "./components/capsorix/ScrollProgress";
import CookieConsent from "./components/capsorix/CookieConsent";
import SkipLink from "./components/capsorix/SkipLink";
import SubpageSkeleton from "./components/capsorix/SubpageSkeleton";
import PerfHudGate from "./components/capsorix/PerfHudGate";
import BackToTop from "./components/capsorix/BackToTop";
import { I18nProvider, useI18n } from "./i18n/I18nProvider";
import type { Lang } from "./i18n/dictionary";
import { ThemeProvider } from "./theme/ThemeProvider";
import { usePerformanceProfile } from "./hooks/use-performance-profile";
import { articles } from "virtual:knowledge-manifest";
import type { KnowledgeArticle } from "./knowledge/schema";

const CANONICAL_ORIGIN = "https://capsorix.tech";

// Subpages and the 404 are deferred — the landing page stays the only
// thing in the initial bundle, keeping first paint lean.
const IOS = lazy(() => import("./pages/IOS.tsx"));
const Android = lazy(() => import("./pages/Android.tsx"));
const Web = lazy(() => import("./pages/Web.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const WorkplaceCulture = lazy(() => import("./pages/WorkplaceCulture.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const CompanyValues = lazy(() => import("./pages/CompanyValues.tsx"));
const ChoosingSoftwarePartner = lazy(() => import("./pages/ChoosingSoftwarePartner.tsx"));
const KnowledgeLanding = lazy(() => import("./pages/knowledge/KnowledgeLanding.tsx"));
const CanonIndex = lazy(() => import("./pages/knowledge/CanonIndex.tsx"));
const CanonArticle = lazy(() => import("./pages/knowledge/CanonArticle.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
// NeuralLayer is heavy (canvas + rAF). It is loaded only on capable desktop
// devices and still waits until the browser is idle.
const NeuralLayer = lazy(() => import("./components/capsorix/NeuralLayer"));

const RouteFallback = () => <SubpageSkeleton />;

/** Mount a child only after first paint, and only when the profile allows it. */
const DeferredMount = ({
  children,
  delay = 900,
  enabled = true,
}: {
  children: React.ReactNode;
  delay?: number;
  enabled?: boolean;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1800 });
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cancel) cancel(id);
      };
    }

    const timer = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, enabled]);

  if (!enabled || !ready) return null;
  return <>{children}</>;
};

type RouteKey =
  | "home"
  | "ios"
  | "android"
  | "web"
  | "about"
  | "workplace"
  | "careers"
  | "values"
  | "guide"
  | "knowledge"
  | "canon"
  | "article"
  | "notfound";

type RouteMeta = { title: string; description: string };

const ROUTE_META: Record<RouteKey, Record<Lang, RouteMeta>> = {
  home: {
    en: {
      title: "Capsorix — Strategy, Design & Engineering for Ambitious Digital Products",
      description:
        "Capsorix is a technology and innovation engineering studio helping ambitious businesses determine what should be built, why it matters, and how it should work before design or development begins.",
    },
    fr: {
      title: "Capsorix — Stratégie, design et ingénierie de produits numériques",
      description:
        "Capsorix est un studio de technologie et d’ingénierie de l’innovation qui aide les entreprises ambitieuses à décider quoi construire, pourquoi et comment.",
    },
    de: {
      title: "Capsorix — Strategie, Design und Engineering digitaler Produkte",
      description:
        "Capsorix ist ein Studio für Technologie und Innovationsengineering, das ambitionierten Unternehmen hilft zu entscheiden, was gebaut werden soll, warum und wie.",
    },
    ar: {
      title: "كابسوريكس — الاستراتيجية والتصميم وهندسة المنتجات الرقمية",
      description:
        "كابسوريكس استوديو للتكنولوجيا وهندسة الابتكار يساعد الشركات الطموحة على تحديد ما ينبغي بناؤه، ولماذا، وكيف يجب أن يعمل قبل بدء التصميم أو التطوير.",
    },
  },
  ios: {
    en: { title: "iOS App Development — Capsorix", description: "Native Swift and SwiftUI apps engineered to Apple's bar. Capsorix ships considered iOS products from concept to App Store launch." },
    fr: { title: "Développement d'applications iOS — Capsorix", description: "Applications iOS natives en Swift et SwiftUI, conçues au niveau d'Apple. Capsorix livre des produits iOS soignés, du concept à l'App Store." },
    de: { title: "iOS-App-Entwicklung — Capsorix", description: "Native iOS-Apps mit Swift und SwiftUI, gebaut nach Apples Standard. Capsorix liefert durchdachte iOS-Produkte bis zum App-Store-Launch." },
    ar: { title: "تطوير تطبيقات iOS — كابسوريكس", description: "تطبيقات iOS أصلية بـ Swift وSwiftUI مهندسة على معايير آبل. تصمّم كابسوريكس وتطلق منتجات iOS متقنة حتى متجر التطبيقات." },
  },
  android: {
    en: { title: "Android App Development — Capsorix", description: "Kotlin and Jetpack Compose apps with clean architecture and Material 3 polish. Capsorix delivers Android products built to last." },
    fr: { title: "Développement d'applications Android — Capsorix", description: "Applications Kotlin et Jetpack Compose à l'architecture propre et au design Material 3. Capsorix livre des produits Android durables." },
    de: { title: "Android-App-Entwicklung — Capsorix", description: "Android-Apps mit Kotlin und Jetpack Compose, sauberer Architektur und Material-3-Finish. Capsorix liefert langlebige Android-Produkte." },
    ar: { title: "تطوير تطبيقات أندرويد — كابسوريكس", description: "تطبيقات أندرويد بـ Kotlin وJetpack Compose بمعمارية نظيفة وتشطيب Material 3. تقدّم كابسوريكس منتجات أندرويد مصممة لتدوم." },
  },
  web: {
    en: { title: "Web Platform Engineering — Capsorix", description: "Production-grade websites, dashboards, and web platforms. Capsorix engineers fast, beautiful, conversion-focused web experiences." },
    fr: { title: "Ingénierie de plateformes web — Capsorix", description: "Sites, dashboards et plateformes web de niveau production. Capsorix conçoit des expériences web rapides, élégantes et orientées conversion." },
    de: { title: "Webplattform-Engineering — Capsorix", description: "Produktionsreife Websites, Dashboards und Web-Plattformen. Capsorix entwickelt schnelle, ästhetische und conversion-starke Web-Erlebnisse." },
    ar: { title: "هندسة منصات الويب — كابسوريكس", description: "مواقع ولوحات تحكم ومنصات ويب جاهزة للإنتاج. تهندس كابسوريكس تجارب ويب سريعة وأنيقة تركّز على التحويل." },
  },
  about: {
    en: { title: "About Capsorix — Product Engineering Philosophy", description: "A cinematic manifesto of how Capsorix thinks, what we build, what we refuse, and why ambitious companies trust our AI-driven product engineering studio." },
    fr: { title: "À propos de Capsorix — Philosophie d'ingénierie produit", description: "Un manifeste interactif sur la façon dont Capsorix pense, construit et prend des décisions produit durables." },
    de: { title: "Über Capsorix — Produkt-Engineering-Philosophie", description: "Ein interaktives Manifest darüber, wie Capsorix denkt, baut und warum anspruchsvolle Unternehmen auf unsere Produktarbeit setzen." },
    ar: { title: "عن كابسوريكس — فلسفة هندسة المنتجات", description: "تجربة تفاعلية توضّح كيف نفكّر في كابسوريكس، وما الذي نبنيه، وما الذي نرفض بناءه، ولماذا تثق بنا الشركات الطموحة." },
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
  guide: {
    en: {
      title: "How to Choose a Software Development Company — Capsorix",
      description:
        "A practical guide to choosing a software development company by evaluating process clarity, senior execution, ownership, design maturity, performance and long-term support.",
    },
    fr: {
      title: "Comment choisir une société de développement logiciel — Capsorix",
      description:
        "Un guide pratique pour évaluer le processus, l’équipe senior, la propriété, la qualité du design, les performances et le support à long terme.",
    },
    de: {
      title: "So wählen Sie ein Softwareentwicklungsunternehmen — Capsorix",
      description:
        "Ein praktischer Leitfaden zur Bewertung von Prozessklarheit, Seniorität, Eigentum, Designreife, Leistung und langfristigem Support.",
    },
    ar: {
      title: "كيف تختار شركة تطوير برمجيات — كابسوريكس",
      description:
        "دليل عملي لاختيار شركة تطوير برمجيات من خلال تقييم وضوح العملية، وخبرة المنفذين، والملكية، ونضج التصميم، والأداء، والدعم طويل الأجل.",
    },
  },
  knowledge: {
    en: { title: "Knowledge | Capsorix", description: "The Capsorix institutional knowledge system for Canon, Concepts, Methods, Research, Projects, and Cases." },
    fr: { title: "Knowledge | Capsorix", description: "The Capsorix institutional knowledge system." },
    de: { title: "Knowledge | Capsorix", description: "The Capsorix institutional knowledge system." },
    ar: { title: "Knowledge | Capsorix", description: "The Capsorix institutional knowledge system." },
  },
  canon: {
    en: { title: "Foundational Canon | Capsorix", description: "The ordered foundational Canon of the Capsorix Knowledge Platform." },
    fr: { title: "Foundational Canon | Capsorix", description: "The ordered Capsorix Canon." },
    de: { title: "Foundational Canon | Capsorix", description: "The ordered Capsorix Canon." },
    ar: { title: "Foundational Canon | Capsorix", description: "The ordered Capsorix Canon." },
  },
  article: {
    en: { title: "Canon Article | Capsorix", description: "A foundational Capsorix Canon article." },
    fr: { title: "Canon Article | Capsorix", description: "A foundational Capsorix Canon article." },
    de: { title: "Canon Article | Capsorix", description: "A foundational Capsorix Canon article." },
    ar: { title: "Canon Article | Capsorix", description: "A foundational Capsorix Canon article." },
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
  if (clean === "/about") return "about";
  if (clean === "/workplace-culture") return "workplace";
  if (clean === "/careers") return "careers";
  if (clean === "/company-values") return "values";
  if (clean === "/guides/how-to-choose-a-software-development-company") return "guide";
  if (clean === "/knowledge") return "knowledge";
  if (clean === "/knowledge/canon") return "canon";
  if (clean.startsWith("/knowledge/canon/")) return "article";
  return "notfound";
};

const ROUTE_OG_IMAGES: Record<RouteKey, string> = {
  home: `${CANONICAL_ORIGIN}/og.webp`,
  ios: `${CANONICAL_ORIGIN}/og.webp`,
  android: `${CANONICAL_ORIGIN}/og.webp`,
  web: `${CANONICAL_ORIGIN}/og.webp`,
  about: `${CANONICAL_ORIGIN}/og.webp`,
  workplace: `${CANONICAL_ORIGIN}/og.webp`,
  careers: `${CANONICAL_ORIGIN}/og.webp`,
  values: `${CANONICAL_ORIGIN}/og.webp`,
  guide: `${CANONICAL_ORIGIN}/og.webp`,
  knowledge: `${CANONICAL_ORIGIN}/og.webp`,
  canon: `${CANONICAL_ORIGIN}/og.webp`,
  article: `${CANONICAL_ORIGIN}/og.webp`,
  notfound: `${CANONICAL_ORIGIN}/og.webp`,
};

const upsertRouteJsonLd = (path: string, key: RouteKey, lang: Lang, article?: KnowledgeArticle) => {
  const existing = document.getElementById("route-jsonld");
  const inLanguage = lang === "ar" ? "ar" : lang === "fr" ? "fr" : lang === "de" ? "de" : "en";
  const baseGraph = [
    {
      "@type": "Organization",
      "@id": `${CANONICAL_ORIGIN}/#organization`,
      name: "Capsorix",
      url: `${CANONICAL_ORIGIN}/`,
      logo: `${CANONICAL_ORIGIN}/favicon.png`,
      sameAs: ["https://www.linkedin.com/company/capsorix", "https://x.com/capsorix"],
    },
    {
      "@type": "WebSite",
      "@id": `${CANONICAL_ORIGIN}/#website`,
      name: "Capsorix",
      url: `${CANONICAL_ORIGIN}/`,
      publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` },
    },
  ];

  const breadcrumb = article
    ? {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Knowledge", item: `${CANONICAL_ORIGIN}/knowledge` },
          { "@type": "ListItem", position: 2, name: "Canon", item: `${CANONICAL_ORIGIN}/knowledge/canon` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${CANONICAL_ORIGIN}${article.canonicalPath}` },
        ],
      }
    : null;
  const articleNode = article
    ? {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        url: `${CANONICAL_ORIGIN}${article.canonicalPath}`,
        mainEntityOfPage: `${CANONICAL_ORIGIN}${article.canonicalPath}`,
        ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
        dateModified: article.updatedAt,
        author: article.authors.map((name) => ({ "@type": "Organization", name })),
        publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` },
        inLanguage: article.language,
      }
    : null;

  const pageNode = {
    "@type": "WebPage",
    "@id": `${CANONICAL_ORIGIN}${path}#webpage`,
    url: `${CANONICAL_ORIGIN}${path}`,
    name: ROUTE_META[key][lang].title,
    description: ROUTE_META[key][lang].description,
    inLanguage,
    isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
    about: { "@id": `${CANONICAL_ORIGIN}/#organization` },
  };

  const graph = [...baseGraph, ...(articleNode ? [articleNode, breadcrumb!] : [pageNode])];
  if (key === "careers") {
    graph.push({
      "@type": "JobPosting",
      title: "Senior Product Engineer (Open Application)",
      description:
        "Build premium web and product systems at Capsorix with full-cycle ownership, remote-first collaboration, and high-quality engineering standards.",
      datePosted: "2026-01-01",
      validThrough: "2027-01-01T23:59",
      employmentType: "FULL_TIME",
      hiringOrganization: { "@id": `${CANONICAL_ORIGIN}/#organization` },
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
    const key = routeKeyFromPath(pathname);
    const article = key === "article" ? articles.find((item) => item.canonicalPath === path) : undefined;
    const routeMeta = article
      ? { title: `${article.title} | Capsorix`, description: article.description }
      : ROUTE_META[key][lang];
    const { title, description } = routeMeta;
    const canonicalPath = article?.canonicalPath ?? path;
    const canonicalUrl = `${CANONICAL_ORIGIN}${canonicalPath}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", article ? "article" : "website");
    setMeta('meta[property="og:image"]', "content", ROUTE_OG_IMAGES[key]);
    setMeta('meta[name="twitter:image"]', "content", ROUTE_OG_IMAGES[key]);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="robots"]', "content", article?.status === "ready" ? "noindex,follow" : "index,follow");
    upsertRouteJsonLd(canonicalPath, key, lang, article);
  }, [pathname, lang]);

  return null;
};

const App = () => {
  const { allowAmbientCanvas } = usePerformanceProfile();

  return (
    <I18nProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteSeo />
          <SkipLink />
          <DeferredMount enabled={allowAmbientCanvas} delay={1000}>
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
              <Route path="/about" element={<AboutPage />} />
              <Route path="/workplace-culture" element={<WorkplaceCulture />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/company-values" element={<CompanyValues />} />
              <Route path="/guides/how-to-choose-a-software-development-company" element={<ChoosingSoftwarePartner />} />
              <Route path="/knowledge" element={<KnowledgeLanding />} />
              <Route path="/knowledge/canon" element={<CanonIndex />} />
              <Route path="/knowledge/canon/:slug" element={<CanonArticle />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
          <BackToTop />
          <PerfHudGate />
        </BrowserRouter>
      </ThemeProvider>
    </I18nProvider>
  );
};

export default App;
