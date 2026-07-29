import {
  ArrowRight,
  Brain,
  Compass,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import SubpageShell from "@/components/capsorix/SubpageShell";
import Reveal from "@/components/capsorix/Reveal";
import FounderBust from "@/components/capsorix/FounderBust";
import { useI18n } from "@/i18n/I18nProvider";

const FAILURE_PATTERNS = [
  "Teams start with features instead of first principles.",
  "Roadmaps reward speed, then quietly tax users for years.",
  "Complexity is shipped early and explained later.",
  "Engineering quality is treated as optional overhead.",
];

const QUESTIONS_WE_ASK = [
  "Why should this product exist now—and who is better off because it does?",
  "What user frustration deserves to disappear permanently?",
  "Which moments must feel effortless, trustworthy, and fast?",
  "What should never require human effort again?",
  "How will this still be maintainable two years from today?",
];

const HOW_WE_THINK = [
  {
    title: "Product before output",
    body: "We don't measure success by lines of code or number of screens. We measure by clarity, adoption, and durability.",
    icon: Brain,
  },
  {
    title: "Systems over isolated features",
    body: "Every decision is connected: UX, architecture, data flow, and operations are designed as one product system.",
    icon: Compass,
  },
  {
    title: "Long-term trust",
    body: "Ambitious companies choose partners who can protect product quality over time. That's the standard we build for.",
    icon: Handshake,
  },
];

const HOW_WE_BUILD = [
  "Frame the product strategy and non-negotiable outcomes.",
  "Design interaction models before visual polish.",
  "Engineer clean, secure foundations with maintainability in mind.",
  "Ship in focused increments with measurable learning loops.",
  "Stay accountable after launch through continuous refinement.",
];

const IDEAS_WORTH_BUILDING = [
  "AI products that remove operational drag, not human judgment.",
  "SaaS platforms with clear business leverage and sustainable models.",
  "Enterprise systems that unify fragmented workflows.",
  "Mobile applications that users trust daily.",
  "Web experiences where performance, clarity, and conversion align.",
  "Automation that returns time to teams for higher-value work.",
];

const THINGS_WE_REFUSE = [
  "Products without purpose.",
  "Interfaces that confuse users.",
  "Technology chosen for hype.",
  "Software impossible to maintain.",
  "Compromised security.",
  "Short-term thinking.",
  "Cheap shortcuts that become expensive later.",
];

const About = () => {
  const { lang } = useI18n();

  return (
    <SubpageShell>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_70%_45%/0.14),transparent_68%)]" />
        <div className="container relative">
          <Reveal className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">About Capsorix</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.98] tracking-tight">
              We build products that deserve
              <span className="text-gradient-gold italic"> to exist</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Capsorix is an AI-driven product engineering studio for teams that care about what happens after launch: adoption, reliability, and long-term product value.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-fade">
        <div className="container grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Why most software fails</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">Not from lack of talent. From lack of intent.</h2>
          </Reveal>
          <Reveal className="lg:col-span-7 grid sm:grid-cols-2 gap-4" stagger={90}>
            {FAILURE_PATTERNS.map((item) => (
              <article key={item} className="glass rounded-2xl p-6 gold-border-glow lift">
                <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-4xl">
          <Reveal className="glass rounded-3xl p-8 md:p-12 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Why Capsorix exists</p>
            <p className="font-display text-3xl md:text-4xl leading-tight mb-6">
              To help ambitious companies build software with the same discipline used to build serious products.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are not a volume agency. We are a focused studio that combines strategy, design, and engineering in one continuous line of thought—from first principle to production systems.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">The questions we ask first</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Before a single line of code.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {QUESTIONS_WE_ASK.map((question, index) => (
              <Reveal key={question} delay={index * 70}>
                <article className="glass rounded-2xl p-6 gold-border-glow lift">
                  <p className="text-sm text-foreground/90 leading-relaxed">{question}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-3 gap-6">
          {HOW_WE_THINK.map((item, index) => (
            <Reveal key={item.title} delay={index * 100} className="group glass rounded-3xl p-8 gold-border-glow lift">
              <div className="w-11 h-11 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center mb-4 icon-tile">
                <item.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-3 group-hover:text-gradient-gold transition-all duration-500">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-4">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">How we build</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">Method over momentum.</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <ol className="space-y-4">
              {HOW_WE_BUILD.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-1.5 h-5 w-5 shrink-0 rounded-full border border-primary/35 bg-primary/10 text-[11px] font-semibold text-primary-glow flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-2 gap-6">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <div className="inline-flex items-center gap-2 mb-4 text-primary-glow">
              <Lightbulb className="w-4 h-4" />
              <p className="text-xs tracking-[0.35em] uppercase">Ideas worth building</p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {IDEAS_WORTH_BUILDING.map((idea) => (
                <li key={idea} className="flex gap-2 leading-relaxed">
                  <Workflow className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <div className="inline-flex items-center gap-2 mb-4 text-primary-glow">
              <XCircle className="w-4 h-4" />
              <p className="text-xs tracking-[0.35em] uppercase">Things we refuse to build</p>
            </div>
            <ul className="space-y-3 text-sm text-foreground/90">
              {THINGS_WE_REFUSE.map((item) => (
                <li key={item} className="flex gap-2 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-5xl">
          <div className="grid items-center gap-8 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-12">
            <Reveal className="relative">
              <FounderBust />
            </Reveal>
            <Reveal delay={100} className="glass rounded-3xl p-8 md:p-10 lg:p-12 gold-border-glow">
              <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Meet the Founder</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium">Mohamed B. Elbakrey</h2>
              {lang === "ar" && (
                <p className="mt-2 text-lg text-muted-foreground">محمد بدوى البكرى</p>
              )}
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-primary-glow">Founder</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                The founder's role is simple: keep product thinking honest, keep engineering standards high, and keep every decision aligned with long-term value for the companies we build with.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-12 md:p-14">
            <Wrench className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              If the idea matters,
              <span className="text-gradient-gold italic"> build it with intent</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Bring us the problem worth solving. We'll tell you honestly whether we should build it—and how to build it right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/company-values" className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">
                How we think
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default About;
