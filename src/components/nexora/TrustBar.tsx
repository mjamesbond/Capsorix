import { Clock, Sparkles, ShieldCheck, Lock } from "lucide-react";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [ShieldCheck, Clock, Sparkles, Lock] as const;

const TrustBar = () => {
  const { t } = useI18n();
  const pillars = t.trust.pillars.map((p, i) => ({ ...p, icon: ICONS[i] }));

  return (
    <section aria-label="Why Capsorix" className="relative -mt-12 md:-mt-20 mb-8 z-10">
      <div className="container">
        <Reveal className="glass-strong rounded-2xl md:rounded-full px-6 md:px-10 py-6 md:py-5 gold-border-glow shadow-elegant">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
            {pillars.map((p, i) => (
              <li key={p.title} className="group flex items-center gap-3 md:gap-4 relative">
                {i > 0 && (
                  <span className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
                )}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-gold-soft border border-primary/30 flex items-center justify-center icon-tile">
                  <p.icon className="w-4 h-4 text-primary-glow" strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground/95 leading-tight truncate">{p.title}</p>
                  <p className="hidden md:block text-xs text-muted-foreground leading-snug mt-0.5 truncate">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default TrustBar;
