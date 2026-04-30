import { Smartphone, Globe, LayoutDashboard, Rocket, ArrowRight, Apple } from "lucide-react";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Apple,
    title: "iOS Development",
    desc: "Native Swift apps engineered with Apple-grade discipline, taste, and frame-perfect polish.",
    tags: ["Swift", "SwiftUI", "App Store"],
    to: "/ios",
  },
  {
    icon: Smartphone,
    title: "Android Development",
    desc: "Kotlin-first apps with modular architecture, hardened security, and Play Store mastery.",
    tags: ["Kotlin", "Compose", "Play Store"],
    to: "/android",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Frontend craft and backend rigor — interfaces that load instantly and run like clockwork.",
    tags: ["Next.js", "React", "Edge"],
    to: "/web",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Systems",
    desc: "Bespoke dashboards, internal tools, and enterprise platforms engineered to scale.",
    tags: ["SaaS", "ERP", "Analytics"],
    to: "#contact",
  },
  {
    icon: Rocket,
    title: "Full-Cycle Product",
    desc: "From the first whiteboard sketch to launch-day applause — strategy, design, build, ship.",
    tags: ["MVP", "Scale", "Launch"],
    to: "#contact",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-40">
      <div className="container">
        <Reveal className="max-w-3xl mb-24">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">
            — Services
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            Crafted with
            <span className="text-gradient-gold italic"> obsession.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Custom solutions tailored to your business — never templated.
            A focused suite of disciplines executed at the highest standard.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              as="article"
              delay={i * 120}
              className="group relative overflow-hidden rounded-3xl glass p-10 md:p-12 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1.5 hover:shadow-elegant"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-start gap-6">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-gold transition-all duration-700">
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
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
          >
            Not sure which fits? Talk to a senior partner
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;