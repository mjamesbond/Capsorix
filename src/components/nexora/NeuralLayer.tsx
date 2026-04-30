import { useEffect, useRef } from "react";

/**
 * NeuralLayer — ambient "intelligent system" backdrop.
 *
 * Slow-moving nodes connect/disconnect via faint gold lines as if a network
 * were quietly thinking. Tiny "byte" particles drift between nodes. The whole
 * system reacts gently to cursor proximity (very soft magnetic pull + glow).
 *
 * Tuned to be *barely* noticeable — controlled luxury, never flashy.
 * Pure canvas, pointer-events: none, fixed full-viewport.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
}

interface Byte {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
}

interface NeuralLayerProps {
  className?: string;
  /** Density factor (0.5 = sparse, 1 = default, 1.5 = denser). */
  density?: number;
  /** Maximum opacity of node glows / lines. Keep low. */
  intensity?: number;
}

const NeuralLayer = ({
  className = "",
  density = 1,
  intensity = 0.55,
}: NeuralLayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let bytes: Byte[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.max(18, Math.min(70, Math.round((area / 22000) * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: 0.8 + Math.random() * 1.4,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const LINK_DIST = 150;
    const CURSOR_RADIUS = 180;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 16.67; // normalized to 60fps frames
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.pulse += 0.008 * dt;

        // Wrap around edges softly
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Soft cursor magnetism
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / CURSOR_RADIUS) * 0.04;
            n.x += (dx / d) * f * dt;
            n.y += (dy / d) * f * dt;
          }
        }

        const breath = 0.55 + Math.sin(n.pulse) * 0.25;
        const glow = breath * intensity;

        // Soft halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grad.addColorStop(0, `hsla(45, 90%, 70%, ${0.18 * glow})`);
        grad.addColorStop(1, "hsla(45, 90%, 70%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(45, 85%, 75%, ${0.55 * intensity})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections (slow fade in/out by distance)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2);
            const t = 1 - d / LINK_DIST;
            // Boost lines near cursor
            let cursorBoost = 0;
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x;
              const my = (a.y + b.y) / 2 - mouse.y;
              const md = Math.sqrt(mx * mx + my * my);
              if (md < CURSOR_RADIUS) cursorBoost = (1 - md / CURSOR_RADIUS) * 0.18;
            }
            const alpha = (t * 0.12 + cursorBoost) * intensity;
            ctx.strokeStyle = `hsla(45, 70%, 65%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Occasionally emit a "byte" particle along the line
            if (!reduce && Math.random() < 0.0009 * t && bytes.length < 40) {
              bytes.push({
                x: a.x,
                y: a.y,
                vx: (b.x - a.x) / 240,
                vy: (b.y - a.y) / 240,
                life: 0,
                ttl: 240,
              });
            }
          }
        }
      }

      // Update + draw bytes
      bytes = bytes.filter((p) => p.life < p.ttl);
      for (const p of bytes) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;
        const a = (1 - p.life / p.ttl) * 0.5 * intensity;
        ctx.fillStyle = `hsla(48, 95%, 80%, ${a})`;
        ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.2, 1.2);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, intensity]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Vignette to keep edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background)/0.7)_100%)]" />
    </div>
  );
};

export default NeuralLayer;