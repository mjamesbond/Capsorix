import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared shell for all sub-pages. Provides:
 * - Consistent Navbar + Footer
 * - Scroll-to-top on route change
 * - A single, controlled page-fade transition
 * - Shared dark canvas + spacing
 */
const SubpageShell = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SubpageShell;