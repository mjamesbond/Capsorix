import { useEffect } from "react";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import SubpageShell from "@/components/capsorix/SubpageShell";
import Reveal from "@/components/capsorix/Reveal";

const TITLE = "How to Choose a Software Development Company — Capsorix";
const DESCRIPTION =
  "A senior engineer's guide to selecting a bespoke software development partner: how to evaluate craft, process, communication, and long-term fit.";

const CRITERIA = [
  {
    icon: Compass,
    title: "Clarity of process",
    body: "A serious partner shows you exactly how work moves from idea to launch — discovery, scoping, milestones, review loops, and handover. Ask to see a real project timeline, not a marketing deck.",
  },
  {
    icon: Users,
    title: "Senior-led execution",
    body: "Bespoke software is a craft. Confirm who actually writes your code. If juniors do the work while a senior name sits on the invoice, quality and timelines suffer.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership and IP",
    body: "You should own 100% of the source code, design files, and infrastructure from day one. Contracts must be explicit about repositories, credentials, and post-launch access.",
  },
  {
    icon: Sparkles,
    title: "Design maturity",
    body: "Great engineering without design intent produces forgettable products. Look for teams that treat UI, motion, and copy as part of the build, not a decoration added at the end.",
  },
  {
    icon: Zap,
    title: "Performance discipline",
    body: "Ask how the team measures load times, bundle size, database query cost, and mobile frame rates. If those numbers aren't tracked, they aren't optimized.",
  },
  {
    icon: CheckCircle2,
    title: "Long-term support",
    body: "Software is never finished at launch. Understand how the team handles bug fixes, security patches, dependency upgrades, and roadmap evolution over the next 12–36 months.",
  },
];

const QUESTIONS = [
  "Can I see the code and repository structure from a recent client project?",
  "Who specifically will be building my product — names, roles, seniority?",
  "How do you handle scope changes mid-project without derailing the timeline?",
  "What does your handover look like? Am I fully independent on day one after launch?",
  "How do you measure quality — performance budgets, test coverage, accessibility?",
  "What happens if I need to bring the code in-house or move to another team?",
];

const RED_FLAGS = [
  "Fixed quotes given before any real discovery conversation.",
  "Reluctance to name the engineers who will do the work.",
  "No written process for reviews, deployments, or rollbacks.",
  "Portfolio screenshots without live URLs or verifiable clients.",
  "Contracts that keep source code, credentials, or infrastructure under the vendor's control.",
];

const ChoosingSoftwarePartner = () => {
  useEffect(() => {
    document.title = TITLE;
  }, []);

  return (
    <SubpageShell>
      {/* Hero */}
      <section className="relative pt-40 pb-16">
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Compass className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">
                Guide
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight">
              How to choose a
              <br />
              <span className="text-gradient-gold italic">software development company</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              A short, honest guide to selecting a bespoke software development partner —
              written from the inside of the process, not the sales side of it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="relative pb-8">
        <div className="container">
          <Reveal className="max-w-3xl mx-auto">
            <article className="rounded-2xl glass gold-ring p-8 md:p-12 text-[15px] md:text-base leading-relaxed text-foreground/85 space-y-5">
              <p>
                Hiring a software team is one of the highest-leverage decisions a founder or
                operator will make. The right partner compounds every quarter that follows;
                the wrong one leaves you rewriting the same product two years later. Yet most
                selection processes rely on portfolio screenshots, hourly rates, and a
                sales-friendly pitch deck — none of which predict how the code will actually
                behave in production.
              </p>
              <p>
                What follows is the framework we would use if we were on the buying side of
                the table. It applies whether you are commissioning a native iOS app, an
                Android product, a web platform, or the full stack.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Criteria */}
      <section className="relative section">
        <div className="container">
          <Reveal className="max-w-3xl mx-auto mb-14">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">01 · Criteria</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">
              What actually
              <span className="text-gradient-gold italic"> matters</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CRITERIA.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 80}
                className="group relative rounded-2xl glass p-8 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 mb-5 icon-tile">
                  <c.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="relative pb-24">
        <div className="container">
          <Reveal className="max-w-3xl mx-auto mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">02 · Questions to ask</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">
              Six questions that
              <span className="text-gradient-gold italic"> reveal the truth</span>
            </h2>
          </Reveal>

          <Reveal className="max-w-3xl mx-auto rounded-2xl glass gold-ring p-8 md:p-10">
            <ol className="space-y-5">
              {QUESTIONS.map((q, i) => (
                <li key={q} className="flex gap-4">
                  <span className="font-mono text-xs text-primary-glow pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/85 leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Red flags */}
      <section className="relative pb-24">
        <div className="container">
          <Reveal className="max-w-3xl mx-auto mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">03 · Red flags</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">
              When to
              <span className="text-gradient-gold italic"> walk away</span>
            </h2>
          </Reveal>

          <Reveal className="max-w-3xl mx-auto rounded-2xl glass gold-ring p-8 md:p-10">
            <ul className="space-y-4">
              {RED_FLAGS.map((r) => (
                <li key={r} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-glow shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-12 md:p-14">
            <Sparkles className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h3 className="font-display text-3xl md:text-5xl font-medium leading-tight mb-5">
              Ready for a
              <span className="text-gradient-gold italic"> serious conversation?</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              We reply to every qualified inquiry within 24–48 hours with a real engineer,
              not a sales pipeline.
            </p>
            <a
              href="/#contact"
              className="btn-shimmer inline-flex items-center gap-3 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              <Zap className="w-4 h-4" />
              Start a project
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default ChoosingSoftwarePartner;
