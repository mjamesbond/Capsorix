import { lazy, Suspense } from "react";
import Navbar from "@/components/nexora/Navbar";
import Hero from "@/components/nexora/Hero";
import Footer from "@/components/nexora/Footer";

// Below-the-fold sections are code-split. Hero + Navbar render immediately
// for instant first paint; everything else streams in as the user approaches.
const TrustBar = lazy(() => import("@/components/nexora/TrustBar"));
const About = lazy(() => import("@/components/nexora/About"));
const Services = lazy(() => import("@/components/nexora/Services"));
const Process = lazy(() => import("@/components/nexora/Process"));
const Industries = lazy(() => import("@/components/nexora/Industries"));
const CaseStudies = lazy(() => import("@/components/nexora/CaseStudies"));
const Stats = lazy(() => import("@/components/nexora/Stats"));
const Testimonials = lazy(() => import("@/components/nexora/Testimonials"));
const Faq = lazy(() => import("@/components/nexora/Faq"));
const Contact = lazy(() => import("@/components/nexora/Contact"));
const FinalCTA = lazy(() => import("@/components/nexora/FinalCTA"));

// Reserve vertical space so lazy sections don't cause layout jumps.
const Placeholder = ({ h = "min-h-[40vh]" }: { h?: string }) => (
  <div aria-hidden className={h} />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden page-enter">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Suspense fallback={<Placeholder h="min-h-[20vh]" />}>
          <div className="section-fade"><TrustBar /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><About /></div>
          <div className="container"><div className="section-divider" /></div>
          <Services />
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><Process /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><Industries /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><CaseStudies /></div>
          <div className="section-fade"><Stats /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><Testimonials /></div>
          <div className="container"><div className="section-divider" /></div>
          <div className="section-fade"><Faq /></div>
          <div className="section-fade"><Contact /></div>
          <div className="section-fade"><FinalCTA /></div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
