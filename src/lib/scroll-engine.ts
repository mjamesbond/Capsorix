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
let lastWrittenY = Number.NaN;

const tick = (now: number) => {
  const dt = Math.min(40, now - last) / 16.67;
  last = now;

  const target = window.scrollY;
  // Ease toward target — frame-rate independent
  easedY += (target - easedY) * Math.min(1, EASE * dt);
  const velocity = easedY - prevEased;
  prevEased = easedY;

  // When motion has effectively stopped, throttle hard so the shared loop
  // costs essentially nothing between scrolls. Any new scroll input wakes
  // the loop back up to full 60fps via the scroll listener below.
  const moving = Math.abs(velocity) > 0.05 || Math.abs(target - easedY) > 0.05;
  if (moving) {
    idleFrames = 0;
  } else {
    idleFrames++;
  }

  // Expose eased scroll to CSS only when the value has actually moved by
  // a perceptible amount — avoids a global style invalidation every frame
  // (which previously dominated Style Recalc cost). `--scroll-progress`
  // was removed: no rule consumed it, so the write was pure waste.
  if (Math.abs(easedY - lastWrittenY) >= 0.5) {
    document.documentElement.style.setProperty("--scroll-y", `${easedY.toFixed(1)}px`);
    lastWrittenY = easedY;
  }

  // Only build the frame object / run listeners when subscribers exist.
  if (listeners.size > 0) {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const progress = Math.min(1, Math.max(0, easedY / max));
    const frame: ScrollFrame = { y: target, eased: easedY, velocity, dt, max, progress };
    listeners.forEach((cb) => cb(frame));
  }

  // Idle bail-out: after ~⅓ second of stillness, suspend the rAF loop
  // entirely. The passive scroll listener restarts it the instant a real
  // scroll input arrives, so responsiveness is preserved.
  if (idleFrames > 20) {
    started = false;
    return;
  }
  raf = requestAnimationFrame(tick);
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
  clearTimeout(raf as unknown as number);
  started = false;
};

// Wake the loop the moment a real scroll happens — the idle throttle
// above drops to ~15fps when nothing is moving, and this listener is
// what restores full 60fps responsiveness on input.
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      idleFrames = 0;
      // Wake the loop if it bailed out during stillness.
      if (!started && listeners.size > 0) start();
    },
    { passive: true },
  );
}

// Pause/resume the shared loop with tab visibility — keeps memory/CPU
// quiet in background tabs so mobile browsers don't discard the page.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (started) {
        cancelAnimationFrame(raf);
        clearTimeout(raf as unknown as number);
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