import { useEffect, useRef } from "react";
import { getEasedScroll, subscribeScroll } from "@/lib/scroll-engine";

/**
 * NeuralLayer — ambient "intelligent system" backdrop.
 *
 * A quiet neural network: slow-moving nodes connect via thin glowing lines,
 * occasional pulses travel along the edges, tiny byte particles drift through.
 * Most nodes glow soft gold; a rare few emit a cooler neon accent (cyan/violet).
 *
 * Reacts subtly to cursor proximity (soft magnetism) and scroll (slow parallax
 * drift). Tuned to be *barely* noticeable — controlled, alive, never flashy.
 * Pure canvas, pointer-events: none, fixed full-viewport.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  /** Color hue (gold by default; rare nodes get a cool accent). */
  hue: number;
  sat: number;
}

interface Byte {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
}

interface Pulse {
  /** Source + target node indices. */
  a: number;
  b: number;
  /** Progress 0 → 1 along edge. */
  t: number;
  /** Speed per frame at 60fps. */
  speed: number;
  hue: number;
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
    let pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    // Scroll drift now sourced from the shared scroll engine so the
    // neural layer breathes at exactly the same tempo as parallax + reveals.
    let easedScroll = getEasedScroll();
    const unsubscribeScroll = subscribeScroll(({ eased }) => {
      easedScroll = eased;
    });

    /** Pick a hue: mostly gold, rarely a cool neon accent. */
    const pickHue = () => {
      const r = Math.random();
      if (r < 0.06) return { hue: 195, sat: 80 }; // soft cyan
      if (r < 0.09) return { hue: 270, sat: 70 }; // soft violet
      return { hue: 45, sat: 85 }; // gold
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      // Slightly sparser baseline — avoids overcrowding. On small/touch
      // devices halve the count again so background tabs don't get killed
      // for memory pressure (iOS Safari is aggressive here).
      const isSmall = width < 768;
      const cap = isSmall ? 28 : 60;
      const divisor = isSmall ? 52000 : 26000;
      const count = Math.max(12, Math.min(cap, Math.round((area / divisor) * density)));
      nodes = Array.from({ length: count }, () => {
        const { hue, sat } = pickHue();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          r: 0.8 + Math.random() * 1.3,
          pulse: Math.random() * Math.PI * 2,
          hue,
          sat,
        };
      });
      pulses = [];
      bytes = [];
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
    const MAX_PULSES = 18;

    let raf = 0;
    let last = performance.now();
    let running = true;

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 16.67; // normalized to 60fps frames
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Use the globally-eased scroll value — same tempo as parallax
      const drift = easedScroll * 0.015;
      ctx.save();
      ctx.translate(0, -drift % height);

      // Soft deep-blue base wash — gives the layer its quiet, "thinking" mood
      const wash = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4 + drift,
        0,
        width * 0.5,
        height * 0.4 + drift,
        Math.max(width, height) * 0.7,
      );
      wash.addColorStop(0, "hsla(220, 60%, 18%, 0.18)");
      wash.addColorStop(1, "hsla(222, 60%, 6%, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.pulse += 0.006 * dt;

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
            const f = (1 - d / CURSOR_RADIUS) * 0.025;
            n.x += (dx / d) * f * dt;
            n.y += (dy / d) * f * dt;
          }
        }

        const breath = 0.55 + Math.sin(n.pulse) * 0.25;
        const glow = breath * intensity;

        // Soft halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grad.addColorStop(0, `hsla(${n.hue}, ${n.sat}%, 70%, ${0.16 * glow})`);
        grad.addColorStop(1, `hsla(${n.hue}, ${n.sat}%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(${n.hue}, ${n.sat}%, 78%, ${0.5 * intensity})`;
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
              if (md < CURSOR_RADIUS) cursorBoost = (1 - md / CURSOR_RADIUS) * 0.14;
            }
            const alpha = (t * 0.10 + cursorBoost) * intensity;
            // Blend hue between the two endpoints (mostly gold)
            const hueMix = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${hueMix}, 60%, 65%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Occasionally emit a "byte" particle along the line
            if (!reduce && Math.random() < 0.0007 * t && bytes.length < 35) {
              bytes.push({
                x: a.x,
                y: a.y,
                vx: (b.x - a.x) / 320,
                vy: (b.y - a.y) / 320,
                life: 0,
                ttl: 320,
              });
            }

            // Rarely birth a traveling pulse along the edge
            if (
              !reduce &&
              pulses.length < MAX_PULSES &&
              Math.random() < 0.00018 * t
            ) {
              pulses.push({
                a: i,
                b: j,
                t: 0,
                speed: 0.0035 + Math.random() * 0.004,
                hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 195 : 270) : 45,
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
        const a = (1 - p.life / p.ttl) * 0.45 * intensity;
        ctx.fillStyle = `hsla(48, 90%, 82%, ${a})`;
        ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.2, 1.2);
      }

      // Update + draw traveling pulses (soft glowing dots gliding along edges)
      pulses = pulses.filter((p) => p.t < 1 && nodes[p.a] && nodes[p.b]);
      for (const p of pulses) {
        p.t += p.speed * dt;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // Fade in and out with the journey
        const fade = Math.sin(p.t * Math.PI);
        const alpha = fade * 0.7 * intensity;
        // Outer glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${alpha * 0.55})`);
        g.addColorStop(1, `hsla(${p.hue}, 90%, 75%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.fillStyle = `hsla(${p.hue}, 95%, 88%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      unsubscribeScroll();
    };
  }, [density, intensity]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
    >
      {/* Deep blue base tint behind the network */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(220_60%_10%/0.5),transparent_70%)]" />
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Vignette to keep edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background)/0.7)_100%)]" />
    </div>
  );
};

export default NeuralLayer;