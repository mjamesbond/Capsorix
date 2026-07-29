import { useEffect, useRef, type PointerEventHandler } from "react";
import founderBust from "@/assets/founder-bust.webp";
import { usePerformanceProfile } from "@/hooks/use-performance-profile";

const FounderBust = () => {
  const artworkRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const { allowDecorativeMotion } = usePerformanceProfile();

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const updateTransform = (x = 0, y = 0) => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    artwork.style.transform = [
      "perspective(900px)",
      `translate3d(${x * 4}px, ${y * 3}px, 0)`,
      `rotateX(${-y * 2.5}deg)`,
      `rotateY(${x * 3}deg)`,
    ].join(" ");
  };

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (!allowDecorativeMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => updateTransform(x, y));
  };

  const handlePointerLeave = () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => updateTransform());
  };

  return (
    <figure
      className="group relative mx-auto w-full max-w-[11rem] sm:max-w-[12rem] lg:max-w-[12.5rem] select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] bottom-[2%] h-10 rounded-full bg-primary/20 blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[9%_-13%_6%] rounded-[48%] border border-primary/15 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />
      <div
        ref={artworkRef}
        className="relative origin-[50%_72%] transition-[transform,filter] duration-300 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={founderBust}
          alt="Marble bust of Mohamed B. Elbakrey, founder of Capsorix"
          width={180}
          height={259}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="relative z-10 block h-auto w-full drop-shadow-[0_24px_34px_hsl(42_70%_45%/0.2)]"
        />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[92%] top-[55%] hidden h-px w-12 bg-gradient-to-r from-primary/35 to-transparent lg:block"
      />
      <figcaption className="sr-only">Mohamed B. Elbakrey, founder of Capsorix.</figcaption>
    </figure>
  );
};

export default FounderBust;
