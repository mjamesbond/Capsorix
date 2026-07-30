import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const ORIGIN = "https://capsorix.tech";
const routes = [
  ["/", "Capsorix — Strategy, Design & Engineering for Ambitious Digital Products"],
  ["/ios", "iOS App Development — Capsorix"],
  ["/android", "Android App Development — Capsorix"],
  ["/web", "Web Platform Engineering — Capsorix"],
  ["/about", "About Capsorix — Product Engineering Philosophy"],
  ["/workplace-culture", "Workplace & Culture — Capsorix"],
  ["/careers", "Careers — Capsorix"],
  ["/company-values", "Company Values — Capsorix"],
  ["/guides/how-to-choose-a-software-development-company", "How to Choose a Software Development Company — Capsorix"],
];

const fail = (message) => {
  throw new Error(`SEO build verification failed: ${message}`);
};
const canonical = (route) => (route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`);
const routeFile = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.replace(/^\//, ""), "index.html");

for (const [route, title] of routes) {
  const file = routeFile(route);
  if (!existsSync(file)) fail(`${route} has no static HTML snapshot`);
  const html = readFileSync(file, "utf8");
  const expectedCanonical = canonical(route);
  for (const required of [
    `<title>${title}</title>`,
    `<link rel="canonical" href="${expectedCanonical}">`,
    `<meta property="og:url" content="${expectedCanonical}">`,
    `data-seo-snapshot="${route}"`,
    '<script id="route-jsonld" type="application/ld+json">',
    '<script id="seo-metadata-guard">',
    "<h1>",
    "Capsorix",
  ]) {
    if (!html.includes(required)) fail(`${route} is missing ${JSON.stringify(required)}`);
  }
  if (html.includes('<meta name="robots" content="noindex')) fail(`${route} is unexpectedly noindex`);
  if (route.includes("how-to-choose") && html.includes("Page Not Found")) fail("guide snapshot contains 404 metadata");
}

const sitemap = readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
for (const [route] of routes) {
  const url = canonical(route);
  const count = sitemap.split(`<loc>${url}</loc>`).length - 1;
  if (count !== 1) fail(`sitemap contains ${url} ${count} times`);
}
for (const route of ["/knowledge", "/knowledge/canon"]) {
  if (!sitemap.includes(`<loc>${ORIGIN}${route}</loc>`)) fail(`sitemap lost ${route}`);
}

const robots = readFileSync(path.join(DIST, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail("robots.txt does not advertise the canonical sitemap");

console.log(`Verified ${routes.length} crawlable SEO snapshots, canonical metadata, route JSON-LD and a deduplicated sitemap.`);
