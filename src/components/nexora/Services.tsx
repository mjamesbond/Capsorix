import { Smartphone, Globe, LayoutDashboard, Rocket } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Native-grade iOS and Android experiences crafted for performance, polish, and longevity.",
    tags: ["iOS", "Android", "React Native"],
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-converting websites and web apps built on modern stacks with cinematic UX.",
    tags: ["Next.js", "React", "Edge"],
  },
  {
    icon: LayoutDashboard,
    title: "Custom Systems",
    desc: "Bespoke dashboards, internal tools, and enterprise platforms engineered to scale.",
    tags: ["SaaS", "ERP", "Analytics"],
  },
  {
    icon: Rocket,
    title: "Full-Cycle Product",
    desc: "From the first whiteboard sketch to launch-day applause — strategy, design, build, ship.",
    tags: ["MVP", "Scale", "Launch"],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-32">
      <div className="container">
        <div className="max-w-3xl mb-20">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            — Services
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            Crafted with
            <span className="text-gradient-gold italic"> obsession.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            A focused suite of disciplines, executed at the highest standard. No filler. No shortcuts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl glass p-10 gold-border-glow transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-start gap-6">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <s.icon className="w-7 h-7 text-primary-glow" strokeWidth={1.4} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-3xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[11px] tracking-wider uppercase rounded-full border border-border/60 px-3 py-1 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="font-display text-5xl text-primary/20 group-hover:text-primary/50 transition-colors">
                  0{i + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;