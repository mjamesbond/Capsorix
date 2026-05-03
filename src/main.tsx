import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Keep the browser from auto-jumping on bfcache restore — React Router
// owns scroll. Also no-op the dev server's hot-reload polling banner
// when the tab returns from background, which on some mobile browsers
// could otherwise force a full reload.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
