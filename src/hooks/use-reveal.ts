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

    // Driven by the shared scroll engine — same eased tempo as the rest
    // of the site. No per-element rAF, no per-element scroll listener.
    const unsubscribe = subscribeScroll(({ eased }) => {
      const rect = node.getBoundingClientRect();
      // Recover absolute element center from current eased value
      const elementCenter = rect.top + window.scrollY + rect.height / 2;
      const viewportCenter = eased + window.innerHeight / 2;
      const offset = (elementCenter - viewportCenter) * speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    return unsubscribe;
  }, [speed]);

  return ref;
};