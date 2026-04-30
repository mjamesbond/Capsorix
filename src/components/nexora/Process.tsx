import { Lightbulb, Compass, Palette, Code2, Rocket, LifeBuoy } from "lucide-react";
import Reveal from "./Reveal";
import { useParallax } from "@/hooks/use-reveal";
import CodeRain from "./CodeRain";

const steps = [
  { icon: Lightbulb, title: "Understand", desc: "We listen first. The brief gets sharper before anything else moves." },
  { icon: Compass, title: "Analyze", desc: "Constraints, users, edge cases. We map the system before drawing a screen." },
  { icon: Palette, title: "Design", desc: "Quiet interfaces with clear hierarchy. Built to be used, not admired." },
  { icon: Code2, title: "Build", desc: "Clean engineering, real testing, no shortcuts hiding under the surface." },
  { icon: Rocket, title: "Launch", desc: "Shipped with care. Monitored from the first hour, not the first complaint." },
  { icon: LifeBuoy, title: "Stay", desc: "We remain — refining, supporting, and growing the system over time." },
];

const Process = () => {
  const orbRef = useParallax<HTMLDivElement>(0.18);
  return (
    <section id="process" className="relative section overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <CodeRain density={5} parallaxSpeed={0.15} className="opacity-70" />
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/5 blur-[120px] will-parallax"
      />

      <div className="container relative">
        <Reveal className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">— Process</p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            Six steps.
            <span className="text-gradient-gold italic"> None of them skipped.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            No step is skipped — because every step matters.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 140}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-gold blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="relative w-20 h-20 rounded-full glass-strong flex items-center justify-center gold-border-glow gold-ring icon-tile">
                    <step.icon className="w-7 h-7 text-primary-glow " strokeWidth={1.4} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-animated text-primary-foreground text-xs font-bold flex items-center justify-center shadow-gold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[14rem]">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;