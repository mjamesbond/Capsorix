import { useEffect, useMemo, useRef, useState } from "react";
import { useParallax } from "@/hooks/use-reveal";

/**
 * Ambient "living code" backdrop. Multiple dim columns of meaningful
 * code symbols slowly stream / type, with parallax depth. Used as a
 * background layer behind sections — not as decoration but as identity.
 */

const SNIPPETS = [
  "system.build('precision');",
  "deploy(excellence);",
  "if (idea.isPowerful()) scaleGlobally();",
  "const studio = new Nexora({ tier: 'elite' });",
  "await client.respondWithin(24, 48);",
  "return { quality: Infinity };",
  "engine.optimize('attention-to-detail');",
  "// crafted in private, shipped with pride",
  "ship(product, { confidence: true });",
  "user.feel('impressed').within(3000);",
  "design = art.meets(engineering);",
  "while (vision.alive) iterate();",
  "export default function Empire() {}",
  "trust = (years, clients) => years * clients;",
  "nexora.partners.accept({ slots: 3 });",
];

const colorFor = (line: string) => {
  if (line.startsWith("//")) return "text-[hsl(220_15%_38%)] italic";
  if (line.startsWith("const ") || line.startsWith("export ") || line.startsWith("return "))
    return "text-[hsl(45_70%_55%)]";
  if (line.startsWith("if ") || line.startsWith("while ") || line.startsWith("await "))
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

const buildColumns = (count: number): Column[] => {
  const cols: Column[] = [];
  for (let i = 0; i < count; i++) {
    const lines: string[] = [];
    const len = 6 + Math.floor(Math.random() * 5);
    for (let j = 0; j < len; j++) {
      lines.push(SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
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
  const ref = useParallax<HTMLDivElement>(parallaxSpeed);
  const [mounted, setMounted] = useState(false);
  const columns = useMemo(() => buildColumns(density), [density]);

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
          key={i}
          className="absolute font-mono text-[11px] leading-[1.9] whitespace-nowrap opacity-[0.08]"
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