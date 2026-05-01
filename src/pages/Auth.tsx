import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

type Mode = "sign-in" | "sign-up";

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Minimum 8 characters").max(72),
});

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill the page title and meta description for /auth.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Studio access — Capsorix";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin";

  if (!loading && user) return <Navigate to={redirectTo} replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) {
      toast({
        title: "Check your details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({
          title: "Account created",
          description: "You can sign in now. Ask the project owner for admin access.",
        });
        setMode("sign-in");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        navigate(redirectTo, { replace: true });
      }
    } catch (err: any) {
      toast({
        title: mode === "sign-up" ? "Couldn’t create account" : "Couldn’t sign in",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Ambient gold wash — single, restrained source */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-[180px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.04),transparent_60%)] pointer-events-none"
      />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="block text-center text-[11px] tracking-[0.4em] uppercase text-muted-foreground hover:text-primary-glow transition-colors mb-8"
        >
          ← Capsorix
        </Link>

        <div className="glass-strong rounded-3xl p-8 md:p-10 gold-border-glow gold-ring shadow-elegant relative overflow-hidden">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

          <div className="text-center mb-8">
            <div className="mx-auto mb-5 w-12 h-12 rounded-full bg-gradient-gold-soft border border-primary/50 gold-ring flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-primary mb-3">
              Studio access
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-medium leading-[1.1]">
              {mode === "sign-in" ? (
                <>
                  Welcome <span className="text-gradient-gold italic">back.</span>
                </>
              ) : (
                <>
                  Create your <span className="text-gradient-gold italic">account.</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {mode === "sign-in"
                ? "Sign in to review submitted project requests."
                : "Reserved for Capsorix studio members."}
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-input/60 border border-border/60 pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="you@studio.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-input/60 border border-border/60 pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Minimum 8 characters"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-primary-foreground font-medium px-6 py-3.5 text-sm gold-ring hover:opacity-95 transition-all duration-300 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === "sign-in" ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
            {mode === "sign-in" ? (
              <>
                Need an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("sign-up")}
                  className="text-foreground hover:text-primary-glow transition-colors"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("sign-in")}
                  className="text-foreground hover:text-primary-glow transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-sm mx-auto leading-relaxed">
          Restricted area. Access is granted only to Capsorix studio members and is monitored.
        </p>
      </div>
    </div>
  );
};

export default Auth;
