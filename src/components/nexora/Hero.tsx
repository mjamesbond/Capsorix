import heroBg from "@/assets/hero-bg.webp";
import { ArrowRight, Sparkles } from "lucide-react";
import { useParallax } from "@/hooks/use-reveal";
import CodePanel from "./CodePanel";
import CodeRain from "./CodeRain";
import { useI18n } from "@/i18n/I18nProvider";

const Hero = () => {
  const { t } = useI18n();
  const bgRef = useParallax<HTMLDivElement>(0.25);
  const orbARef = useParallax<HTMLDivElement>(0.15);
  const orbBRef = useParallax<HTMLDivElement>(-0.12);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      {/* Parallax background image */}
      <div ref={bgRef} className="absolute inset-0 -z-10 will-parallax scale-110">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_95%)]" />
      </div>

      {/* Living code backdrop — quieter, supports the neural layer */}
      <CodeRain density={4} parallaxSpeed={0.06} />

      {/* Floating gold orbs with parallax */}
      <div
        ref={orbARef}
        className="absolute top-[18%] -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-[160px] will-parallax"
      />
      <div
        ref={orbBRef}
        className="absolute bottom-[12%] -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-glow/[0.06] blur-[180px] will-parallax"
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="max-w-3xl text-center lg:text-start">
          <div className="inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2.5 mb-10 animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-glow" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-foreground/80 uppercase">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] leading-[1.02] font-medium mb-8 animate-fade-in-up tracking-tight max-w-[18ch] mx-auto lg:mx-0">
            {t.hero.titleA}{" "}
            <span className="text-gradient-gold italic relative inline-block">
              {t.hero.titleApps}
              <span className="absolute -inset-x-4 -inset-y-2 bg-gradient-gold/10 blur-2xl -z-10" />
            </span>
            <br />
            {t.hero.titleB} <span className="text-gradient-gold">{t.hero.titleSystems}</span> {t.hero.titleC}
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            {t.hero.sub}
            <span className="block mt-2 text-foreground/80 font-medium">
              {t.hero.subStrong}
            </span>
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#contact"
              className="btn-shimmer group relative inline-flex items-center gap-3 rounded-full bg-gold-animated px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              <span className="relative z-10 lang-morph">{t.hero.ctaPrimary}</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full glass px-9 py-4 text-base font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring"
            >
              <span className="lang-morph">{t.hero.ctaSecondary}</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                →
              </span>
            </a>
          </div>

          <p
            className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground/80 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {t.hero.foot}
          </p>
        </div>

        {/* Living code panel */}
        <div
          className="hidden lg:block animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          <CodePanel />
        </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-3 opacity-70">
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{t.hero.scroll}</span>
          <div className="relative w-px h-14 overflow-hidden bg-border/40">
            <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-primary-glow to-transparent animate-[float_2.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
