import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Mail, MapPin, Phone, Clock, ShieldCheck, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Reveal from "./Reveal";

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
    toast({
      title: "Request received",
      description: "A senior partner will be in touch within 24–48 hours.",
    });
    setForm({ name: "", email: "", projectType: "", budget: "", timeline: "", description: "" });
  };

  return (
    <section id="contact" className="relative py-40 scroll-mt-24">
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">— Start Your Project</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              Begin your
              <span className="text-gradient-gold italic"> ascent.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Share the outline of your vision. A senior partner will respond
              personally within <span className="text-foreground font-medium">24–48 hours</span> with a
              tailored direction for your project — no obligation.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Custom solutions, never templated",
                "Senior team — no juniors on your project",
                "Confidential by default · NDA on request",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-gold shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            <ul className="space-y-4 pt-8 border-t border-border/40">
              {[
                { icon: Mail, label: "studio@nexora.dev" },
                { icon: Phone, label: "+1 (415) 555-0102" },
                { icon: MapPin, label: "Remote · NYC · Dubai" },
              ].map((c) => (
                <li key={c.label} className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <c.icon className="w-4 h-4 text-primary-glow" />
                  </div>
                  <span className="text-sm text-foreground/90 group-hover:text-primary-glow transition-colors">{c.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={150}>
            <form
              onSubmit={onSubmit}
              className="glass-strong rounded-3xl p-8 md:p-12 gold-border-glow gold-ring shadow-elegant relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

              <div className="relative mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-1">Project Brief</p>
                  <p className="text-sm text-muted-foreground">Takes about 60 seconds.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary-glow" /> 24–48h reply
                </span>
              </div>

              <div className="relative grid sm:grid-cols-2 gap-5">
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
                    <option>Mobile App (iOS / Android)</option>
                    <option>Website / Web Platform</option>
                    <option>Custom System / Dashboard</option>
                    <option>Full-Cycle Product (Idea → Launch)</option>
                    <option>UI/UX Design & Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Budget</label>
                  <select className={fieldClass} value={form.budget} onChange={set("budget")}>
                    <option value="">Select…</option>
                    <option>Under $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k – $150k</option>
                    <option>$150k+</option>
                    <option>Not sure yet</option>
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
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Tell us about your project</label>
                  <textarea
                    rows={5}
                    className={fieldClass}
                    value={form.description}
                    onChange={set("description")}
                    maxLength={2000}
                    placeholder="What are you building, who is it for, and what does success look like?"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-shimmer mt-10 group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full bg-gold-animated px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-wait gold-ring"
              >
                <span className="relative z-10">{submitting ? "Sending…" : "Request Private Consultation"}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary-glow" /> Reviewed by a senior partner</span>
                <span className="inline-flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-primary-glow" /> Confidential · NDA available</span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
