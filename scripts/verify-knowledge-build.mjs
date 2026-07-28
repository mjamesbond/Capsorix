import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const records = [
  [1, "The Person Who Is Secretly the Software", "the-person-who-is-secretly-the-software", "published"],
  [2, "Digital Transformation Is Not a Software Project", "digital-transformation-is-not-a-software-project", "published"],
  [3, "From Impossible Idea to Real Product", "from-impossible-idea-to-real-product", "published"],
  [4, "The Anatomy of an Ambitious Idea", "anatomy-of-an-ambitious-idea", "published"],
  [5, "The Decisions a System Makes Before Anyone Agrees to Them", "the-decisions-a-system-makes-before-anyone-agrees-to-them", "ready"],
  [6, "Before Technology: What Must Be Understood Before a Product Can Be Engineered", "before-technology-what-must-be-understood-before-a-product-can-be-engineered", "published"],
  [7, "The Product Is Only as Mature as the Organisation That Owns It", "the-product-is-only-as-mature-as-the-organisation-that-owns-it", "published"],
  [8, "Innovation Is Not an Engineering Discipline", "innovation-is-not-an-engineering-discipline", "ready"],
  [10, "AI Is Cheap to Try and Expensive to Depend On", "ai-is-cheap-to-try-and-expensive-to-depend-on", "published"],
];
const reserved = [9, "Designing Products That Don’t Exist Yet", "designing-products-that-dont-exist-yet"];
const sourceHashes = {
  "Capsorix Final Canon/ai-is-cheap-to-try-and-expensive-to-depend-on.md":"4598f3d8584882c8533237f33031f2781fa94d5d1bc18275b4a7c1963cc0376a",
  "Capsorix Final Canon/anatomy-of-an-ambitious-idea-final.md":"6868b61bd236d14e0ef0f117a0861a7dc472bc0973a6b77874eb5db6bfe9a1ea",
  "Capsorix Final Canon/before-technology-what-must-be-understood-before-a-product-can-be-engineered.md":"b56fad818f013041b244e41ba6fee6d1684f62389fe6a804d0f3b21fe787e2f7",
  "Capsorix Final Canon/capsorix-article-08-ARTICLE-ONLY.md":"ff0dbe22841d8025cdc68025a18f4c500c64558cc51ff6bf779f679537099a1e",
  "Capsorix Final Canon/digital-transformation-is-not-a-software-project.md":"ea547cac3cc183d3f8ef5bb35c11de948fd0b980cc7494a9d19c13c9a2736af9",
  "Capsorix Final Canon/from-impossible-idea-to-real-product.md":"c0eac4293f71b64ae58f028f174813d3fa8fc531e2a785657b443f5ed9e3b456",
  "Capsorix Final Canon/great-products-begin-before-technology.md":"337e137cd3380508008849f24028dddc3d23b64ca8fb9122783f31ce352c7101",
  "Capsorix Final Canon/the-person-who-is-secretly-the-software.md":"b3f201a4ece4b44e58326227838464d06b5464dd6df3b1d6dc30510124eaae7b",
  "Capsorix Final Canon/the-product-is-only-as-mature-as-the-organisation-that-owns-it.md":"72df018fa89bb06795437f0a7a99fa8be7dac929a85f20e54f625a7644839979",
  "content/knowledge/en/canon/05-the-decisions-a-system-makes-before-anyone-agrees-to-them.md":"c2ed0ca4dfd13e08077073e7171dae00f1556487817903843ade1c234a381a7a",
};
const fail = (message) => { throw new Error(`Knowledge build verification failed: ${message}`); };
const readDist = (file) => readFileSync(path.join(dist, file), "utf8");
const requireText = (text, value, context) => { if (!text.includes(value)) fail(`${context} is missing ${JSON.stringify(value)}`); };
const meta = (html, selector) => html.match(selector)?.[1];

const canonIndex = readDist("knowledge/canon/index.html");
for (const [, title] of records) requireText(canonIndex, title, "Canon index HTML");
requireText(canonIndex, reserved[1], "Canon index HTML");
if (!/Article 9:[\s\S]*unavailable/i.test(canonIndex)) fail("Article 9 is not marked unavailable on the Canon index");

const reachable = new Set();
const visit = (source) => {
  const relative = source.replace(/^\//, "");
  if (reachable.has(relative)) return;
  const file = path.join(dist, relative);
  if (!existsSync(file)) fail(`referenced browser asset does not exist: ${source}`);
  reachable.add(relative);
  const code = readFileSync(file, "utf8");
  for (const match of code.matchAll(/(?:from\s*|import\s*\()?['"](\.\.?\/[^'"]+\.js)['"]/g))
    visit(path.posix.normalize(path.posix.join(path.posix.dirname(relative), match[1])));
};
const pages = [canonIndex];
const routeData = [];
for (const [order, title, slug, status] of records) {
  const route = `knowledge/canon/${slug}/index.html`;
  if (!existsSync(path.join(dist, route))) fail(`Article ${order} route does not exist`);
  const html = readDist(route); pages.push(html);
  const expectedUrl = `https://capsorix.tech/knowledge/canon/${slug}`;
  const description = meta(html, /<meta name="description" content="([^"]*)">/);
  if (!description) fail(`Article ${order} has no description`);
  requireText(html, `<title>${title} | Capsorix</title>`, `Article ${order} title`);
  requireText(html, `<meta name="robots" content="${status === "published" ? "index,follow" : "noindex,follow"}">`, `Article ${order} robots`);
  requireText(html, `<link rel="canonical" href="${expectedUrl}">`, `Article ${order} canonical`);
  requireText(html, `<meta property="og:type" content="article">`, `Article ${order} Open Graph type`);
  requireText(html, `<meta property="og:url" content="${expectedUrl}">`, `Article ${order} Open Graph URL`);
  if (/<link rel="canonical" href="[^"]*\/insights\//.test(html)) fail(`Article ${order} uses a legacy Insights canonical`);
  if (/Image suggestion:|<h2[^>]*>Publishing Notes<\/h2>/i.test(html)) fail(`Article ${order} exposes editorial annotations`);
  const jsonText = html.match(/<script id="route-jsonld" type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  if (!jsonText) fail(`Article ${order} has no route JSON-LD`);
  const graph = JSON.parse(jsonText)["@graph"];
  for (const type of ["Organization", "WebSite", "Article", "BreadcrumbList"])
    if (!graph.some((node) => node["@type"] === type)) fail(`Article ${order} JSON-LD omits ${type}`);
  const article = graph.find((node) => node["@type"] === "Article");
  if (article.headline !== title || article.description !== description || article.url !== expectedUrl || article.mainEntityOfPage !== expectedUrl)
    fail(`Article ${order} JSON-LD does not match its route metadata`);
  routeData.push({ order, title, slug, status, description, expectedUrl });
}
if (existsSync(path.join(dist, "knowledge/canon", reserved[2]))) fail("Article 9 has an article route");
for (const html of pages) for (const match of html.matchAll(/<script[^>]+src="([^"]+)"/g)) visit(match[1]);
if (!reachable.size) fail("Canon pages reference no browser JavaScript");
const clientJavaScript = [...reachable].map(readDist).join("\n");
for (const { order, title, slug, status, description } of routeData) {
  for (const value of [title, slug, description, `/knowledge/canon/${slug}`, status]) requireText(clientJavaScript, value, `browser JavaScript record ${order}`);
}
requireText(clientJavaScript, "https://capsorix.tech", "browser JavaScript canonical origin");
if (clientJavaScript.includes("window.location.origin")) fail("client runtime derives canonical URLs from the browser host");
if (clientJavaScript.includes("Software encodes institutional claims before they are examined.")) fail("client runtime retains the former generic Article 5 metadata");

const sitemap = readDist("sitemap.xml");
const rss = readDist("knowledge/rss.xml");
for (const [order, title, slug, status] of records) {
  const url = `https://capsorix.tech/knowledge/canon/${slug}`;
  const sitemapPresent = sitemap.includes(url);
  const rssPresent = rss.includes(slug) && rss.includes(title);
  if (sitemapPresent !== (status === "published")) fail(`sitemap policy mismatch for Article ${order}`);
  if (rssPresent !== (status === "published")) fail(`RSS policy mismatch for Article ${order}`);
  if (status === "published" && (!rss.includes(`<guid>${url}</guid>`) || !rss.includes("<pubDate>"))) fail(`RSS item ${order} is incomplete`);
}
if (!rss.includes("<lastBuildDate>Tue, 28 Jul 2026 00:00:00 GMT</lastBuildDate>")) fail("RSS lastBuildDate is absent or nondeterministic");
if (sitemap.includes(reserved[2]) || rss.includes(reserved[2])) fail("a feed contains reserved Article 9");
for (const [file, expected] of Object.entries(sourceHashes)) {
  const actual = createHash("sha256").update(readFileSync(path.join(root, file))).digest("hex");
  if (actual !== expected) fail(`Markdown integrity mismatch for ${file}: ${actual}`);
}
console.log(`Verified Canon production artifacts: ${records.length} routes; published-only sitemap/RSS; ${reachable.size} browser asset(s); ${Object.keys(sourceHashes).length} source hashes.`);
