import { useEffect, useRef, useState } from "react";

/**
 * Android Studio–inspired Kotlin editor — types out symbolic Kotlin
 * with syntax highlighting, line numbers, and a glowing active line.
 */

type Token = { t: string; c: string };

const C = {
  kw: "text-[hsl(28_95%_65%)]",          // orange — keyword (val, if, fun)
  type: "text-[hsl(170_70%_65%)]",       // teal — type
  fn: "text-[hsl(50_95%_70%)]",          // yellow — function
  str: "text-[hsl(95_55%_70%)]",         // green — string
  num: "text-[hsl(265_70%_75%)]",        // purple — number/bool
  cmt: "text-[hsl(220_15%_45%)] italic", // muted — comment
  prop: "text-[hsl(200_85%_72%)]",       // blue — property
  var: "text-[hsl(40_15%_88%)]",         // foreground
  pun: "text-[hsl(40_8%_55%)]",          // punctuation
};

const LINES: Token[][] = [
  [{ t: "// built to scale — engineered to last", c: C.cmt }],
  [
    { t: "val ", c: C.kw },
    { t: "app", c: C.var },
    { t: " = ", c: C.pun },
    { t: "buildApp", c: C.fn },
    { t: " {", c: C.pun },
  ],
  [
    { t: "    quality", c: C.prop },
    { t: " = ", c: C.pun },
    { t: '"high"', c: C.str },
  ],
  [
    { t: "    performance", c: C.prop },
    { t: " = ", c: C.pun },
    { t: '"optimized"', c: C.str },
  ],
  [
    { t: "    scalability", c: C.prop },
    { t: " = ", c: C.pun },
    { t: "true", c: C.num },
  ],
  [
    { t: "    detail", c: C.prop },
    { t: " = ", c: C.pun },
    { t: '"obsessive"', c: C.str },
  ],
  [{ t: "}", c: C.pun }],
  [
    { t: "if ", c: C.kw },
    { t: "(", c: C.pun },
    { t: "app", c: C.var },
    { t: ".", c: C.pun },
    { t: "isStable", c: C.fn },
    { t: "()) ", c: C.pun },
    { t: "launch", c: C.fn },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "business", c: C.prop },
    { t: ")", c: C.pun },
  ],
  [{ t: "// strength is structural — reliability is earned", c: C.cmt }],
  [
    { t: "suspend fun ", c: C.kw },
    { t: "deliver", c: C.fn },
    { t: "(): ", c: C.pun },
    { t: "Result", c: C.type },
    { t: " = ", c: C.pun },
    { t: "ship", c: C.fn },
    { t: "(app, with = ", c: C.pun },
    { t: "confidence", c: C.var },
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

interface KotlinEditorProps {
  className?: string;
  speed?: number;
}

const KotlinEditor = ({ className = "", speed = 26 }: KotlinEditorProps) => {
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
          return next.length > 8 ? next.slice(next.length - 8) : next;
        });
        setCharCount(0);
        setLineIdx((i) => (i + 1) % LINES.length);
      }, 750);
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
      {/* Tab bar */}
      <div className="flex items-center border-b border-border/40 bg-[hsl(222_40%_7%/0.7)]">
        <div className="flex items-center gap-2 px-4 py-2.5 border-r border-border/40 bg-[hsl(222_45%_5%/0.6)]">
          <span className="w-2 h-2 rounded-full bg-[hsl(28_95%_65%)]" />
          <span className="font-mono text-[11px] text-foreground/90">MainActivity.kt</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground/60">
          <span className="font-mono text-[11px]">build.gradle.kts</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-4 text-[10px] tracking-[0.2em] uppercase text-[hsl(95_55%_60%)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(95_55%_55%)] animate-pulse" />
          Gradle Sync OK
        </div>
      </div>

      {/* Editor body */}
      <div className="relative px-5 py-5 font-mono text-[13px] leading-[1.85] min-h-[360px] bg-[hsl(222_45%_5%/0.55)]">
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

          {/* Active line — soft gold glow */}
          <div
            className="relative -mx-3 px-3 rounded"
            style={{
              background:
                "linear-gradient(90deg, hsl(28 95% 60% / 0.08), hsl(28 95% 60% / 0.02) 60%, transparent)",
              boxShadow: "inset 2px 0 0 hsl(28 95% 60% / 0.7)",
            }}
          >
            {renderLine(LINES[lineIdx], charCount)}
            <span
              className="inline-block align-middle ml-0.5 w-[2px] h-[16px] -mb-[3px] bg-[hsl(28_95%_65%)]"
              style={{
                animation: "caret-blink 1s steps(1) infinite",
                boxShadow:
                  "0 0 10px hsl(28 95% 65% / 0.95), 0 0 24px hsl(28 95% 65% / 0.55)",
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

export default KotlinEditor;