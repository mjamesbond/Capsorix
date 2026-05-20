import { useEffect, useRef } from "react";

/**
 * Floating UI elements (gold orbs + soft tags) that drift toward
 * the cursor with subtle inertia. Pure presentation — pointer-events: none.
 */

const ORBS = [
  { size: 360, color: "hsl(45 90% 65% / 0.08)", depth: 0.025, x: 0.18, y: 0.25 },
  { size: 480, color: "hsl(45 80% 60% / 0.05)", depth: 0.035, x: 0.78, y: 0.35 },
  { size: 280, color: "hsl(45 70% 60% / 0.05)", depth: 0.025, x: 0.55, y: 0.7 },
];

const TAGS = [
  { label: "<Component />", x: 0.12, y: 0.18, depth: 0.04 },
  { label: "200 OK", x: 0.85, y: 0.22, depth: 0.03 },
  { label: "useState()", x: 0.22, y: 0.78, depth: 0.035 },
  { label: "POST /build", x: 0.78, y: 0.78, depth: 0.025 },
];

const CursorOrbs = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      target.current.x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      target.current.y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.03;
      current.current.y += (target.current.y - current.current.y) * 0.03;
      const items = node.querySelectorAll<HTMLElement>("[data-depth]");
      items.forEach((el) => {
        const depth = Number(el.dataset.depth ?? 0.05);
        const tx = current.current.x * depth * 200;
        const ty = current.current.y * depth * 200;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {ORBS.map((o, i) => (
        <div
          key={`orb-${i}`}
          data-depth={o.depth}
          className="absolute rounded-full blur-3xl will-change-transform"
          style={{
            width: o.size,
            height: o.size,
            background: o.color,
            left: `calc(${o.x * 100}% - ${o.size / 2}px)`,
            top: `calc(${o.y * 100}% - ${o.size / 2}px)`,
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      ))}
      {TAGS.map((tag, i) => (
        <div
          key={`tag-${i}`}
          data-depth={tag.depth}
          className="absolute font-mono text-[10px] tracking-wide text-foreground/35 px-2.5 py-1 rounded-full glass border border-border/30 will-change-transform"
          style={{
            left: `${tag.x * 100}%`,
            top: `${tag.y * 100}%`,
            transform: "translate3d(0,0,0)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {tag.label}
        </div>
      ))}
    </div>
  );
};

export default CursorOrbs;