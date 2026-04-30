import { useEffect, useRef, useState } from "react";

/**
 * Xcode-inspired Swift editor panel — types out symbolic Swift code
 * with syntax highlighting, line numbers, and a glowing active-line.
 */

type Token = { t: string; c: string };

const C = {
  kw: "text-[hsl(335_75%_70%)]",          // pink — keyword
  type: "text-[hsl(265_70%_75%)]",        // purple — type
  fn: "text-[hsl(200_85%_72%)]",          // cyan — function
  str: "text-[hsl(8_75%_70%)]",           // red-orange — string
  num: "text-[hsl(28_85%_70%)]",          // amber — number
  cmt: "text-[hsl(140_25%_55%)] italic",  // green-muted — comment
  prop: "text-[hsl(220_75%_75%)]",        // blue — property
  var: "text-[hsl(40_15%_88%)]",          // foreground
  pun: "text-[hsl(40_8%_55%)]",           // punctuation
  enum_: "text-[hsl(180_60%_70%)]",       // enum case — teal
};

const LINES: Token[][] = [
  [{ t: "// MARK: — A vision, given form.", c: C.cmt }],
  [
    { t: "let ", c: C.kw },
    { t: "product", c: C.var },
    { t: " = ", c: C.pun },
    { t: "DigitalProduct", c: C.type },
    { t: "(name: ", c: C.pun },
    { t: '"Client Vision"', c: C.str },
    { t: ")", c: C.pun },
  ],
  [
    { t: "product", c: C.var },
    { t: ".", c: C.pun },
    { t: "build", c: C.fn },
    { t: "(with: ", c: C.pun },
    { t: ".precision", c: C.enum_ },
    { t: ", quality: ", c: C.pun },
    { t: ".premium", c: C.enum_ },
    { t: ")", c: C.pun },
  ],
  [
    { t: "if ", c: C.kw },
    { t: "product", c: C.var },
    { t: ".", c: C.pun },
    { t: "isReady", c: C.prop },
    { t: " {", c: C.pun },
  ],
  [
    { t: "    ", c: C.pun },
    { t: "deploy", c: C.fn },
    { t: "(to: ", c: C.pun },
    { t: ".AppStore", c: C.enum_ },
    { t: ")", c: C.pun },
  ],
  [{ t: "}", c: C.pun }],
  [{ t: "// Mastery is quiet. Elegance is deliberate.", c: C.cmt }],
  [
    { t: "let ", c: C.kw },
    { t: "result", c: C.var },
    { t: " = ", c: C.pun },
    { t: "await ", c: C.kw },
    { t: "AppStore", c: C.type },
    { t: ".", c: C.pun },
    { t: "submit", c: C.fn },
    { t: "(product, review: ", c: C.pun },
    { t: ".expedited", c: C.enum_ },
    { t: ")", c: C.pun },
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

interface SwiftEditorProps {
  className?: string;
  speed?: number;
}

const SwiftEditor = ({ className = "", speed = 28 }: SwiftEditorProps) => {
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
      tickRef.current = window.setTimeout(() => {
        setCommitted((arr) => {
          const next = [...arr, lineIdx];
          return next.length > 7 ? next.slice(next.length - 7) : next;
        });
        setCharCount(0);
        setLineIdx((i) => (i + 1) % LINES.length);
      }, 800);
    }
    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [charCount, lineIdx, speed]);

  const totalLines = committed.length + 1;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl glass-strong gold-border-glow shadow-elegant ${className}`}
    >
      {/* Xcode-style title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-[hsl(222_40%_7%/0.6)]">
        <span className="w-3 h-3 rounded-full bg-[hsl(0_60%_55%)]" />
        <span className="w-3 h-3 rounded-full bg-[hsl(45_85%_60%)]" />
        <span className="w-3 h-3 rounded-full bg-[hsl(140_50%_55%)]" />
        <div className="ml-4 flex items-center gap-2 text-[11px] text-muted-foreground/80">
          <span className="font-mono">Nexora.xcodeproj</span>
          <span className="text-muted-foreground/40">›</span>
          <span className="font-mono text-foreground/80">DigitalProduct.swift</span>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[hsl(140_50%_60%)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(140_60%_55%)] animate-pulse" />
          Build Succeeded
        </span>
      </div>

      {/* Code body */}
      <div className="relative px-5 py-5 font-mono text-[13px] leading-[1.85] min-h-[340px] bg-[hsl(222_45%_6%/0.5)]">
        {/* gutter */}
        <div className="absolute left-3 top-5 bottom-5 flex flex-col text-[11px] text-muted-foreground/40 select-none pointer-events-none tabular-nums">
          {Array.from({ length: totalLines }).map((_, i) => (
            <span key={i} className="leading-[1.85]">
              {i + 1}
            </span>
          ))}
        </div>

        <div className="pl-10">
          {committed.map((idx, k) => (
            <div key={`c-${k}-${idx}`} className="opacity-55">
              {renderLine(LINES[idx], totalChars(LINES[idx]))}
            </div>
          ))}

          {/* Active line — soft glow */}
          <div
            className="relative -mx-3 px-3 rounded"
            style={{
              background:
                "linear-gradient(90deg, hsl(45 90% 65% / 0.06), hsl(45 90% 65% / 0.02) 60%, transparent)",
              boxShadow: "inset 2px 0 0 hsl(45 90% 65% / 0.6)",
            }}
          >
            {renderLine(LINES[lineIdx], charCount)}
            <span
              className="inline-block align-middle ml-0.5 w-[2px] h-[16px] -mb-[3px] bg-primary-glow"
              style={{
                animation: "caret-blink 1s steps(1) infinite",
                boxShadow:
                  "0 0 10px hsl(45 90% 70% / 0.95), 0 0 24px hsl(45 90% 70% / 0.55)",
              }}
            />
          </div>
        </div>

        {/* fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-card/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-card/70 to-transparent" />
      </div>
    </div>
  );
};

export default SwiftEditor;