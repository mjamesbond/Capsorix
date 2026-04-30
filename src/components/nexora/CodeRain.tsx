import { useEffect, useMemo, useRef, useState } from "react";
import { useParallax } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Ambient "living code" backdrop. Two snippet sets — one in JS-ish syntax
 * for English, one in an Arabic pseudo-code for Arabic — so the system's
 * background language follows the user's language. Same rhythm, two voices.
 */

const SNIPPETS_EN = [
  "return precision + strategy + execution;",
  "if (client.trustsUs) scale(client.business);",
  "create({ quality: 'premium', detail: 'obsessive' });",
  "await respond.within(24, 48);",
  "build(product, { confidence: true });",
  "while (vision.alive) refine();",
  "guard product.isReady else { iterate() }",
  "// the work speaks before we do",
  "deploy(product, to: .production, with: .care);",
  "ship({ impact: 'long-term' });",
  "function buildProduct(clientVision) {",
  "outcome = mastery * patience;",
  "// every detail compounds",
  "trust = years * clientsServed;",
  "system.optimize('attention-to-detail');",
];

// Arabic "pseudo-code" — looks like a small DSL, reads like Arabic.
// Identifiers stay in Arabic; structure stays familiar (braces, ;, ()).
const SNIPPETS_AR = [
  "إرجاع: دقّة + استراتيجية + تنفيذ؛",
  "إذا (العميل.واثقٌ_بنا) { نُوسّع(عمله)؛ }",
  "أنشئ({ جودة: 'عالية', تفصيل: 'دقيق' })؛",
  "انتظر الردّ.خلال(٢٤، ٤٨)؛",
  "ابنِ(المنتج، { ثقة: صحيح })؛",
  "طالما (الرؤية.حيّة) { حسّن()؛ }",
  "// العمل يتكلّم قبلنا",
  "أطلق(المنتج، نحو: .الإنتاج، باهتمام)؛",
  "أطلق({ أثر: 'طويل_المدى' })؛",
  "دالّة ابنِ_المنتج(رؤية_العميل) {",
  "النتيجة = إتقان × صبر؛",
  "// كل تفصيلة تتراكم",
  "ثقة = سنين × عملاء_خُدِموا؛",
  "النظام.حسّن('الانتباه_للتفاصيل')؛",
  "// لا نَعِد بالكثير — نُسلّم ما يبقى",
];

// French snippets — same rhythm, native voice.
const SNIPPETS_FR = [
  "retourner précision + stratégie + exécution;",
  "si (client.nousFaitConfiance) étendre(client.métier);",
  "créer({ qualité: 'haute', détail: 'obsessionnel' });",
  "attendre répondre.sous(24, 48);",
  "bâtir(produit, { confiance: vrai });",
  "tant que (vision.vivante) affiner();",
  "garde produit.estPrêt sinon { itérer() }",
  "// le travail parle avant nous",
  "déployer(produit, vers: .production, avec: .soin);",
  "livrer({ impact: 'long-terme' });",
  "fonction bâtirProduit(visionClient) {",
  "résultat = maîtrise * patience;",
  "// chaque détail se cumule",
  "confiance = années * clientsServis;",
  "système.optimiser('attention-au-détail');",
];

const colorFor = (line: string) => {
  const t = line.trim();
  if (t.startsWith("//")) return "text-[hsl(220_15%_38%)] italic";
  if (t.startsWith("return") || t.startsWith("const ") || t.startsWith("export "))
    return "text-[hsl(45_70%_55%)]";
  if (t.startsWith("if ") || t.startsWith("while ") || t.startsWith("await "))
    return "text-[hsl(45_85%_60%)]";
  // Arabic keywords
  if (t.startsWith("إرجاع") || t.startsWith("دالّة") || t.startsWith("إذا") ||
      t.startsWith("طالما") || t.startsWith("انتظر") || t.startsWith("أنشئ") ||
      t.startsWith("ابنِ") || t.startsWith("أطلق"))
    return "text-[hsl(45_85%_60%)]";
  // French keywords
  if (t.startsWith("retourner") || t.startsWith("fonction") || t.startsWith("si ") ||
      t.startsWith("tant que") || t.startsWith("attendre") || t.startsWith("créer") ||
      t.startsWith("bâtir") || t.startsWith("déployer") || t.startsWith("livrer") ||
      t.startsWith("garde"))
    return "text-[hsl(45_85%_60%)]";
  return "text-[hsl(40_25%_70%)]";
};

interface Column {
  left: string;
  top: string;
  delay: number;
  speed: number;
  lines: string[];
}

const buildColumns = (count: number, pool: string[]): Column[] => {
  const cols: Column[] = [];
  for (let i = 0; i < count; i++) {
    const lines: string[] = [];
    const len = 6 + Math.floor(Math.random() * 5);
    for (let j = 0; j < len; j++) {
      lines.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    cols.push({
      left: `${(i / count) * 100 + Math.random() * 4}%`,
      top: `${Math.random() * 30}%`,
      delay: Math.random() * 6,
      speed: 38 + Math.random() * 30,
      lines,
    });
  }
  return cols;
};

interface CodeRainProps {
  className?: string;
  density?: number;
  parallaxSpeed?: number;
}

const CodeRain = ({ className = "", density = 4, parallaxSpeed = 0.08 }: CodeRainProps) => {
  const { lang } = useI18n();
  const ref = useParallax<HTMLDivElement>(parallaxSpeed);
  const [mounted, setMounted] = useState(false);
  const pool = lang === "ar" ? SNIPPETS_AR : lang === "fr" ? SNIPPETS_FR : SNIPPETS_EN;
  // Rebuild columns when language flips so the background actually swaps voices.
  const columns = useMemo(() => buildColumns(density, pool), [density, pool]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden will-parallax ${className}`}
    >
      {columns.map((col, i) => (
        <div
          key={`${lang}-${i}`}
          className={`absolute text-[11px] leading-[1.9] whitespace-nowrap opacity-[0.08] ${
            lang === "ar" ? "font-arabic" : "font-mono"
          }`}
          dir={lang === "ar" ? "rtl" : "ltr"}
          style={{
            left: col.left,
            top: col.top,
            animation: `code-fall ${col.speed * 1.6}s linear ${col.delay}s infinite`,
          }}
        >
          {col.lines.map((line, j) => (
            <div
              key={j}
              className={colorFor(line)}
              style={{ opacity: 0.4 + (j / col.lines.length) * 0.6 }}
            >
              {line}
            </div>
          ))}
        </div>
      ))}

      {/* Focus mask — brighter center, dimmer edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background)/0.85)_75%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default CodeRain;