import { lazy, Suspense, useEffect, useState } from "react";

const STORAGE_KEY = "capsorix.perf";
const LazyPerfHud = lazy(() => import("./PerfHud"));

const shouldMountPerfHud = () => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("perf") === "1" || window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Keep PerfHud out of the critical bundle. It only loads when explicitly
 * enabled via ?perf=1, stored preference, or first Ctrl+Shift+P press.
 */
const PerfHudGate = () => {
  const [mounted, setMounted] = useState<boolean>(shouldMountPerfHud);

  useEffect(() => {
    if (mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) {
        try {
          window.localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setMounted(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <LazyPerfHud />
    </Suspense>
  );
};

export default PerfHudGate;
