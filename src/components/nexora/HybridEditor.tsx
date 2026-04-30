import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Hybrid editor: a single panel showing two stacked editors —
 * Frontend (HTML/CSS/JS) and Backend (Node.js). Each types its own
 * symbolic snippet, with hover tooltips revealing the meaning of
 * every key token. The CODE itself is intentionally English (real
 * programming idioms); only the prose meanings are localized.
 */

type Token = {
  t: string;
  c: string;
  /** A stable id used to look up a localized meaning. Untranslated tokens omit it. */
  k?: string;
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

// Per-language meanings keyed by token id. Each language is a
// rewrite, not a literal translation — the same calm precision in
// native phrasing for each audience.
const MEANINGS: Record<"en" | "fr" | "ar" | "de", Record<string, string>> = {
  en: {
    "fe.const": "Immutable binding — predictable state.",
    "fe.experience": "The brand moment your visitor remembers.",
    "fe.createUI": "Composes design tokens into a living interface.",
    "fe.design": "Visual system, typography, motion.",
    "fe.premium": "No templates. No compromises.",
    "fe.interaction": "How the interface responds to intent.",
    "fe.smooth": "60fps, 16ms frames, frame-perfect.",
    "fe.detail": "The thing competitors skip.",
    "fe.obsessive": "Pixel by pixel, until it disappears.",
    "fe.remember": "Engineered to stay in memory long after leaving.",
    "fe.visitor": "Not a user. A future client.",
    "be.app": "Express server — the studio's runtime.",
    "be.post": "Receives client vision, returns product.",
    "be.build": "Endpoint that turns intent into product.",
    "be.req": "What the client wants.",
    "be.res": "What we promise back.",
    "be.processClientVision": "Strategy → architecture → execution.",
    "be.body": "The brief, validated and parsed.",
    "be.if": "A condition we earn, not assume.",
    "be.trustsUs": "Trust is the real authentication layer.",
    "be.scale": "Grow the client's business, not just the system.",
    "be.business": "Revenue, reach, reputation.",
    "be.send": "Confirmation, not just a response.",
    "be.deployed": "Shipped. Live. Done.",
    "be.respond": "Senior reply within 24–48 hours. Always.",
    "be.48": "Hours. Not days.",
    paneFrontend: "Frontend",
    paneBackend: "Backend",
    badgeLive: "Live Reload",
    badgeListening: "Listening :443",
  },
  fr: {
    "fe.const": "Liaison immuable — un état prévisible.",
    "fe.experience": "Le moment de marque dont votre visiteur se souviendra.",
    "fe.createUI": "Compose les tokens de design en interface vivante.",
    "fe.design": "Système visuel, typographie, mouvement.",
    "fe.premium": "Pas de gabarits. Aucun compromis.",
    "fe.interaction": "Comment l’interface répond à l’intention.",
    "fe.smooth": "60 fps, images de 16 ms, à l’image près.",
    "fe.detail": "Ce que les autres survolent.",
    "fe.obsessive": "Pixel par pixel, jusqu’à disparaître.",
    "fe.remember": "Pensé pour rester en mémoire longtemps après la visite.",
    "fe.visitor": "Pas un utilisateur. Un futur client.",
    "be.app": "Serveur Express — le runtime du studio.",
    "be.post": "Reçoit la vision du client, renvoie un produit.",
    "be.build": "L’endpoint qui transforme l’intention en produit.",
    "be.req": "Ce que veut le client.",
    "be.res": "Ce que nous promettons en retour.",
    "be.processClientVision": "Stratégie → architecture → exécution.",
    "be.body": "Le brief, validé et analysé.",
    "be.if": "Une condition qu’on gagne, jamais qu’on suppose.",
    "be.trustsUs": "La confiance est la vraie couche d’authentification.",
    "be.scale": "Faire grandir l’activité du client, pas seulement le système.",
    "be.business": "Revenu, portée, réputation.",
    "be.send": "Une confirmation, pas une simple réponse.",
    "be.deployed": "Livré. En ligne. Fait.",
    "be.respond": "Réponse d’un partenaire sous 24–48 heures. Toujours.",
    "be.48": "Heures. Pas des jours.",
    paneFrontend: "Frontend",
    paneBackend: "Backend",
    badgeLive: "Live Reload",
    badgeListening: "Listening :443",
  },
  ar: {
    "fe.const": "ارتباط ثابت — حالة يمكن توقّعها.",
    "fe.experience": "اللحظة التي يحفظها زائرك عن علامتك.",
    "fe.createUI": "يجمع رموز التصميم في واجهة حيّة.",
    "fe.design": "نظام بصري، طباعة، حركة.",
    "fe.premium": "لا قوالب. لا تنازلات.",
    "fe.interaction": "كيف تستجيب الواجهة لنيّة المستخدم.",
    "fe.smooth": "60 إطار/ث، 16 ملي ثانية لكل إطار، بدقّة الإطار.",
    "fe.detail": "ما يتجاوزه المنافسون.",
    "fe.obsessive": "بكسل بكسل، حتى يختفي.",
    "fe.remember": "مهندسة لتبقى في الذاكرة طويلًا بعد المغادرة.",
    "fe.visitor": "ليس مستخدمًا. عميلًا قادمًا.",
    "be.app": "خادم Express — بيئة تشغيل الاستوديو.",
    "be.post": "يستقبل رؤية العميل، ويُعيد منتجًا.",
    "be.build": "المسار الذي يحوّل النيّة إلى منتج.",
    "be.req": "ما يريده العميل.",
    "be.res": "ما نَعِد به في المقابل.",
    "be.processClientVision": "استراتيجية ← معمار ← تنفيذ.",
    "be.body": "البريف، مُتحقَّق منه ومُحلَّل.",
    "be.if": "شرط نَكسبه، لا نفترضه.",
    "be.trustsUs": "الثقة هي طبقة المصادقة الحقيقيّة.",
    "be.scale": "ننمّي عمل العميل، لا النظام فحسب.",
    "be.business": "إيرادات، انتشار، سمعة.",
    "be.send": "تأكيد، لا مجرّد ردّ.",
    "be.deployed": "مُسلَّم. حيّ. منتهٍ.",
    "be.respond": "ردّ من فريق أوّل خلال 24 إلى 48 ساعة. دائمًا.",
    "be.48": "ساعات. لا أيّام.",
    paneFrontend: "الواجهة",
    paneBackend: "الخلفيّة",
    badgeLive: "إعادة تحميل حيّة",
    badgeListening: "Listening :443",
  },
};

const FRONTEND: Token[][] = [
  [{ t: "// frontend — beauty, engineered", c: C.cmt }],
  [
    { t: "const ", c: C.kw, k: "fe.const" },
    { t: "experience", c: C.var, k: "fe.experience" },
    { t: " = ", c: C.pun },
    { t: "createUI", c: C.fn, k: "fe.createUI" },
    { t: "({", c: C.pun },
  ],
  [
    { t: "  design: ", c: C.prop, k: "fe.design" },
    { t: '"premium"', c: C.str, k: "fe.premium" },
    { t: ",", c: C.pun },
  ],
  [
    { t: "  interaction: ", c: C.prop, k: "fe.interaction" },
    { t: '"smooth"', c: C.str, k: "fe.smooth" },
    { t: ",", c: C.pun },
  ],
  [
    { t: "  detail: ", c: C.prop, k: "fe.detail" },
    { t: '"obsessive"', c: C.str, k: "fe.obsessive" },
    { t: ",", c: C.pun },
  ],
  [{ t: "});", c: C.pun }],
  [
    { t: "experience", c: C.var },
    { t: ".", c: C.pun },
    { t: "remember", c: C.fn, k: "fe.remember" },
    { t: "(", c: C.pun },
    { t: "visitor", c: C.var, k: "fe.visitor" },
    { t: ");", c: C.pun },
  ],
];

const BACKEND: Token[][] = [
  [{ t: "// backend — logic that ships", c: C.cmt }],
  [
    { t: "app", c: C.var, k: "be.app" },
    { t: ".", c: C.pun },
    { t: "post", c: C.fn, k: "be.post" },
    { t: "(", c: C.pun },
    { t: "'/build'", c: C.str, k: "be.build" },
    { t: ", (", c: C.pun },
    { t: "req", c: C.var, k: "be.req" },
    { t: ", ", c: C.pun },
    { t: "res", c: C.var, k: "be.res" },
    { t: ") => {", c: C.pun },
  ],
  [
    { t: "  processClientVision", c: C.fn, k: "be.processClientVision" },
    { t: "(", c: C.pun },
    { t: "req", c: C.var },
    { t: ".", c: C.pun },
    { t: "body", c: C.prop, k: "be.body" },
    { t: ");", c: C.pun },
  ],
  [
    { t: "  if ", c: C.kw, k: "be.if" },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "trustsUs", c: C.fn, k: "be.trustsUs" },
    { t: ") ", c: C.pun },
    { t: "scale", c: C.fn, k: "be.scale" },
    { t: "(", c: C.pun },
    { t: "client", c: C.var },
    { t: ".", c: C.pun },
    { t: "business", c: C.prop, k: "be.business" },
    { t: ");", c: C.pun },
  ],
  [
    { t: "  res", c: C.var },
    { t: ".", c: C.pun },
    { t: "send", c: C.fn, k: "be.send" },
    { t: "(", c: C.pun },
    { t: '"Deployed Successfully"', c: C.str, k: "be.deployed" },
    { t: ");", c: C.pun },
  ],
  [{ t: "});", c: C.pun }],
  [
    { t: "app", c: C.var },
    { t: ".", c: C.pun },
    { t: "respond", c: C.fn, k: "be.respond" },
    { t: ".", c: C.pun },
    { t: "within", c: C.fn },
    { t: "(", c: C.pun },
    { t: "24", c: C.num },
    { t: ", ", c: C.pun },
    { t: "48", c: C.num, k: "be.48" },
    { t: ");", c: C.pun },
  ],
];

const totalChars = (line: Token[]) => line.reduce((n, tok) => n + tok.t.length, 0);

const renderLine = (
  line: Token[],
  typed: number,
  withMeaning: boolean,
  meanings: Record<string, string>,
) => {
  let remaining = typed;
  return line.map((tok, i) => {
    if (remaining <= 0) return null;
    const slice = tok.t.slice(0, remaining);
    const fullyTyped = remaining >= tok.t.length;
    remaining -= tok.t.length;
    const m = tok.k ? meanings[tok.k] : undefined;
    const interactive = withMeaning && fullyTyped && !!m;
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
            {m}
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
  meanings: Record<string, string>;
}

const Pane = ({ title, badge, accent, filename, lines, speed = 28, meanings }: PaneProps) => {
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
    <div className="relative overflow-visible rounded-2xl glass-strong gold-border-glow shadow-elegant" dir="ltr">
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
              {renderLine(lines[idx], totalChars(lines[idx]), true, meanings)}
            </div>
          ))}
          <div
            className="relative -mx-3 px-3 rounded"
            style={{
              background: `linear-gradient(90deg, ${accent}14, ${accent}06 60%, transparent)`,
              boxShadow: `inset 2px 0 0 ${accent}aa`,
            }}
          >
            {renderLine(lines[lineIdx], charCount, true, meanings)}
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
  const { lang } = useI18n();
  const meanings = useMemo(() => MEANINGS[lang], [lang]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Pane
        title={meanings.paneFrontend}
        badge={meanings.badgeLive}
        accent="hsl(200 85% 65%)"
        filename="experience.tsx"
        lines={FRONTEND}
        meanings={meanings}
      />
      <Pane
        title={meanings.paneBackend}
        badge={meanings.badgeListening}
        accent="hsl(95 55% 60%)"
        filename="server.js"
        lines={BACKEND}
        speed={26}
        meanings={meanings}
      />
    </div>
  );
};

export default HybridEditor;
