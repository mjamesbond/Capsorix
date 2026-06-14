// Quadrilingual dictionary — English, Arabic, French, German.
// Each language is a *cultural rewrite*, not a literal translation: the same
// calm, precise tone is carried in native phrasing for each audience.
//
// German voice: sober, engineered, structurally precise. We lean on the
// language's natural gravity (compound nouns, deliberate cadence) without
// drifting into stiffness — a tone fit for a Werkstatt of senior engineers,
// not a marketing brochure.

export type Lang = "en" | "ar" | "fr" | "de";

type Pillar = { title: string; desc: string };
type Principle = { k: string; t: string; d: string };
type ServiceItem = { title: string; desc: string; tags: string[]; highlights?: string[] };
type Step = { title: string; desc: string };
type Stat = { value: string; label: string };

export interface Dict {
  nav: { services: string; process: string; industries: string; contact: string; ios: string; android: string; web: string; cta: string };
  hero: {
    badge: string; titleA: string; titleApps: string; titleB: string; titleSystems: string; titleC: string;
    sub: string; subStrong: string; ctaPrimary: string; ctaSecondary: string; foot: string; scroll: string;
  };
  trust: { pillars: Pillar[] };
  about: { kicker: string; titleA: string; titleB: string; lead: string; tail: string; principles: Principle[] };
  services: {
    kicker: string; titleA: string; titleB: string; lead: string;
    items: ServiceItem[]; enter: string; footer: string; footerLink: string;
  };
  process: { kicker: string; titleA: string; titleB: string; lead: string; steps: Step[] };
  industries: { kicker: string; titleA: string; titleB: string; lead: string; labels: string[] };
  stats: Stat[];
  caseStudies: {
    kicker: string; titleA: string; titleB: string; lead: string;
    items: {
      tag: string;
      client: string;
      title: string;
      summary: string;
      challenge: string;
      approach: string;
      stack: string[];
      metrics: { value: string; label: string }[];
      duration: string;
      logo?: string;
      href?: string;
      status?: string;
      visitLabel?: string;
    }[];
    durationLabel: string;
    stackLabel: string;
    challengeLabel: string;
    approachLabel: string;
    confidentialNote: string;
    statusLabel?: string;
  };
  testimonials: {
    kicker: string; titleA: string; titleB: string; lead: string;
    items: {
      quote: string;
      name: string;
      role: string;
      company: string;
      initials: string;
    }[];
    prev: string; next: string;
  };
  faq: {
    kicker: string; titleA: string; titleB: string; lead: string;
    stillCurious: string; ctaLabel: string;
    items: { q: string; a: string }[];
  };
  contact: {
    kicker: string; titleA: string; titleB: string; lead: string; leadStrong: string; leadTail: string;
    bullets: string[]; formKicker: string; formSub: string; replyChip: string;
    labels: { full_name: string; email: string; phone: string; project_type: string; budget_range: string; timeline: string; description: string };
    placeholders: { full_name: string; email: string; phone: string; description: string; select: string };
    projectTypes: string[]; budgets: string[]; timelines: string[];
    submit: string; submitting: string; reviewed: string; confidential: string;
    success: {
      kicker: string; titleA: string; titleB: string;
      body: string; bodyStrong: string; bodyTail: string;
      chip1: string; chip2: string; chip3: string; again: string;
      greeting: (name: string) => string;
      steps: { title: string; desc: string }[];
      refLabel: string; mailLabel: string; mailCta: string;
      stepsKicker: string;
      summaryKicker: string;
      summaryLabels: { name: string; email: string; phone: string; project_type: string; budget_range: string; timeline: string; description: string };
      summaryEmpty: string;
      copyRef: string;
      copiedRef: string;
    };
    toastErrTitle: string; toastSendErr: string; toastSendErrDesc: string;
    validation: { full_name: string; email: string; phone: string; phone_required: string; project_type: string; budget_range: string; timeline: string; description_min: string; description_max: string };
  };
  finalCta: { badge: string; titleA: string; titleB: string; lead: string; cta: string; or: string; reply: string; nda: string; noObligation: string };
  footer: { tagline: string; rights: string; values: string };
  notFound: {
    code: string;
    kicker: string;
    titleA: string;
    titleB: string;
    lead: string;
    pathLabel: string;
    primary: string;
    secondary: string;
    suggestionsKicker: string;
    suggestions: { label: string; href: string; desc: string }[];
  };
  autosave: {
    restoredTitle: string;
    restoredDesc: string;
    discard: string;
    savedNote: string;
  };
  cookies: {
    title: string;
    body: string;
    bodyStrong: string;
    accept: string;
    decline: string;
    learnMore: string;
  };
  subpages: {
    common: {
      capabilitiesKicker: string;
      consultCta: string;
      replyNote: string;
    };
    ios: {
      eyebrow: string;
      chip: string;
      titleA: string; titleSwift: string; titleB: string;
      lead: string;
      navigatorLabel: string;
      inspectorLabel: string;
      consoleLabel: string;
      capabilitiesTitleA: string; capabilitiesTitleB: string;
      capabilities: { title: string; desc: string }[];
      ctaTitleA: string; ctaTitleB: string;
      ctaLead: string;
    };
    android: {
      eyebrow: string;
      chip: string;
      titleA: string; titleKotlin: string; titleB: string;
      lead: string;
      projectLabel: string;
      moduleInfoLabel: string;
      gradleLabel: string;
      capabilitiesTitleA: string; capabilitiesTitleB: string;
      capabilities: { title: string; desc: string }[];
      ctaTitleA: string; ctaTitleB: string;
      ctaLead: string;
    };
    web: {
      eyebrow: string;
      chip: string;
      titleA: string; titleBeauty: string; titleC: string; titleLogic: string;
      lead: string;
      hint: string;
      flowLive: string;
      capabilitiesKicker: string;
      capabilitiesTitleA: string; capabilitiesTitleB: string;
      capabilitiesLead: string;
      capabilities: { title: string; desc: string }[];
      ctaTitleA: string; ctaTitleB: string;
      ctaLead: string;
    };
  };
}

/**
 * Per-locale dictionaries live in `./locales/{lang}.ts` and are dynamically
 * imported on demand so the initial JS bundle ships *zero* translation
 * payload — the active locale streams in as its own ~25KB chunk in
 * parallel with the rest of the app, and unused locales never download.
 */
const LOADERS: Record<Lang, () => Promise<{ default: Dict }>> = {
  en: () => import("./locales/en"),
  ar: () => import("./locales/ar"),
  fr: () => import("./locales/fr"),
  de: () => import("./locales/de"),
};

const cache = new Map<Lang, Dict>();

/** Load (and cache) a locale. Resolves with the Dict for the given language. */
export const loadDict = async (lang: Lang): Promise<Dict> => {
  const hit = cache.get(lang);
  if (hit) return hit;
  const mod = await LOADERS[lang]();
  cache.set(lang, mod.default);
  return mod.default;
};

/** Synchronous read of an already-loaded locale (returns undefined if not yet loaded). */
export const peekDict = (lang: Lang): Dict | undefined => cache.get(lang);


