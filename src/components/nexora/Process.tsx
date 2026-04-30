import { Lightbulb, Compass, Palette, Code2, Rocket } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Idea", desc: "We listen, challenge, and refine your vision into a sharp brief." },
  { icon: Compass, title: "Strategy", desc: "Roadmaps, architecture, and KPIs aligned to real business outcomes." },
  { icon: Palette, title: "Design", desc: "Cinematic interfaces engineered for clarity, emotion, and conversion." },
  { icon: Code2, title: "Development", desc: "Production-grade engineering with rigorous QA and zero compromise." },
  { icon: Rocket, title: "Launch", desc: "Seamless deployment, analytics, and post-launch optimization." },
];

const Process = () => {
  return (
    <section id="process" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">— Process</p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            From spark to
            <span className="text-gradient-gold italic"> sovereignty.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-gold blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative w-20 h-20 rounded-full glass-strong flex items-center justify-center gold-border-glow group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7 text-primary-glow" strokeWidth={1.4} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold flex items-center justify-center shadow-gold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;