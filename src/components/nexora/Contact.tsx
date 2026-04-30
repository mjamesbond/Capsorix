import { useState, useMemo } from "react";
import { z } from "zod";
import {
  ArrowRight, Mail, MapPin, Phone, Clock, ShieldCheck, Lock, CheckCircle2, Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";
import { useI18n } from "@/i18n/I18nProvider";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
};

const EMPTY: FormState = {
  full_name: "", email: "", phone: "",
  project_type: "", budget_range: "", timeline: "", description: "",
};

const fieldClass =
  "w-full rounded-xl bg-input/60 border border-border/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300";
const errorFieldClass = "border-destructive/70 focus:border-destructive focus:ring-destructive/20";
const labelClass = "block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2";

const Field = ({
  label, error, children, span = false,
}: {
  label: string; error?: string; children: React.ReactNode; span?: boolean;
}) => (
  <div className={span ? "sm:col-span-2" : ""}>
    <label className={labelClass}>{label}</label>
    {children}
    {error && (
      <p className="mt-2 text-xs text-destructive flex items-center gap-1.5 animate-fade-in">
        <span className="w-1 h-1 rounded-full bg-destructive" />
        {error}
      </p>
    )}
  </div>
);

const Contact = () => {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Build a localized schema each render — cheap and keeps messages in sync.
  const schema = useMemo(() => z.object({
    full_name: z.string().trim().min(2, t.contact.validation.full_name).max(100),
    email: z.string().trim().email(t.contact.validation.email).max(255),
    phone: z.string().trim().max(40, t.contact.validation.phone).optional().or(z.literal("")),
    project_type: z.string().min(1, t.contact.validation.project_type),
    budget_range: z.string().min(1, t.contact.validation.budget_range),
    timeline: z.string().min(1, t.contact.validation.timeline),
    description: z.string().trim().min(10, t.contact.validation.description_min).max(2000, t.contact.validation.description_max),
  }), [t]);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const validateField = (k: keyof FormState) => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === k);
      setErrors((prev) => ({ ...prev, [k]: issue?.message }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      toast({ title: t.contact.toastErrTitle, description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("project_requests").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      project_type: parsed.data.project_type,
      budget_range: parsed.data.budget_range,
      timeline: parsed.data.timeline,
      description: parsed.data.description,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: t.contact.toastSendErr, description: t.contact.toastSendErrDesc, variant: "destructive" });
      return;
    }

    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
  };

  const resetForm = () => setSubmitted(false);

  return (
    <section id="contact" className="relative section scroll-mt-24" data-lang={lang}>
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-5">{t.contact.kicker}</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-6">
              {t.contact.titleA}
              <span className="text-gradient-gold italic">{t.contact.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.contact.lead}
              <span className="text-foreground font-medium">{t.contact.leadStrong}</span>
              {t.contact.leadTail}
            </p>

            <ul className="space-y-3 mb-10">
              {t.contact.bullets.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-gold shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            <ul className="space-y-4 pt-8 border-t border-border/40">
              {[
                { icon: Mail, label: "studio@capsorix.dev" },
                { icon: Phone, label: "+1 (415) 555-0102" },
              ].map((c) => (
                <li key={c.label} className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center icon-tile">
                    <c.icon className="w-4 h-4 text-primary-glow" />
                  </div>
                  <span className="text-sm text-foreground/90 group-hover:text-primary-glow transition-colors" dir="ltr">
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={150}>
            <div className="relative">
              {submitted ? (
                <div className="glass-strong rounded-3xl p-10 md:p-14 gold-border-glow gold-ring shadow-elegant relative overflow-hidden text-center animate-scale-in">
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />
                  <div className="relative">
                    <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-gold-soft border border-primary/40 flex items-center justify-center gold-ring">
                      <CheckCircle2 className="w-9 h-9 text-primary-glow" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-medium tracking-[0.35em] uppercase text-primary mb-4">{t.contact.success.kicker}</p>
                    <h3 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
                      {t.contact.success.titleA}
                      <span className="text-gradient-gold italic">{t.contact.success.titleB}</span>
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
                      {t.contact.success.body}
                      <span className="text-foreground font-medium">{t.contact.success.bodyStrong}</span>
                      {t.contact.success.bodyTail}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground mb-10">
                      <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip1}</span>
                      <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip2}</span>
                      <span className="inline-flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip3}</span>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-sm font-medium text-muted-foreground hover:text-primary-glow transition-colors"
                    >
                      {t.contact.success.again}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="glass-strong rounded-3xl p-8 md:p-12 gold-border-glow gold-ring shadow-elegant relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                  <div className="relative mb-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-1">{t.contact.formKicker}</p>
                      <p className="text-sm text-muted-foreground">{t.contact.formSub}</p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.replyChip}
                    </span>
                  </div>

                  <div className="relative grid sm:grid-cols-2 gap-5">
                    <Field label={t.contact.labels.full_name} error={errors.full_name}>
                      <input
                        className={`${fieldClass} ${errors.full_name ? errorFieldClass : ""}`}
                        value={form.full_name} onChange={set("full_name")} onBlur={() => validateField("full_name")}
                        maxLength={100} autoComplete="name" placeholder={t.contact.placeholders.full_name}
                      />
                    </Field>
                    <Field label={t.contact.labels.email} error={errors.email}>
                      <input
                        type="email" dir="ltr"
                        className={`${fieldClass} ${errors.email ? errorFieldClass : ""}`}
                        value={form.email} onChange={set("email")} onBlur={() => validateField("email")}
                        maxLength={255} autoComplete="email" placeholder={t.contact.placeholders.email}
                      />
                    </Field>

                    <Field label={t.contact.labels.phone} error={errors.phone} span>
                      <input
                        dir="ltr"
                        className={`${fieldClass} ${errors.phone ? errorFieldClass : ""}`}
                        value={form.phone} onChange={set("phone")} onBlur={() => validateField("phone")}
                        maxLength={40} autoComplete="tel" placeholder={t.contact.placeholders.phone}
                      />
                    </Field>

                    <Field label={t.contact.labels.project_type} error={errors.project_type}>
                      <select
                        className={`${fieldClass} ${errors.project_type ? errorFieldClass : ""}`}
                        value={form.project_type} onChange={set("project_type")} onBlur={() => validateField("project_type")}
                      >
                        <option value="">{t.contact.placeholders.select}</option>
                        {t.contact.projectTypes.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </Field>
                    <Field label={t.contact.labels.budget_range} error={errors.budget_range}>
                      <select
                        className={`${fieldClass} ${errors.budget_range ? errorFieldClass : ""}`}
                        value={form.budget_range} onChange={set("budget_range")} onBlur={() => validateField("budget_range")}
                      >
                        <option value="">{t.contact.placeholders.select}</option>
                        {t.contact.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </Field>

                    <Field label={t.contact.labels.timeline} error={errors.timeline} span>
                      <select
                        className={`${fieldClass} ${errors.timeline ? errorFieldClass : ""}`}
                        value={form.timeline} onChange={set("timeline")} onBlur={() => validateField("timeline")}
                      >
                        <option value="">{t.contact.placeholders.select}</option>
                        {t.contact.timelines.map((tl) => <option key={tl} value={tl}>{tl}</option>)}
                      </select>
                    </Field>

                    <Field label={t.contact.labels.description} error={errors.description} span>
                      <textarea
                        rows={5}
                        className={`${fieldClass} resize-none ${errors.description ? errorFieldClass : ""}`}
                        value={form.description} onChange={set("description")} onBlur={() => validateField("description")}
                        maxLength={2000} placeholder={t.contact.placeholders.description}
                      />
                      <p className="mt-2 text-[11px] text-muted-foreground/70 text-right" dir="ltr">
                        {form.description.length}/2000
                      </p>
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-shimmer mt-8 group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full bg-gold-animated px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100 gold-ring"
                  >
                    <span className="relative z-10 inline-flex items-center gap-3">
                      {submitting ? (<><Send className="w-4 h-4 animate-pulse" />{t.contact.submitting}</>)
                                  : (<>{t.contact.submit}<ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" /></>)}
                    </span>
                  </button>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary-glow" />{t.contact.reviewed}</span>
                    <span className="inline-flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-primary-glow" />{t.contact.confidential}</span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
