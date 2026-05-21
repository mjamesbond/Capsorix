import { useState, useMemo, useEffect, useRef } from "react";
import { z } from "zod";
import {
  ArrowRight, Mail, Clock, ShieldCheck, Lock, CheckCircle2, Send, Sparkles, Save, X, Copy, Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  company_url: string;
};

const EMPTY: FormState = {
  full_name: "", email: "", phone: "",
  project_type: "", budget_range: "", timeline: "", description: "", company_url: "",
};

const DRAFT_KEY = "capsorix-contact-draft";
const DRAFT_DEBOUNCE = 600;

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
  // Captured at the moment of submission so the confirmation screen can
  // greet the client by name and display a stable reference even after
  // the form state is reset.
  const [submittedMeta, setSubmittedMeta] = useState<{ name: string; ref: string; at: Date; data: FormState } | null>(null);
  const [copied, setCopied] = useState(false);
  // Autosave state — `restored` shows a quiet pill above the form for a
  // few seconds after a draft is brought back, and `savedAt` powers the
  // tiny "saved locally" footer hint.
  const [restored, setRestored] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const debounceRef = useRef<number | null>(null);
  const hydratedRef = useRef(false);

  // Restore any previous draft on first mount. Done synchronously inside
  // an effect so the form starts blank for SSR/hydration safety.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) { hydratedRef.current = true; return; }
      const parsed = JSON.parse(raw) as Partial<FormState>;
      // Only restore if at least one meaningful field was filled — keeps
      // the banner from appearing for empty drafts saved by older sessions.
      const hasContent = Object.values(parsed).some((v) => typeof v === "string" && v.trim().length > 0);
      if (hasContent) {
        setForm({ ...EMPTY, ...parsed });
        setRestored(true);
        window.setTimeout(() => setRestored(false), 6000);
      }
    } catch {
      // Corrupt JSON — ignore and move on.
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  // Debounced persist — never saves on the very first render so the
  // restoration logic above doesn't immediately overwrite itself.
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (submitted) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const isEmpty = Object.values(form).every((v) => !v || !v.trim());
      try {
        if (isEmpty) {
          window.localStorage.removeItem(DRAFT_KEY);
          setSavedAt(null);
        } else {
          window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
          setSavedAt(Date.now());
        }
      } catch {
        /* storage quota / privacy mode — silently ignore */
      }
    }, DRAFT_DEBOUNCE);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [form, submitted]);

  const discardDraft = () => {
    setForm(EMPTY);
    setErrors({});
    setRestored(false);
    try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* noop */ }
  };

  // Build a localized schema each render — cheap and keeps messages in sync.
  const schema = useMemo(() => z.object({
    full_name: z.string().trim().min(2, t.contact.validation.full_name).max(100),
    email: z.string().trim().email(t.contact.validation.email).max(255),
    phone: z.string().trim().min(5, t.contact.validation.phone_required).max(40, t.contact.validation.phone)
      .regex(/^[+()\d\s\-./]{5,40}$/, t.contact.validation.phone_required),
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
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          ...parsed.data,
          honeypot: form.company_url,
        }),
      });
      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: t.contact.toastSendErr,
            description: "Too many attempts. Please wait a minute and try again.",
            variant: "destructive",
          });
        } else {
          toast({ title: t.contact.toastSendErr, description: t.contact.toastSendErrDesc, variant: "destructive" });
        }
        return;
      }
    } catch {
      toast({
        title: t.contact.toastSendErr,
        description: "Network issue detected. Please check your connection and try again.",
        variant: "destructive",
      });
      return;
    } finally {
      setSubmitting(false);
    }

    // Build a short, human-readable reference (e.g. CPX-7F3K-2A91) so the
    // confirmation screen feels like a real receipt rather than a toast.
    const ref =
      "CPX-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase();
    const firstName = parsed.data.full_name.trim().split(/\s+/)[0] ?? parsed.data.full_name.trim();
    setSubmittedMeta({
      name: firstName,
      ref,
      at: new Date(),
      data: {
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        project_type: parsed.data.project_type,
        budget_range: parsed.data.budget_range,
        timeline: parsed.data.timeline,
        description: parsed.data.description,
        company_url: "",
      },
    });
    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
    // Successful submission supersedes any saved draft.
    try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* noop */ }
    setSavedAt(null);
    setRestored(false);
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmittedMeta(null);
    setCopied(false);
  };

  const copyReference = async () => {
    if (!submittedMeta) return;
    try {
      await navigator.clipboard.writeText(submittedMeta.ref);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — silently ignore */
    }
  };

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
                { icon: Mail, label: "team@capsorix.tech" },
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
                <div
                  role="status"
                  aria-live="polite"
                  className="glass-strong rounded-3xl p-8 md:p-12 gold-border-glow gold-ring shadow-elegant relative overflow-hidden animate-scale-in"
                >
                  {/* Ambient gold wash — subtle, single source */}
                  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-primary/8 blur-[160px] pointer-events-none" />
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

                  <div className="relative">
                    {/* Medallion: concentric gold rings + check */}
                    <div className="mx-auto mb-8 relative w-24 h-24">
                      <span className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                      <span className="absolute inset-2 rounded-full border border-primary/30" />
                      <span className="absolute inset-0 rounded-full bg-gradient-gold-soft border border-primary/50 gold-ring flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-primary-glow" strokeWidth={1.5} />
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-primary mb-4">
                        {t.contact.success.kicker}
                      </p>
                      <h3 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] mb-4">
                        {t.contact.success.titleA}
                        <span className="text-gradient-gold italic">{t.contact.success.titleB}</span>
                      </h3>
                      {submittedMeta && (
                        <p className="text-sm text-foreground/85 mb-3">
                          {t.contact.success.greeting(submittedMeta.name)}
                        </p>
                      )}
                      <p className="text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
                        {t.contact.success.body}
                        <span className="text-foreground font-medium">{t.contact.success.bodyStrong}</span>
                        {t.contact.success.bodyTail}
                      </p>
                    </div>

                    {/* Reference receipt */}
                    {submittedMeta && (
                      <div className="mt-8 mx-auto max-w-md flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-input/40 px-4 py-3">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                            {t.contact.success.refLabel}
                          </span>
                          <span className="font-mono text-sm text-foreground tracking-wider truncate" dir="ltr">
                            {submittedMeta.ref}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="hidden sm:inline text-[11px] text-muted-foreground" dir="ltr">
                            {submittedMeta.at.toLocaleString(lang === "ar" ? "ar-EG" : lang, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                          <button
                            type="button"
                            onClick={copyReference}
                            aria-label={t.contact.success.copyRef}
                            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] text-foreground/85 hover:text-primary-glow hover:border-primary/60 transition-all duration-300 gold-ring"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-primary-glow" />
                                <span>{t.contact.success.copiedRef}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{t.contact.success.copyRef}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Brief summary — short receipt of what was submitted */}
                    {submittedMeta && (
                      <div className="mt-6 mx-auto max-w-md rounded-2xl border border-border/50 bg-input/30 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-border/40 bg-input/40">
                          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-primary/90">
                            {t.contact.success.summaryKicker}
                          </span>
                        </div>
                        <dl className="divide-y divide-border/30 text-[13px]">
                          {([
                            ["name", submittedMeta.data.full_name],
                            ["email", submittedMeta.data.email],
                            ["phone", submittedMeta.data.phone],
                            ["project_type", submittedMeta.data.project_type],
                            ["budget_range", submittedMeta.data.budget_range],
                            ["timeline", submittedMeta.data.timeline],
                            ["description", submittedMeta.data.description],
                          ] as const).map(([key, value]) => {
                            const isLtr = key === "email" || key === "phone";
                            const isLong = key === "description";
                            return (
                              <div
                                key={key}
                                className={`px-4 py-2.5 ${
                                  isLong ? "flex flex-col gap-1" : "flex items-baseline justify-between gap-4"
                                }`}
                              >
                                <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground shrink-0">
                                  {t.contact.success.summaryLabels[key]}
                                </dt>
                                <dd
                                  className={`text-foreground/90 ${
                                    isLong
                                      ? "text-[12.5px] leading-relaxed text-muted-foreground whitespace-pre-wrap break-words"
                                      : "text-right truncate max-w-[60%]"
                                  } ${lang === "ar" && !isLong ? "text-left" : ""}`}
                                  dir={isLtr ? "ltr" : undefined}
                                >
                                  {value && value.trim().length > 0
                                    ? isLong && value.length > 220
                                      ? value.slice(0, 220).trimEnd() + "…"
                                      : value
                                    : t.contact.success.summaryEmpty}
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                      </div>
                    )}


                    {/* Vertical timeline of next steps */}
                    <div className="mt-10 mx-auto max-w-md">
                      <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-primary/90 mb-5 text-center">
                        {t.contact.success.stepsKicker}
                      </p>
                      <ol className="relative space-y-5">
                        {/* Connecting rail */}
                        <span
                          aria-hidden
                          className={`absolute top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent ${
                            lang === "ar" ? "right-[11px]" : "left-[11px]"
                          }`}
                        />
                        {t.contact.success.steps.map((s, i) => (
                          <li key={s.title} className="relative flex items-start gap-4">
                            <span
                              className={`relative z-10 mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-medium ${
                                i === 0
                                  ? "bg-gradient-gold-soft border border-primary/60 text-primary-glow gold-ring"
                                  : "bg-input/70 border border-border/60 text-muted-foreground"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <div className="flex-1 pt-0.5">
                              <p className="text-sm font-medium text-foreground">{s.title}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{s.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Trust chips */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip1}</span>
                      <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip2}</span>
                      <span className="inline-flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-primary-glow" /> {t.contact.success.chip3}</span>
                    </div>

                    {/* Dual actions */}
                    <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                      <a
                        href="mailto:team@capsorix.tech"
                        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary-glow transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>
                          <span className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground/70">
                            {t.contact.success.mailLabel}
                          </span>
                          <span className="text-foreground/90 group-hover:text-primary-glow transition-colors" dir="ltr">
                            {t.contact.success.mailCta}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 gold-ring"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
                        {t.contact.success.again}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="glass-strong rounded-3xl p-8 md:p-12 gold-border-glow gold-ring shadow-elegant relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                  {/* Restored-draft pill — quiet, dismissible, auto-fades */}
                  {restored && (
                    <div
                      role="status"
                      className="relative mb-6 flex items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 animate-fade-in"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-gradient-gold-soft border border-primary/50 flex items-center justify-center gold-ring">
                          <Save className="w-3.5 h-3.5 text-primary-glow" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground">{t.autosave.restoredTitle}</p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{t.autosave.restoredDesc}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={discardDraft}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                      >
                        <X className="w-3 h-3" />
                        {t.autosave.discard}
                      </button>
                    </div>
                  )}

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
                    <input
                      type="text"
                      name="company_url"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] opacity-0 pointer-events-none"
                      value={form.company_url}
                      onChange={set("company_url")}
                    />
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
                        type="tel" dir="ltr"
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
                    {savedAt && (
                      <span className="inline-flex items-center gap-2 ms-auto opacity-70">
                        <Save className="w-3.5 h-3.5 text-primary-glow" />
                        {t.autosave.savedNote}
                      </span>
                    )}
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
