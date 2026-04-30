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
    <section id="industries" className="relative py-40">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">— Industries</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              Trusted across
              <span className="text-gradient-gold italic"> every vertical.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you serve plates or scale platforms, we shape technology
              that fits your craft — discreet, powerful, unmistakably premium.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind, i) => (
                <Reveal
                  key={ind.label}
                  delay={i * 70}
                  className="group aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-3 p-4 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1.5 hover:bg-gradient-gold-soft"
                >
                  <ind.icon
                    className="w-8 h-8 text-primary-glow group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-700"
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