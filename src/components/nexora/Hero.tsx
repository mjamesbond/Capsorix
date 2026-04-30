import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useParallax } from "@/hooks/use-reveal";

const Hero = () => {
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
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_95%)]" />
      </div>

      {/* Floating gold orbs with parallax */}
      <div
        ref={orbARef}
        className="absolute top-[18%] -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/25 blur-[140px] animate-glow-pulse will-parallax"
      />
      <div
        ref={orbBRef}
        className="absolute bottom-[12%] -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-glow/15 blur-[160px] animate-glow-pulse will-parallax"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2.5 mb-10 animate-fade-in gold-ring">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-glow" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-foreground/80 uppercase">
              Elite Software Atelier
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.92] font-medium mb-10 animate-fade-in-up tracking-tight">
            We Build{" "}
            <span className="text-gradient-gold italic relative inline-block">
              Digital
              <span className="absolute -inset-x-6 -inset-y-3 bg-gradient-gold/15 blur-3xl -z-10 animate-glow-pulse" />
            </span>
            <br />
            <span className="text-gradient-gold">Empires</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            From the whisper of an idea to a global launch — NEXORA engineers
            mobile apps, web platforms, and bespoke systems for visionaries
            who refuse the ordinary.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#contact"
              className="btn-shimmer group relative inline-flex items-center gap-3 rounded-full bg-gold-animated px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full glass px-9 py-4 text-base font-medium text-foreground/90 hover:text-primary-glow transition-all duration-500 gold-border-glow gold-ring"
            >
              Explore Services
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-3 opacity-70">
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
          <div className="relative w-px h-14 overflow-hidden bg-border/40">
            <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-primary-glow to-transparent animate-[float_2.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
