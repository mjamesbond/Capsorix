import Reveal from "./Reveal";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "60+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Industry Awards" },
];

const Stats = () => {
  return (
    <section className="relative py-28">
      <div className="container">
        <Reveal className="rounded-[2rem] glass-strong p-12 md:p-16 relative overflow-hidden gold-border-glow gold-ring">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[100px] animate-glow-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/15 blur-[100px] animate-glow-pulse" style={{ animationDelay: "2s" }} />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 120}
                className="group text-center md:text-left relative"
              >
                {i > 0 && (
                  <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-12 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                )}
                <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold mb-3 transition-transform duration-500 group-hover:scale-105 origin-left">
                  {s.value}
                </div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;