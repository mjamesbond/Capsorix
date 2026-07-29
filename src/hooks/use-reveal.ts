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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );

    targets.forEach((target) => observer.observe(target));
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

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const connection = nav.connection;
    const constrained =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024 ||
      Boolean(connection?.saveData) ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");

    if (constrained) return;

    // Cache layout-dependent values. Reading getBoundingClientRect() on
    // every scroll frame forces a synchronous layout (reflow) per element.
    let elementCenter = 0;
    let viewportH = window.innerHeight;
    let lastY = Number.NaN;
    let visible = true;

    const measure = () => {
      const previousTransform = node.style.transform;
      node.style.transform = "";
      const rect = node.getBoundingClientRect();
      elementCenter = rect.top + window.scrollY + rect.height / 2;
      node.style.transform = previousTransform;
      viewportH = window.innerHeight;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(node);
    window.addEventListener("resize", measure);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting;
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    intersectionObserver.observe(node);

    const unsubscribe = subscribeScroll(({ eased }) => {
      if (!visible) return;
      const viewportCenter = eased + viewportH / 2;
      const offset = (elementCenter - viewportCenter) * speed;
      if (Math.abs(offset - lastY) < 0.25) return;
      lastY = offset;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [speed]);

  return ref;
};
