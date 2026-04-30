import Reveal from "./Reveal";

const stats = [
  { value: "120+", label: "Projects Shipped" },
  { value: "60+", label: "Global Clients" },
  { value: "98%", label: "Would Recommend" },
  { value: "24h", label: "Avg. Response Time" },
];

const Stats = () => {
  return (
    <section className="relative section section-fade">
      <div className="container">
        <Reveal className="rounded-[2rem] glass-strong p-12 md:p-16 relative overflow-hidden gold-border-glow gold-ring">
          {/* Quiet ambient glows — match the neural layer, no pulsing */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/[0.06] blur-[140px]" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 140}
                className="group text-center md:text-left relative"
              >
                {i > 0 && (
                  <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-12 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                )}
                <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold mb-3">
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