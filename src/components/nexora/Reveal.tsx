import { ReactNode, useEffect, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before this element reveals. */
  delay?: number;
  /** Adds a blur-in effect alongside the fade/translate. */
  blur?: boolean;
  /**
   * Auto-stagger immediate children — each child reveals
   * `stagger` ms after the previous one. Children inherit
   * a `.reveal` baseline.
   */
  stagger?: number;
  as?: "div" | "section" | "article" | "header" | "ul" | "li";
}

/**
 * Reveal — a controlled, cinematic appearance primitive.
 *
 * Single elements fade + lift in slowly. When `stagger` is set, the
 * immediate children reveal sequentially so a section "assembles" instead
 * of arriving all at once. Timing is tuned for slow-in, smooth-out.
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  blur = false,
  stagger,
  as: Tag = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If staggering, prep children with the reveal baseline + per-index delay
    if (stagger && stagger > 0) {
      Array.from(node.children).forEach((child, i) => {
        const el = child as HTMLElement;
        if (!el.classList.contains("reveal") && !el.classList.contains("reveal-blur")) {
          el.classList.add(blur ? "reveal-blur" : "reveal");
        }
        el.dataset.revealDelay = String(delay + i * stagger);
      });
    }

    const targets: HTMLElement[] = stagger
      ? (Array.from(node.children) as HTMLElement[])
      : [node as HTMLElement];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const d = Number(el.dataset.revealDelay ?? delay);
            window.setTimeout(() => el.classList.add("is-visible"), d);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    if (stagger) {
      // Observe the container; when it crosses, reveal staggered children
      const containerObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            targets.forEach((el) => {
              const d = Number(el.dataset.revealDelay ?? 0);
              window.setTimeout(() => el.classList.add("is-visible"), d);
            });
            containerObs.unobserve(node);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      containerObs.observe(node);
      return () => containerObs.disconnect();
    }

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [delay, blur, stagger]);

  const isContainer = !!stagger;
  const baseClass = isContainer ? "" : blur ? "reveal-blur" : "reveal";

  return (
    <Tag ref={ref as never} className={`${baseClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
};

export default Reveal;
