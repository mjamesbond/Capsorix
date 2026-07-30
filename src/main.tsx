import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./performance.css";

// Keep the browser from auto-jumping on bfcache restore — React Router
// owns scroll. Also no-op the dev server's hot-reload polling banner
// when the tab returns from background, which on some mobile browsers
// could otherwise force a full reload.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const root = document.getElementById("root");
if (!root) throw new Error("Capsorix application root was not found.");

// Production pages contain a semantic, crawlable HTML snapshot. It remains
// useful when JavaScript is unavailable, then is deliberately removed before
// React mounts so the interactive application never duplicates snapshot copy.
if (root.hasAttribute("data-seo-snapshot")) {
  root.replaceChildren();
  root.removeAttribute("data-seo-snapshot");
}

createRoot(root).render(<App />);
