import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IOS from "./pages/IOS.tsx";
import Android from "./pages/Android.tsx";
import Web from "./pages/Web.tsx";
import NotFound from "./pages/NotFound.tsx";
import NeuralLayer from "./components/nexora/NeuralLayer";
import { I18nProvider } from "./i18n/I18nProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NeuralLayer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ios" element={<IOS />} />
            <Route path="/android" element={<Android />} />
            <Route path="/web" element={<Web />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
