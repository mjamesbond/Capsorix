import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ORIGIN = "https://capsorix.tech";
const DIST = path.resolve("dist");
const BASE_HTML_PATH = path.join(DIST, "index.html");

const routes = [
  {
    route: "/",
    title: "Capsorix — Strategy, Design & Engineering for Ambitious Digital Products",
    description:
      "Capsorix is a technology and innovation engineering studio helping ambitious businesses determine what should be built, why it matters, and how it should work before design or development begins.",
    heading: "Strategy, design and engineering for ambitious digital products.",
    intro:
      "Capsorix is a technology and innovation engineering studio. We turn complex ambitions into clear product decisions, thoughtful experiences and disciplined software systems.",
    sections: [
      ["What Capsorix does", "Product strategy, digital product design, custom software engineering, native iOS and Android development, and production-grade web platforms."],
      ["How Capsorix works", "We clarify the problem before selecting technology, connect product decisions to business consequences, and engineer for durability rather than superficial launch velocity."],
      ["Institutional knowledge", "The Capsorix Knowledge Platform publishes the Canon, concepts and methods that guide how ambitious products and organisations should be understood."],
    ],
  },
  {
    route: "/ios",
    title: "iOS App Development — Capsorix",
    description:
      "Capsorix designs and engineers native iOS applications with Swift and SwiftUI, from product strategy and architecture through App Store launch.",
    heading: "Native iOS products engineered from first principles.",
    intro:
      "Capsorix develops considered iPhone and iPad products where product strategy, interface design, architecture, performance and long-term ownership are treated as one system.",
    sections: [
      ["Native engineering", "Swift, SwiftUI and Apple-platform architecture selected around the product rather than around a generic template."],
      ["Product discipline", "Discovery, interaction design, technical architecture, testing, performance and release planning are connected from the beginning."],
      ["Durable delivery", "The source code, product logic and operating knowledge are structured for maintainability after launch."],
    ],
  },
  {
    route: "/android",
    title: "Android App Development — Capsorix",
    description:
      "Capsorix engineers native Android applications with Kotlin and Jetpack Compose, combining product clarity, clean architecture and production-grade delivery.",
    heading: "Android products designed to remain coherent at scale.",
    intro:
      "Capsorix builds Android applications with Kotlin, Jetpack Compose and clean architectural boundaries, grounded in a clear understanding of users, operations and business consequences.",
    sections: [
      ["Android architecture", "Native platform capabilities, maintainable modules and deliberate state management for products expected to evolve."],
      ["Experience quality", "Material design is used as a system, not a visual shortcut, with accessibility, responsiveness and clarity treated as engineering requirements."],
      ["Production readiness", "Testing, observability, security, deployment and lifecycle decisions are designed before they become emergency work."],
    ],
  },
  {
    route: "/web",
    title: "Web Platform Engineering — Capsorix",
    description:
      "Capsorix creates fast, credible and conversion-focused websites, dashboards and web platforms with strategy, design and engineering working as one discipline.",
    heading: "Web platforms that communicate value and survive real use.",
    intro:
      "Capsorix engineers websites and web applications that must earn trust, explain complex value and perform reliably across devices, networks and operating conditions.",
    sections: [
      ["Strategic web design", "Information architecture, messaging and interaction are designed around what the audience must understand and do."],
      ["Production engineering", "Performance, accessibility, responsive behavior, security and maintainability are built into the architecture."],
      ["Business outcomes", "The web experience is treated as an operating product and trust system, not a decorative brochure."],
    ],
  },
  {
    route: "/about",
    title: "About Capsorix — Product Engineering Philosophy",
    description:
      "Learn how Capsorix thinks about ambitious products, strategic clarity, thoughtful design, disciplined engineering and institutional responsibility.",
    heading: "Capsorix exists to engineer what deserves to exist.",
    intro:
      "Capsorix is a technology and innovation engineering studio founded on a simple premise: the most expensive product failures begin before code, when the wrong problem, assumption or system is accepted without examination.",
    sections: [
      ["Our position", "Capsorix is not a template agency. It combines strategy, design and engineering to make consequential product decisions explicit."],
      ["Our standard", "We value clarity, ownership, technical discipline, intellectual honesty and products that remain defensible after the excitement of launch."],
      ["Our founder", "Capsorix was founded by Mohamed Elbakrey as a vehicle for building ambitious digital products and durable systems of knowledge."],
    ],
  },
  {
    route: "/workplace-culture",
    title: "Workplace & Culture — Capsorix",
    description:
      "Explore the remote-first culture, operating standards, growth model and responsibility principles behind how Capsorix builds products.",
    heading: "A culture designed for serious ownership.",
    intro:
      "Capsorix is building a high-trust, remote-first environment for people who can think independently, communicate precisely and take responsibility for the consequences of their work.",
    sections: [
      ["High trust", "Autonomy is paired with explicit accountability, clear decisions and visible ownership."],
      ["Craft and judgment", "Quality includes the reasoning behind the work, not only the appearance of the final output."],
      ["Compounding growth", "Documentation, feedback and institutional knowledge are designed to make individual learning strengthen the whole organisation."],
    ],
  },
  {
    route: "/careers",
    title: "Careers — Capsorix",
    description:
      "Explore opportunities to join Capsorix and help build ambitious digital products through strategy, design and disciplined engineering.",
    heading: "Build work that changes the standard around it.",
    intro:
      "Capsorix looks for builders who combine technical ability with judgment, ownership, clarity and the willingness to understand the system surrounding the task.",
    sections: [
      ["Who belongs here", "Engineers, designers and operators who can own outcomes rather than wait for perfectly specified instructions."],
      ["How we work", "Remote-first collaboration, written decisions, direct feedback and high standards without performative bureaucracy."],
      ["What growth means", "Responsibility expands with demonstrated judgment, reliability and the ability to make others more effective."],
    ],
  },
  {
    route: "/company-values",
    title: "Company Values — Capsorix",
    description:
      "The Capsorix values framework defines the principles, behaviors and accountability standards guiding how the company designs, builds and leads.",
    heading: "Values become real only when they govern decisions.",
    intro:
      "Capsorix treats values as operating constraints: standards that determine what is accepted, what is refused and how responsibility is assigned when trade-offs become difficult.",
    sections: [
      ["Clarity before motion", "Activity is not progress when the underlying problem, owner or consequence remains ambiguous."],
      ["Ownership without theatre", "Responsibility means following decisions through to their real effects, not merely reporting effort."],
      ["Durability over shortcuts", "The company prefers systems that can be understood, maintained and defended over fragile speed that creates hidden liabilities."],
    ],
  },
  {
    route: "/guides/how-to-choose-a-software-development-company",
    title: "How to Choose a Software Development Company — Capsorix",
    description:
      "A practical guide to choosing a software development company by evaluating process clarity, senior execution, ownership, design maturity, performance and long-term support.",
    heading: "How to choose a software development company.",
    intro:
      "Choosing a software partner is a long-term operating decision. The strongest evaluation looks beyond portfolio screenshots and hourly rates to examine who will do the work, how decisions are made and whether the resulting product will remain yours and remain maintainable.",
    sections: [
      ["Evaluate the process", "Ask how discovery, scoping, milestones, reviews, deployment, handover and scope changes are handled in practice."],
      ["Verify the people", "Understand exactly who will design and engineer the product, their seniority and the responsibilities they will personally own."],
      ["Protect long-term ownership", "Contracts, repositories, credentials, source code, infrastructure access, maintenance and transition rights must be explicit."],
    ],
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const canonicalUrl = (route) => (route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`);

const navigation = [
  ["Home", "/"],
  ["iOS", "/ios"],
  ["Android", "/android"],
  ["Web", "/web"],
  ["About", "/about"],
  ["Knowledge", "/knowledge"],
  ["Contact", "/#contact"],
];

const snapshotMarkup = (page) => `
<main id="main" class="seo-snapshot" aria-label="${escapeHtml(page.heading)}">
  <header>
    <a class="seo-snapshot__brand" href="/" aria-label="Capsorix home">Capsorix</a>
    <nav aria-label="Primary navigation">
      ${navigation.map(([label, href]) => `<a href="${href}">${label}</a>`).join("\n      ")}
    </nav>
  </header>
  <article>
    <p class="seo-snapshot__eyebrow">Technology and innovation engineering studio</p>
    <h1>${escapeHtml(page.heading)}</h1>
    <p class="seo-snapshot__intro">${escapeHtml(page.intro)}</p>
    ${page.sections
      .map(
        ([heading, body]) => `<section>
      <h2>${escapeHtml(heading)}</h2>
      <p>${escapeHtml(body)}</p>
    </section>`,
      )
      .join("\n    ")}
    <p><a href="/#contact">Discuss a project with Capsorix</a></p>
  </article>
</main>`;

const snapshotStyle = `<style id="seo-snapshot-style">
.seo-snapshot{box-sizing:border-box;max-width:1120px;margin:0 auto;padding:32px 24px 72px;color:#f4f0e8;background:#0a0a0a;font:16px/1.7 Inter,system-ui,sans-serif}.seo-snapshot *{box-sizing:border-box}.seo-snapshot header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:56px}.seo-snapshot nav{display:flex;flex-wrap:wrap;gap:16px}.seo-snapshot a{color:#e5bf67}.seo-snapshot__brand{font:600 24px/1.2 Georgia,serif;text-decoration:none}.seo-snapshot article{max-width:820px}.seo-snapshot__eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:12px;color:#c9a85d}.seo-snapshot h1{font:500 clamp(40px,7vw,76px)/1.02 Georgia,serif;margin:16px 0 28px}.seo-snapshot__intro{font-size:20px;color:#d8d3c9}.seo-snapshot section{margin-top:42px}.seo-snapshot h2{font:500 30px/1.2 Georgia,serif;margin-bottom:10px}.seo-snapshot p{max-width:72ch}@media(max-width:720px){.seo-snapshot header{align-items:flex-start;flex-direction:column;padding-bottom:40px}.seo-snapshot nav{gap:12px}.seo-snapshot{padding-inline:18px}}
</style>`;

const replaceTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`SEO snapshot build could not find ${label}`);
  return html.replace(pattern, replacement);
};

const routeJsonLd = (page) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: "Capsorix",
      alternateName: "Capsorix Technology and Innovation Engineering Studio",
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/favicon.png`,
      founder: { "@type": "Person", name: "Mohamed Elbakrey" },
      sameAs: ["https://www.linkedin.com/company/capsorix", "https://x.com/capsorix"],
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      name: "Capsorix",
      url: `${ORIGIN}/`,
      publisher: { "@id": `${ORIGIN}/#organization` },
    },
    {
      "@type": page.route === "/about" ? "AboutPage" : "WebPage",
      "@id": `${canonicalUrl(page.route)}#webpage`,
      name: page.title,
      description: page.description,
      url: canonicalUrl(page.route),
      inLanguage: "en",
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@id": `${ORIGIN}/#organization` },
    },
  ],
});

const metadataGuard = (page) => {
  const data = JSON.stringify({
    route: page.route,
    title: page.title,
    description: page.description,
    canonical: canonicalUrl(page.route),
    jsonLd: JSON.stringify(routeJsonLd(page)),
  }).replaceAll("<", "\\u003c");

  return `<script id="seo-metadata-guard">(()=>{const d=${data};const path=()=>location.pathname.replace(/\\/+$/,"")||"/";const attr=(selector,name,value)=>{const node=document.querySelector(selector);if(node&&node.getAttribute(name)!==value)node.setAttribute(name,value)};const apply=()=>{if(path()!==d.route)return;if(document.title!==d.title)document.title=d.title;attr('meta[name="description"]','content',d.description);attr('meta[name="robots"]','content','index,follow,max-image-preview:large,max-snippet:-1');attr('link[rel="canonical"]','href',d.canonical);attr('meta[property="og:type"]','content','website');attr('meta[property="og:url"]','content',d.canonical);attr('meta[property="og:title"]','content',d.title);attr('meta[property="og:description"]','content',d.description);attr('meta[name="twitter:title"]','content',d.title);attr('meta[name="twitter:description"]','content',d.description);const schema=document.getElementById('route-jsonld');if(schema&&schema.textContent!==d.jsonLd)schema.textContent=d.jsonLd};apply();new MutationObserver(apply).observe(document.head,{subtree:true,childList:true,attributes:true,characterData:true});addEventListener('popstate',apply);})();</script>`;
};

const renderPage = (baseHtml, page) => {
  const url = canonicalUrl(page.route);
  let html = baseHtml;
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`, "title");
  html = replaceTag(
    html,
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    "description",
  );
  html = replaceTag(
    html,
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">',
    "robots",
  );
  html = replaceTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`, "canonical");
  html = replaceTag(html, /<meta property="og:type"[^>]*>/, '<meta property="og:type" content="website">', "Open Graph type");
  html = replaceTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`, "Open Graph URL");
  html = replaceTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(page.title)}">`, "Open Graph title");
  html = replaceTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(page.description)}">`, "Open Graph description");
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}">`, "Twitter title");
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}">`, "Twitter description");

  const jsonLd = `<script id="route-jsonld" type="application/ld+json">${JSON.stringify(routeJsonLd(page)).replaceAll("<", "\\u003c")}</script>`;
  html = html.replace("</head>", `${snapshotStyle}${jsonLd}${metadataGuard(page)}</head>`);

  const root = `<div id="root" data-seo-snapshot="${escapeHtml(page.route)}">${snapshotMarkup(page)}</div>`;
  html = replaceTag(html, /<div id="root"><\/div>/, root, "application root");
  return html;
};

const writeRoute = (page, html) => {
  if (page.route === "/") {
    writeFileSync(BASE_HTML_PATH, html);
    return;
  }
  const directory = path.join(DIST, page.route.replace(/^\//, ""));
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, "index.html"), html);
};

const rebuildSitemap = () => {
  const sitemapPath = path.join(DIST, "sitemap.xml");
  const current = readFileSync(sitemapPath, "utf8");
  const existingUrls = [...current.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const preferred = routes.map((page) => canonicalUrl(page.route));
  const urls = [...new Set([...preferred, ...existingUrls])];
  const body = urls.map((url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>`).join("\n");
  writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
};

const baseHtml = readFileSync(BASE_HTML_PATH, "utf8");
for (const page of routes) writeRoute(page, renderPage(baseHtml, page));
rebuildSitemap();

console.log(`Generated SEO snapshots for ${routes.length} public routes and rebuilt sitemap.xml.`);
