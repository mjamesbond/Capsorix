import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const htmlFiles = [];

const walk = (directory) => {
  for (const entry of readdirSync(directory)) {
    const target = path.join(directory, entry);
    if (statSync(target).isDirectory()) {
      walk(target);
      continue;
    }
    if (target.endsWith(".html")) htmlFiles.push(target);
  }
};

walk(DIST);

// The interface can switch languages client-side, but there are not yet
// separate crawlable URLs for each language. Advertising en/fr/de/ar as
// alternate versions of the exact same URL is therefore misleading. Remove
// those declarations until distinct canonical language routes exist.
const hreflangLine = /^[ \t]*<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["'][^"']+["'])[^>]*>\s*$/gim;
let removed = 0;
let changedFiles = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const matches = html.match(hreflangLine) ?? [];
  if (!matches.length) continue;

  removed += matches.length;
  changedFiles += 1;
  writeFileSync(file, html.replace(hreflangLine, ""));
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (/\bhreflang\s*=/i.test(html)) {
    throw new Error(`SEO normalization failed: hreflang remains in ${path.relative(DIST, file)}`);
  }
}

console.log(`Normalized ${htmlFiles.length} HTML files; removed ${removed} misleading hreflang tags from ${changedFiles} files.`);
