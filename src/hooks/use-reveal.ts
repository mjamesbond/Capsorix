import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll-engine";

/**
 * Adds the `is-visible` class to the element (and any descendants
 * marked with `.reveal` or `.reveal-blur`) when it enters the viewport.
 * Stagger child reveals with `data-reveal-delay="120"` (ms).
 */
export const useReveal = <T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = Array.from(node.querySelectorAll<HTMLElement>(".reveal, .reveal-blur"));
    if (node.classList.contains("reveal") || node.classList.contains("reveal-blur")) {
      targets.unshift(node);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [options]);

  return ref;
};

/**
 * Translates the element vertically based on scroll position.
 * `speed` of 0.2 means it moves at 20% of scroll speed (slower than page).
 * Negative values move opposite to scroll direction.
 */
export const useParallax = <T extends HTMLElement = HTMLElement>(speed = 0.2) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cache layout-dependent values. Reading getBoundingClientRect() on
    // every scroll frame forces a synchronous layout (reflow) per element
    // — the biggest source of scroll jank. We measure once and refresh
    // only on resize / when the element's size or position changes.
    let elementCenter = 0;
    let viewportH = window.innerHeight;
    let lastY = Number.NaN;
    let visible = true;

    const measure = () => {
      // Temporarily clear our transform so we read the *natural* position,
      // not the previously-translated one.
      const prev = node.style.transform;
      node.style.transform = "";
      const rect = node.getBoundingClientRect();
      elementCenter = rect.top + window.scrollY + rect.height / 2;
      node.style.transform = prev;
      viewportH = window.innerHeight;
    };

    measure();

    // Re-measure if the element itself or the viewport changes.
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    window.addEventListener("resize", measure);

    // Visibility gate — skip transform writes when off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible = e.isIntersecting;
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(node);

    const unsubscribe = subscribeScroll(({ eased }) => {
      if (!visible) return;
      const viewportCenter = eased + viewportH / 2;
      const offset = (elementCenter - viewportCenter) * speed;
      // Sub-pixel changes aren't worth a style write.
      if (Math.abs(offset - lastY) < 0.25) return;
      lastY = offset;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    return () => {
      unsubscribe();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [speed]);

  return ref;
};