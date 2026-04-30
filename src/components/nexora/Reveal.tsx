import { ReactNode, useEffect, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  as?: "div" | "section" | "article" | "header" | "ul" | "li";
}

const Reveal = ({ children, className = "", delay = 0, blur = false, as: Tag = "div" }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => node.classList.add("is-visible"), delay);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const baseClass = blur ? "reveal-blur" : "reveal";
  return (
    <Tag
      ref={ref as never}
      className={`${baseClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
