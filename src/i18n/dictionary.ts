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
    }[];
    durationLabel: string;
    stackLabel: string;
    challengeLabel: string;
    approachLabel: string;
    confidentialNote: string;
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
    caseStudies: {
      kicker: "— Selected work",
      titleA: "Three projects,",
      titleB: " three different scales.",
      lead:
        "A glimpse at the kind of work we take on. Names are withheld where confidentiality applies — outcomes are not.",
      durationLabel: "Engagement",
      stackLabel: "Stack",
      challengeLabel: "Brief",
      approachLabel: "Approach",
      confidentialNote: "Client name held under NDA.",
      items: [
        {
          tag: "iOS · Hospitality",
          client: "Mediterranean restaurant group",
          title: "A guest-side iOS app that replaced four touchpoints.",
          summary:
            "Reservations, ordering, loyalty, and a chef-curated menu — folded into a single, quiet iPhone experience that the brand actually wanted to ship.",
          challenge:
            "Four disconnected vendor tools were eroding the in-room experience. Staff worked around the software instead of with it.",
          approach:
            "We rebuilt the guest journey natively in Swift, anchored on a small, opinionated design system. Backend integrations were collapsed behind a single internal API.",
          stack: ["Swift", "SwiftUI", "Combine", "Postgres", "Edge functions"],
          metrics: [
            { value: "−61%", label: "Support tickets" },
            { value: "4.8★", label: "App Store rating" },
            { value: "1.4×", label: "Avg. order value" },
          ],
          duration: "11 weeks",
        },
        {
          tag: "Android · Logistics",
          client: "Regional fleet operator",
          title: "An Android dispatch tool that 240 drivers actually use.",
          summary:
            "A purpose-built driver app and a dispatcher console, designed around the ten things that happen ninety percent of the day.",
          challenge:
            "An off-the-shelf logistics suite was too generic. Dispatchers were keeping a parallel spreadsheet to stay sane.",
          approach:
            "Field interviews on three depots, then a Kotlin app tuned for low-end devices and patchy connectivity. The dispatcher console followed the driver flow — not the other way around.",
          stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "WebSockets"],
          metrics: [
            { value: "+34%", label: "Routes per shift" },
            { value: "−2.1m", label: "Avg. dispatch time" },
            { value: "0", label: "Spreadsheets left" },
          ],
          duration: "16 weeks",
        },
        {
          tag: "Web · Industrial",
          client: "European manufacturing group",
          title: "A web platform tying eight factories to one source of truth.",
          summary:
            "A unified production dashboard, a role-aware admin layer, and a real-time anomaly stream — replacing a sprawl of internal tools no one liked.",
          challenge:
            "Each plant ran its own dashboards. Leadership couldn’t see the company in one place — and couldn’t trust the numbers when they did.",
          approach:
            "We modelled a clean shared schema first, then built a calm, dense web UI on top — RBAC, auditability, and live telemetry baked in from day one.",
          stack: ["TypeScript", "React", "Postgres", "TimescaleDB", "Edge functions"],
          metrics: [
            { value: "8 → 1", label: "Dashboards unified" },
            { value: "−47%", label: "Reporting lag" },
            { value: "99.98%", label: "Platform uptime" },
          ],
          duration: "5 months",
        },
      ],
    },
    testimonials: {
      kicker: "— In their words",
      titleA: "What the people we",
      titleB: " worked with say.",
      lead:
        "A few quotes from founders, operators, and product leaders we’ve built alongside.",
      prev: "Previous", next: "Next",
      items: [
        {
          quote:
            "They behaved like partners, not vendors. Decisions were explained, trade-offs were named out loud, and the product shipped on time without a single emergency call.",
          name: "Lina Aboul-Saoud",
          role: "Founder & CEO",
          company: "Hospitality group · Beirut",
          initials: "LA",
        },
        {
          quote:
            "We had a senior engineer reading every brief, not a sales funnel. The first call already moved our thinking forward — and the work that followed matched the bar.",
          name: "Marcus Hartmann",
          role: "VP of Product",
          company: "Industrial SaaS · Munich",
          initials: "MH",
        },
        {
          quote:
            "Polished, restrained, fast. Six months in, we’re still using the same architecture they put down on day one — and we haven’t had to redesign anything.",
          name: "Sara El-Khoury",
          role: "Head of Engineering",
          company: "Fintech platform · Dubai",
          initials: "SK",
        },
        {
          quote:
            "The first thing they did was tell us what not to build. That single conversation saved us a quarter of work and probably the company.",
          name: "Jonas Berger",
          role: "Co-founder",
          company: "B2B logistics · Berlin",
          initials: "JB",
        },
      ],
    },
    faq: {
      kicker: "— Common questions",
      titleA: "Answers",
      titleB: " before you ask.",
      lead:
        "The questions we hear most often, answered honestly. If yours isn’t here, write it in the brief — we’ll address it directly in our reply.",
      stillCurious: "Still curious about something?",
      ctaLabel: "Send your question",
      items: [
        {
          q: "How much does a project cost?",
          a: "It depends on scope, but most engagements land between $25k and $180k. We never quote a number until we understand what you actually need — a one-line answer would be a disservice. After your brief, you receive a written proposal with a fixed fee and a clear scope.",
        },
        {
          q: "How long does it take to build something with you?",
          a: "A focused MVP runs 6–12 weeks. A full product — mobile, web, and backend — typically takes 3–5 months. We stage delivery so you see working software within the first three weeks, not at the end.",
        },
        {
          q: "Who owns the code and the IP?",
          a: "You do. Full source code, design files, and infrastructure access are transferred to your accounts at the end of the engagement. We do not retain backdoors, licenses, or hidden dependencies on us.",
        },
        {
          q: "Do you sign an NDA?",
          a: "Yes — gladly, and at any stage. We can countersign your NDA before the first call, or send ours within an hour. Confidentiality is the default, not the exception.",
        },
        {
          q: "Do you work with early-stage founders or only established companies?",
          a: "Both. What we look for is intent and clarity — a founder who knows what problem they’re solving, or a team that’s ready to invest in something built right. We turn down projects, regardless of size, when the fit isn’t there.",
        },
        {
          q: "What happens after launch?",
          a: "Most clients keep us on a calm retainer for evolution, monitoring, and small improvements. There is no lock-in — you can hand the code to your own team at any point and we’ll support the transition.",
        },
      ],
    },
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
        greeting: (name) => `Thank you, ${name}.`,
        stepsKicker: "What happens next",
        steps: [
          { title: "Brief secured", desc: "Your request is encrypted and queued for review." },
          { title: "Senior review", desc: "A partner reads it personally — no triage, no bots." },
          { title: "Personal reply", desc: "You hear back from us within 24–48 hours." },
        ],
        refLabel: "Reference",
        mailLabel: "Need to add something?",
        mailCta: "Write to team@capsorix.tech",
        summaryKicker: "Brief summary",
        summaryLabels: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          project_type: "Project",
          budget_range: "Budget",
          timeline: "Timeline",
          description: "Brief",
        },
        summaryEmpty: "—",
        copyRef: "Copy reference",
        copiedRef: "Copied",
      },
      toastErrTitle: "Please review the form",
      toastSendErr: "We couldn’t send your request",
      toastSendErrDesc: "Please try again in a moment, or write to team@capsorix.tech directly.",
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
      or: "or write to team@capsorix.tech",
      reply: "Reply in 24–48h",
      nda: "NDA on request",
      noObligation: "No obligation",
    },
    footer: {
      tagline: "We build systems that move businesses forward. Few projects, done right.",
      rights: "All rights reserved.",
      values: "Selective · Precise · Long-term",
    },
    notFound: {
      code: "404",
      kicker: "— Off the map",
      titleA: "This page ",
      titleB: "doesn’t exist.",
      lead: "The address you followed leads nowhere in our system. No harm done — let’s get you back to a meaningful surface.",
      pathLabel: "Requested path",
      primary: "Return home",
      secondary: "Speak with us",
      suggestionsKicker: "Or jump to",
      suggestions: [
        { label: "iOS", href: "/ios", desc: "Native iPhone & iPad engineering." },
        { label: "Android", href: "/android", desc: "Performance-first Android builds." },
        { label: "Web", href: "/web", desc: "Web platforms and dashboards." },
      ],
    },
    autosave: {
      restoredTitle: "Draft restored",
      restoredDesc: "We brought back what you were writing.",
      discard: "Discard",
      savedNote: "Draft saved locally",
    },
    cookies: {
      title: "We respect your privacy.",
      body: "We use a single, essential cookie to remember your language. ",
      bodyStrong: "No tracking, no analytics, no third parties — ever.",
      accept: "Acknowledge",
      decline: "Essentials only",
      learnMore: "Learn more",
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
    caseStudies: {
      kicker: "— أعمال مختارة",
      titleA: "ثلاثة مشاريع،",
      titleB: " وثلاثة مقاييس مختلفة.",
      lead:
        "لمحة عن نوع العمل الذي نتولّاه. نُخفي الأسماء حين تقتضي السرّيّة ذلك — أمّا النتائج فلا.",
      durationLabel: "مدّة المشروع",
      stackLabel: "التقنيات",
      challengeLabel: "السياق",
      approachLabel: "المنهج",
      confidentialNote: "اسم العميل محفوظ بموجب اتفاقيّة سرّيّة.",
      items: [
        {
          tag: "iOS · ضيافة",
          client: "مجموعة مطاعم متوسّطيّة",
          title: "تطبيق iPhone للضيف يستبدل أربع نقاط تَماسّ بنقطة واحدة.",
          summary:
            "حجوزات وطلبات وولاء وقائمة طعام يختارها الشيف — في تجربة هاتف هادئة أرادت العلامة فعلًا أن تُطلقها.",
          challenge:
            "أربع أدوات منفصلة من موردين مختلفين كانت تُفسد تجربة الغرفة، والموظّفون يلتفّون حول البرنامج بدل العمل به.",
          approach:
            "أعدنا بناء رحلة الضيف أصيلة بـ Swift فوق نظام تصميم صغير ومُحكَم، وجمعنا تكاملات الـ backend خلف واجهة داخليّة واحدة.",
          stack: ["Swift", "SwiftUI", "Combine", "Postgres", "Edge functions"],
          metrics: [
            { value: "−61%", label: "تذاكر الدعم" },
            { value: "4.8★", label: "تقييم App Store" },
            { value: "1.4×", label: "متوسّط قيمة الطلب" },
          ],
          duration: "11 أسبوعًا",
        },
        {
          tag: "Android · لوجستيّات",
          client: "مُشغّل أسطول إقليمي",
          title: "أداة Android للسائقين يستخدمها 240 سائقًا فعلًا.",
          summary:
            "تطبيق سائق مبنيّ لغرضه، ولوحة تحكّم للموزّع — مصمّمة حول العشر مهامّ التي تتكرّر تسعين بالمئة من اليوم.",
          challenge:
            "حلّ لوجستيّ جاهز كان عامًّا أكثر من اللازم، حتّى صار الموزّعون يحتفظون بجدول بيانات موازٍ ليُبقوا أعصابهم.",
          approach:
            "مقابلات ميدانيّة في ثلاث محطّات، ثمّ تطبيق Kotlin مُحكَم لأجهزة محدودة الموارد واتّصال متذبذب. لوحة الموزّع تَبِعَت تدفّق السائق، لا العكس.",
          stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "WebSockets"],
          metrics: [
            { value: "+34%", label: "مسارات لكل وردية" },
            { value: "−2.1د", label: "متوسّط زمن التوزيع" },
            { value: "0", label: "جداول متبقّية" },
          ],
          duration: "16 أسبوعًا",
        },
        {
          tag: "Web · صناعي",
          client: "مجموعة تصنيع أوروبيّة",
          title: "منصّة ويب تربط ثمانية مصانع بمصدر حقيقة واحد.",
          summary:
            "لوحة إنتاج موحَّدة، وطبقة إدارة تعرف الأدوار، وتدفّق مباشر للأخطاء — بدل تشتُّت أدوات داخليّة لم يُحبّها أحد.",
          challenge:
            "كلّ مصنع يدير لوحاته الخاصّة، فلا الإدارة ترى الشركة في مكان واحد، ولا تثق بالأرقام حين تراها.",
          approach:
            "نمذجنا أوّلًا مخطّطًا مشتركًا نظيفًا، ثمّ بنينا فوقه واجهة ويب هادئة كثيفة المعنى — صلاحيّات وتدقيق وتيليمتري حيّ منذ اليوم الأوّل.",
          stack: ["TypeScript", "React", "Postgres", "TimescaleDB", "Edge functions"],
          metrics: [
            { value: "8 → 1", label: "لوحات تمّ توحيدها" },
            { value: "−47%", label: "تأخير التقارير" },
            { value: "99.98%", label: "جاهزيّة المنصّة" },
          ],
          duration: "5 أشهر",
        },
      ],
    },
    testimonials: {
      kicker: "— بكلماتهم",
      titleA: "ما يقوله مَن",
      titleB: " عملنا معهم.",
      lead:
        "بضع شهادات من مؤسّسين ومسؤولي تشغيل وقادة منتج بنينا إلى جانبهم.",
      prev: "السابق", next: "التالي",
      items: [
        {
          quote:
            "تصرّفوا كشركاء لا كموردين. القرارات كانت تُشرَح، والمفاضلات تُسمّى بصوت عالٍ، وأُطلق المنتج في موعده دون مكالمة طوارئ واحدة.",
          name: "لينا أبو السعود",
          role: "المؤسِّسة والرئيسة التنفيذيّة",
          company: "مجموعة ضيافة · بيروت",
          initials: "LA",
        },
        {
          quote:
            "كان مهندس أوّل يقرأ كلّ طلب، لا قمعَ مبيعات. المكالمة الأولى وحدها قدّمت تفكيرنا للأمام — والعمل الذي تلاها كان على المستوى نفسه.",
          name: "ماركوس هارتمان",
          role: "نائب رئيس المنتج",
          company: "SaaS صناعي · ميونخ",
          initials: "MH",
        },
        {
          quote:
            "أنيق، مُتحفّظ، سريع. بعد ستّة أشهر، لا نزال نستخدم البنية ذاتها التي وضعوها في اليوم الأوّل، ولم نضطر لإعادة تصميم شيء.",
          name: "سارة الخوري",
          role: "رئيسة الهندسة",
          company: "منصّة فينتك · دبي",
          initials: "SK",
        },
        {
          quote:
            "أوّل ما فعلوه أنّهم أخبرونا بما يجب ألّا نبنيه. تلك المحادثة وحدها وفّرت علينا ربعًا من العمل، وربّما الشركة كلّها.",
          name: "يوناس برغر",
          role: "شريك مؤسِّس",
          company: "لوجستيّات B2B · برلين",
          initials: "JB",
        },
      ],
    },
    faq: {
      kicker: "— أسئلة شائعة",
      titleA: "إجابات",
      titleB: " قبل أن تسأل.",
      lead:
        "الأسئلة الأكثر تكرارًا، نُجيب عنها بصراحة. إن لم يكن سؤالك هنا، اكتبه في الطلب — وسنتناوله مباشرةً في ردّنا.",
      stillCurious: "ما زال هناك شيء يشغل بالك؟",
      ctaLabel: "أرسل سؤالك",
      items: [
        {
          q: "كم تبلغ تكلفة المشروع؟",
          a: "تختلف حسب النطاق، ولكنّ معظم مشاريعنا تتراوح بين 25 ألف و180 ألف دولار. لا نُسعّر شيئًا قبل أن نفهم احتياجك الفعليّ — جواب مختصر لا يُنصفك. بعد طلبك، تتلقّى عرضًا مكتوبًا برسوم ثابتة ونطاق واضح.",
        },
        {
          q: "كم يستغرق بناء منتجٍ معكم؟",
          a: "نسخة أوليّة مُركَّزة تستغرق 6 إلى 12 أسبوعًا. منتج كامل — موبايل وويب وbackend — عادةً ما يأخذ من 3 إلى 5 أشهر. نسلّم على مراحل بحيث ترى برمجيّات تعمل خلال أوّل ثلاثة أسابيع لا في النهاية.",
        },
        {
          q: "لمن تعود ملكيّة الكود والملكيّة الفكريّة؟",
          a: "لك أنت. تنتقل الشيفرة المصدريّة وملفّات التصميم وصلاحيّات البنية التحتيّة إلى حساباتك بنهاية المشروع. لا نحتفظ بأبواب خلفيّة ولا تراخيص ولا تبعيّات مخفيّة علينا.",
        },
        {
          q: "هل توقّعون اتّفاقيّة سرّيّة؟",
          a: "نعم — بكلّ سرور وفي أيّ مرحلة. يمكننا توقيع اتّفاقيّتك قبل المكالمة الأولى، أو إرسال اتّفاقيّتنا خلال ساعة. السرّيّة هي الأصل لا الاستثناء.",
        },
        {
          q: "هل تعملون مع المؤسّسين في المراحل المبكّرة، أم مع الشركات القائمة فقط؟",
          a: "كلاهما. ما نبحث عنه هو النيّة والوضوح — مؤسِّس يعرف المشكلة التي يحلّها، أو فريق مستعدّ للاستثمار في شيء يُبنى كما يجب. نعتذر عن مشاريع، مهما كانت كبيرة، حين لا يكون التوافق موجودًا.",
        },
        {
          q: "ماذا يحدث بعد الإطلاق؟",
          a: "معظم العملاء يُبقوننا على عقد دعم هادئ للتطوير والمراقبة والتحسينات الصغيرة. لا التزام مُغلَق — يمكنك تسليم الكود لفريقك في أيّ لحظة، وسندعم الانتقال.",
        },
      ],
    },
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
        greeting: (name) => `شكرًا لك يا ${name}.`,
        stepsKicker: "ماذا يحدث الآن",
        steps: [
          { title: "تمّ استلام طلبك", desc: "وصل بريفك إلينا مشفّرًا وانضمّ إلى قائمة المراجعة." },
          { title: "مراجعة من شريك أوّل", desc: "يقرأه شريك بنفسه — لا فلاتر ولا روبوتات." },
          { title: "ردّ شخصي", desc: "نعود إليك خلال 24 إلى 48 ساعة." },
        ],
        refLabel: "رقم الطلب",
        mailLabel: "تودّ إضافة شيء؟",
        mailCta: "راسلنا على team@capsorix.tech",
        summaryKicker: "ملخص الطلب",
        summaryLabels: {
          name: "الاسم",
          email: "البريد",
          phone: "الهاتف",
          project_type: "نوع المشروع",
          budget_range: "الميزانية",
          timeline: "الإطار الزمني",
          description: "الوصف",
        },
        summaryEmpty: "—",
        copyRef: "نسخ رقم الطلب",
        copiedRef: "تم النسخ",
      },
      toastErrTitle: "راجع البيانات من فضلك",
      toastSendErr: "تعذّر إرسال طلبك",
      toastSendErrDesc: "حاول مجددًا بعد لحظات، أو راسلنا على team@capsorix.tech مباشرةً.",
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
      or: "أو راسلنا على team@capsorix.tech",
      reply: "ردّ خلال 24–48 ساعة",
      nda: "اتفاقية سرّية عند الطلب",
      noObligation: "بلا أيّ التزام",
    },
    footer: {
      tagline: "نبني أنظمة تنقل الأعمال خطوة للأمام. مشاريع قليلة، تُنفَّذ كما يجب.",
      rights: "جميع الحقوق محفوظة.",
      values: "اختيار · دقّة · أفق طويل",
    },
    notFound: {
      code: "404",
      kicker: "— خارج الخريطة",
      titleA: "هذه الصفحة ",
      titleB: "غير موجودة.",
      lead: "العنوان الذي اتّبعته لا يقود إلى أيّ شيء في نظامنا. لا داعي للقلق — دعنا نعيدك إلى مكان ذي معنى.",
      pathLabel: "المسار المطلوب",
      primary: "العودة للرئيسية",
      secondary: "تحدّث معنا",
      suggestionsKicker: "أو انتقل إلى",
      suggestions: [
        { label: "iOS", href: "/ios", desc: "هندسة أصيلة لأجهزة آيفون وآيباد." },
        { label: "Android", href: "/android", desc: "تطبيقات أندرويد بأداء مُقدَّم." },
        { label: "Web", href: "/web", desc: "منصّات ويب ولوحات تحكّم." },
      ],
    },
    autosave: {
      restoredTitle: "تمّت استعادة المسودّة",
      restoredDesc: "أعدنا لك ما كنت تكتبه قبل المغادرة.",
      discard: "تجاهل",
      savedNote: "تمّ حفظ المسودّة محلّيًا",
    },
    cookies: {
      title: "نحترم خصوصيّتك.",
      body: "نستخدم ملفّ تعريف ارتباط واحدًا أساسيًّا لتذكّر لغتك. ",
      bodyStrong: "لا تتبّع، ولا تحليلات، ولا أطراف ثالثة — أبدًا.",
      accept: "موافق",
      decline: "الأساسيّات فقط",
      learnMore: "اعرف المزيد",
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
    caseStudies: {
      kicker: "— Travaux choisis",
      titleA: "Trois projets,",
      titleB: " trois échelles différentes.",
      lead:
        "Un aperçu du type de travail que nous prenons en charge. Les noms sont retenus quand la confidentialité l’exige — les résultats, jamais.",
      durationLabel: "Durée d’engagement",
      stackLabel: "Pile technique",
      challengeLabel: "Contexte",
      approachLabel: "Démarche",
      confidentialNote: "Nom du client protégé par NDA.",
      items: [
        {
          tag: "iOS · Hôtellerie",
          client: "Groupe de restauration méditerranéen",
          title: "Une app iPhone côté client qui a remplacé quatre points de contact.",
          summary:
            "Réservations, commandes, fidélité et carte signée par le chef — réunis en une expérience iPhone discrète que la marque avait vraiment envie de lancer.",
          challenge:
            "Quatre outils éditeurs déconnectés érodaient l’expérience en salle. Le personnel contournait le logiciel au lieu de s’en servir.",
          approach:
            "Nous avons reconstruit le parcours client en natif Swift, autour d’un système de design petit et assumé. Les intégrations backend ont été regroupées derrière une seule API interne.",
          stack: ["Swift", "SwiftUI", "Combine", "Postgres", "Edge functions"],
          metrics: [
            { value: "−61 %", label: "Tickets de support" },
            { value: "4,8★", label: "Note App Store" },
            { value: "1,4×", label: "Panier moyen" },
          ],
          duration: "11 semaines",
        },
        {
          tag: "Android · Logistique",
          client: "Opérateur de flotte régional",
          title: "Un outil de répartition Android utilisé par 240 chauffeurs.",
          summary:
            "Une app conducteur taillée sur mesure et une console répartiteur, pensées autour des dix gestes qui occupent quatre-vingt-dix pour cent de la journée.",
          challenge:
            "Une suite logistique générique ne suffisait plus. Les répartiteurs maintenaient un tableur parallèle pour rester opérationnels.",
          approach:
            "Entretiens terrain dans trois dépôts, puis une app Kotlin réglée pour les appareils modestes et la connectivité instable. La console a suivi le flux du chauffeur, pas l’inverse.",
          stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "WebSockets"],
          metrics: [
            { value: "+34 %", label: "Tournées par poste" },
            { value: "−2,1 min", label: "Temps moyen de répartition" },
            { value: "0", label: "Tableurs restants" },
          ],
          duration: "16 semaines",
        },
        {
          tag: "Web · Industriel",
          client: "Groupe industriel européen",
          title: "Une plateforme web reliant huit usines à une seule source de vérité.",
          summary:
            "Un tableau de bord production unifié, une couche d’admin par rôle et un flux d’anomalies en temps réel — à la place d’un éparpillement d’outils internes que personne n’aimait.",
          challenge:
            "Chaque usine pilotait ses propres tableaux. La direction ne voyait jamais l’entreprise au même endroit — et n’y croyait pas non plus quand elle la voyait.",
          approach:
            "Nous avons d’abord modélisé un schéma partagé propre, puis bâti par-dessus une UI web calme et dense — RBAC, traçabilité et télémétrie temps réel intégrés dès le premier jour.",
          stack: ["TypeScript", "React", "Postgres", "TimescaleDB", "Edge functions"],
          metrics: [
            { value: "8 → 1", label: "Tableaux unifiés" },
            { value: "−47 %", label: "Latence des rapports" },
            { value: "99,98 %", label: "Disponibilité plateforme" },
          ],
          duration: "5 mois",
        },
      ],
    },
    testimonials: {
      kicker: "— Selon eux",
      titleA: "Ce que les personnes",
      titleB: " avec qui nous avons construit en disent.",
      lead:
        "Quelques mots de fondateurs, opérateurs et responsables produit avec qui nous avons travaillé.",
      prev: "Précédent", next: "Suivant",
      items: [
        {
          quote:
            "Ils se sont comportés comme des partenaires, pas comme des prestataires. Les décisions étaient expliquées, les compromis nommés à voix haute, et le produit a été livré à l’heure sans un seul appel d’urgence.",
          name: "Lina Aboul-Saoud",
          role: "Fondatrice et CEO",
          company: "Groupe d’hôtellerie · Beyrouth",
          initials: "LA",
        },
        {
          quote:
            "C’était un ingénieur senior qui lisait chaque brief, pas un tunnel commercial. Le premier appel a déjà fait avancer notre réflexion — et la suite était au même niveau.",
          name: "Marcus Hartmann",
          role: "VP Produit",
          company: "SaaS industriel · Munich",
          initials: "MH",
        },
        {
          quote:
            "Soigné, retenu, rapide. Six mois plus tard, nous utilisons toujours l’architecture posée le premier jour — et nous n’avons rien eu à redessiner.",
          name: "Sara El-Khoury",
          role: "Directrice de l’ingénierie",
          company: "Plateforme fintech · Dubaï",
          initials: "SK",
        },
        {
          quote:
            "La première chose qu’ils ont faite, c’est nous dire ce qu’il ne fallait pas construire. Cette seule conversation nous a fait gagner un trimestre — et probablement l’entreprise.",
          name: "Jonas Berger",
          role: "Cofondateur",
          company: "Logistique B2B · Berlin",
          initials: "JB",
        },
      ],
    },
    faq: {
      kicker: "— Questions fréquentes",
      titleA: "Des réponses",
      titleB: " avant même la question.",
      lead:
        "Les questions que l’on nous pose le plus, traitées honnêtement. Si la vôtre n’y figure pas, glissez-la dans le brief — nous y répondrons directement.",
      stillCurious: "Une question reste en suspens ?",
      ctaLabel: "Posez votre question",
      items: [
        {
          q: "Combien coûte un projet ?",
          a: "Cela dépend du périmètre, mais la plupart des engagements se situent entre 25 000 et 180 000 $. Nous ne donnons jamais de chiffre avant d’avoir compris votre besoin réel — une réponse en une ligne serait malhonnête. Après votre brief, vous recevez une proposition écrite avec un forfait clair.",
        },
        {
          q: "Combien de temps prend un projet ?",
          a: "Un MVP focalisé prend 6 à 12 semaines. Un produit complet — mobile, web et backend — prend généralement 3 à 5 mois. Nous livrons par paliers, vous voyez du logiciel fonctionnel dès les trois premières semaines, pas à la fin.",
        },
        {
          q: "À qui appartiennent le code et la PI ?",
          a: "À vous. Code source, fichiers de design et accès infrastructure sont transférés sur vos comptes en fin de mission. Aucune porte dérobée, aucune licence, aucune dépendance cachée à nous.",
        },
        {
          q: "Signez-vous un NDA ?",
          a: "Oui — volontiers, à toute étape. Nous pouvons contresigner le vôtre avant le premier appel, ou envoyer le nôtre dans l’heure. La confidentialité est la règle, pas l’exception.",
        },
        {
          q: "Travaillez-vous avec des fondateurs en early-stage ou seulement des entreprises établies ?",
          a: "Les deux. Ce que nous cherchons, c’est l’intention et la clarté — un fondateur qui sait quel problème il résout, ou une équipe prête à investir dans quelque chose de bien fait. Nous refusons des projets, quelle que soit la taille, quand l’adéquation n’est pas là.",
        },
        {
          q: "Que se passe-t-il après la mise en ligne ?",
          a: "La plupart des clients nous gardent sous un retainer calme pour l’évolution, le monitoring et les petites améliorations. Aucun verrouillage — vous pouvez confier le code à votre équipe à tout moment et nous accompagnons la transition.",
        },
      ],
    },
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
        greeting: (name) => `Merci, ${name}.`,
        stepsKicker: "La suite",
        steps: [
          { title: "Brief sécurisé", desc: "Votre demande est chiffrée et placée dans la file de revue." },
          { title: "Revue par un partenaire", desc: "Un partenaire la lit personnellement — sans tri automatique." },
          { title: "Réponse personnelle", desc: "Nous revenons vers vous sous 24 à 48 heures." },
        ],
        refLabel: "Référence",
        mailLabel: "Un détail à ajouter ?",
        mailCta: "Écrivez à team@capsorix.tech",
        summaryKicker: "Récapitulatif",
        summaryLabels: {
          name: "Nom",
          email: "E-mail",
          phone: "Téléphone",
          project_type: "Projet",
          budget_range: "Budget",
          timeline: "Échéance",
          description: "Brief",
        },
        summaryEmpty: "—",
        copyRef: "Copier la référence",
        copiedRef: "Copié",
      },
      toastErrTitle: "Merci de vérifier le formulaire",
      toastSendErr: "Impossible d’envoyer votre demande",
      toastSendErrDesc: "Réessayez dans un instant, ou écrivez-nous à team@capsorix.tech.",
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
      or: "ou écrivez à team@capsorix.tech",
      reply: "Réponse sous 24–48 h",
      nda: "NDA sur demande",
      noObligation: "Sans engagement",
    },
    footer: {
      tagline: "Nous bâtissons des systèmes qui font avancer les entreprises. Peu de projets, faits correctement.",
      rights: "Tous droits réservés.",
      values: "Sélectif · Précis · Long terme",
    },
    notFound: {
      code: "404",
      kicker: "— Hors carte",
      titleA: "Cette page ",
      titleB: "n’existe pas.",
      lead: "L’adresse suivie ne mène à rien dans notre système. Rien de grave — reprenons un cap utile.",
      pathLabel: "Chemin demandé",
      primary: "Retour à l’accueil",
      secondary: "Nous parler",
      suggestionsKicker: "Ou rejoindre",
      suggestions: [
        { label: "iOS", href: "/ios", desc: "Ingénierie native iPhone et iPad." },
        { label: "Android", href: "/android", desc: "Applications Android orientées performance." },
        { label: "Web", href: "/web", desc: "Plateformes web et tableaux de bord." },
      ],
    },
    autosave: {
      restoredTitle: "Brouillon restauré",
      restoredDesc: "Nous avons rétabli ce que vous étiez en train d’écrire.",
      discard: "Écarter",
      savedNote: "Brouillon enregistré localement",
    },
    cookies: {
      title: "Nous respectons votre vie privée.",
      body: "Nous utilisons un seul cookie essentiel pour mémoriser votre langue. ",
      bodyStrong: "Aucun suivi, aucune analytique, aucun tiers — jamais.",
      accept: "J’ai compris",
      decline: "Essentiels uniquement",
      learnMore: "En savoir plus",
    },
    subpages: {
      common: {
        capabilitiesKicker: "— Compétences",
        consultCta: "Demander une consultation privée",
        replyNote: "Réponse d’un partenaire sous 24 à 48 heures.",
      },
      ios: {
        eyebrow: "iOS · Discipline N°01",
        chip: "Développement iOS",
        titleA: "Conçu en",
        titleSwift: " Swift.",
        titleB: "Pensé pour Apple.",
        lead: "Des applications iOS natives bâties dans l’esprit d’Apple — discipline, goût, et obsession du détail. Du premier prototype au lancement sur l’App Store.",
        navigatorLabel: "Navigateur de projet",
        inspectorLabel: "Inspecteur",
        consoleLabel: "Console",
        capabilitiesTitleA: "Chaque détail, voulu.",
        capabilitiesTitleB: " Chaque image, méritée.",
        capabilities: [
          { title: "Performance native", desc: "Swift ajusté à la main, rendu Metal-aware, interactions sous 16 ms sur tous les appareils." },
          { title: "SwiftUI · UIKit", desc: "Architectures composables, interfaces pilotées par l’état, interopérabilité fluide là où elle compte." },
          { title: "Confidentialité d’abord", desc: "App Tracking Transparency, Keychain, intelligence sur l’appareil, flux de données audités." },
          { title: "UX soignée", desc: "Animations à l’image près, retours haptiques, type dynamique — obsession Human Interface." },
          { title: "Écosystème Apple", desc: "Widgets, Live Activities, App Intents, watchOS, visionOS — intégration native." },
          { title: "Prêt pour l’App Store", desc: "Soumission, préparation à la review, optimisation post-lancement — de bout en bout." },
        ],
        ctaTitleA: "Ce n’est pas une équipe.",
        ctaTitleB: "C’est une ingénierie d’élite.",
        ctaLead: "Si votre produit iOS mérite le même soin qu’Apple met dans sa plateforme, parlons-en.",
      },
      android: {
        eyebrow: "Android · Discipline N°02",
        chip: "Développement Android",
        titleA: "Forgé en",
        titleKotlin: " Kotlin.",
        titleB: "Bâti pour durer.",
        lead: "Des applications Android natives à la solidité structurelle : modulaires, performantes, d’une fiabilité obsessionnelle. De l’architecture au Play Store, exécutées avec précision.",
        projectLabel: "Projet",
        moduleInfoLabel: "Infos module",
        gradleLabel: "Tâches Gradle",
        capabilitiesTitleA: "Pensé pour la solidité.",
        capabilitiesTitleB: " Conçu pour grandir.",
        capabilities: [
          { title: "Kotlin · Coroutines", desc: "Concurrence moderne, typée, structurée. Du code qui grandit sans casser." },
          { title: "Jetpack Compose", desc: "UI déclarative et réactive, pensée pour la performance et la maintenabilité." },
          { title: "Sécurité durcie", desc: "Stockage chiffré, biométrie, certificate pinning, attestation SafetyNet." },
          { title: "Architecture modulaire", desc: "Clean Architecture, MVI, Gradle multi-modules — bâti pour grandir avec votre activité." },
          { title: "Performance ajustée", desc: "Baseline profiles, optimisation R8, rendu à l’image près sur tout appareil." },
          { title: "Prêt pour le Play Store", desc: "Bundles signés, déploiements progressifs, maîtrise du Play Console, supervision post-lancement." },
        ],
        ctaTitleA: "Ingénierie disciplinée.",
        ctaTitleB: "Livraison précise.",
        ctaLead: "Si votre produit Android exige l’architecture et la rigueur pour passer à l’échelle de millions d’appareils, parlons-en.",
      },
      web: {
        eyebrow: "Web · Discipline N°03",
        chip: "Développement Web",
        titleA: "Là où",
        titleBeauty: " la beauté ",
        titleC: "rencontre",
        titleLogic: "la logique.",
        lead: "Le soin du frontend et la rigueur du backend — dans les mêmes mains. Des sites et plateformes qui semblent évidents et tournent comme une horloge.",
        hint: "Survolez n’importe quel jeton ci-dessous pour révéler son sens.",
        flowLive: "Aller-retour en direct",
        capabilitiesKicker: "— Compétences",
        capabilitiesTitleA: "Deux disciplines.",
        capabilitiesTitleB: " Un seul studio.",
        capabilitiesLead: "Pas de passe entre design et ingénierie — nous sommes les deux. C’est pour ça que nos produits paraissent cohérents, du premier pixel à la dernière requête.",
        capabilities: [
          { title: "React · Next.js", desc: "App Router, RSC, rendu en edge — des interfaces qui se chargent instantanément et paraissent évidentes." },
          { title: "Design Systems", desc: "Bibliothèques de composants tokenisées, thématisables et accessibles — qui passent à l’échelle." },
          { title: "Node · Edge APIs", desc: "APIs typées, files, flux et serverless qui tiennent sous une charge réelle." },
          { title: "Auth · Sécurité", desc: "OAuth, RBAC, rate limiting, journaux d’audit — sécurisé par l’architecture, pas en bout de course." },
          { title: "Core Web Vitals", desc: "LCP sous la seconde, CLS proche de zéro, INP au millième près. Une finition mesurable." },
          { title: "DevOps · CI/CD", desc: "Environnements de preview, contrôles automatisés, observabilité, déploiements sans interruption." },
        ],
        ctaTitleA: "Ils maîtrisent les deux :",
        ctaTitleB: "la beauté et la logique.",
        ctaLead: "Si votre produit web demande autant de goût que d’ingénierie, parlons-en.",
      },
    },
  },

  de: {
    nav: {
      services: "Leistungen",
      process: "Methode",
      industries: "Branchen",
      contact: "Kontakt",
      ios: "iOS",
      android: "Android",
      web: "Web",
      cta: "Projekt anfragen",
    },
    hero: {
      badge: "Code ohne Grenzen — Ihr nächster digitaler Schritt",
      titleA: "Wir liefern keine",
      titleApps: "bloßen Apps.",
      titleB: "Wir bauen",
      titleSystems: "Systeme,",
      titleC: "die Unternehmen voranbringen.",
      sub:
        "Produktarbeit von Anfang bis Ende — für Mobile, Web und die internen Werkzeuge, die ein Unternehmen leise tragen. Entworfen, entwickelt und ausgeliefert von einem einzigen erfahrenen Team.",
      subStrong: "Persönlich gelesen. Antwort innerhalb von 24 bis 48 Stunden.",
      ctaPrimary: "Projekt einreichen",
      ctaSecondary: "Unsere Arbeit ansehen",
      foot: "Code ohne Grenzen · Persönlich gelesen · NDA auf Anfrage",
      scroll: "Scrollen",
    },
    trust: {
      pillars: [
        { title: "Was wir liefern, hält", desc: "Wir versprechen weniger und konzentrieren uns auf das, was im zweiten Jahr noch trägt." },
        { title: "Antwort in 24–48 Stunden", desc: "Jede Anfrage liest ein Mensch — nicht ein Trichter." },
        { title: "Details, die andere überspringen", desc: "Kleinigkeiten prägen, wie sich ein Produkt anfühlt. Wir runden sie nicht weg." },
        { title: "Bewusst selektiv", desc: "Wir nehmen wenige Projekte an — damit jedes die Aufmerksamkeit erhält, die es verdient." },
      ],
    },
    about: {
      kicker: "— Über uns",
      titleA: "Ein kleines Team,",
      titleB: " eine durchdachte Methode.",
      lead:
        "Wir wählen unsere Arbeit mit Sorgfalt. Nicht jedes Projekt nehmen wir an — doch jedes, das wir annehmen, wird richtig gebaut.",
      tail: "Wenige Mandate. Keines davon gewöhnlich.",
      principles: [
        { k: "01", t: "Verstehen, bevor wir bauen", d: "Jedes Projekt beginnt mit Zuhören — dem Geschäft, den Nutzenden, den Zwängen, die niemand ausspricht." },
        { k: "02", t: "Denken, bevor wir entwerfen", d: "Die Struktur kommt vor der Oberfläche. Wir kartieren das System, bevor wir den ersten Bildschirm zeichnen." },
        { k: "03", t: "Prüfen, bevor wir starten", d: "Randfälle, echte Geräte, echte Bedingungen. Was brechen kann, finden wir zuerst." },
      ],
    },
    services: {
      kicker: "— Was wir bauen",
      titleA: "Wir bauen nur,",
      titleB: " was existieren sollte.",
      lead: "Eine fokussierte Auswahl an Disziplinen, alle am gleichen Maßstab gemessen. Maßgeschneidert auf das Geschäft — nie aus Vorlagen.",
      items: [
        { title: "iOS-Apps", desc: "Native Swift-Apps, gebaut wie Apple seine eigenen baut — ruhig, schnell, bis zum letzten Frame durchdacht.", tags: ["Swift", "SwiftUI", "App Store"] },
        { title: "Android-Apps", desc: "Kotlin-zuerst, saubere Architektur, und jene Details, die Nutzende spüren, ohne sie benennen zu können.", tags: ["Kotlin", "Compose", "Play Store"] },
        { title: "Websites als Erlebnis", desc: "Keine Seiten — Räume. Oberflächen, die sofort laden, klar zu lesen sind und überzeugen, ohne die Stimme zu heben.", tags: ["Next.js", "React", "Edge"] },
        { title: "Interne Systeme", desc: "Dashboards, Betriebswerkzeuge und Plattformen, die das Geschäft hinter dem Geschäft leise am Laufen halten.", tags: ["SaaS", "ERP", "Analytik"] },
        { title: "Produkt von A bis Z", desc: "Strategie, Design, Entwicklung, Launch — von einem Team, in einem fortlaufenden Gedankengang.", tags: ["MVP", "Skalierung", "Launch"] },
      ],
      enter: "Das {x}-Studio betreten",
      footer: "Alles, was Software betrifft — richtig gemacht.",
      footerLink: "Unsicher, wo es hineinpasst? Schicken Sie es trotzdem",
    },
    process: {
      kicker: "— Methode",
      titleA: "Sechs Schritte.",
      titleB: " Keiner davon übersprungen.",
      lead: "Keine Abkürzungen — denn jeder Schritt verdient seinen Platz.",
      steps: [
        { title: "Verstehen", desc: "Wir hören zuerst zu. Die Anfrage wird schärfer, bevor irgendetwas anderes sich bewegt." },
        { title: "Analysieren", desc: "Zwänge, Nutzende, Randfälle. Wir kartieren das System, bevor wir einen Bildschirm zeichnen." },
        { title: "Gestalten", desc: "Ruhige Oberflächen mit klarer Hierarchie. Geschaffen, um benutzt — nicht bewundert — zu werden." },
        { title: "Bauen", desc: "Saubere Entwicklung, echtes Testen, keine versteckten Abkürzungen unter der Oberfläche." },
        { title: "Starten", desc: "Mit Sorgfalt ausgeliefert. Ab der ersten Stunde beobachtet, nicht erst bei der ersten Beschwerde." },
        { title: "Begleiten", desc: "Wir bleiben — verfeinern, unterstützen und lassen das System mit der Zeit wachsen." },
      ],
    },
    industries: {
      kicker: "— Wo wir arbeiten",
      titleA: "Verschiedene Branchen.",
      titleB: " Ein Maßstab.",
      lead: "Die Oberfläche ändert sich. Die Methode nicht. Wir passen uns dem Feld an, ohne den Anspruch zu senken — und nehmen nur, was wir gut können.",
      labels: ["Restaurants", "Unternehmen", "Startups", "Industrie", "Cafés", "Handel", "Gesundheit", "Reisen"],
    },
    stats: [
      { value: "Wenige", label: "Projekte pro Quartal angenommen" },
      { value: "100 %", label: "Von erfahrenen Ingenieuren gebaut" },
      { value: "24–48 Std.", label: "Persönliches Antwortfenster" },
      { value: "Lange", label: "Dauer jeder Beziehung" },
    ],
    caseStudies: {
      kicker: "— Ausgewählte Arbeiten",
      titleA: "Drei Projekte,",
      titleB: " drei verschiedene Größenordnungen.",
      lead:
        "Ein Einblick in die Art von Arbeit, die wir übernehmen. Namen bleiben dort verschwiegen, wo Vertraulichkeit es verlangt — Ergebnisse nicht.",
      durationLabel: "Projektdauer",
      stackLabel: "Technologie",
      challengeLabel: "Ausgangslage",
      approachLabel: "Vorgehen",
      confidentialNote: "Kundenname unter NDA geschützt.",
      items: [
        {
          tag: "iOS · Hospitality",
          client: "Mediterrane Restaurantgruppe",
          title: "Eine Gäste-iOS-App, die vier Touchpoints ersetzt hat.",
          summary:
            "Reservierung, Bestellung, Loyalty und eine vom Küchenchef kuratierte Karte — gefaltet in eine ruhige iPhone-Erfahrung, die die Marke wirklich ausliefern wollte.",
          challenge:
            "Vier unverbundene Drittanbieter-Tools verwässerten das Gästeerlebnis. Das Personal arbeitete um die Software herum, nicht mit ihr.",
          approach:
            "Wir haben die Gäste-Reise nativ in Swift neu aufgebaut, getragen von einem kleinen, klaren Designsystem. Backend-Integrationen wurden hinter einer einzigen internen API zusammengeführt.",
          stack: ["Swift", "SwiftUI", "Combine", "Postgres", "Edge Functions"],
          metrics: [
            { value: "−61 %", label: "Support-Tickets" },
            { value: "4,8★", label: "App-Store-Bewertung" },
            { value: "1,4×", label: "Ø Bestellwert" },
          ],
          duration: "11 Wochen",
        },
        {
          tag: "Android · Logistik",
          client: "Regionaler Flottenbetreiber",
          title: "Ein Android-Dispatch-Werkzeug, das 240 Fahrer wirklich nutzen.",
          summary:
            "Eine zweckgebaute Fahrer-App und eine Disponenten-Konsole, gestaltet rund um die zehn Vorgänge, die neunzig Prozent des Tages ausmachen.",
          challenge:
            "Eine Standard-Logistik-Suite war zu generisch. Disponenten führten parallel eine Tabelle, um den Überblick zu behalten.",
          approach:
            "Feldinterviews in drei Depots, danach eine Kotlin-App, abgestimmt auf schwächere Geräte und unzuverlässige Verbindungen. Die Disponenten-Konsole folgte dem Fahrerfluss — nicht umgekehrt.",
          stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "WebSockets"],
          metrics: [
            { value: "+34 %", label: "Touren pro Schicht" },
            { value: "−2,1 Min.", label: "Ø Dispatch-Zeit" },
            { value: "0", label: "verbleibende Tabellen" },
          ],
          duration: "16 Wochen",
        },
        {
          tag: "Web · Industrie",
          client: "Europäische Industriegruppe",
          title: "Eine Web-Plattform, die acht Werke an eine Quelle der Wahrheit bindet.",
          summary:
            "Ein einheitliches Produktions-Dashboard, eine rollenbewusste Admin-Schicht und ein Echtzeit-Anomalie-Stream — anstelle eines Wildwuchses interner Tools, den niemand mochte.",
          challenge:
            "Jedes Werk betrieb eigene Dashboards. Die Führung sah das Unternehmen nie an einer Stelle — und vertraute den Zahlen auch dann nicht.",
          approach:
            "Wir haben zuerst ein sauberes gemeinsames Schema modelliert, darauf eine ruhige, dichte Web-Oberfläche gebaut — RBAC, Auditierbarkeit und Live-Telemetrie vom ersten Tag an.",
          stack: ["TypeScript", "React", "Postgres", "TimescaleDB", "Edge Functions"],
          metrics: [
            { value: "8 → 1", label: "Dashboards vereint" },
            { value: "−47 %", label: "Reporting-Verzögerung" },
            { value: "99,98 %", label: "Plattform-Verfügbarkeit" },
          ],
          duration: "5 Monate",
        },
      ],
    },
    testimonials: {
      kicker: "— In ihren Worten",
      titleA: "Was die Menschen,",
      titleB: " mit denen wir gebaut haben, sagen.",
      lead:
        "Einige Stimmen von Gründerinnen, Operators und Produktverantwortlichen, an deren Seite wir entwickelt haben.",
      prev: "Zurück", next: "Weiter",
      items: [
        {
          quote:
            "Sie haben sich wie Partner verhalten, nicht wie Lieferanten. Entscheidungen wurden erklärt, Abwägungen klar benannt, und das Produkt ging pünktlich live — ohne einen einzigen Notruf.",
          name: "Lina Aboul-Saoud",
          role: "Gründerin & CEO",
          company: "Hospitality-Gruppe · Beirut",
          initials: "LA",
        },
        {
          quote:
            "Ein erfahrener Ingenieur las jedes Briefing — kein Vertriebs-Funnel. Schon das erste Gespräch hat unser Denken vorangebracht, und die Arbeit danach hielt das Niveau.",
          name: "Marcus Hartmann",
          role: "VP of Product",
          company: "Industrial SaaS · München",
          initials: "MH",
        },
        {
          quote:
            "Präzise, zurückhaltend, schnell. Sechs Monate später nutzen wir noch immer die Architektur des ersten Tages — und mussten nichts neu zeichnen.",
          name: "Sara El-Khoury",
          role: "Head of Engineering",
          company: "Fintech-Plattform · Dubai",
          initials: "SK",
        },
        {
          quote:
            "Das Erste, was sie taten, war uns zu sagen, was wir nicht bauen sollten. Allein dieses Gespräch hat uns ein Quartal Arbeit erspart — und vermutlich das Unternehmen.",
          name: "Jonas Berger",
          role: "Mitgründer",
          company: "B2B-Logistik · Berlin",
          initials: "JB",
        },
      ],
    },
    faq: {
      kicker: "— Häufige Fragen",
      titleA: "Antworten,",
      titleB: " bevor Sie fragen.",
      lead:
        "Die Fragen, die wir am häufigsten hören — ehrlich beantwortet. Steht Ihre nicht dabei, schreiben Sie sie ins Briefing — wir gehen direkt in unserer Antwort darauf ein.",
      stillCurious: "Bleibt eine Frage offen?",
      ctaLabel: "Frage senden",
      items: [
        {
          q: "Was kostet ein Projekt?",
          a: "Das hängt vom Umfang ab, aber die meisten Engagements liegen zwischen 25.000 und 180.000 $. Wir nennen keine Zahl, bevor wir Ihren tatsächlichen Bedarf verstanden haben — eine Einzeiler-Antwort wäre unseriös. Nach Ihrem Briefing erhalten Sie ein schriftliches Angebot mit Festpreis und klarem Umfang.",
        },
        {
          q: "Wie lange dauert ein Projekt?",
          a: "Ein fokussiertes MVP läuft 6 bis 12 Wochen. Ein vollständiges Produkt — Mobile, Web und Backend — typischerweise 3 bis 5 Monate. Wir liefern in Stufen, sodass Sie funktionierende Software schon in den ersten drei Wochen sehen, nicht erst am Ende.",
        },
        {
          q: "Wem gehören Code und IP?",
          a: "Ihnen. Quellcode, Designdateien und Infrastrukturzugänge werden zum Projektende auf Ihre Konten übertragen. Keine Hintertüren, keine Lizenzen, keine versteckten Abhängigkeiten an uns.",
        },
        {
          q: "Unterzeichnen Sie eine NDA?",
          a: "Ja — gerne und in jeder Phase. Wir gegenzeichnen Ihre NDA vor dem ersten Gespräch oder schicken unsere innerhalb einer Stunde. Vertraulichkeit ist die Regel, nicht die Ausnahme.",
        },
        {
          q: "Arbeiten Sie mit Frühphasen-Gründern oder nur mit etablierten Unternehmen?",
          a: "Mit beiden. Worauf wir achten, ist Absicht und Klarheit — eine Gründerin, die weiß, welches Problem sie löst, oder ein Team, das bereit ist, in etwas Richtiges zu investieren. Wir lehnen Projekte ab, unabhängig von der Größe, wenn die Passung nicht stimmt.",
        },
        {
          q: "Was passiert nach dem Launch?",
          a: "Die meisten Kunden behalten uns auf einem ruhigen Retainer für Weiterentwicklung, Monitoring und kleine Verbesserungen. Kein Lock-in — Sie können den Code jederzeit Ihrem Team übergeben, wir begleiten den Übergang.",
        },
      ],
    },
    contact: {
      kicker: "— Projekt einreichen",
      titleA: "Erzählen Sie uns, was",
      titleB: " existieren sollte.",
      lead:
        "Wenige Zeilen genügen. Wir lesen sie mit dem Blick eines Bauenden — nicht eines Verkäufers — und antworten persönlich innerhalb von ",
      leadStrong: "24 bis 48 Stunden",
      leadTail: ". Passt Ihr Projekt zu unserer Arbeitsweise, übernehmen wir es mit Freude.",
      bullets: [
        "Wir wählen unsere Projekte sorgfältig",
        "Von erfahrenen Ingenieuren gebaut — von Anfang bis Ende",
        "Vertraulich von Haus aus · NDA auf Anfrage",
      ],
      formKicker: "Projekt-Brief",
      formSub: "Ein paar Minuten genügen.",
      replyChip: "Antwort in 24–48 Std.",
      labels: {
        full_name: "Vollständiger Name",
        email: "E-Mail",
        phone: "Telefon (optional)",
        project_type: "Projektart",
        budget_range: "Budgetrahmen",
        timeline: "Zeitrahmen",
        description: "Projektbeschreibung",
      },
      placeholders: {
        full_name: "Ihr vollständiger Name",
        email: "sie@unternehmen.com",
        phone: "+49 000 0000000",
        description: "Was bauen Sie, für wen, und wie sieht Erfolg für Sie aus?",
        select: "Auswählen…",
      },
      projectTypes: ["Mobile-App", "Website", "Beides", "Maßgeschneidert"],
      budgets: ["Unter 15.000 €", "15.000 – 50.000 €", "50.000 – 150.000 €", "Über 150.000 €", "Noch unklar"],
      timelines: ["Dringend (unter 1 Monat)", "1 – 3 Monate", "3 – 6 Monate", "Flexibel"],
      submit: "Projekt einreichen",
      submitting: "Wird gesendet…",
      reviewed: "Geprüft von einem leitenden Partner",
      confidential: "Vertraulich · NDA verfügbar",
      success: {
        kicker: "Anfrage erhalten",
        titleA: "Ihr Brief liegt",
        titleB: " in unseren Händen.",
        body: "Wir prüfen ihn jetzt und melden uns innerhalb von ",
        bodyStrong: "24 bis 48 Stunden",
        bodyTail: ". Passt Ihr Projekt zu unserer Arbeitsweise, übernehmen wir es mit Freude.",
        chip1: "Antwort in 24–48 Std.",
        chip2: "Geprüft von einem Partner",
        chip3: "Vertraulich behandelt",
        again: "Weiteres Projekt einreichen →",
        greeting: (name) => `Vielen Dank, ${name}.`,
        stepsKicker: "So geht es weiter",
        steps: [
          { title: "Brief gesichert", desc: "Ihre Anfrage ist verschlüsselt und in der Prüfung." },
          { title: "Prüfung durch einen Partner", desc: "Ein Partner liest sie persönlich — keine Vorsortierung." },
          { title: "Persönliche Antwort", desc: "Sie hören innerhalb von 24 bis 48 Stunden von uns." },
        ],
        refLabel: "Referenz",
        mailLabel: "Möchten Sie etwas ergänzen?",
        mailCta: "Schreiben Sie an team@capsorix.tech",
        summaryKicker: "Kurzfassung",
        summaryLabels: {
          name: "Name",
          email: "E-Mail",
          phone: "Telefon",
          project_type: "Projekt",
          budget_range: "Budget",
          timeline: "Zeitrahmen",
          description: "Brief",
        },
        summaryEmpty: "—",
        copyRef: "Referenz kopieren",
        copiedRef: "Kopiert",
      },
      toastErrTitle: "Bitte prüfen Sie das Formular",
      toastSendErr: "Ihre Anfrage konnte nicht gesendet werden",
      toastSendErrDesc: "Bitte versuchen Sie es gleich erneut oder schreiben Sie direkt an team@capsorix.tech.",
      validation: {
        full_name: "Bitte geben Sie Ihren vollständigen Namen ein",
        email: "Bitte geben Sie eine gültige E-Mail an",
        phone: "Diese Telefonnummer ist zu lang",
        project_type: "Wählen Sie eine Projektart",
        budget_range: "Wählen Sie einen Budgetrahmen",
        timeline: "Wählen Sie einen Zeitrahmen",
        description_min: "Bitte ein paar Details mehr",
        description_max: "Bitte unter 2000 Zeichen halten",
      },
    },
    finalCta: {
      badge: "Code ohne Grenzen — Ihr nächster digitaler Schritt",
      titleA: "Haben Sie eine Idee —",
      titleB: " schicken Sie sie.",
      lead:
        "Oder auch nur das Gefühl, dass etwas richtig gebaut werden sollte. Wir lesen es mit dem Blick eines Bauenden, nicht eines Verkäufers — und antworten persönlich innerhalb von 24 bis 48 Stunden.",
      cta: "Projekt einreichen",
      or: "oder schreiben Sie an team@capsorix.tech",
      reply: "Antwort in 24–48 Std.",
      nda: "NDA auf Anfrage",
      noObligation: "Unverbindlich",
    },
    footer: {
      tagline: "Wir bauen Systeme, die Unternehmen voranbringen. Wenige Projekte, richtig gemacht.",
      rights: "Alle Rechte vorbehalten.",
      values: "Selektiv · Präzise · Langfristig",
    },
    notFound: {
      code: "404",
      kicker: "— Außerhalb der Karte",
      titleA: "Diese Seite ",
      titleB: "existiert nicht.",
      lead: "Die aufgerufene Adresse führt in unserem System ins Leere. Kein Problem — wir bringen Sie zurück auf eine sinnvolle Ebene.",
      pathLabel: "Angefragter Pfad",
      primary: "Zur Startseite",
      secondary: "Mit uns sprechen",
      suggestionsKicker: "Oder direkt zu",
      suggestions: [
        { label: "iOS", href: "/ios", desc: "Native Entwicklung für iPhone und iPad." },
        { label: "Android", href: "/android", desc: "Android-Apps mit Performance-Fokus." },
        { label: "Web", href: "/web", desc: "Web-Plattformen und Dashboards." },
      ],
    },
    autosave: {
      restoredTitle: "Entwurf wiederhergestellt",
      restoredDesc: "Wir haben Ihren laufenden Entwurf zurückgeholt.",
      discard: "Verwerfen",
      savedNote: "Entwurf lokal gespeichert",
    },
    cookies: {
      title: "Wir respektieren Ihre Privatsphäre.",
      body: "Wir verwenden einen einzigen, technisch notwendigen Cookie, um Ihre Sprache zu speichern. ",
      bodyStrong: "Kein Tracking, keine Analytik, keine Drittanbieter — niemals.",
      accept: "Verstanden",
      decline: "Nur Essenzielles",
      learnMore: "Mehr erfahren",
    },
    subpages: {
      common: {
        capabilitiesKicker: "— Fähigkeiten",
        consultCta: "Vertrauliches Gespräch anfragen",
        replyNote: "Antwort eines erfahrenen Partners innerhalb von 24 bis 48 Stunden.",
      },
      ios: {
        eyebrow: "iOS · Disziplin Nr. 01",
        chip: "iOS-Entwicklung",
        titleA: "Entwickelt in",
        titleSwift: " Swift.",
        titleB: "Gebaut für Apple.",
        lead: "Native iOS-Apps, gebaut wie Apple es vorsieht — mit Disziplin, Geschmack und einer Besessenheit fürs kleinste Detail. Vom ersten Prototyp bis zum Start im App Store.",
        navigatorLabel: "Projekt-Navigator",
        inspectorLabel: "Inspektor",
        consoleLabel: "Konsole",
        capabilitiesTitleA: "Jedes Detail, gewollt.",
        capabilitiesTitleB: " Jeder Frame, verdient.",
        capabilities: [
          { title: "Native Performance", desc: "Handfein abgestimmtes Swift, Metal-bewusstes Rendering, Interaktionen unter 16 ms auf jeder Geräteklasse." },
          { title: "SwiftUI · UIKit", desc: "Komponierbare Architekturen, zustandsgesteuerte Oberflächen, nahtlose Interop dort, wo es zählt." },
          { title: "Privatsphäre zuerst", desc: "App Tracking Transparency, Keychain, On-Device-Intelligenz und geprüfte Datenflüsse." },
          { title: "Polierte UX", desc: "Frame-genaue Animationen, Haptik, Dynamic Type — kompromissloses Human-Interface-Denken." },
          { title: "Apple-Ökosystem", desc: "Widgets, Live Activities, App Intents, watchOS, visionOS — nativ integriert." },
          { title: "App-Store-bereit", desc: "Einreichung, Review-Vorbereitung und Optimierung nach dem Launch — durchgängig betreut." },
        ],
        ctaTitleA: "Das ist kein Team.",
        ctaTitleB: "Das ist Spitzeningenieurskunst.",
        ctaLead: "Wenn Ihr iOS-Produkt dieselbe Sorgfalt verdient, die Apple in seine Plattform legt, beginnen wir das Gespräch.",
      },
      android: {
        eyebrow: "Android · Disziplin Nr. 02",
        chip: "Android-Entwicklung",
        titleA: "Geschmiedet in",
        titleKotlin: " Kotlin.",
        titleB: "Gebaut, um zu bleiben.",
        lead: "Native Android-Apps mit struktureller Stärke — modular, performant, kompromisslos verlässlich. Von der Architektur bis zum Play Store, mit Präzision umgesetzt.",
        projectLabel: "Projekt",
        moduleInfoLabel: "Modul-Info",
        gradleLabel: "Gradle-Aufgaben",
        capabilitiesTitleA: "Auf Stärke ausgelegt.",
        capabilitiesTitleB: " Zum Wachsen entworfen.",
        capabilities: [
          { title: "Kotlin · Coroutines", desc: "Moderne, typsichere, strukturierte Nebenläufigkeit. Code, der wächst, ohne zu brechen." },
          { title: "Jetpack Compose", desc: "Deklarative, reaktive UI — auf Performance und Wartbarkeit hin entwickelt." },
          { title: "Gehärtete Sicherheit", desc: "Verschlüsselter Speicher, biometrische Auth, Certificate Pinning, SafetyNet-Attestierung." },
          { title: "Modulare Architektur", desc: "Clean Architecture, MVI, Multi-Modul-Gradle — gebaut, um mit Ihrem Geschäft zu wachsen." },
          { title: "Abgestimmte Performance", desc: "Baseline Profiles, R8-Optimierung, frame-genaues Rendering auf jedem Gerät." },
          { title: "Play-Store-bereit", desc: "Signierte Bundles, gestaffeltes Rollout, Beherrschung der Play Console, Monitoring nach dem Launch." },
        ],
        ctaTitleA: "Mit Disziplin entwickelt.",
        ctaTitleB: "Mit Präzision geliefert.",
        ctaLead: "Wenn Ihr Android-Produkt die Architektur und Strenge braucht, um über Millionen Geräte zu skalieren, beginnen wir das Gespräch.",
      },
      web: {
        eyebrow: "Web · Disziplin Nr. 03",
        chip: "Web-Entwicklung",
        titleA: "Wo",
        titleBeauty: " Schönheit ",
        titleC: "auf",
        titleLogic: "Logik trifft.",
        lead: "Frontend-Handwerk und Backend-Strenge — aus denselben Händen. Seiten und Plattformen, die unausweichlich wirken und wie ein Uhrwerk laufen.",
        hint: "Fahren Sie über ein Token unten, um seine Bedeutung zu sehen.",
        flowLive: "Hin und zurück, live",
        capabilitiesKicker: "— Fähigkeiten",
        capabilitiesTitleA: "Zwei Disziplinen.",
        capabilitiesTitleB: " Ein Studio.",
        capabilitiesLead: "Kein Übergeben zwischen Design und Entwicklung — wir sind beides. Deshalb wirken unsere Produkte vom ersten Pixel bis zur letzten Abfrage stimmig.",
        capabilities: [
          { title: "React · Next.js", desc: "App Router, RSC, Edge-Rendering — Oberflächen, die sofort laden und unausweichlich wirken." },
          { title: "Design-Systeme", desc: "Tokenisierte, themenfähige, zugängliche Komponentenbibliotheken — skalieren über Teams und Marken." },
          { title: "Node · Edge-APIs", desc: "Typsichere APIs, Queues, Streams und Serverless, die echtem Traffic standhalten." },
          { title: "Auth · Sicherheit", desc: "OAuth, RBAC, Rate Limiting und Audit Trails — durch Architektur sicher, nicht im Nachhinein." },
          { title: "Core Web Vitals", desc: "LCP unter einer Sekunde, CLS nahe null, INP auf die Millisekunde abgestimmt. Messbare Politur." },
          { title: "DevOps · CI/CD", desc: "Preview-Umgebungen, automatische Prüfungen, Observability und Deploys ohne Ausfall." },
        ],
        ctaTitleA: "Sie verstehen beides:",
        ctaTitleB: "Schönheit und Logik.",
        ctaLead: "Wenn Ihr Web-Produkt Geschmack und Entwicklung in gleichem Maß verlangt, beginnen wir das Gespräch.",
      },
    },
  },
};

