import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

const fieldClass =
  "w-full rounded-xl bg-input/60 border border-border/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all";

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", budget: "", timeline: "", description: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Please review the form", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast({ title: "Request received", description: "Our team will reach out within 24 hours." });
    setForm({ name: "", email: "", projectType: "", budget: "", timeline: "", description: "" });
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">— Contact</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              Begin your
              <span className="text-gradient-gold italic"> ascent.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Share the outline of your vision. We respond personally within 24 hours
              with a tailored direction for your project.
            </p>

            <ul className="space-y-5">
              {[
                { icon: Mail, label: "studio@nexora.dev" },
                { icon: Phone, label: "+1 (415) 555-0102" },
                { icon: MapPin, label: "Remote · NYC · Dubai" },
              ].map((c) => (
                <li key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                    <c.icon className="w-4 h-4 text-primary-glow" />
                  </div>
                  <span className="text-foreground/90">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="glass-strong rounded-3xl p-8 md:p-10 gold-border-glow shadow-elegant"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Name</label>
                  <input className={fieldClass} value={form.name} onChange={set("name")} maxLength={100} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Email</label>
                  <input type="email" className={fieldClass} value={form.email} onChange={set("email")} maxLength={255} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Project Type</label>
                  <select className={fieldClass} value={form.projectType} onChange={set("projectType")}>
                    <option value="">Select…</option>
                    <option>Mobile App</option>
                    <option>Web Platform</option>
                    <option>Custom System / Dashboard</option>
                    <option>Full-Cycle Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Budget Range</label>
                  <select className={fieldClass} value={form.budget} onChange={set("budget")}>
                    <option value="">Select…</option>
                    <option>Under $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k – $150k</option>
                    <option>$150k+</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Timeline</label>
                  <select className={fieldClass} value={form.timeline} onChange={set("timeline")}>
                    <option value="">Select…</option>
                    <option>ASAP (under 1 month)</option>
                    <option>1 – 3 months</option>
                    <option>3 – 6 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Description</label>
                  <textarea
                    rows={5}
                    className={fieldClass}
                    value={form.description}
                    onChange={set("description")}
                    maxLength={2000}
                    placeholder="Tell us about your vision, goals, and any constraints…"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 group inline-flex items-center gap-3 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-wait"
              >
                {submitting ? "Sending…" : "Submit Request"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;