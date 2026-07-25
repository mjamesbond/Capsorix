import { ArrowRight, BriefcaseBusiness, Clock3, Globe, MessageSquare, ShieldCheck, Sparkles, Users } from "lucide-react";
import SubpageShell from "@/components/capsorix/SubpageShell";
import Reveal from "@/components/capsorix/Reveal";

const ROLES = [
  {
    title: "Senior Product Engineer",
    type: "Full-time · Remote",
    summary: "Build and ship premium web and product systems end-to-end with direct ownership.",
  },
  {
    title: "Mobile Engineer (iOS / Android)",
    type: "Full-time · Remote",
    summary: "Craft high-performance native experiences with strong architecture and quality discipline.",
  },
  {
    title: "Product Designer",
    type: "Contract / Full-time · Remote",
    summary: "Design elegant product flows, premium interfaces, and motion-informed user experiences.",
  },
];

const PROCESS = [
  "Intro conversation focused on values, clarity, and motivation.",
  "Role conversation with practical problem-solving and systems thinking.",
  "Collaborative working session with real-world product context.",
  "Final alignment on expectations, ownership, and growth plan.",
];

const Careers = () => {
  return (
    <SubpageShell>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_70%_45%/0.16),transparent_68%)]" />
        <div className="container relative">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <BriefcaseBusiness className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">Careers at Capsorix</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.98] tracking-tight">
              Build meaningful products with
              <span className="text-gradient-gold italic"> people who care about craft</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We hire builders who think deeply, execute carefully, and take ownership from first idea to shipped result.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#open-roles" className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">
                View open roles
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/workplace-culture" className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">
                Explore workplace culture
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="open-roles" className="section section-fade">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Open Roles</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Current opportunities</h2>
          </Reveal>
          <div className="grid gap-5">
            {ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 90} className="glass rounded-2xl p-7 md:p-8 gold-border-glow lift">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl mb-1">{role.title}</h3>
                    <p className="text-sm text-primary-glow">{role.type}</p>
                  </div>
                  <a href="mailto:careers@capsorix.tech?subject=Application%20-%20Capsorix" className="inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors">
                    Apply now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{role.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-2 gap-6">
          <Reveal className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Why talented people join</p>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-2"><Sparkles className="w-4 h-4 mt-0.5 text-primary-glow" />High-trust ownership and direct product impact.</li>
              <li className="flex gap-2"><Globe className="w-4 h-4 mt-0.5 text-primary-glow" />Remote-first collaboration with global talent.</li>
              <li className="flex gap-2"><Clock3 className="w-4 h-4 mt-0.5 text-primary-glow" />Flexible schedules with outcome-focused execution.</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-primary-glow" />Senior mentorship, strong standards, and steady growth.</li>
            </ul>
          </Reveal>

          <Reveal delay={90} className="glass rounded-3xl p-8 md:p-10 gold-border-glow">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">Hiring process</p>
            <ol className="space-y-3 text-sm">
              {PROCESS.map((step, i) => (
                <li key={step} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="font-mono text-primary-glow">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid md:grid-cols-3 gap-6">
          <Reveal className="glass rounded-2xl p-7 gold-border-glow">
            <Users className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Collaboration</h3>
            <p className="text-sm text-muted-foreground">Low-ego, high-accountability teams that share context and solve problems together.</p>
          </Reveal>
          <Reveal delay={90} className="glass rounded-2xl p-7 gold-border-glow">
            <MessageSquare className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Communication</h3>
            <p className="text-sm text-muted-foreground">Clear async communication, concise decisions, and thoughtful feedback loops.</p>
          </Reveal>
          <Reveal delay={180} className="glass rounded-2xl p-7 gold-border-glow">
            <ShieldCheck className="w-5 h-5 text-primary-glow mb-4" />
            <h3 className="font-display text-2xl mb-2">Trust</h3>
            <p className="text-sm text-muted-foreground">We trust professionals to make sound decisions and own outcomes with integrity.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-12 md:p-14">
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              Ready to do your best work?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Send us your profile, portfolio, or GitHub. We care more about thinking quality and execution depth than checklists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:careers@capsorix.tech?subject=Application%20-%20Capsorix" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03] gold-ring">Apply via email</a>
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring">Talk to our team</a>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default Careers;
