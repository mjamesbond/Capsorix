import { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  as?: "div" | "section" | "article" | "header" | "ul" | "li";
}

const Reveal = ({ children, className = "", delay = 0, blur = false, as: Tag = "div" }: RevealProps) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      data-reveal-delay={delay}
      className={`${blur ? "reveal-blur" : "reveal"} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
};

export default Reveal;