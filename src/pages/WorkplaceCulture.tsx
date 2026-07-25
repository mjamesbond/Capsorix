import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Globe2,
  Handshake,
  HeartPulse,
  Leaf,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import SubpageShell from "@/components/capsorix/SubpageShell";
import Reveal from "@/components/capsorix/Reveal";

const HOW_WE_WORK = [
  "Remote-first collaboration across time zones.",
  "Outcome over hours, with clear ownership and measurable goals.",
  "Async-by-default communication for uninterrupted deep work.",
  "Transparent decision logs and senior-level peer reviews.",
];

const VALUES = [
  {
    title: "Craft with Excellence",
    desc: "We sweat the details because quality compounds over time.",
    icon: Sparkles,
  },
  {
    title: "Think Long-Term",
    desc: "We choose architecture and decisions that stay strong under scale.",
    icon: Target,
  },
  {
    title: "Move with Clarity",
    desc: "Fast execution matters, but never at the expense of good judgment.",
    icon: ArrowRight,
  },
  {
    title: "Respect Every Perspective",
    desc: "Diverse thinking improves products, teams, and outcomes.",
    icon: Users,
  },
];

const BENEFITS = [
  "Remote-first environment",
  "Flexible hours and location",
  "High ownership and creative freedom",
  "Modern tooling and AI-assisted workflows",
  "Focused growth, mentorship, and peer learning",
  "Meaningful products with real-world impact",
];

const FAQS = [
  {
    q: "Do you hire remote talent internationally?",
    a: "Yes. We are remote-first and hire for capability, communication, and ownership—regardless of geography.",
  },
  {
    q: "How do teams collaborate across time zones?",
    a: "We use structured async updates, documented decisions, and overlap windows for critical discussions.",
  },
  {
    q: "How does growth work at Capsorix?",
    a: "Growth is project-led: increasing scope, deeper ownership, and direct mentorship from senior engineers and product thinkers.",
  },
  {
    q: "What makes your workplace policy different?",
    a: "Our policy is built around trust and outcomes. Clear standards, accountability, and flexibility coexist by design.",
  },
];

const WorkplaceCulture = () => {
  return (
    <SubpageShell>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_70%_45%/0.16),transparent_68%)]" />
        <div className="container relative">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <BriefcaseBusiness className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">Workplace &amp; Culture</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.98] tracking-tight">
              Building exceptional products starts with
              <span className="text-gradient-gold italic"> exceptional people</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We design our workplace to protect focus, reward ownership, and help ambitious people do the best work of their careers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/careers" className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">
                Join our journey
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#how-we-work" className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">
                Explore our culture
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-we-work" className="section section-fade">
        <div className="container grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">How We Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05]">Remote-first by structure, human by design.</h2>
          </Reveal>
          <Reveal className="lg:col-span-7 grid sm:grid-cols-2 gap-4" stagger={90}>
            {HOW_WE_WORK.map((item) => (
              <article key={item} className="glass rounded-2xl p-6 gold-border-glow lift">
                <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-2 gap-6">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Workplace Policy</p>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow" />Remote-first operations with flexible location and schedule.</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow" />Results-driven planning with clear accountability.</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow" />Respectful communication and inclusive collaboration.</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow" />Healthy workload management and continuous improvement.</li>
            </ul>
          </Reveal>
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Traditional vs Capsorix</p>
            <dl className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-3">
                <dt className="text-muted-foreground">Hours first</dt><dd className="text-primary-glow text-end">Outcomes first</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-3">
                <dt className="text-muted-foreground">Top-down silos</dt><dd className="text-primary-glow text-end">Cross-functional ownership</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-3">
                <dt className="text-muted-foreground">Meeting-heavy routines</dt><dd className="text-primary-glow text-end">Async-first coordination</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <dt className="text-muted-foreground">Reactive growth</dt><dd className="text-primary-glow text-end">Deliberate career progression</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section-fade">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Our Values</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">The standards behind every decision.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 90} className="group glass rounded-2xl p-8 gold-border-glow lift">
                <div className="w-11 h-11 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center mb-4 icon-tile">
                  <value.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <a href="/company-values" className="inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors">
              Explore our complete values framework
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-3 gap-6">
          <Reveal className="glass rounded-2xl p-7 gold-border-glow">
            <BookOpen className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Growth &amp; Learning</h3>
            <p className="text-sm text-muted-foreground">Books, AI experimentation, mentorship, and peer reviews are part of day-to-day execution.</p>
          </Reveal>
          <Reveal delay={90} className="glass rounded-2xl p-7 gold-border-glow">
            <Scale className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Work-Life Balance</h3>
            <p className="text-sm text-muted-foreground">Focused work windows, flexible schedules, and sustainable planning protect energy and creativity.</p>
          </Reveal>
          <Reveal delay={180} className="glass rounded-2xl p-7 gold-border-glow">
            <HeartPulse className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Diversity &amp; Inclusion</h3>
            <p className="text-sm text-muted-foreground">We hire with fairness, collaborate with respect, and build better products through broader perspectives.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-2 gap-6">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <Leaf className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-3xl mb-3">Sustainability</h3>
            <p className="text-muted-foreground leading-relaxed">Digital-first operations, paperless workflows, and efficient infrastructure are built into how we work—not treated as an afterthought.</p>
          </Reveal>
          <Reveal delay={120} className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <Handshake className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-3xl mb-3">Social Impact</h3>
            <p className="text-muted-foreground leading-relaxed">We choose products that solve meaningful operational and human problems, with measurable utility in the real world.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-2 gap-6">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Benefits</p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/90">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="rounded-xl border border-border/50 px-4 py-3 bg-input/20">{benefit}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Why Work With Us</p>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">Average workplace: fragmented ownership, reactive planning, and shallow feedback loops.</p>
              <p className="text-foreground/90">Capsorix: end-to-end ownership, direct impact on shipped products, and a culture that rewards thoughtful execution.</p>
            </div>
            <a href="/careers" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors">
              View open roles and hiring process
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-4xl">
          <Reveal className="mb-8 text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Questions we hear most often</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 70}>
                <details className="group glass rounded-2xl p-6 border border-border/50 open:border-primary/45 open:gold-border-glow">
                  <summary className="cursor-pointer list-none font-display text-xl flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-primary-glow text-base">+</span>
                  </summary>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-12 md:p-14">
            <Lightbulb className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              Join us in building
              <span className="text-gradient-gold italic"> the future of digital products</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              If you care about craftsmanship, ownership, and meaningful outcomes, you will feel at home here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/careers" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">Careers</a>
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">Contact us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default WorkplaceCulture;
