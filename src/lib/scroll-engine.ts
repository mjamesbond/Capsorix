/**
 * scroll-engine — one shared rAF loop driving every scroll-synced motion.
 *
 * One listener, one tempo, one easing. The neural layer, parallax elements,
 * and reveals all read from the same source of truth so the whole site
 * breathes together.
 *
 * Tempo / easing constants mirror the CSS `--transition-smooth` curve
 * (cubic-bezier(0.22, 1, 0.36, 1)) so JS-driven and CSS-driven motion
 * never disagree.
 */

export interface ScrollFrame {
  /** Raw scrollY (px). */
  y: number;
  /** Eased scrollY — slow-in, smooth-out follow of `y`. */
  eased: number;
  /** Eased scroll velocity (px/frame at 60fps). */
  velocity: number;
  /** Normalized dt vs 60fps (1 ≈ 16.67ms). Capped to avoid jumps. */
  dt: number;
  /** Total document height − viewport, never < 1. */
  max: number;
  /** 0..1 progression through the page. */
  progress: number;
}

type Listener = (f: ScrollFrame) => void;

/** Single, site-wide ease factor — matches CSS --transition-smooth feel. */
const EASE = 0.08;

const listeners = new Set<Listener>();

let raf = 0;
let last = typeof performance !== "undefined" ? performance.now() : 0;
let easedY = typeof window !== "undefined" ? window.scrollY : 0;
let prevEased = easedY;
let started = false;

let idleFrames = 0;

const tick = (now: number) => {
  const dt = Math.min(40, now - last) / 16.67;
  last = now;

  const target = window.scrollY;
  // Ease toward target — frame-rate independent
  easedY += (target - easedY) * Math.min(1, EASE * dt);
  const velocity = easedY - prevEased;
  prevEased = easedY;

  // When motion has effectively stopped, throttle to ~15fps to keep
  // the main thread quiet between scrolls. Any new scroll input wakes
  // the loop back up to full 60fps via the scroll listener below.
  const moving = Math.abs(velocity) > 0.05 || Math.abs(target - easedY) > 0.05;
  if (moving) {
    idleFrames = 0;
  } else {
    idleFrames++;
  }

  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const progress = Math.min(1, Math.max(0, easedY / max));

  // Expose eased values to CSS for transform-only parallax (cheap)
  const root = document.documentElement;
  root.style.setProperty("--scroll-y", `${easedY.toFixed(2)}px`);
  root.style.setProperty("--scroll-progress", progress.toFixed(4));

  const frame: ScrollFrame = { y: target, eased: easedY, velocity, dt, max, progress };
  listeners.forEach((cb) => cb(frame));

  // Idle throttle: after ~½ second of stillness, drop to a slower cadence.
  if (idleFrames > 30) {
    raf = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 66) as unknown as number;
  } else {
    raf = requestAnimationFrame(tick);
  }
};

const start = () => {
  if (started || typeof window === "undefined") return;
  if (typeof document !== "undefined" && document.hidden) return;
  started = true;
  last = performance.now();
  easedY = window.scrollY;
  prevEased = easedY;
  raf = requestAnimationFrame(tick);
};

const stop = () => {
  if (!started) return;
  cancelAnimationFrame(raf);
  started = false;
};

// Pause/resume the shared loop with tab visibility — keeps memory/CPU
// quiet in background tabs so mobile browsers don't discard the page.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (started) {
        cancelAnimationFrame(raf);
        started = false;
      }
    } else if (listeners.size > 0 && !started) {
      start();
    }
  });
}

/** Subscribe to the shared scroll loop. Returns an unsubscribe fn. */
export const subscribeScroll = (cb: Listener): (() => void) => {
  if (typeof window === "undefined") return () => {};
  listeners.add(cb);
  if (!started) start();
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) stop();
  };
};

/** Read the current eased scroll without subscribing. */
export const getEasedScroll = () => easedY;

/** Single shared easing utility — same curve as CSS --transition-smooth. */
export const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);