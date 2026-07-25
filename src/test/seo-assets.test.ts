import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("SEO static assets", () => {
  it("includes the new premium routes in sitemap.xml", () => {
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    expect(sitemap).toContain("https://capsorix.tech/workplace-culture");
    expect(sitemap).toContain("https://capsorix.tech/careers");
    expect(sitemap).toContain("https://capsorix.tech/company-values");
  });

  it("points robots.txt sitemap to the production domain", () => {
    const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://capsorix.tech/sitemap.xml");
  });
});
