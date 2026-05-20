import { useEffect, useRef, useState } from "react";

/**
 * PerfHud — lightweight in-app performance overlay.
 *
 * Shows live FPS, frame time (ms), and a rolling count of long tasks
 * (>50ms) so we can verify scroll-time smoothness without DevTools.
 *
 * Activation (any of):
 *   • URL contains `?perf=1`
 *   • localStorage key `capsorix.perf` is `"1"`
 *   • Press `Ctrl+Shift+P` to toggle at runtime
 *
 * Zero footprint when inactive — the component returns `null` and never
 * registers any observer, so production users pay nothing.
 */
const STORAGE_KEY = "capsorix.perf";

const isInitiallyEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("perf") === "1") return true;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

interface Stats {
  fps: number;
  frameMs: number;
  worstMs: number;
  longTasks: number;
  lastLongMs: number;
}

const PerfHud = () => {
  const [enabled, setEnabled] = useState<boolean>(isInitiallyEnabled);
  const [stats, setStats] = useState<Stats>({
    fps: 0,
    frameMs: 0,
    worstMs: 0,
    longTasks: 0,
    lastLongMs: 0,
  });
  const frames = useRef<number[]>([]);
  const longTotal = useRef(0);
  const lastLong = useRef(0);

  // Hotkey toggle — Ctrl+Shift+P
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) {
        e.preventDefault();
        setEnabled((v) => {
          const next = !v;
          try {
            window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
          } catch {
            /* ignore */
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // rAF sampling + PerformanceObserver for long tasks
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let prev = performance.now();
    let acc = 0;
    let count = 0;
    let worst = 0;

    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      frames.current.push(dt);
      if (frames.current.length > 120) frames.current.shift();
      acc += dt;
      count++;
      if (dt > worst) worst = dt;

      // Update HUD ~4×/sec to avoid causing jank itself
      if (acc >= 250) {
        const avg = acc / count;
        setStats({
          fps: Math.round(1000 / avg),
          frameMs: Math.round(avg * 10) / 10,
          worstMs: Math.round(worst * 10) / 10,
          longTasks: longTotal.current,
          lastLongMs: Math.round(lastLong.current),
        });
        acc = 0;
        count = 0;
        worst = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            longTotal.current += 1;
            lastLong.current = entry.duration;
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch {
      /* longtask not supported (Safari) — silently degrade */
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  const fpsColor =
    stats.fps >= 55
      ? "hsl(140 70% 55%)"
      : stats.fps >= 40
        ? "hsl(45 90% 60%)"
        : "hsl(0 75% 60%)";

  return (
    <div
      aria-hidden
      className="fixed bottom-3 left-3 z-[1000] pointer-events-none select-none font-mono text-[11px] leading-tight"
      style={{
        background: "hsl(0 0% 0% / 0.72)",
        color: "hsl(0 0% 92%)",
        border: "1px solid hsl(45 60% 45% / 0.35)",
        borderRadius: 8,
        padding: "8px 10px",
        backdropFilter: "blur(6px)",
        minWidth: 168,
        boxShadow: "0 6px 22px hsl(0 0% 0% / 0.5)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ opacity: 0.7 }}>PERF</span>
        <span style={{ opacity: 0.5 }}>Ctrl+Shift+P</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>FPS</span>
        <span style={{ color: fpsColor, fontWeight: 600 }}>{stats.fps}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Frame</span>
        <span>{stats.frameMs} ms</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Worst</span>
        <span>{stats.worstMs} ms</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Long tasks</span>
        <span>{stats.longTasks}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.7 }}>
        <span>Last</span>
        <span>{stats.lastLongMs ? `${stats.lastLongMs} ms` : "—"}</span>
      </div>
    </div>
  );
};

export default PerfHud;
