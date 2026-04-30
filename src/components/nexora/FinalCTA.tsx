import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const FinalCTA = () => {
  const { t } = useI18n();
  return (
    <section className="relative section section-fade">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] glass-strong gold-border-glow gold-ring p-10 md:p-16 text-center shadow-elegant">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-glow" />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-foreground/80">
                {t.finalCta.badge}
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] mb-6">
              {t.finalCta.titleA}
              <span className="text-gradient-gold italic">{t.finalCta.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              {t.finalCta.lead}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="#contact"
                className="btn-shimmer group inline-flex items-center gap-3 rounded-full bg-gold-animated px-10 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
              >
                <span className="relative z-10">{t.finalCta.cta}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </a>
              <a
                href="mailto:studio@capsorix.dev"
                className="text-sm text-muted-foreground hover:text-primary-glow transition-colors"
              >
                {t.finalCta.or}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary-glow" /> {t.finalCta.reply}</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary-glow" /> {t.finalCta.nda}</span>
              <span className="inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> {t.finalCta.noObligation}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
