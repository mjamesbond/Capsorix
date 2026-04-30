import { Smartphone, Globe, LayoutDashboard, Rocket, ArrowRight, Apple } from "lucide-react";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

const META = [
  { icon: Apple, to: "/ios", labKey: "iOS" },
  { icon: Smartphone, to: "/android", labKey: "Android" },
  { icon: Globe, to: "/web", labKey: "Web" },
  { icon: LayoutDashboard, to: "#contact", labKey: "" },
  { icon: Rocket, to: "#contact", labKey: "" },
] as const;

const Services = () => {
  const { t, lang } = useI18n();
  const services = t.services.items.map((s, i) => ({ ...s, ...META[i] }));

  return (
    <section id="services" className="relative section section-fade">
      <div className="container">
        <Reveal className="max-w-3xl mb-24">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">{t.services.kicker}</p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05]">
            {t.services.titleA}
            <span className="text-gradient-gold italic">{t.services.titleB}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{t.services.lead}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7">
          {services.map((s, i) => {
            const labLabel = s.labKey
              ? t.services.enter.replace("{x}", s.labKey)
              : "";
            return (
              <Reveal
                key={s.title}
                as="article"
                delay={i * 140}
                className="group relative overflow-hidden rounded-3xl glass p-10 md:p-12 gold-border-glow gold-ring lift glow-soft"
              >
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="relative flex items-start gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 group-hover:scale-[1.04] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <s.icon className="w-7 h-7 text-primary-glow" strokeWidth={1.4} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-3xl font-semibold mb-3 group-hover:text-gradient-gold transition-all duration-500">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] tracking-wider uppercase rounded-full border border-border/60 px-3 py-1 text-muted-foreground transition-colors duration-500 group-hover:border-primary/40 group-hover:text-foreground/80"
                          dir="ltr"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {s.to.startsWith("/") && (
                      <Link
                        to={s.to}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
                      >
                        {labLabel}
                        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                  <span className="font-display text-5xl text-primary/20 group-hover:text-primary/60 transition-colors duration-500" dir="ltr">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 text-center" delay={200}>
          <p className="text-base md:text-lg text-foreground/85 mb-4">{t.services.footer}</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-glow hover:text-primary transition-colors"
          >
            {t.services.footerLink}
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
        {/* lang touched to keep it referenced */}
        <span className="hidden" data-lang={lang} />
      </div>
    </section>
  );
};

export default Services;
