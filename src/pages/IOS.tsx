import { Link } from "react-router-dom";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileCode2,
  Folder,
  Gauge,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import SwiftEditor from "@/components/nexora/SwiftEditor";
import CodeRain from "@/components/nexora/CodeRain";
import Reveal from "@/components/nexora/Reveal";
import { useParallax } from "@/hooks/use-reveal";

const navigator = [
  { icon: Folder, label: "Nexora", muted: false },
  { icon: Folder, label: "Sources", muted: true, indent: 1 },
  { icon: FileCode2, label: "DigitalProduct.swift", active: true, indent: 2 },
  { icon: FileCode2, label: "AppStore.swift", indent: 2 },
  { icon: FileCode2, label: "Quality.swift", indent: 2 },
  { icon: Folder, label: "Resources", muted: true, indent: 1 },
  { icon: FileCode2, label: "Assets.xcassets", indent: 2 },
  { icon: FileCode2, label: "Info.plist", indent: 2 },
];

const inspector = [
  { label: "Target", value: "iOS 17.0+" },
  { label: "Language", value: "Swift 5.10" },
  { label: "UI Framework", value: "SwiftUI" },
  { label: "Architecture", value: "TCA / MVVM" },
  { label: "Tests", value: "98% coverage" },
  { label: "Status", value: "Production" },
];

const capabilities = [
  {
    icon: Cpu,
    title: "Native Performance",
    desc: "Hand-tuned Swift, Metal-aware rendering, sub-16ms interactions across every device class.",
  },
  {
    icon: Layers,
    title: "SwiftUI · UIKit",
    desc: "Composable architectures, state-driven UIs, and seamless interop where it matters.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First",
    desc: "App Tracking Transparency, Keychain, on-device intelligence, and audited data flows.",
  },
  {
    icon: Gauge,
    title: "Polished UX",
    desc: "Frame-perfect animations, haptics, dynamic type, and Human Interface obsession.",
  },
  {
    icon: Zap,
    title: "Apple Ecosystem",
    desc: "Widgets, Live Activities, App Intents, watchOS, visionOS — natively integrated.",
  },
  {
    icon: CheckCircle2,
    title: "App Store Ready",
    desc: "Submission, review-readiness, and post-launch optimization handled end-to-end.",
  },
];

const IOS = () => {
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="tracking-[0.2em] uppercase text-[11px]">Nexora</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            <Apple className="w-3.5 h-3.5 text-primary-glow" />
            iOS Atelier
          </div>
          <a
            href="/#contact"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gold-animated px-5 py-2 text-xs font-semibold text-primary-foreground shadow-gold gold-ring"
          >
            Start a Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <CodeRain density={6} parallaxSpeed={0.08} />
        <div ref={heroParallax} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-[160px] will-parallax" />

        <div className="container relative">
          <Reveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Apple className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">
                iOS Development
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-medium leading-[0.95] tracking-tight">
              Engineered in
              <span className="text-gradient-gold italic"> Swift.</span>
              <br />
              <span className="text-gradient-gold">Crafted for Apple.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Native iOS apps built the way Apple intended — with discipline,
              taste, and an obsession for the smallest details. From first
              prototype to App Store launch.
            </p>
          </Reveal>

          {/* Xcode-style IDE workspace */}
          <Reveal delay={200} className="mt-20">
            <div className="relative rounded-3xl glass-strong gold-border-glow shadow-elegant overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-[hsl(222_45%_5%/0.7)]">
                <span className="w-3 h-3 rounded-full bg-[hsl(0_60%_55%)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(45_85%_60%)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(140_50%_55%)]" />
                <div className="mx-auto flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-mono">Nexora</span>
                  <span className="text-muted-foreground/40">—</span>
                  <span className="font-mono">iPhone 15 Pro</span>
                  <span className="text-muted-foreground/40">—</span>
                  <span className="font-mono text-[hsl(140_50%_60%)]">Build Succeeded</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground/60">
                  <Search className="w-3 h-3" />
                  <span>⌘K</span>
                </div>
              </div>

              <div className="grid grid-cols-12 min-h-[460px]">
                {/* Navigator */}
                <aside className="hidden md:block col-span-3 lg:col-span-2 border-r border-border/40 p-3 bg-[hsl(222_45%_5%/0.4)]">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 px-2 mb-3">
                    Project Navigator
                  </p>
                  <ul className="space-y-1 text-[12px] font-mono">
                    {navigator.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
                          item.active
                            ? "bg-primary/15 text-foreground"
                            : "text-muted-foreground hover:text-foreground/80"
                        }`}
                        style={{ paddingLeft: `${(item.indent ?? 0) * 10 + 8}px` }}
                      >
                        <item.icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            item.active ? "text-primary-glow" : "text-muted-foreground/60"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* Editor */}
                <div className="col-span-12 md:col-span-9 lg:col-span-7 p-5 bg-[hsl(222_45%_5%/0.25)]">
                  <SwiftEditor className="!shadow-none" />
                </div>

                {/* Inspector */}
                <aside className="hidden lg:block col-span-3 border-l border-border/40 p-4 bg-[hsl(222_45%_5%/0.4)]">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-4">
                    Inspector
                  </p>
                  <dl className="space-y-3">
                    {inspector.map((row) => (
                      <div key={row.label} className="flex flex-col gap-0.5">
                        <dt className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">
                          {row.label}
                        </dt>
                        <dd className="text-[12px] font-mono text-foreground/90">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 pt-4 border-t border-border/30">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 mb-2">
                      Console
                    </p>
                    <div className="font-mono text-[11px] space-y-1">
                      <div className="text-[hsl(140_50%_60%)]">▸ Compile DigitalProduct.swift</div>
                      <div className="text-muted-foreground/70">▸ Linking Nexora</div>
                      <div className="text-[hsl(45_85%_65%)]">▸ Validating archive…</div>
                      <div className="text-foreground/80">▸ Ready for submission ✓</div>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border/40 bg-[hsl(222_45%_5%/0.7)] text-[10px] font-mono text-muted-foreground">
                <span>main · Swift 5.10 · iOS 17.0</span>
                <span className="flex items-center gap-3">
                  <span>0 errors</span>
                  <span>0 warnings</span>
                  <span className="text-[hsl(140_50%_60%)]">● indexed</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-32">
        <div className="container">
          <Reveal className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-5">— Capabilities</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05]">
              Every detail, deliberate.
              <span className="text-gradient-gold italic"> Every frame, earned.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 100}
                className="group relative rounded-2xl glass p-8 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 mb-5 group-hover:scale-110 group-hover:shadow-gold transition-all duration-700">
                  <c.icon className="w-5 h-5 text-primary-glow" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-14">
            <Sparkles className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h3 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              This is not a team.
              <br />
              <span className="text-gradient-gold italic">This is elite engineering.</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              If your iOS product deserves the same care Apple puts into the platform,
              start the conversation. Senior reply within 24–48 hours.
            </p>
            <a
              href="/#contact"
              className="btn-shimmer inline-flex items-center gap-3 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              Request Private Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default IOS;