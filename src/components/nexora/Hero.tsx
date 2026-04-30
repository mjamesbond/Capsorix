import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Floating gold orbs */}
      <div className="absolute top-1/4 -left-20 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[32rem] h-[32rem] rounded-full bg-primary-glow/15 blur-[140px] animate-glow-pulse" style={{ animationDelay: "2s" }} />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Elite Software Engineering
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[0.95] font-medium mb-8 animate-fade-in-up">
            We Build{" "}
            <span className="text-gradient-gold italic relative inline-block">
              Digital
              <span className="absolute -inset-x-4 -inset-y-2 bg-gradient-gold/10 blur-2xl -z-10" />
            </span>
            <br />
            <span className="text-gradient-gold">Empires</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            From whisper of an idea to global launch — NEXORA engineers
            mobile apps, web platforms, and bespoke systems for visionaries
            who refuse the ordinary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04]"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-medium text-foreground hover:text-primary-glow transition-all gold-border-glow"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;