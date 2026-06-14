import { lazy, Suspense } from "react";
import Navbar from "@/components/capsorix/Navbar";
import Hero from "@/components/capsorix/Hero";
import Footer from "@/components/capsorix/Footer";
import FaqJsonLd from "@/components/capsorix/FaqJsonLd";

// Below-the-fold sections are code-split. Hero + Navbar render immediately
// for instant first paint; everything else streams in as the user approaches.
const TrustBar = lazy(() => import("@/components/capsorix/TrustBar"));
const About = lazy(() => import("@/components/capsorix/About"));
const Services = lazy(() => import("@/components/capsorix/Services"));
const Process = lazy(() => import("@/components/capsorix/Process"));
const Industries = lazy(() => import("@/components/capsorix/Industries"));
const CaseStudies = lazy(() => import("@/components/capsorix/CaseStudies"));
const Stats = lazy(() => import("@/components/capsorix/Stats"));
const Testimonials = lazy(() => import("@/components/capsorix/Testimonials"));
const Faq = lazy(() => import("@/components/capsorix/Faq"));
const Contact = lazy(() => import("@/components/capsorix/Contact"));
const FinalCTA = lazy(() => import("@/components/capsorix/FinalCTA"));

// Reserve vertical space so lazy sections don't cause layout jumps.
const Placeholder = ({ h = "min-h-[40vh]" }: { h?: string }) => (
  <div aria-hidden className={h} />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden page-enter">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <FaqJsonLd />
        <Hero />
        <Suspense fallback={<Placeholder h="min-h-[20vh]" />}>
          <div className="section-fade cv-auto"><TrustBar /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><About /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="cv-auto"><Services /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><Process /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><Industries /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><CaseStudies /></div>
          <div className="section-fade cv-auto"><Stats /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><Testimonials /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade cv-auto"><Faq /></div>
          <div className="section-fade cv-auto"><Contact /></div>
          <div className="section-fade cv-auto"><FinalCTA /></div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
