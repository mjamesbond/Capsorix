import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Inject <link rel="preload"> for the hashed hero-bg.webp so the LCP image
// starts downloading in parallel with the CSS request instead of being
// discovered only after CSS parse. The exact hashed filename is resolved
// from the build bundle so it stays correct across rebuilds.
const lcpPreload = (): Plugin => ({
  name: "capsorix-lcp-preload",
  enforce: "post",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      const bundle = ctx.bundle;
      if (!bundle) return html;
      const heroFile = Object.keys(bundle).find((f) => /hero-bg.*\.webp$/.test(f));
      if (!heroFile) return html;
      const href = "/" + heroFile.replace(/^\/+/, "");
      const tag = `    <link rel="preload" as="image" href="${href}" type="image/webp" fetchpriority="high" />\n  `;
      return html.replace("</head>", `${tag}</head>`);
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    lcpPreload(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

