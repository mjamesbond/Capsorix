import { useEffect, useState } from "react";

type PerformanceLevel = "full" | "balanced" | "minimal";

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

type NavigatorWithHints = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

export type PerformanceProfile = {
  level: PerformanceLevel;
  allowAmbientCanvas: boolean;
  allowDecorativeMotion: boolean;
  allowHeroCodePanel: boolean;
};

const sameProfile = (a: PerformanceProfile, b: PerformanceProfile) =>
  a.level === b.level &&
  a.allowAmbientCanvas === b.allowAmbientCanvas &&
  a.allowDecorativeMotion === b.allowDecorativeMotion &&
  a.allowHeroCodePanel === b.allowHeroCodePanel;

const detectProfile = (): PerformanceProfile => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      level: "balanced",
      allowAmbientCanvas: false,
      allowDecorativeMotion: false,
      allowHeroCodePanel: false,
    };
  }

  const nav = navigator as NavigatorWithHints;
  const connection = nav.connection;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const compactViewport = window.innerWidth < 1024;
  const saveData = Boolean(connection?.saveData);
  const slowConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;

  if (reducedMotion || saveData || slowConnection) {
    return {
      level: "minimal",
      allowAmbientCanvas: false,
      allowDecorativeMotion: false,
      allowHeroCodePanel: false,
    };
  }

  if (coarsePointer || compactViewport || lowMemory || lowCpu) {
    return {
      level: "balanced",
      allowAmbientCanvas: false,
      allowDecorativeMotion: false,
      allowHeroCodePanel: false,
    };
  }

  return {
    level: "full",
    allowAmbientCanvas: true,
    allowDecorativeMotion: true,
    allowHeroCodePanel: true,
  };
};

export const usePerformanceProfile = (): PerformanceProfile => {
  const [profile, setProfile] = useState<PerformanceProfile>(() => detectProfile());

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const connection = (navigator as NavigatorWithHints).connection;
    let resizeTimer = 0;

    const refresh = () => {
      const next = detectProfile();
      document.documentElement.dataset.performance = next.level;
      setProfile((current) => (sameProfile(current, next) ? current : next));
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 160);
    };

    refresh();
    reducedMotion.addEventListener("change", refresh);
    coarsePointer.addEventListener("change", refresh);
    connection?.addEventListener?.("change", refresh);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.clearTimeout(resizeTimer);
      reducedMotion.removeEventListener("change", refresh);
      coarsePointer.removeEventListener("change", refresh);
      connection?.removeEventListener?.("change", refresh);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return profile;
};
