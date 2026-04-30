import { useEffect, useRef, useState } from "react";

/**
 * Premium "living code" panel — types out symbolic, intentional lines
 * with syntax highlighting and a glowing caret. Loops gracefully.
 */

type Token = { t: string; c: string };

// Tailwind classes for token colors (semantic-ish, gold-leaning palette)
const C = {
  kw: "text-[hsl(45_90%_70%)]",          // keyword — gold
  fn: "text-[hsl(200_85%_72%)]",         // function — soft cyan
  str: "text-[hsl(140_45%_70%)]",        // string — sage
  num: "text-[hsl(28_85%_70%)]",         // number — amber
  cmt: "text-[hsl(220_15%_45%)] italic", // comment — muted
  var: "text-[hsl(40_30%_88%)]",         // variable — foreground
  pun: "text-[hsl(40_15%_55%)]",         // punctuation — dim
  cls: "text-[hsl(280_55%_75%)]",        // class — soft violet
};

// Pre-tokenized symbolic lines. Meaningful, not random.
const LINES: Token[][] = [
  [
    { t: "// nexora.engine — boot sequence", c: C.cmt },
  ],
  [
    { t: "const ", c: C.kw },
    { t: "studio", c: C.var },
    { t: " = ", c: C.pun },
    { t: "new ", c: C.kw },
    { t: "Nexora", c: C.cls },
    { t: "(", c: C.pun },
    { t: "{ mode: ", c: C.pun },
    { t: "'elite'", c: C.str },
    { t: " })", c: C.pun },
    { t: ";", c: C.pun },
  ],
  [
    { t: "system", c: C.var },
    { t: ".", c: C.pun },
    { t: "build", c: C.fn },
    { t: "(", c: C.pun },
    { t: "'precision'", c: C.str },
    { t: ");", c: C.pun },
  ],
  [
    { t: "deploy", c: C.fn },
    { t: "(", c: C.pun },
    { t: "excellence", c: C.var },
    { t: ");", c: C.pun },
  ],
  [
    { t: "if ", c: C.kw },
    { t: "(", c: C.pun },
    { t: "idea", c: C.var },
    { t: ".", c: C.pun },
    { t: "isPowerful", c: C.fn },
    { t: "()) { ", c: C.pun },
    { t: "scaleGlobally", c: C.fn },
    { t: "(); }", c: C.pun },
  ],
  [
    { t: "// crafted with obsession ✦", c: C.cmt },
  ],
  [
    { t: "await ", c: C.kw },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "respondWithin", c: C.fn },
    { t: "(", c: C.pun },
    { t: "24", c: C.num },
    { t: ", ", c: C.pun },
    { t: "48", c: C.num },
    { t: ");", c: C.pun },
  ],
  [
    { t: "return ", c: C.kw },
    { t: "{ ", c: C.pun },
    { t: "quality: ", c: C.var },
    { t: "Infinity", c: C.cls },
    { t: " };", c: C.pun },
  ],
];

const totalChars = (line: Token[]) => line.reduce((n, tok) => n + tok.t.length, 0);

const renderLine = (line: Token[], typed: number) => {
  let remaining = typed;
  return line.map((tok, i) => {
    if (remaining <= 0) return null;
    const slice = tok.t.slice(0, remaining);
    remaining -= tok.t.length;
    return (
      <span key={i} className={tok.c}>
        {slice}
      </span>
    );
  });
};

interface CodePanelProps {
  className?: string;
  speed?: number; // ms per character
}

const CodePanel = ({ className = "", speed = 32 }: CodePanelProps) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [committed, setCommitted] = useState<number[]>([]);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const current = LINES[lineIdx];
    const max = totalChars(current);

    if (charCount < max) {
      tickRef.current = window.setTimeout(() => setCharCount((c) => c + 1), speed);
    } else {
      // pause, then advance
      tickRef.current = window.setTimeout(() => {
        setCommitted((arr) => {
          const next = [...arr, lineIdx];
          // keep buffer trimmed
          return next.length > 6 ? next.slice(next.length - 6) : next;
        });
        setCharCount(0);
        setLineIdx((i) => (i + 1) % LINES.length);
      }, 900);
    }

    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [charCount, lineIdx, speed]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl glass-strong gold-border-glow ${className}`}
    >
      {/* Editor chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_60%_55%)]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(45_85%_60%)]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(140_50%_55%)]/70" />
        <span className="ml-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          nexora · engine.ts
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-primary-glow/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-glow" />
          </span>
          live
        </span>
      </div>

      {/* Code body */}
      <div className="relative px-6 py-5 font-mono text-[13px] leading-[1.85] min-h-[260px]">
        {/* line numbers gutter */}
        <div className="absolute left-2 top-5 bottom-5 flex flex-col text-[11px] text-muted-foreground/40 select-none pointer-events-none">
          {Array.from({ length: committed.length + 1 }).map((_, i) => (
            <span key={i} className="leading-[1.85] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        <div className="pl-8">
          {committed.map((idx, k) => (
            <div key={`c-${k}-${idx}`} className="opacity-60">
              {renderLine(LINES[idx], totalChars(LINES[idx]))}
            </div>
          ))}
          <div className="relative">
            {renderLine(LINES[lineIdx], charCount)}
            <span
              className="inline-block align-middle ml-0.5 w-[7px] h-[15px] -mb-[2px] bg-primary-glow rounded-[1px] animate-pulse"
              style={{
                boxShadow:
                  "0 0 12px hsl(45 90% 70% / 0.9), 0 0 28px hsl(45 90% 70% / 0.5)",
              }}
            />
          </div>
        </div>

        {/* Soft top/bottom fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-card/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
    </div>
  );
};

export default CodePanel;