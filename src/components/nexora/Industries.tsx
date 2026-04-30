import { Utensils, Building2, Sparkles, Factory, Coffee, ShoppingBag, Stethoscope, Plane } from "lucide-react";
import Reveal from "./Reveal";

const industries = [
  { icon: Utensils, label: "Restaurants" },
  { icon: Building2, label: "Companies" },
  { icon: Sparkles, label: "Startups" },
  { icon: Factory, label: "Factories" },
  { icon: Coffee, label: "Cafés" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Plane, label: "Travel" },
];

const Industries = () => {
  return (
    <section id="industries" className="relative section section-fade">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">— Where we work</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              Different industries.
              <span className="text-gradient-gold italic"> Same standard.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The surface changes. The method doesn’t. We adapt to the field
              without lowering the bar — and we only take on what we can do well.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind, i) => (
                <Reveal
                  key={ind.label}
                  delay={i * 100}
                  className="group aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-3 p-4 gold-border-glow lift glow-soft"
                >
                  <ind.icon
                    className="w-8 h-8 text-primary-glow icon-tile"
                    strokeWidth={1.3}
                  />
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-primary-glow transition-colors">
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