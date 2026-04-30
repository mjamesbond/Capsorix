import {
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
  Apple,
} from "lucide-react";
import SwiftEditor from "@/components/nexora/SwiftEditor";
import CodeRain from "@/components/nexora/CodeRain";
import Reveal from "@/components/nexora/Reveal";
import SubpageShell from "@/components/nexora/SubpageShell";
import { useParallax } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/I18nProvider";

const navigator = [
  { icon: Folder, label: "Capsorix", muted: false },
  { icon: Folder, label: "Sources", muted: true, indent: 1 },
  { icon: FileCode2, label: "DigitalProduct.swift", active: true, indent: 2 },
  { icon: FileCode2, label: "AppStore.swift", indent: 2 },
  { icon: FileCode2, label: "Quality.swift", indent: 2 },
  { icon: Folder, label: "Resources", muted: true, indent: 1 },
  { icon: FileCode2, label: "Assets.xcassets", indent: 2 },
  { icon: FileCode2, label: "Info.plist", indent: 2 },
];

// Inspector keys are kept in English deliberately — these mirror real Xcode
// labels and stay readable across all three languages.
const inspector = [
  { label: "Target", value: "iOS 17.0+" },
  { label: "Language", value: "Swift 5.10" },
  { label: "UI Framework", value: "SwiftUI" },
  { label: "Architecture", value: "TCA / MVVM" },
  { label: "Tests", value: "98% coverage" },
  { label: "Status", value: "Production" },
];

const CAPABILITY_ICONS = [Cpu, Layers, ShieldCheck, Gauge, Zap, CheckCircle2] as const;

const IOS = () => {
  const heroParallax = useParallax<HTMLDivElement>(0.1);
  const { t, dir } = useI18n();
  const s = t.subpages.ios;
  const common = t.subpages.common;
  const capabilities = s.capabilities.map((c, i) => ({ ...c, icon: CAPABILITY_ICONS[i] }));

  return (
    <SubpageShell>
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70"
          dir={dir}
        >
          <Apple className="w-3 h-3 text-primary-glow" />
          {s.eyebrow}
        </div>
        <CodeRain density={6} parallaxSpeed={0.08} />
        <div ref={heroParallax} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-[160px] will-parallax" />

        <div className="container relative">
          <Reveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 mb-8 gold-ring">
              <Apple className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/80">
                {s.chip}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-medium leading-[0.95] tracking-tight">
              {s.titleA}
              <span className="text-gradient-gold italic">{s.titleSwift}</span>
              <br />
              <span className="text-gradient-gold">{s.titleB}</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {s.lead}
            </p>
          </Reveal>

          {/* Xcode-style IDE workspace — chrome stays in English (real tool labels) */}
          <Reveal delay={200} className="mt-20">
            <div className="relative rounded-3xl glass-strong gold-border-glow shadow-elegant overflow-hidden" dir="ltr">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-[hsl(222_45%_5%/0.7)]">
                <span className="w-3 h-3 rounded-full bg-[hsl(0_60%_55%)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(45_85%_60%)]" />
                <span className="w-3 h-3 rounded-full bg-[hsl(140_50%_55%)]" />
                <div className="mx-auto flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-mono">Capsorix</span>
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
                    {s.navigatorLabel}
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
                    {s.inspectorLabel}
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
                      {s.consoleLabel}
                    </p>
                    <div className="font-mono text-[11px] space-y-1">
                      <div className="text-[hsl(140_50%_60%)]">▸ Compile DigitalProduct.swift</div>
                      <div className="text-muted-foreground/70">▸ Linking Capsorix</div>
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
      <section className="relative section">
        <div className="container">
          <Reveal className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-5">{common.capabilitiesKicker}</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05]">
              {s.capabilitiesTitleA}
              <span className="text-gradient-gold italic">{s.capabilitiesTitleB}</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 100}
                className="group relative rounded-2xl glass p-8 gold-border-glow gold-ring transition-all duration-700 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold-soft flex items-center justify-center border border-primary/30 mb-5 icon-tile">
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
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_70%_45%/0.12),transparent_70%)]" />
        <div className="container relative">
          <Reveal className="max-w-3xl mx-auto text-center rounded-3xl glass-strong gold-border-glow gold-ring p-14">
            <Sparkles className="w-6 h-6 text-primary-glow mx-auto mb-6" />
            <h3 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5">
              {s.ctaTitleA}
              <br />
              <span className="text-gradient-gold italic">{s.ctaTitleB}</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {s.ctaLead} {common.replyNote}
            </p>
            <a
              href="/#contact"
              className="btn-shimmer inline-flex items-center gap-3 rounded-full bg-gold-animated px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.04] gold-ring"
            >
              {common.consultCta}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
};

export default IOS;
