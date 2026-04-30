const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "60+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Industry Awards" },
];

const Stats = () => {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="rounded-[2rem] glass-strong p-10 md:p-14 relative overflow-hidden gold-border-glow">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/10 blur-[100px]" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold mb-2">
                  {s.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;