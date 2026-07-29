import {
  type ComponentType,
  type LazyExoticComponent,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/capsorix/Navbar";
import Hero from "@/components/capsorix/Hero";
import Footer from "@/components/capsorix/Footer";
import FaqJsonLd from "@/components/capsorix/FaqJsonLd";

// Below-the-fold sections are split into independent chunks. They are mounted
// only when the visitor approaches them, instead of requesting every section
// during the first render.
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

type LazySection = LazyExoticComponent<ComponentType>;

const Placeholder = ({ h = "min-h-[40vh]" }: { h?: string }) => (
  <div aria-hidden className={h} />
);

type DeferredSectionProps = {
  component: LazySection;
  className?: string;
  placeholder?: string;
  rootMargin?: string;
};

const DeferredSection = ({
  component: Component,
  className = "section-fade cv-auto",
  placeholder = "min-h-[40vh]",
  rootMargin = "900px 0px",
}: DeferredSectionProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={hostRef} className={`deferred-section ${className}`}>
      {mounted ? (
        <Suspense fallback={<Placeholder h={placeholder} />}>
          <Component />
        </Suspense>
      ) : (
        <Placeholder h={placeholder} />
      )}
    </div>
  );
};

const SectionDivider = () => (
  <div className="container" aria-hidden>
    <div className="section-divider" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden page-enter">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <FaqJsonLd />
        <Hero />
        <DeferredSection component={TrustBar} placeholder="min-h-[20vh]" />
        <SectionDivider />
        <DeferredSection component={About} placeholder="min-h-[55vh]" />
        <SectionDivider />
        <DeferredSection component={Services} className="cv-auto" placeholder="min-h-[70vh]" />
        <SectionDivider />
        <DeferredSection component={Process} placeholder="min-h-[65vh]" />
        <SectionDivider />
        <DeferredSection component={Industries} placeholder="min-h-[60vh]" />
        <SectionDivider />
        <DeferredSection component={CaseStudies} placeholder="min-h-[70vh]" />
        <DeferredSection component={Stats} placeholder="min-h-[35vh]" />
        <SectionDivider />
        <DeferredSection component={Testimonials} placeholder="min-h-[55vh]" />
        <SectionDivider />
        <DeferredSection component={Faq} placeholder="min-h-[55vh]" />
        <DeferredSection component={Contact} placeholder="min-h-[70vh]" />
        <DeferredSection component={FinalCTA} placeholder="min-h-[45vh]" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
