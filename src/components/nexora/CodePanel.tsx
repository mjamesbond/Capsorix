import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Living code panel. Two parallel scripts — English JS, Arabic pseudo-code —
 * type out the same intent in two voices. Switching language swaps the
 * script entirely (not a translation underneath; a different program).
 */

type Token = { t: string; c: string };

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

const LINES_EN: Token[][] = [
  [{ t: "// engine — every decision compounds", c: C.cmt }],
  [
    { t: "function ", c: C.kw },
    { t: "buildProduct", c: C.fn },
    { t: "(", c: C.pun },
    { t: "clientVision", c: C.var },
    { t: ") {", c: C.pun },
  ],
  [
    { t: "  return ", c: C.kw },
    { t: "precision", c: C.var },
    { t: " + ", c: C.pun },
    { t: "strategy", c: C.var },
    { t: " + ", c: C.pun },
    { t: "execution", c: C.var },
    { t: ";", c: C.pun },
  ],
  [{ t: "}", c: C.pun }],
  [
    { t: "const ", c: C.kw },
    { t: "result", c: C.var },
    { t: " = ", c: C.pun },
    { t: "create", c: C.fn },
    { t: "({", c: C.pun },
  ],
  [{ t: "  quality: ", c: C.var }, { t: "'premium'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "  detail: ", c: C.var }, { t: "'obsessive'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "  impact: ", c: C.var }, { t: "'long-term'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "});", c: C.pun }],
  [{ t: "// trust is the real currency", c: C.cmt }],
  [
    { t: "if ", c: C.kw },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "trustsUs", c: C.fn },
    { t: ") { ", c: C.pun },
    { t: "scale", c: C.fn },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "business", c: C.var },
    { t: "); }", c: C.pun },
  ],
  [
    { t: "await ", c: C.kw },
    { t: "respond", c: C.fn },
    { t: ".", c: C.pun },
    { t: "within", c: C.fn },
    { t: "(", c: C.pun },
    { t: "24", c: C.num },
    { t: ", ", c: C.pun },
    { t: "48", c: C.num },
    { t: ");", c: C.pun },
  ],
];

// Arabic pseudo-code — same intent, native phrasing.
const LINES_AR: Token[][] = [
  [{ t: "// المحرّك — كل قرار يتراكم", c: C.cmt }],
  [
    { t: "دالّة ", c: C.kw },
    { t: "ابنِ_المنتج", c: C.fn },
    { t: "(", c: C.pun },
    { t: "رؤية_العميل", c: C.var },
    { t: ") {", c: C.pun },
  ],
  [
    { t: "  إرجاع ", c: C.kw },
    { t: "دقّة", c: C.var },
    { t: " + ", c: C.pun },
    { t: "استراتيجية", c: C.var },
    { t: " + ", c: C.pun },
    { t: "تنفيذ", c: C.var },
    { t: "؛", c: C.pun },
  ],
  [{ t: "}", c: C.pun }],
  [
    { t: "ثابت ", c: C.kw },
    { t: "النتيجة", c: C.var },
    { t: " = ", c: C.pun },
    { t: "أنشئ", c: C.fn },
    { t: "({", c: C.pun },
  ],
  [{ t: "  جودة: ", c: C.var }, { t: "'عالية'", c: C.str }, { t: "،", c: C.pun }],
  [{ t: "  تفصيل: ", c: C.var }, { t: "'دقيق'", c: C.str }, { t: "،", c: C.pun }],
  [{ t: "  أثر: ", c: C.var }, { t: "'طويل_المدى'", c: C.str }, { t: "،", c: C.pun }],
  [{ t: "})؛", c: C.pun }],
  [{ t: "// الثقة هي العملة الحقيقية", c: C.cmt }],
  [
    { t: "إذا ", c: C.kw },
    { t: "(", c: C.pun },
    { t: "العميل", c: C.var },
    { t: ".", c: C.pun },
    { t: "واثقٌ_بنا", c: C.fn },
    { t: ") { ", c: C.pun },
    { t: "وسّع", c: C.fn },
    { t: "(", c: C.pun },
    { t: "العميل", c: C.var },
    { t: ".", c: C.pun },
    { t: "عمله", c: C.var },
    { t: ")؛ }", c: C.pun },
  ],
  [
    { t: "انتظر ", c: C.kw },
    { t: "الردّ", c: C.fn },
    { t: ".", c: C.pun },
    { t: "خلال", c: C.fn },
    { t: "(", c: C.pun },
    { t: "٢٤", c: C.num },
    { t: "، ", c: C.pun },
    { t: "٤٨", c: C.num },
    { t: ")؛", c: C.pun },
  ],
];

// French pseudo-code — same intent, native phrasing.
const LINES_FR: Token[][] = [
  [{ t: "// le moteur — chaque décision se cumule", c: C.cmt }],
  [
    { t: "fonction ", c: C.kw },
    { t: "bâtirProduit", c: C.fn },
    { t: "(", c: C.pun },
    { t: "visionClient", c: C.var },
    { t: ") {", c: C.pun },
  ],
  [
    { t: "  retourner ", c: C.kw },
    { t: "précision", c: C.var },
    { t: " + ", c: C.pun },
    { t: "stratégie", c: C.var },
    { t: " + ", c: C.pun },
    { t: "exécution", c: C.var },
    { t: ";", c: C.pun },
  ],
  [{ t: "}", c: C.pun }],
  [
    { t: "const ", c: C.kw },
    { t: "résultat", c: C.var },
    { t: " = ", c: C.pun },
    { t: "créer", c: C.fn },
    { t: "({", c: C.pun },
  ],
  [{ t: "  qualité: ", c: C.var }, { t: "'haute'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "  détail: ", c: C.var }, { t: "'obsessionnel'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "  impact: ", c: C.var }, { t: "'long-terme'", c: C.str }, { t: ",", c: C.pun }],
  [{ t: "});", c: C.pun }],
  [{ t: "// la confiance est la vraie monnaie", c: C.cmt }],
  [
    { t: "si ", c: C.kw },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "nousFaitConfiance", c: C.fn },
    { t: ") { ", c: C.pun },
    { t: "étendre", c: C.fn },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "métier", c: C.var },
    { t: "); }", c: C.pun },
  ],
  [
    { t: "attendre ", c: C.kw },
    { t: "répondre", c: C.fn },
    { t: ".", c: C.pun },
    { t: "sous", c: C.fn },
    { t: "(", c: C.pun },
    { t: "24", c: C.num },
    { t: ", ", c: C.pun },
    { t: "48", c: C.num },
    { t: ");", c: C.pun },
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
  const { lang } = useI18n();
  const LINES = lang === "ar" ? LINES_AR : LINES_EN;
  const fileName = lang === "ar" ? "نكسورا · المحرّك.نكس" : "nexora · engine.ts";
  const liveLabel = lang === "ar" ? "حيّ" : "live";

  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [committed, setCommitted] = useState<number[]>([]);
  const tickRef = useRef<number | null>(null);

  // Reset the typewriter when the language flips so we restart cleanly.
  useEffect(() => {
    setLineIdx(0);
    setCharCount(0);
    setCommitted([]);
  }, [lang]);

  useEffect(() => {
    const current = LINES[lineIdx];
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
        setLineIdx((i) => (i + 1) % LINES.length);
      }, 900);
    }

    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [charCount, lineIdx, speed, LINES]);

  return (
    <div className={`relative overflow-hidden rounded-2xl glass-strong gold-border-glow ${className}`}>
      {/* Editor chrome — stays LTR even in Arabic; it's a code window */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40" dir="ltr">
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_60%_55%)]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(45_85%_60%)]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(140_50%_55%)]/70" />
        <span className={`ml-3 text-[10px] tracking-[0.25em] text-muted-foreground ${lang === "ar" ? "font-arabic" : "uppercase"}`}>
          {fileName}
        </span>
        <span className={`ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-primary-glow/80 ${lang === "ar" ? "font-arabic" : "uppercase"}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-glow" />
          </span>
          {liveLabel}
        </span>
      </div>

      {/* Code body — direction follows language; Arabic uses Plex Arabic */}
      <div
        key={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`relative px-6 py-5 text-[13px] leading-[1.95] min-h-[260px] ${
          lang === "ar" ? "font-arabic" : "font-mono"
        }`}
      >
        <div className={`absolute top-5 bottom-5 flex flex-col text-[11px] text-muted-foreground/40 select-none pointer-events-none ${
          lang === "ar" ? "right-2" : "left-2"
        }`}>
          {Array.from({ length: committed.length + 1 }).map((_, i) => (
            <span key={i} className="leading-[1.95] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        <div className={lang === "ar" ? "pr-8" : "pl-8"}>
          {committed.map((idx, k) => (
            <div key={`c-${k}-${idx}`} className="opacity-60">
              {renderLine(LINES[idx], totalChars(LINES[idx]))}
            </div>
          ))}
          <div className="relative">
            {renderLine(LINES[lineIdx], charCount)}
            <span
              className="inline-block align-middle ml-0.5 w-[7px] h-[15px] -mb-[2px] bg-primary-glow rounded-[1px] animate-pulse"
              style={{ boxShadow: "0 0 12px hsl(45 90% 70% / 0.9), 0 0 28px hsl(45 90% 70% / 0.5)" }}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-card/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
    </div>
  );
};

export default CodePanel;