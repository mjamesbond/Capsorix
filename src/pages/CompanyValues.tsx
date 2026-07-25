import { ArrowRight, Compass, Eye, Gauge, Gem, HeartHandshake, Layers, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import SubpageShell from "@/components/capsorix/SubpageShell";
import Reveal from "@/components/capsorix/Reveal";

const VALUE_FRAMEWORK = [
  {
    title: "Craft with Excellence",
    principle: "Every output should reflect pride, precision, and polish.",
    behaviours: ["Design and engineering quality are inseparable.", "We review details others skip.", "We maintain high bars under pressure."],
    icon: Gem,
  },
  {
    title: "Think Long-Term",
    principle: "We optimize for durable systems, not short-lived wins.",
    behaviours: ["Choose scalable architecture by default.", "Document decisions and tradeoffs clearly.", "Protect maintainability in every sprint."],
    icon: Compass,
  },
  {
    title: "Own the Outcome",
    principle: "Responsibility includes both delivery and impact.",
    behaviours: ["Take initiative before being asked.", "Close loops end-to-end.", "Escalate risks early and constructively."],
    icon: ShieldCheck,
  },
  {
    title: "Move with Clarity",
    principle: "Speed matters when direction is clear.",
    behaviours: ["Reduce ambiguity before execution.", "Prefer concise communication over noise.", "Ship focused increments with measurable value."],
    icon: Gauge,
  },
  {
    title: "Learn Relentlessly",
    principle: "Curiosity and iteration keep us sharp.",
    behaviours: ["Use retrospectives to improve systems.", "Share knowledge openly across teams.", "Experiment responsibly with new tools."],
    icon: Lightbulb,
  },
  {
    title: "Respect Everyone",
    principle: "Great products are built by people who feel seen and respected.",
    behaviours: ["Debate ideas without diminishing people.", "Listen before responding.", "Treat clients, peers, and users with equal care."],
    icon: HeartHandshake,
  },
];

const CompanyValues = () => {
  return (
    <SubpageShell>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_70%_45%/0.16),transparent_68%)]" />
        <div className="container relative">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">Company Values</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.98] tracking-tight">
              Values that shape how we build,
              <span className="text-gradient-gold italic"> collaborate, and lead</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our values are practical standards for product quality, decision-making, and culture—not wall statements.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/workplace-culture" className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">
                See values in action
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/careers" className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">
                Explore careers
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-fade">
        <div className="container grid md:grid-cols-3 gap-6">
          <Reveal className="glass rounded-2xl p-7 gold-border-glow">
            <Eye className="w-5 h-5 text-primary-glow mb-4" />
            <h2 className="font-display text-2xl mb-2">Intentional by default</h2>
            <p className="text-sm text-muted-foreground">We make decisions on purpose and explain the why behind them.</p>
          </Reveal>
          <Reveal delay={90} className="glass rounded-2xl p-7 gold-border-glow">
            <Layers className="w-5 h-5 text-primary-glow mb-4" />
            <h2 className="font-display text-2xl mb-2">System-level thinking</h2>
            <p className="text-sm text-muted-foreground">We optimize for the full product system, not isolated features.</p>
          </Reveal>
          <Reveal delay={180} className="glass rounded-2xl p-7 gold-border-glow">
            <Users className="w-5 h-5 text-primary-glow mb-4" />
            <h2 className="font-display text-2xl mb-2">Human-centered execution</h2>
            <p className="text-sm text-muted-foreground">We build for real people and collaborate with empathy and rigor.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Values framework</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">What each value means in practice</h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {VALUE_FRAMEWORK.map((value, i) => (
              <Reveal key={value.title} delay={i * 80} className="group glass rounded-3xl p-8 gold-border-glow lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center mb-5 icon-tile">
                  <value.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-3xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">{value.title}</h3>
                <p className="text-sm text-foreground/90 leading-relaxed mb-5">{value.principle}</p>
                <ul className="space-y-2">
                  {value.behaviours.map((behaviour) => (
                    <li key={behaviour} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-glow shrink-0" />
                      <span>{behaviour}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">How we hold ourselves accountable</p>
            <div className="grid md:grid-cols-3 gap-5 text-sm">
              <article className="rounded-xl border border-border/50 bg-input/20 p-4">
                <h4 className="font-display text-xl mb-2">Delivery reviews</h4>
                <p className="text-muted-foreground">Quality, usability, and maintainability checks on every release cycle.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-input/20 p-4">
                <h4 className="font-display text-xl mb-2">Decision hygiene</h4>
                <p className="text-muted-foreground">Major decisions are documented with context, options, and tradeoffs.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-input/20 p-4">
                <h4 className="font-display text-xl mb-2">Team retrospectives</h4>
                <p className="text-muted-foreground">Frequent reflection on process quality, communication, and outcomes.</p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-12 md:p-14">
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              If these values sound like your style,
              <span className="text-gradient-gold italic"> let’s build together</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Explore our culture, open roles, or reach out directly to start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/workplace-culture" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">Workplace &amp; Culture</a>
              <a href="/careers" className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">Careers</a>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default CompanyValues;
