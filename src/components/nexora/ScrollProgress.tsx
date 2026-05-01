import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll-engine";

/**
 * A 2px gold hairline anchored at the very top of the viewport that
 * tracks page progression. RTL-aware: in Arabic it grows from the right.
 *
 * Uses transform: scaleX (compositor-friendly) and reads from the shared
 * scroll engine — zero extra listeners, no jitter.
 */
const ScrollProgress = () => {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = fillRef.current;
    if (!node) return;
    const unsubscribe = subscribeScroll(({ progress }) => {
      node.style.transform = `scaleX(${progress.toFixed(4)})`;
    });
    return unsubscribe;
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] pointer-events-none"
    >
      {/* Sub-rail — keeps the bar visible even at 0% progress as a faint hint */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      {/* Active fill — grows with page progress */}
      <div
        ref={fillRef}
        className="absolute inset-y-0 left-0 w-full origin-left rtl:origin-right will-change-transform"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, hsl(42 70% 45% / 0) 0%, hsl(45 90% 70% / 0.95) 50%, hsl(48 95% 80% / 0.9) 100%)",
          boxShadow: "0 0 12px hsl(45 90% 65% / 0.45)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;