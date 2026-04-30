import { Smartphone, Globe, LayoutDashboard, Rocket, ArrowRight, Apple } from "lucide-react";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Apple,
    title: "Mobile apps — iOS",
    desc: "Native Swift apps built the way Apple builds its own — quiet, fast, considered down to the last frame.",
    tags: ["Swift", "SwiftUI", "App Store"],
    to: "/ios",
  },
  {
    icon: Smartphone,
    title: "Mobile apps — Android",
    desc: "Kotlin-first apps with clean architecture and the kind of details users feel without naming.",
    tags: ["Kotlin", "Compose", "Play Store"],
    to: "/android",
  },
  {
    icon: Globe,
    title: "Websites as full experiences",
    desc: "Not pages — environments. Interfaces that load instantly, read clearly, and convert without shouting.",
    tags: ["Next.js", "React", "Edge"],
    to: "/web",
  },
  {
    icon: LayoutDashboard,
    title: "Internal systems",
    desc: "Dashboards, operations tools, and platforms that quietly run the business behind the business.",
    tags: ["SaaS", "ERP", "Analytics"],
    to: "#contact",
  },
  {
    icon: Rocket,
    title: "Full-cycle product",
    desc: "Strategy, design, engineering, launch — handled by the same team, in one continuous line of thought.",
    tags: ["MVP", "Scale", "Launch"],
    to: "#contact",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative section section-fade">
      <div className="container">
        <Reveal className="max-w-3xl mb-24">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">
            — What we build
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            We build
            <span className="text-gradient-gold italic"> only what should exist.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            A focused set of disciplines, each held to the same standard.
            Tailored to the business — never templated.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              as="article"
              delay={i * 140}
              className="group relative overflow-hidden rounded-3xl glass p-10 md:p-12 gold-border-glow gold-ring lift glow-soft"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative flex items-start gap-6">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 group-hover:scale-[1.04] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <s.icon className="w-7 h-7 text-primary-glow" strokeWidth={1.4} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-3xl font-semibold mb-3 group-hover:text-gradient-gold transition-all duration-500">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] tracking-wider uppercase rounded-full border border-border/60 px-3 py-1 text-muted-foreground transition-colors duration-500 group-hover:border-primary/40 group-hover:text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {s.to.startsWith("/") && (
                    <Link
                      to={s.to}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
                    >
                      Enter the {s.title.split(" ")[0]} laboratory
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
                <span className="font-display text-5xl text-primary/20 group-hover:text-primary/60 transition-colors duration-500">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={200}>
          <p className="text-base md:text-lg text-foreground/85 mb-4">
            Anything software-related — done right.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
          >
            Not sure where it fits? Send it anyway
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;