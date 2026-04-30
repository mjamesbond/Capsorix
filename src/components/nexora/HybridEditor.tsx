import { useEffect, useRef, useState } from "react";

/**
 * Hybrid editor: a single panel showing two stacked editors —
 * Frontend (HTML/CSS/JS) and Backend (Node.js). Each types its own
 * symbolic snippet, with hover tooltips revealing the meaning of
 * every key token.
 */

type Token = {
  t: string;
  c: string;
  /** Hover meaning — shown as a soft tooltip on hover. */
  m?: string;
};

const C = {
  kw: "text-[hsl(335_75%_72%)]",
  fn: "text-[hsl(200_85%_72%)]",
  str: "text-[hsl(95_55%_70%)]",
  num: "text-[hsl(28_85%_70%)]",
  cmt: "text-[hsl(220_15%_45%)] italic",
  prop: "text-[hsl(45_85%_68%)]",
  var: "text-[hsl(40_15%_88%)]",
  pun: "text-[hsl(40_8%_55%)]",
  type: "text-[hsl(265_70%_75%)]",
};

const FRONTEND: Token[][] = [
  [{ t: "// Frontend — beauty, engineered.", c: C.cmt }],
  [
    { t: "const ", c: C.kw, m: "Immutable binding — predictable state." },
    { t: "experience", c: C.var, m: "The brand moment your visitor remembers." },
    { t: " = ", c: C.pun },
    { t: "createUI", c: C.fn, m: "Composes design tokens into a living interface." },
    { t: "({", c: C.pun },
  ],
  [
    { t: "  design: ", c: C.prop, m: "Visual system, typography, motion." },
    { t: '"premium"', c: C.str, m: "No templates. No compromises." },
    { t: ",", c: C.pun },
  ],
  [
    { t: "  interaction: ", c: C.prop, m: "How the interface responds to intent." },
    { t: '"smooth"', c: C.str, m: "60fps, 16ms frames, frame-perfect." },
    { t: ",", c: C.pun },
  ],
  [{ t: "});", c: C.pun }],
  [
    { t: "experience", c: C.var },
    { t: ".", c: C.pun },
    { t: "render", c: C.fn, m: "Mounts the experience into the DOM." },
    { t: "(", c: C.pun },
    { t: "document", c: C.var, m: "The canvas of the web." },
    { t: ".", c: C.pun },
    { t: "body", c: C.var },
    { t: ");", c: C.pun },
  ],
];

const BACKEND: Token[][] = [
  [{ t: "// Backend — logic that ships.", c: C.cmt }],
  [
    { t: "app", c: C.var, m: "Express server — the studio's runtime." },
    { t: ".", c: C.pun },
    { t: "post", c: C.fn, m: "Listens for client vision." },
    { t: "(", c: C.pun },
    { t: "'/build'", c: C.str, m: "Endpoint that turns intent into product." },
    { t: ", (", c: C.pun },
    { t: "req", c: C.var, m: "What the client wants." },
    { t: ", ", c: C.pun },
    { t: "res", c: C.var, m: "What we promise back." },
    { t: ") => {", c: C.pun },
  ],
  [
    { t: "  processClientVision", c: C.fn, m: "Strategy → architecture → execution." },
    { t: "(", c: C.pun },
    { t: "req", c: C.var },
    { t: ".", c: C.pun },
    { t: "body", c: C.prop, m: "The brief, validated and parsed." },
    { t: ");", c: C.pun },
  ],
  [
    { t: "  res", c: C.var },
    { t: ".", c: C.pun },
    { t: "send", c: C.fn, m: "Confirmation, not just a response." },
    { t: "(", c: C.pun },
    { t: '"Deployed Successfully"', c: C.str, m: "Shipped. Live. Done." },
    { t: ");", c: C.pun },
  ],
  [{ t: "});", c: C.pun }],
  [
    { t: "app", c: C.var },
    { t: ".", c: C.pun },
    { t: "listen", c: C.fn, m: "Always on. Always ready." },
    { t: "(", c: C.pun },
    { t: "443", c: C.num, m: "HTTPS — secure by default." },
    { t: ");", c: C.pun },
  ],
];

const totalChars = (line: Token[]) => line.reduce((n, tok) => n + tok.t.length, 0);

const renderLine = (line: Token[], typed: number, withMeaning: boolean) => {
  let remaining = typed;
  return line.map((tok, i) => {
    if (remaining <= 0) return null;
    const slice = tok.t.slice(0, remaining);
    const fullyTyped = remaining >= tok.t.length;
    remaining -= tok.t.length;
    const interactive = withMeaning && fullyTyped && !!tok.m;
    return (
      <span
        key={i}
        className={`${tok.c} ${interactive ? "relative cursor-help group/tok rounded-sm hover:bg-primary/10 transition-colors" : ""}`}
      >
        {slice}
        {interactive && (
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 whitespace-nowrap rounded-md glass-strong gold-border-glow px-3 py-1.5 text-[11px] font-sans not-italic text-foreground/90 opacity-0 -translate-y-1 group-hover/tok:opacity-100 group-hover/tok:translate-y-0 transition-all duration-300 shadow-elegant"
          >
            {tok.m}
          </span>
        )}
      </span>
    );
  });
};

interface PaneProps {
  title: string;
  badge: string;
  accent: string;
  filename: string;
  lines: Token[][];
  speed?: number;
}

const Pane = ({ title, badge, accent, filename, lines, speed = 28 }: PaneProps) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [committed, setCommitted] = useState<number[]>([]);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const current = lines[lineIdx];
    const max = totalChars(current);
    if (charCount < max) {
      tickRef.current = window.setTimeout(() => setCharCount((c) => c + 1), speed);
    } else {
      tickRef.current = window.setTimeout(() => {
        setCommitted((arr) => {
          const next = [...arr, lineIdx];
          return next.length > 6 ? next.slice(next.length - 6) : next;
        });
        setCharCount(0);
        setLineIdx((i) => (i + 1) % lines.length);
      }, 800);
    }
    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [charCount, lineIdx, speed, lines]);

  const totalLines = committed.length + 1;

  return (
    <div className="relative overflow-visible rounded-2xl glass-strong gold-border-glow shadow-elegant">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-[hsl(222_45%_5%/0.7)]">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <span className="font-mono text-[11px] text-foreground/90">{filename}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase" style={{ color: accent }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          {badge}
        </span>
      </div>

      <div className="relative px-5 py-5 font-mono text-[13px] leading-[1.85] min-h-[280px] bg-[hsl(222_45%_5%/0.4)] overflow-visible">
        <div className="absolute left-3 top-5 bottom-5 flex flex-col text-[11px] text-muted-foreground/40 select-none pointer-events-none tabular-nums">
          {Array.from({ length: totalLines }).map((_, i) => (
            <span key={i} className="leading-[1.85]">
              {i + 1}
            </span>
          ))}
        </div>

        <div className="pl-10">
          <p className="absolute right-5 top-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
            {title}
          </p>
          {committed.map((idx, k) => (
            <div key={`c-${k}-${idx}`} className="opacity-55">
              {renderLine(lines[idx], totalChars(lines[idx]), true)}
            </div>
          ))}
          <div
            className="relative -mx-3 px-3 rounded"
            style={{
              background: `linear-gradient(90deg, ${accent}14, ${accent}06 60%, transparent)`,
              boxShadow: `inset 2px 0 0 ${accent}aa`,
            }}
          >
            {renderLine(lines[lineIdx], charCount, true)}
            <span
              className="inline-block align-middle ml-0.5 w-[2px] h-[16px] -mb-[3px]"
              style={{
                background: accent,
                animation: "caret-blink 1s steps(1) infinite",
                boxShadow: `0 0 10px ${accent}, 0 0 24px ${accent}88`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HybridEditor = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Pane
        title="Frontend"
        badge="Live Reload"
        accent="hsl(200 85% 65%)"
        filename="experience.tsx"
        lines={FRONTEND}
      />
      <Pane
        title="Backend"
        badge="Listening :443"
        accent="hsl(95 55% 60%)"
        filename="server.js"
        lines={BACKEND}
        speed={26}
      />
    </div>
  );
};

export default HybridEditor;