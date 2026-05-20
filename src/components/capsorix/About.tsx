import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const About = () => {
  const { t } = useI18n();
  return (
    <section id="about" className="relative section section-fade">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">{t.about.kicker}</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              {t.about.titleA}
              <span className="text-gradient-gold italic">{t.about.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.about.lead}</p>
            <p className="text-base text-foreground/80 leading-relaxed">{t.about.tail}</p>
          </Reveal>

          <div className="lg:col-span-7 space-y-4">
            {t.about.principles.map((p, i) => (
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
