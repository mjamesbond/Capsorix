// Trilingual dictionary — English, Arabic, French.
// Each language is a *cultural rewrite*, not a literal translation: the same
// calm, precise tone is carried in native phrasing for each audience.

export type Lang = "en" | "ar" | "fr";

type Pillar = { title: string; desc: string };
type Principle = { k: string; t: string; d: string };
type ServiceItem = { title: string; desc: string; tags: string[] };
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
  contact: {
    kicker: string; titleA: string; titleB: string; lead: string; leadStrong: string; leadTail: string;
    bullets: string[]; formKicker: string; formSub: string; replyChip: string;
    labels: { full_name: string; email: string; phone: string; project_type: string; budget_range: string; timeline: string; description: string };
    placeholders: { full_name: string; email: string; phone: string; description: string; select: string };
    projectTypes: string[]; budgets: string[]; timelines: string[];
    submit: string; submitting: string; reviewed: string; confidential: string;
    success: { kicker: string; titleA: string; titleB: string; body: string; bodyStrong: string; bodyTail: string; chip1: string; chip2: string; chip3: string; again: string };
    toastErrTitle: string; toastSendErr: string; toastSendErrDesc: string;
    validation: { full_name: string; email: string; phone: string; project_type: string; budget_range: string; timeline: string; description_min: string; description_max: string };
  };
  finalCta: { badge: string; titleA: string; titleB: string; lead: string; cta: string; or: string; reply: string; nda: string; noObligation: string };
  footer: { tagline: string; rights: string; values: string };
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

export const dict: Record<Lang, Dict> = {
  en: {
    nav: {
      services: "Services",
      process: "Process",
      industries: "Industries",
      contact: "Contact",
      ios: "iOS",
      android: "Android",
      web: "Web",
      cta: "Start a project",
    },
    hero: {
      badge: "Code without limits — Your next digital move",
      titleA: "We don’t ship",
      titleApps: "apps.",
      titleB: "We build",
      titleSystems: "systems",
      titleC: "that move businesses forward.",
      sub:
        "End-to-end product work for mobile, web, and the internal tools that quietly run a company — designed, engineered, and shipped by the same senior team.",
      subStrong: "Read personally. Answered within 24–48 hours.",
      ctaPrimary: "Send your project",
      ctaSecondary: "See our work",
      foot: "Code without limits · Read personally · NDA on request",
      scroll: "Scroll",
    },
    trust: {
      pillars: [
        { title: "What we ship, holds", desc: "We promise less. We focus on what survives the second year." },
        { title: "A reply in 24–48 hours", desc: "Every brief is read by a person — never routed through a funnel." },
        { title: "The details others skip", desc: "Small things shape how a product feels. We don’t round them off." },
        { title: "Selective by design", desc: "We take on few projects so each one gets the attention it deserves." },
      ],
    },
    about: {
      kicker: "— About",
      titleA: "A small team,",
      titleB: " a deliberate method.",
      lead:
        "We choose our work carefully. Not every project is accepted — but every one we accept is built right.",
      tail: "Few engagements. None of them ordinary.",
      principles: [
        { k: "01", t: "Understand before we build", d: "Every project starts with listening — to the business, the users, and the constraints no one mentions." },
        { k: "02", t: "Think before we design", d: "Structure precedes surface. We map the system before we draw a single screen." },
        { k: "03", t: "Test before we launch", d: "Edge cases, real devices, real conditions. If something can break, we find it first." },
      ],
    },
    services: {
      kicker: "— What we build",
      titleA: "We build",
      titleB: " only what should exist.",
      lead: "A focused set of disciplines, all held to the same bar. Tailored to the business — never templated.",
      items: [
        { title: "iOS apps", desc: "Native Swift apps built the way Apple builds its own — quiet, fast, and considered to the last frame.", tags: ["Swift", "SwiftUI", "App Store"] },
        { title: "Android apps", desc: "Kotlin-first apps with clean architecture and the kind of details users feel without naming.", tags: ["Kotlin", "Compose", "Play Store"] },
        { title: "Websites as experiences", desc: "Not pages — environments. Interfaces that load instantly, read clearly, and convert without raising their voice.", tags: ["Next.js", "React", "Edge"] },
        { title: "Internal systems", desc: "Dashboards, operations tools, and platforms that quietly run the business behind the business.", tags: ["SaaS", "ERP", "Analytics"] },
        { title: "Full-cycle product", desc: "Strategy, design, engineering, launch — handled by one team, in one continuous line of thought.", tags: ["MVP", "Scale", "Launch"] },
      ],
      enter: "Step inside the {x} studio",
      footer: "Anything software-related — done right.",
      footerLink: "Not sure where it fits? Send it anyway",
    },
    process: {
      kicker: "— Process",
      titleA: "Six steps.",
      titleB: " None of them skipped.",
      lead: "Nothing is shortcut — because every step earns its place.",
      steps: [
        { title: "Understand", desc: "We listen first. The brief gets sharper before anything else moves." },
        { title: "Analyze", desc: "Constraints, users, edge cases. We map the system before drawing a screen." },
        { title: "Design", desc: "Quiet interfaces with clear hierarchy. Built to be used, not admired." },
        { title: "Build", desc: "Clean engineering, real testing, no shortcuts hiding under the surface." },
        { title: "Launch", desc: "Shipped with care. Watched from the first hour, not the first complaint." },
        { title: "Stay", desc: "We remain — refining, supporting, and growing the system over time." },
      ],
    },
    industries: {
      kicker: "— Where we work",
      titleA: "Different industries.",
      titleB: " One standard.",
      lead: "The surface changes. The method doesn’t. We adapt to the field without lowering the bar — and only take on what we can do well.",
      labels: ["Restaurants", "Companies", "Startups", "Factories", "Cafés", "Retail", "Healthcare", "Travel"],
    },
    stats: [
      { value: "Few", label: "Projects accepted per quarter" },
      { value: "100%", label: "Built by senior engineers" },
      { value: "24–48h", label: "Personal reply window" },
      { value: "Long", label: "Term of every relationship" },
    ],
    contact: {
      kicker: "— Send your project",
      titleA: "Tell us what should",
      titleB: " exist.",
      lead:
        "A few lines is enough. We read it with a builder’s mindset — not a sales mindset — and respond personally within ",
      leadStrong: "24–48 hours",
      leadTail: ". If your project fits how we work, we’d be glad to take it on.",
      bullets: [
        "We choose our projects carefully",
        "Built by senior engineers — start to finish",
        "Confidential by default · NDA on request",
      ],
      formKicker: "Project brief",
      formSub: "A few minutes is enough.",
      replyChip: "24–48h reply",
      labels: {
        full_name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        project_type: "Project type",
        budget_range: "Budget range",
        timeline: "Timeline",
        description: "Project description",
      },
      placeholders: {
        full_name: "Your full name",
        email: "you@company.com",
        phone: "+1 (000) 000-0000",
        description: "What are you building, who is it for, and what does success look like?",
        select: "Select…",
      },
      projectTypes: ["Mobile app", "Website", "Both", "Custom"],
      budgets: ["Under $15k", "$15k – $50k", "$50k – $150k", "$150k+", "Not sure yet"],
      timelines: ["ASAP (under 1 month)", "1 – 3 months", "3 – 6 months", "Flexible"],
      submit: "Send your project",
      submitting: "Sending…",
      reviewed: "Reviewed by a senior partner",
      confidential: "Confidential · NDA available",
      success: {
        kicker: "Request received",
        titleA: "Your brief is",
        titleB: " in our hands.",
        body: "We’re reviewing it now and will respond within ",
        bodyStrong: "24–48 hours",
        bodyTail: ". If your project fits how we work, we’d be glad to take it on.",
        chip1: "24–48 hour reply",
        chip2: "Reviewed by a partner",
        chip3: "Kept confidential",
        again: "Send another project →",
      },
      toastErrTitle: "Please review the form",
      toastSendErr: "We couldn’t send your request",
      toastSendErrDesc: "Please try again in a moment, or write to studio@capsorix.dev directly.",
      validation: {
        full_name: "Please enter your full name",
        email: "Please enter a valid email",
        phone: "That phone number is too long",
        project_type: "Choose a project type",
        budget_range: "Choose a budget range",
        timeline: "Choose a timeline",
        description_min: "A few more details, please",
        description_max: "Please keep it under 2000 characters",
      },
    },
    finalCta: {
      badge: "Code without limits — Your next digital move",
      titleA: "If you have an idea —",
      titleB: " send it.",
      lead:
        "Or even a feeling that something needs to be built right. We’ll read it with a builder’s mindset, not a sales one — and reply personally within 24–48 hours.",
      cta: "Send your project",
      or: "or write to studio@capsorix.dev",
      reply: "Reply in 24–48h",
      nda: "NDA on request",
      noObligation: "No obligation",
    },
    footer: {
      tagline: "We build systems that move businesses forward. Few projects, done right.",
      rights: "All rights reserved.",
      values: "Selective · Precise · Long-term",
    },
    subpages: {
      common: {
        capabilitiesKicker: "— Capabilities",
        consultCta: "Request Private Consultation",
        replyNote: "Senior reply within 24–48 hours.",
      },
      ios: {
        eyebrow: "iOS · Discipline No. 01",
        chip: "iOS Development",
        titleA: "Engineered in",
        titleSwift: " Swift.",
        titleB: "Crafted for Apple.",
        lead: "Native iOS apps built the way Apple intended — with discipline, taste, and an obsession for the smallest details. From first prototype to App Store launch.",
        navigatorLabel: "Project Navigator",
        inspectorLabel: "Inspector",
        consoleLabel: "Console",
        capabilitiesTitleA: "Every detail, deliberate.",
        capabilitiesTitleB: " Every frame, earned.",
        capabilities: [
          { title: "Native Performance", desc: "Hand-tuned Swift, Metal-aware rendering, sub-16ms interactions across every device class." },
          { title: "SwiftUI · UIKit", desc: "Composable architectures, state-driven UIs, and seamless interop where it matters." },
          { title: "Privacy-First", desc: "App Tracking Transparency, Keychain, on-device intelligence, and audited data flows." },
          { title: "Polished UX", desc: "Frame-perfect animations, haptics, dynamic type, and Human Interface obsession." },
          { title: "Apple Ecosystem", desc: "Widgets, Live Activities, App Intents, watchOS, visionOS — natively integrated." },
          { title: "App Store Ready", desc: "Submission, review-readiness, and post-launch optimization handled end-to-end." },
        ],
        ctaTitleA: "This is not a team.",
        ctaTitleB: "This is elite engineering.",
        ctaLead: "If your iOS product deserves the same care Apple puts into the platform, start the conversation.",
      },
      android: {
        eyebrow: "Android · Discipline No. 02",
        chip: "Android Development",
        titleA: "Forged in",
        titleKotlin: " Kotlin.",
        titleB: "Built to endure.",
        lead: "Native Android apps engineered with structural strength — modular, performant, and obsessively reliable. From architecture to Play Store, executed with precision.",
        projectLabel: "Project",
        moduleInfoLabel: "Module Info",
        gradleLabel: "Gradle Tasks",
        capabilitiesTitleA: "Engineered for strength.",
        capabilitiesTitleB: " Designed to scale.",
        capabilities: [
          { title: "Kotlin · Coroutines", desc: "Modern, type-safe, structured concurrency. Code that scales without breaking." },
          { title: "Jetpack Compose", desc: "Declarative, reactive UI engineered for performance and maintainability." },
          { title: "Hardened Security", desc: "Encrypted storage, biometric auth, certificate pinning, and SafetyNet attestation." },
          { title: "Modular Architecture", desc: "Clean Architecture, MVI, multi-module Gradle — built to grow with your business." },
          { title: "Tuned Performance", desc: "Baseline profiles, R8 optimization, and frame-perfect rendering on every device." },
          { title: "Play Store Ready", desc: "Signed bundles, staged rollouts, Play Console mastery, and post-launch monitoring." },
        ],
        ctaTitleA: "Engineered with discipline.",
        ctaTitleB: "Delivered with precision.",
        ctaLead: "If your Android product needs the architecture and rigor to scale across millions of devices, start the conversation.",
      },
      web: {
        eyebrow: "Web · Discipline No. 03",
        chip: "Web Development",
        titleA: "Where",
        titleBeauty: " beauty ",
        titleC: "meets",
        titleLogic: "logic.",
        lead: "Frontend craft and backend rigor — composed by the same hands. Sites and platforms that look inevitable and run like clockwork.",
        hint: "Hover any token below to reveal its meaning.",
        flowLive: "Round-trip live",
        capabilitiesKicker: "— Capabilities",
        capabilitiesTitleA: "Two disciplines.",
        capabilitiesTitleB: " One studio.",
        capabilitiesLead: "We don't hand off between design and engineering — we are both. That's why our products feel coherent from the first pixel to the last query.",
        capabilities: [
          { title: "React · Next.js", desc: "App Router, RSC, edge rendering — interfaces that load instantly and feel inevitable." },
          { title: "Design Systems", desc: "Tokenized, themable, accessible component libraries that scale across teams and brands." },
          { title: "Node · Edge APIs", desc: "Type-safe APIs, queues, streams, and serverless that hold up under real traffic." },
          { title: "Auth · Security", desc: "OAuth, RBAC, rate limiting, and audit trails — secure by architecture, not afterthought." },
          { title: "Core Web Vitals", desc: "Sub-second LCP, near-zero CLS, and INP tuned to the millisecond. Measurable polish." },
          { title: "DevOps · CI/CD", desc: "Preview environments, automated checks, observability, and zero-downtime deploys." },
        ],
        ctaTitleA: "They understand both",
        ctaTitleB: "beauty and logic.",
        ctaLead: "If your web product needs taste and engineering in equal measure, start the conversation.",
      },
    },
  },

  ar: {
    nav: {
      services: "خدماتنا",
      process: "أسلوب عملنا",
      industries: "المجالات",
      contact: "تواصل",
      ios: "iOS",
      android: "Android",
      web: "الويب",
      cta: "ابدأ مشروعك",
    },
    hero: {
      badge: "برمجة بلا حدود — خُطوتك الرقمية القادمة",
      titleA: "لا نُطلق",
      titleApps: "مجرّد تطبيقات.",
      titleB: "نبني",
      titleSystems: "أنظمة",
      titleC: "تنقل الأعمال خطوة للأمام.",
      sub:
        "نُنفّذ منتجك من فكرته إلى إطلاقه: تطبيقات للموبايل، ومواقع، وأنظمة داخلية تُدير عملك من الخلف — بفريق واحد يُصمّم ويُهندس ويُسلّم.",
      subStrong: "نقرأ كل طلب بأنفسنا، ونردّ عليه خلال 24 إلى 48 ساعة.",
      ctaPrimary: "أرسل مشروعك",
      ctaSecondary: "شاهد ما نبنيه",
      foot: "برمجة بلا حدود · قراءة شخصية · اتفاقية سرية",
      scroll: "تابع للأسفل",
    },
    trust: {
      pillars: [
        { title: "ما نُسلّمه يصمد", desc: "نَعِد بالقليل، ونُركّز على ما يبقى مع الزمن." },
        { title: "ردّ خلال 24–48 ساعة", desc: "كل طلب يقرأه إنسان، لا قالب جاهز." },
        { title: "تفاصيل لا يلتفت إليها أحد", desc: "الفرق الحقيقي في التفاصيل الصغيرة. لا نُهمل واحدة منها." },
        { title: "اختيار مدروس", desc: "نقبل القليل من المشاريع ليأخذ كلٌّ منها حقّه من الاهتمام." },
      ],
    },
    about: {
      kicker: "— من نحن",
      titleA: "فريق صغير،",
      titleB: " ومنهج محسوب.",
      lead:
        "نختار أعمالنا بعناية. ليس كل مشروع نقبله — لكنّ كل مشروع نقبله يُنفَّذ كما يجب.",
      tail: "أعمالنا قليلة، وكلّها على قدر واحد من الإتقان.",
      principles: [
        { k: "01", t: "نفهم قبل أن نبني", d: "كل مشروع يبدأ بالإصغاء — للعمل، وللمستخدم، وللقيود التي لا يذكرها أحد." },
        { k: "02", t: "نفكّر قبل أن نُصمّم", d: "البنية تسبق الواجهة. نرسم النظام قبل أن نرسم شاشة واحدة." },
        { k: "03", t: "نختبر قبل أن نُطلق", d: "حالات حدّية، أجهزة حقيقية، ظروف فعلية. إن كان شيء يمكن أن يكسر، نكتشفه نحن أوّلًا." },
      ],
    },
    services: {
      kicker: "— ما نبنيه",
      titleA: "لا نبني إلا",
      titleB: " ما يستحقّ أن يُوجد.",
      lead: "تخصصات محدودة، جميعها بالمعيار نفسه. مفصّلة على قياس عملك — لا قوالب جاهزة.",
      items: [
        { title: "تطبيقات iOS", desc: "تطبيقات Swift أصلية، بنفس الأسلوب الذي تتبعه آبل في تطبيقاتها — هادئة، سريعة، ومُتقَنة حتى آخر إطار.", tags: ["Swift", "SwiftUI", "App Store"] },
        { title: "تطبيقات Android", desc: "تطبيقات Kotlin بمعمارية نظيفة، وتفاصيل يشعر بها المستخدم دون أن يعرف لماذا.", tags: ["Kotlin", "Compose", "Play Store"] },
        { title: "مواقع كتجربة كاملة", desc: "ليست صفحات — بل بيئات. واجهات تفتح فورًا، تُقرأ بوضوح، وتُحوّل دون ضجيج.", tags: ["Next.js", "React", "Edge"] },
        { title: "أنظمة داخلية", desc: "لوحات تحكّم وأدوات تشغيل ومنصّات تُدير العمل خلف الكواليس بهدوء.", tags: ["SaaS", "ERP", "تحليلات"] },
        { title: "منتج متكامل", desc: "استراتيجية، تصميم، هندسة، إطلاق — على يد فريق واحد، وبخيط فكر واحد.", tags: ["MVP", "توسّع", "إطلاق"] },
      ],
      enter: "ادخل استوديو {x}",
      footer: "أيّ شيء يتعلّق بالبرمجيات — يُنفَّذ كما يجب.",
      footerLink: "غير متأكد أين يندرج مشروعك؟ أرسله على أيّ حال",
    },
    process: {
      kicker: "— أسلوب عملنا",
      titleA: "ست خطوات.",
      titleB: " لا نتجاوز واحدة.",
      lead: "لا اختصارات — لأن كل خطوة تستحقّ مكانها.",
      steps: [
        { title: "نُصغي", desc: "نستمع أوّلًا. الفكرة تتّضح قبل أن يتحرّك أيّ شيء آخر." },
        { title: "نُحلّل", desc: "قيود، مستخدمون، حالات حدّية. نرسم النظام قبل أن نرسم شاشة." },
        { title: "نُصمّم", desc: "واجهات هادئة بترتيب واضح. تُستخدم بسهولة، لا تُعجَب فقط." },
        { title: "نُهندس", desc: "هندسة نظيفة، اختبار حقيقي، بلا اختصارات تحت السطح." },
        { title: "نُطلق", desc: "إطلاق مدروس. نراقبه من الساعة الأولى، لا من أوّل شكوى." },
        { title: "نُرافق", desc: "نبقى معك — نُحسّن، وندعم، ونُنمّي النظام مع الوقت." },
      ],
    },
    industries: {
      kicker: "— أين نعمل",
      titleA: "مجالات مختلفة.",
      titleB: " معيار واحد.",
      lead: "السطح يتغيّر، أمّا المنهج فلا. نتأقلم مع المجال دون أن نُخفّض المعيار — ولا نقبل إلّا ما نُتقنه.",
      labels: ["مطاعم", "شركات", "شركات ناشئة", "مصانع", "مقاهٍ", "تجزئة", "رعاية صحية", "سفر وسياحة"],
    },
    stats: [
      { value: "محدودة", label: "مشاريع نقبلها كل ربع" },
      { value: "100%", label: "بأيدي مهندسين بخبرة عالية" },
      { value: "24–48س", label: "نافذة الردّ الشخصي" },
      { value: "طويلة", label: "مدّة كل علاقة عمل" },
    ],
    contact: {
      kicker: "— أرسل مشروعك",
      titleA: "أخبرنا بما يستحقّ",
      titleB: " أن يُوجَد.",
      lead:
        "بضعة أسطر تكفي. نقرأ طلبك بعقلية المهندس لا البائع، ونردّ عليك شخصيًا خلال ",
      leadStrong: "24 إلى 48 ساعة",
      leadTail: ". إن كان مشروعك يناسب طريقتنا في العمل، فيسعدنا تنفيذه.",
      bullets: [
        "نختار مشاريعنا بعناية",
        "ينفّذها مهندسون بخبرة عالية — من البداية إلى النهاية",
        "سرّية افتراضيًا · اتفاقية سرّية عند الطلب",
      ],
      formKicker: "ملخّص المشروع",
      formSub: "بضع دقائق تكفي.",
      replyChip: "ردّ خلال 24–48س",
      labels: {
        full_name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف (اختياري)",
        project_type: "نوع المشروع",
        budget_range: "نطاق الميزانية",
        timeline: "الإطار الزمني",
        description: "وصف المشروع",
      },
      placeholders: {
        full_name: "اسمك الكامل",
        email: "you@company.com",
        phone: "+20 100 000 0000",
        description: "ما الذي تبنيه، ولمن، وكيف يبدو النجاح في نظرك؟",
        select: "اختر…",
      },
      projectTypes: ["تطبيق موبايل", "موقع إلكتروني", "كلاهما", "مخصّص"],
      budgets: ["أقل من 15 ألف $", "15 – 50 ألف $", "50 – 150 ألف $", "أكثر من 150 ألف $", "لم أحدّد بعد"],
      timelines: ["عاجل (أقل من شهر)", "من شهر إلى 3 أشهر", "من 3 إلى 6 أشهر", "مرن"],
      submit: "أرسل مشروعك",
      submitting: "جارٍ الإرسال…",
      reviewed: "يُراجَع بواسطة شريك أوّل",
      confidential: "سرّي · اتفاقية سرّية متاحة",
      success: {
        kicker: "تم استلام طلبك",
        titleA: "طلبك وصلنا،",
        titleB: " وأمانٌ في أيدينا.",
        body: "نراجعه الآن، وسنردّ عليك شخصيًا خلال ",
        bodyStrong: "24 إلى 48 ساعة",
        bodyTail: ". إن كان مشروعك يناسب طريقتنا، فيسعدنا تنفيذه.",
        chip1: "ردّ خلال 24–48 ساعة",
        chip2: "يُراجَع بواسطة شريك",
        chip3: "يُحفَظ بسرّية تامّة",
        again: "إرسال مشروع آخر ←",
      },
      toastErrTitle: "راجع البيانات من فضلك",
      toastSendErr: "تعذّر إرسال طلبك",
      toastSendErrDesc: "حاول مجددًا بعد لحظات، أو راسلنا على studio@capsorix.dev مباشرةً.",
      validation: {
        full_name: "اكتب اسمك الكامل من فضلك",
        email: "اكتب بريدًا إلكترونيًا صحيحًا",
        phone: "رقم الهاتف طويل أكثر من اللازم",
        project_type: "اختر نوع المشروع",
        budget_range: "اختر نطاق الميزانية",
        timeline: "اختر الإطار الزمني",
        description_min: "أخبرنا بقليل من التفاصيل أكثر",
        description_max: "أبقِ الوصف ضمن 2000 حرف",
      },
    },
    finalCta: {
      badge: "برمجة بلا حدود — خُطوتك الرقمية القادمة",
      titleA: "إن كانت لديك فكرة —",
      titleB: " أرسلها.",
      lead:
        "أو حتى مجرّد إحساس بأن شيئًا ما يستحقّ أن يُبنى بشكل صحيح. نقرأها بعقلية المهندس، لا عقلية البائع — ونردّ عليك شخصيًا خلال 24 إلى 48 ساعة.",
      cta: "أرسل مشروعك",
      or: "أو راسلنا على studio@capsorix.dev",
      reply: "ردّ خلال 24–48 ساعة",
      nda: "اتفاقية سرّية عند الطلب",
      noObligation: "بلا أيّ التزام",
    },
    footer: {
      tagline: "نبني أنظمة تنقل الأعمال خطوة للأمام. مشاريع قليلة، تُنفَّذ كما يجب.",
      rights: "جميع الحقوق محفوظة.",
      values: "اختيار · دقّة · أفق طويل",
    },
    subpages: {
      common: {
        capabilitiesKicker: "— القدرات",
        consultCta: "اطلب استشارة خاصة",
        replyNote: "ردّ من فريق أوّل خلال 24 إلى 48 ساعة.",
      },
      ios: {
        eyebrow: "iOS · التخصّص رقم 01",
        chip: "تطوير تطبيقات iOS",
        titleA: "هندسة بـ",
        titleSwift: " Swift.",
        titleB: "بروح آبل.",
        lead: "تطبيقات iOS أصلية تُبنى كما أرادت آبل: انضباط، ذوق، وهوس بأدقّ التفاصيل — من النموذج الأوّل إلى الإطلاق على App Store.",
        navigatorLabel: "متصفّح المشروع",
        inspectorLabel: "المُعاين",
        consoleLabel: "وحدة التحكّم",
        capabilitiesTitleA: "كل تفصيل مدروس.",
        capabilitiesTitleB: " كل إطار مُستحقّ.",
        capabilities: [
          { title: "أداء أصلي", desc: "Swift مضبوطة يدويًا، تصيير يفهم Metal، وتفاعل تحت 16 مللي ثانية على كل الأجهزة." },
          { title: "SwiftUI · UIKit", desc: "بنى قابلة للتركيب، واجهات تعتمد الحالة، وتكامل سلس حيث يجب." },
          { title: "الخصوصيّة أوّلًا", desc: "App Tracking Transparency و Keychain وذكاء على الجهاز وتدفّقات بيانات مُدقّقة." },
          { title: "تجربة مصقولة", desc: "حركات بدقّة الإطار، لمسات اهتزازية، ونوع ديناميكي — التزام كامل بـ Human Interface." },
          { title: "نظام آبل المتكامل", desc: "Widgets و Live Activities و App Intents و watchOS و visionOS — تكامل أصلي." },
          { title: "جاهز لـ App Store", desc: "تقديم، استعداد للمراجعة، وتحسين ما بعد الإطلاق — من البداية للنهاية." },
        ],
        ctaTitleA: "هذا ليس فريقًا عاديًا.",
        ctaTitleB: "هذه هندسة من طراز رفيع.",
        ctaLead: "إن كان منتج iOS لديك يستحقّ نفس العناية التي تضعها آبل في منصّتها — لنبدأ الحديث.",
      },
      android: {
        eyebrow: "Android · التخصّص رقم 02",
        chip: "تطوير تطبيقات Android",
        titleA: "صياغة بـ",
        titleKotlin: " Kotlin.",
        titleB: "تُبنى لتدوم.",
        lead: "تطبيقات Android أصلية بقوّة بنيويّة: معياريّة، عالية الأداء، وموثوقة بشكل صارم — من المعمار إلى Play Store، بدقّة كاملة.",
        projectLabel: "المشروع",
        moduleInfoLabel: "معلومات الوحدة",
        gradleLabel: "مهام Gradle",
        capabilitiesTitleA: "هندسة لقوّة.",
        capabilitiesTitleB: " تصميم للنموّ.",
        capabilities: [
          { title: "Kotlin · Coroutines", desc: "تزامن حديث وآمن من حيث النوع، كود ينمو دون أن ينكسر." },
          { title: "Jetpack Compose", desc: "واجهة تصريحيّة وتفاعليّة، مهندسة للأداء وقابلية الصيانة." },
          { title: "أمان مُحصَّن", desc: "تخزين مُشفّر، مصادقة بصمة، تثبيت شهادات، وتصديق SafetyNet." },
          { title: "معمار معياري", desc: "Clean Architecture و MVI و Gradle متعدّد الوحدات — يكبر مع عملك." },
          { title: "أداء مضبوط", desc: "Baseline Profiles، تحسين R8، وتصيير بدقّة الإطار على كل جهاز." },
          { title: "جاهز لـ Play Store", desc: "حِزَم موقّعة، طرح تدريجي، إتقان Play Console، ومراقبة ما بعد الإطلاق." },
        ],
        ctaTitleA: "هندسة بانضباط.",
        ctaTitleB: "تسليم بدقّة.",
        ctaLead: "إن كان منتج Android لديك يحتاج المعمار والصرامة لينمو على ملايين الأجهزة — لنبدأ الحديث.",
      },
      web: {
        eyebrow: "Web · التخصّص رقم 03",
        chip: "تطوير الويب",
        titleA: "حيث",
        titleBeauty: " الجمال ",
        titleC: "يلتقي",
        titleLogic: "بالمنطق.",
        lead: "حِرفة الواجهة وصرامة الخلفيّة — بأيدٍ واحدة. مواقع ومنصّات تبدو حتميّة وتعمل كآليّة ساعة.",
        hint: "مرّر فوق أي رمز أدناه لكشف معناه.",
        flowLive: "رحلة كاملة مباشرة",
        capabilitiesKicker: "— القدرات",
        capabilitiesTitleA: "تخصّصان.",
        capabilitiesTitleB: " استوديو واحد.",
        capabilitiesLead: "لا نُسلّم العمل بين التصميم والهندسة — نحن الاثنان. لذلك تشعر منتجاتنا بالاتّساق من أوّل بكسل إلى آخر استعلام.",
        capabilities: [
          { title: "React · Next.js", desc: "App Router و RSC وتصيير حافّة — واجهات تُحمَّل فورًا وتشعرك بأنّها حتميّة." },
          { title: "أنظمة تصميم", desc: "مكتبات مكوّنات قائمة على tokens، قابلة للسمات والوصول، تنمو عبر الفِرق والعلامات." },
          { title: "Node · Edge APIs", desc: "واجهات آمنة من حيث النوع، طوابير، تدفّقات، وخواديم بلا حالة تصمد تحت ضغط حقيقي." },
          { title: "مصادقة وأمان", desc: "OAuth و RBAC وحدّ معدّل وسجلّات تدقيق — أمان بالبنية، لا بالترميم." },
          { title: "Core Web Vitals", desc: "LCP تحت الثانية، CLS قرب الصفر، و INP مضبوط للملي ثانية. صقلٌ قابل للقياس." },
          { title: "DevOps · CI/CD", desc: "بيئات معاينة، فحوص آليّة، مراقبة، ونشر بلا انقطاع." },
        ],
        ctaTitleA: "يفهمون كليهما:",
        ctaTitleB: "الجمال والمنطق.",
        ctaLead: "إن كان منتجك على الويب يحتاج الذوق والهندسة بنفس القدر — لنبدأ الحديث.",
      },
    },
  },

  fr: {
    nav: {
      services: "Savoir-faire",
      process: "Méthode",
      industries: "Secteurs",
      contact: "Contact",
      ios: "iOS",
      android: "Android",
      web: "Web",
      cta: "Confier un projet",
    },
    hero: {
      badge: "Sélection rigoureuse — quelques projets par trimestre",
      titleA: "Nous ne livrons pas",
      titleApps: "des applications.",
      titleB: "Nous bâtissons",
      titleSystems: "des systèmes",
      titleC: "qui font avancer les entreprises.",
      sub:
        "Conception et développement de bout en bout : applications mobiles, plateformes web et outils internes — pensés, dessinés et livrés par une seule équipe senior.",
      subStrong: "Chaque message est lu personnellement. Réponse sous 24 à 48 heures.",
      ctaPrimary: "Nous confier votre projet",
      ctaSecondary: "Voir nos réalisations",
      foot: "Sélection rigoureuse · Lecture personnelle · NDA sur demande",
      scroll: "Faire défiler",
    },
    trust: {
      pillars: [
        { title: "Ce que nous livrons tient", desc: "Nous promettons peu, et nous concentrons sur ce qui résiste au temps." },
        { title: "Une réponse en 24–48 h", desc: "Chaque brief est lu par une personne — jamais filtré par un tunnel." },
        { title: "Le détail que d’autres négligent", desc: "Le ressenti d’un produit se joue dans les petites choses. Nous ne les arrondissons pas." },
        { title: "Sélectif par exigence", desc: "Nous prenons peu de projets pour donner à chacun l’attention qu’il mérite." },
      ],
    },
    about: {
      kicker: "— À propos",
      titleA: "Une équipe restreinte,",
      titleB: " une méthode délibérée.",
      lead:
        "Nous choisissons nos engagements avec soin. Tout projet n’est pas accepté — mais ceux que nous acceptons sont menés comme il se doit.",
      tail: "Peu de missions. Aucune ordinaire.",
      principles: [
        { k: "01", t: "Comprendre avant de bâtir", d: "Chaque projet commence par l’écoute — du métier, des utilisateurs, et des contraintes que personne ne formule." },
        { k: "02", t: "Penser avant de dessiner", d: "La structure précède la surface. Nous cartographions le système avant de tracer un seul écran." },
        { k: "03", t: "Éprouver avant de livrer", d: "Cas limites, vrais appareils, vraies conditions. Si quelque chose peut casser, nous le trouvons en premier." },
      ],
    },
    services: {
      kicker: "— Ce que nous bâtissons",
      titleA: "Nous ne créons",
      titleB: " que ce qui mérite d’exister.",
      lead: "Un éventail volontairement réduit, tenu au même standard. Sur mesure pour le métier — jamais en gabarit.",
      items: [
        { title: "Applications iOS", desc: "Des apps Swift natives, dessinées comme Apple dessine les siennes — silencieuses, rapides, soignées jusqu’à la dernière image.", tags: ["Swift", "SwiftUI", "App Store"] },
        { title: "Applications Android", desc: "Du Kotlin, une architecture nette, et ces détails que l’utilisateur ressent sans pouvoir les nommer.", tags: ["Kotlin", "Compose", "Play Store"] },
        { title: "Sites comme expériences", desc: "Pas des pages — des environnements. Des interfaces qui s’ouvrent net, se lisent clair, et convertissent sans hausser le ton.", tags: ["Next.js", "React", "Edge"] },
        { title: "Systèmes internes", desc: "Tableaux de bord, outils d’opération, plateformes — ce qui fait tourner l’entreprise derrière l’entreprise.", tags: ["SaaS", "ERP", "Analytique"] },
        { title: "Produit de bout en bout", desc: "Stratégie, design, ingénierie, lancement — par une seule équipe, dans une seule ligne de pensée.", tags: ["MVP", "Échelle", "Lancement"] },
      ],
      enter: "Entrer dans le studio {x}",
      footer: "Tout ce qui touche au logiciel — fait correctement.",
      footerLink: "Pas sûr de la catégorie ? Envoyez-le quand même",
    },
    process: {
      kicker: "— Méthode",
      titleA: "Six étapes.",
      titleB: " Aucune sautée.",
      lead: "Pas de raccourci — chaque étape gagne sa place.",
      steps: [
        { title: "Écouter", desc: "Nous écoutons d’abord. Le brief s’aiguise avant que quoi que ce soit d’autre bouge." },
        { title: "Analyser", desc: "Contraintes, usages, cas limites. Le système se cartographie avant le premier écran." },
        { title: "Dessiner", desc: "Des interfaces calmes, hiérarchie claire. Faites pour servir, pas pour être admirées." },
        { title: "Construire", desc: "Ingénierie propre, tests réels, aucun raccourci dissimulé sous la surface." },
        { title: "Lancer", desc: "Mise en ligne maîtrisée. Suivie dès la première heure, pas à la première plainte." },
        { title: "Accompagner", desc: "Nous restons — pour affiner, soutenir et faire grandir le système dans la durée." },
      ],
    },
    industries: {
      kicker: "— Où nous intervenons",
      titleA: "Des secteurs variés.",
      titleB: " Un seul standard.",
      lead: "La surface change, la méthode non. Nous nous adaptons au terrain sans baisser la barre — et ne prenons que ce que nous savons mener.",
      labels: ["Restaurants", "Entreprises", "Startups", "Industrie", "Cafés", "Retail", "Santé", "Voyage"],
    },
    stats: [
      { value: "Peu", label: "Projets retenus par trimestre" },
      { value: "100 %", label: "Bâti par des ingénieurs seniors" },
      { value: "24–48 h", label: "Fenêtre de réponse personnelle" },
      { value: "Long", label: "Terme de chaque relation" },
    ],
    contact: {
      kicker: "— Confier un projet",
      titleA: "Dites-nous ce qui mérite",
      titleB: " d’exister.",
      lead:
        "Quelques lignes suffisent. Nous les lisons en bâtisseurs — non en commerciaux — et répondons personnellement sous ",
      leadStrong: "24 à 48 heures",
      leadTail: ". Si votre projet correspond à notre façon de travailler, nous serons heureux de le prendre.",
      bullets: [
        "Nous choisissons nos projets avec soin",
        "Mené par des ingénieurs seniors — du début à la fin",
        "Confidentiel par défaut · NDA sur demande",
      ],
      formKicker: "Brief de projet",
      formSub: "Quelques minutes suffisent.",
      replyChip: "Réponse 24–48 h",
      labels: {
        full_name: "Nom complet",
        email: "E-mail",
        phone: "Téléphone (optionnel)",
        project_type: "Type de projet",
        budget_range: "Budget",
        timeline: "Échéance",
        description: "Description du projet",
      },
      placeholders: {
        full_name: "Votre nom complet",
        email: "vous@entreprise.com",
        phone: "+33 0 00 00 00 00",
        description: "Que construisez-vous, pour qui, et à quoi ressemble la réussite ?",
        select: "Choisir…",
      },
      projectTypes: ["Application mobile", "Site web", "Les deux", "Sur mesure"],
      budgets: ["Moins de 15 k€", "15 – 50 k€", "50 – 150 k€", "Plus de 150 k€", "À définir"],
      timelines: ["Urgent (moins d’un mois)", "1 – 3 mois", "3 – 6 mois", "Flexible"],
      submit: "Envoyer le projet",
      submitting: "Envoi…",
      reviewed: "Examiné par un partenaire senior",
      confidential: "Confidentiel · NDA disponible",
      success: {
        kicker: "Demande reçue",
        titleA: "Votre brief est",
        titleB: " entre nos mains.",
        body: "Nous l’étudions et reviendrons vers vous sous ",
        bodyStrong: "24 à 48 heures",
        bodyTail: ". Si votre projet correspond à notre façon de travailler, nous serons heureux de le prendre.",
        chip1: "Réponse sous 24–48 h",
        chip2: "Examiné par un partenaire",
        chip3: "Tenu confidentiel",
        again: "Envoyer un autre projet →",
      },
      toastErrTitle: "Merci de vérifier le formulaire",
      toastSendErr: "Impossible d’envoyer votre demande",
      toastSendErrDesc: "Réessayez dans un instant, ou écrivez-nous à studio@capsorix.dev.",
      validation: {
        full_name: "Veuillez saisir votre nom complet",
        email: "Veuillez saisir un e-mail valide",
        phone: "Ce numéro est trop long",
        project_type: "Choisissez un type de projet",
        budget_range: "Choisissez un budget",
        timeline: "Choisissez une échéance",
        description_min: "Quelques détails de plus, s’il vous plaît",
        description_max: "Restez sous 2000 caractères",
      },
    },
    finalCta: {
      badge: "Code sans limites — Votre prochain mouvement digital",
      titleA: "Si vous avez une idée —",
      titleB: " envoyez-la.",
      lead:
        "Ou simplement l’intuition que quelque chose mérite d’être bâti correctement. Nous la lirons en bâtisseurs, non en commerciaux — et répondrons personnellement sous 24 à 48 heures.",
      cta: "Envoyer le projet",
      or: "ou écrivez à studio@capsorix.dev",
      reply: "Réponse sous 24–48 h",
      nda: "NDA sur demande",
      noObligation: "Sans engagement",
    },
    footer: {
      tagline: "Nous bâtissons des systèmes qui font avancer les entreprises. Peu de projets, faits correctement.",
      rights: "Tous droits réservés.",
      values: "Sélectif · Précis · Long terme",
    },
  },
};

