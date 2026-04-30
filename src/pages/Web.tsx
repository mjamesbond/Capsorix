import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Database,
  Gauge,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import HybridEditor from "@/components/nexora/HybridEditor";
import CursorOrbs from "@/components/nexora/CursorOrbs";
import CodeRain from "@/components/nexora/CodeRain";
import Reveal from "@/components/nexora/Reveal";

const capabilities = [
  {
    icon: Layers,
    title: "React · Next.js",
    desc: "App Router, RSC, edge rendering — interfaces that load instantly and feel inevitable.",
  },
  {
    icon: Code2,
    title: "Design Systems",
    desc: "Tokenized, themable, accessible component libraries that scale across teams and brands.",
  },
  {
    icon: Database,
    title: "Node · Edge APIs",
    desc: "Type-safe APIs, queues, streams, and serverless that hold up under real traffic.",
  },
  {
    icon: ShieldCheck,
    title: "Auth · Security",
    desc: "OAuth, RBAC, rate limiting, and audit trails — secure by architecture, not afterthought.",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals",
    desc: "Sub-second LCP, near-zero CLS, and INP tuned to the millisecond. Measurable polish.",
  },
  {
    icon: Workflow,
    title: "DevOps · CI/CD",
    desc: "Preview environments, automated checks, observability, and zero-downtime deploys.",
  },
];

const Web = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="tracking-[0.2em] uppercase text-[11px]">Nexora</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            <Globe className="w-3.5 h-3.5 text-primary-glow" />
            Web Engineering
          </div>
          <a
            href="/#contact"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gold-animated px-5 py-2 text-xs font-semibold text-primary-foreground shadow-gold gold-ring"
          >
            Start a Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <CodeRain density={5} parallaxSpeed={0.06} />
        <CursorOrbs />

        <div className="container relative">
          <Reveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Globe className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">
                Web Development
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-medium leading-[0.95] tracking-tight">
              Where
              <span className="text-gradient-gold italic"> beauty </span>
              meets
              <br />
              <span className="text-gradient-gold">logic.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Frontend craft and backend rigor — composed by the same hands.
              Sites and platforms that look inevitable and run like clockwork.
              <span className="block mt-2 text-foreground/80 text-sm tracking-wide">
                Hover any token below to reveal its meaning.
              </span>
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-16">
            <HybridEditor />
          </Reveal>

          {/* Live request flow */}
          <Reveal delay={300} className="mt-10">
            <div className="rounded-2xl glass border border-border/40 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-[12px] font-mono text-muted-foreground">
                <span className="px-2.5 py-1 rounded-full bg-[hsl(200_85%_60%/0.15)] text-[hsl(200_85%_72%)] border border-[hsl(200_85%_60%/0.3)]">
                  client
                </span>
                <span className="text-muted-foreground/50">→</span>
                <span className="text-foreground/80">POST /build</span>
                <span className="text-muted-foreground/50">→</span>
                <span className="px-2.5 py-1 rounded-full bg-[hsl(95_55%_60%/0.15)] text-[hsl(95_55%_70%)] border border-[hsl(95_55%_60%/0.3)]">
                  server
                </span>
                <span className="text-muted-foreground/50">→</span>
                <span className="text-[hsl(45_85%_65%)]">200 OK · 38ms</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(95_55%_55%)] animate-pulse" />
                Round-trip live
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-32">
        <div className="container">
          <Reveal className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-5">— Capabilities</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05]">
              Two disciplines.
              <span className="text-gradient-gold italic"> One studio.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              We don't hand off between design and engineering — we are both.
              That's why our products feel coherent from the first pixel to the last query.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 100}
                className="group relative rounded-2xl glass p-8 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 mb-5 group-hover:scale-110 group-hover:shadow-gold transition-all duration-700">
                  <c.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-14">
            <Sparkles className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h3 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              They understand both
              <br />
              <span className="text-gradient-gold italic">beauty and logic.</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              If your web product needs taste and engineering in equal measure,
              start the conversation. Senior reply within 24–48 hours.
            </p>
            <a
              href="/#contact"
              className="btn-shimmer inline-flex items-center gap-3 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              <Zap className="w-4 h-4" />
              Request Private Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Web;