import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NeuralLayer from "./components/nexora/NeuralLayer";
import { I18nProvider } from "./i18n/I18nProvider";

// Subpages and the 404 are deferred — the landing page stays the only
// thing in the initial bundle, keeping first paint lean.
const IOS = lazy(() => import("./pages/IOS.tsx"));
const Android = lazy(() => import("./pages/Android.tsx"));
const Web = lazy(() => import("./pages/Web.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Minimal, brand-aligned suspense surface — a single gold pulse, no spinner.
const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="relative w-12 h-12">
      <span className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_1.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <span className="absolute inset-2 rounded-full bg-gradient-gold-soft border border-primary/50 gold-ring" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NeuralLayer />
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
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
