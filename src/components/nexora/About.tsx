import Reveal from "./Reveal";

const principles = [
  { k: "01", t: "We understand before we build", d: "Every project starts with listening — to the business, the users, and the constraints no one talks about." },
  { k: "02", t: "We think before we design", d: "Structure precedes surface. We map the system before we draw a single screen." },
  { k: "03", t: "We test before we launch", d: "Edge cases, real devices, real conditions. If it can break, we find it first." },
];

const About = () => {
  return (
    <section id="about" className="relative section section-fade">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">— About</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              A small team,
              <span className="text-gradient-gold italic"> a careful method.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We carefully choose the projects we take on. Not every project is
              accepted — but every accepted project is done right.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Our work is not many — but it’s precise.
            </p>
          </Reveal>

          <div className="lg:col-span-7 space-y-4">
            {principles.map((p, i) => (
              <Reveal
                key={p.k}
                delay={i * 140}
                className="group glass rounded-2xl p-7 md:p-8 gold-border-glow lift glow-soft flex gap-6"
              >
                <span className="font-display text-3xl text-primary/30 group-hover:text-primary/60 transition-colors duration-500 shrink-0">
                  {p.k}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
                    {p.t}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
