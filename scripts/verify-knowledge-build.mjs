import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const site = "https://capsorix.tech";
const articles = [
  { order: 1, title: "The Person Who Is Secretly the Software", slug: "the-person-who-is-secretly-the-software", status: "published" },
  { order: 2, title: "Digital Transformation Is Not a Software Project", slug: "digital-transformation-is-not-a-software-project", status: "published" },
  { order: 3, title: "From Impossible Idea to Real Product", slug: "from-impossible-idea-to-real-product", status: "published" },
  { order: 4, title: "The Anatomy of an Ambitious Idea", slug: "anatomy-of-an-ambitious-idea", status: "published" },
  { order: 5, title: "The Decisions a System Makes Before Anyone Agrees to Them", slug: "the-decisions-a-system-makes-before-anyone-agrees-to-them", status: "ready" },
  { order: 6, title: "Before Technology: What Must Be Understood Before a Product Can Be Engineered", slug: "before-technology-what-must-be-understood-before-a-product-can-be-engineered", status: "published" },
  { order: 7, title: "The Product Is Only as Mature as the Organisation That Owns It", slug: "the-product-is-only-as-mature-as-the-organisation-that-owns-it", status: "published" },
  { order: 8, title: "Innovation Is Not an Engineering Discipline", slug: "innovation-is-not-an-engineering-discipline", status: "ready" },
  { order: 10, title: "AI Is Cheap to Try and Expensive to Depend On", slug: "ai-is-cheap-to-try-and-expensive-to-depend-on", status: "published" },
];

const reserved = {
  order: 9,
  title: "Designing Products That Don’t Exist Yet",
  slug: "designing-products-that-dont-exist-yet",
};

function assert(condition, message) {
  if (!condition) throw new Error(`Knowledge build verification failed: ${message}`);
}

function read(relativePath) {
  const absolutePath = path.join(dist, relativePath);
  assert(existsSync(absolutePath), `missing ${relativePath}`);
  return readFileSync(absolutePath, "utf8");
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const target = path.join(directory, entry);
    return statSync(target).isDirectory() ? walk(target) : [target];
  });
}

const canonIndex = read("knowledge/canon/index.html");
for (const article of articles) {
  assert(canonIndex.includes(article.title), `Canon index is missing Article ${article.order}: ${article.title}`);
}
assert(canonIndex.includes(`Article ${reserved.order}`), "Canon index is missing reserved Article #9");
assert(canonIndex.includes(reserved.title), "Canon index is missing the reserved Article #9 title");
assert(/unavailable/i.test(canonIndex), "Canon index does not identify Article #9 as unavailable");

const javascriptFiles = walk(dist).filter((file) => file.endsWith(".js"));
assert(javascriptFiles.length > 0, "no browser JavaScript assets were produced");
const browserJavascript = javascriptFiles.map((file) => readFileSync(file, "utf8")).join("\n");
for (const article of articles) {
  assert(browserJavascript.includes(article.title), `browser JavaScript is missing Article ${article.order} title`);
  assert(browserJavascript.includes(article.slug), `browser JavaScript is missing Article ${article.order} slug`);
}
assert(articles.filter((article) => browserJavascript.includes(article.slug)).length === 9, "browser JavaScript does not contain all nine Canon records");

for (const article of articles) {
  const route = `knowledge/canon/${article.slug}/index.html`;
  const routeHtml = read(route);
  assert(routeHtml.includes(article.title), `static route for Article ${article.order} does not contain its own title`);
}
assert(!existsSync(path.join(dist, "knowledge/canon", reserved.slug, "index.html")), "reserved Article #9 unexpectedly has a static route");

const sitemap = read("sitemap.xml");
for (const article of articles) {
  assert(sitemap.includes(`${site}/knowledge/canon/${article.slug}`), `sitemap is missing Article ${article.order}`);
}
assert(!sitemap.includes(`${site}/knowledge/canon/${reserved.slug}`), "sitemap unexpectedly includes reserved Article #9");

const rss = read("knowledge/rss.xml");
for (const article of articles) {
  const url = `${site}/knowledge/canon/${article.slug}`;
  if (article.status === "published") assert(rss.includes(url), `RSS is missing published Article ${article.order}`);
  else assert(!rss.includes(url), `RSS unexpectedly includes non-published Article ${article.order}`);
}
assert(!rss.includes(`${site}/knowledge/canon/${reserved.slug}`), "RSS unexpectedly includes reserved Article #9");

console.log(
  `Verified Canon production artifacts: orders ${articles.map((article) => article.order).join(", ")}; ${javascriptFiles.length} browser asset(s).`,
);
