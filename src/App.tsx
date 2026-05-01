import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NeuralLayer from "./components/nexora/NeuralLayer";
import ScrollProgress from "./components/nexora/ScrollProgress";
import CookieConsent from "./components/nexora/CookieConsent";
import SkipLink from "./components/nexora/SkipLink";
import SubpageSkeleton from "./components/nexora/SubpageSkeleton";
import { I18nProvider } from "./i18n/I18nProvider";
import { AuthProvider } from "./auth/AuthProvider";
import RequireAdmin from "./auth/RequireAdmin";

// Subpages and the 404 are deferred — the landing page stays the only
// thing in the initial bundle, keeping first paint lean.
const IOS = lazy(() => import("./pages/IOS.tsx"));
const Android = lazy(() => import("./pages/Android.tsx"));
const Web = lazy(() => import("./pages/Web.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));

// Brand-aligned suspense surface — a structural skeleton mirroring the
// real subpage layout so first paint feels stable, not blank.
const RouteFallback = () => <SubpageSkeleton />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SkipLink />
            <NeuralLayer />
            <ScrollProgress />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ios" element={<IOS />} />
                <Route path="/android" element={<Android />} />
                <Route path="/web" element={<Web />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <Admin />
                    </RequireAdmin>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
