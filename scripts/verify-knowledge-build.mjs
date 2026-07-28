import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
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
const fail = (message) => { throw new Error(`Knowledge build verification failed: ${message}`); };
const read = (file) => readFileSync(path.join(dist, file), "utf8");
const requireText = (text, value, context) => { if (!text.includes(value)) fail(`${context} is missing ${JSON.stringify(value)}`); };

const canonIndex = read("knowledge/canon/index.html");
for (const [, title] of records) requireText(canonIndex, title, "Canon index HTML");
requireText(canonIndex, reserved[1], "Canon index HTML");
if (!/Article 9:[\s\S]*unavailable/i.test(canonIndex)) fail("Article 9 is not marked unavailable on the Canon index");

const scriptSources = [...canonIndex.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
if (!scriptSources.length) fail("Canon index references no browser JavaScript");
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
for (const source of scriptSources) visit(source);
const clientJavaScript = [...reachable].map(read).join("\n");
for (const [order, title, slug] of records) {
  requireText(clientJavaScript, title, `browser JavaScript record ${order}`);
  requireText(clientJavaScript, slug, `browser JavaScript record ${order}`);
}
if (records.filter(([, , slug]) => clientJavaScript.includes(slug)).length !== 9)
  fail("built runtime does not contain exactly the nine expected Canon records");

for (const [order, title, slug] of records) {
  const route = `knowledge/canon/${slug}/index.html`;
  if (!existsSync(path.join(dist, route))) fail(`Article ${order} route does not exist`);
  requireText(read(route), title, `Article ${order} route`);
}
if (existsSync(path.join(dist, "knowledge/canon", reserved[2]))) fail("Article 9 has an article route");

const sitemap = read("sitemap.xml");
for (const [, , slug] of records) requireText(sitemap, `https://capsorix.tech/knowledge/canon/${slug}`, "sitemap");
if (sitemap.includes(reserved[2])) fail("sitemap contains the reserved Article 9 route");

const rss = read("knowledge/rss.xml");
for (const [order, title, slug, status] of records) {
  const present = rss.includes(slug) && rss.includes(title);
  if (status === "published" && !present) fail(`RSS omits published Article ${order}`);
  if (status !== "published" && present) fail(`RSS includes non-published Article ${order}`);
}
if (rss.includes(reserved[2])) fail("RSS contains reserved Article 9");

console.log(`Verified Canon production artifacts: orders ${records.map(([order]) => order).join(", ")}; ${reachable.size} browser asset(s).`);
