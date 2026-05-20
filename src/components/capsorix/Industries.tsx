import { Utensils, Building2, Sparkles, Factory, Coffee, ShoppingBag, Stethoscope, Plane } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [Utensils, Building2, Sparkles, Factory, Coffee, ShoppingBag, Stethoscope, Plane] as const;

const Industries = () => {
  const { t } = useI18n();
  const industries = t.industries.labels.map((label, i) => ({ label, icon: ICONS[i] }));

  return (
    <section id="industries" className="relative section section-fade">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">{t.industries.kicker}</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              {t.industries.titleA}
              <span className="text-gradient-gold italic">{t.industries.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.industries.lead}</p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind, i) => (
                <Reveal
                  key={ind.label}
                  delay={i * 100}
                  className="group aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-3 p-4 gold-border-glow lift glow-soft"
                >
                  <ind.icon className="w-8 h-8 text-primary-glow icon-tile" strokeWidth={1.3} />
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-primary-glow transition-colors text-center">
                    {ind.label}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
