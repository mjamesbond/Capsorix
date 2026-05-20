import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ScrollProgress from "./components/capsorix/ScrollProgress";
import CookieConsent from "./components/capsorix/CookieConsent";
import SkipLink from "./components/capsorix/SkipLink";
import SubpageSkeleton from "./components/capsorix/SubpageSkeleton";
import PerfHud from "./components/capsorix/PerfHud";
import BackToTop from "./components/capsorix/BackToTop";
import { I18nProvider } from "./i18n/I18nProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

// Subpages and the 404 are deferred — the landing page stays the only
// thing in the initial bundle, keeping first paint lean.
const IOS = lazy(() => import("./pages/IOS.tsx"));
const Android = lazy(() => import("./pages/Android.tsx"));
const Web = lazy(() => import("./pages/Web.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
// NeuralLayer is heavy (canvas + rAF). Defer until the browser is idle so
// it never delays first paint or blocks initial interaction.
const NeuralLayer = lazy(() => import("./components/capsorix/NeuralLayer"));

const RouteFallback = () => <SubpageSkeleton />;

/** Mount a child only after the browser is idle / first paint is done. */
const DeferredMount = ({ children, delay = 600 }: { children: React.ReactNode; delay?: number }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cancel) cancel(id);
      };
    }
    const t = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  if (!ready) return null;
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SkipLink />
            <DeferredMount>
              <Suspense fallback={null}>
                <NeuralLayer />
              </Suspense>
            </DeferredMount>
            <ScrollProgress />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ios" element={<IOS />} />
                <Route path="/android" element={<Android />} />
                <Route path="/web" element={<Web />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
            <BackToTop />
            <PerfHud />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
