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
// when the visitor approaches them, then progressively hydrated after the
// initial interaction window so content remains available without a startup
// network burst.
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
  fallbackDelay?: number;
};

const DeferredSection = ({
  component: Component,
  className = "section-fade cv-auto",
  placeholder = "min-h-[40vh]",
  rootMargin = "900px 0px",
  fallbackDelay = 5000,
}: DeferredSectionProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    let observer: IntersectionObserver | null = null;
    let timer = 0;
    let completed = false;

    const mount = () => {
      if (completed) return;
      completed = true;
      observer?.disconnect();
      window.clearTimeout(timer);
      setMounted(true);
    };

    if (!("IntersectionObserver" in window)) {
      mount();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) mount();
      },
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(node);

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrained =
      Boolean(connection?.saveData) ||
      ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");

    if (!constrained) {
      timer = window.setTimeout(mount, fallbackDelay);
    }

    return () => {
      completed = true;
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [fallbackDelay, rootMargin]);

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
        <DeferredSection component={TrustBar} placeholder="min-h-[20vh]" fallbackDelay={2200} />
        <SectionDivider />
        <DeferredSection component={About} placeholder="min-h-[55vh]" fallbackDelay={3000} />
        <SectionDivider />
        <DeferredSection component={Services} className="cv-auto" placeholder="min-h-[70vh]" fallbackDelay={3800} />
        <SectionDivider />
        <DeferredSection component={Process} placeholder="min-h-[65vh]" fallbackDelay={4700} />
        <SectionDivider />
        <DeferredSection component={Industries} placeholder="min-h-[60vh]" fallbackDelay={5600} />
        <SectionDivider />
        <DeferredSection component={CaseStudies} placeholder="min-h-[70vh]" fallbackDelay={6500} />
        <DeferredSection component={Stats} placeholder="min-h-[35vh]" fallbackDelay={7300} />
        <SectionDivider />
        <DeferredSection component={Testimonials} placeholder="min-h-[55vh]" fallbackDelay={8200} />
        <SectionDivider />
        <DeferredSection component={Faq} placeholder="min-h-[55vh]" fallbackDelay={9000} />
        <DeferredSection component={Contact} placeholder="min-h-[70vh]" fallbackDelay={9800} />
        <DeferredSection component={FinalCTA} placeholder="min-h-[45vh]" fallbackDelay={10600} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
