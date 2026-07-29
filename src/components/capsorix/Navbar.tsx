import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { subscribeScroll } from "@/lib/scroll-engine";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import capsorixLogo from "@/assets/capsorix-logo.webp";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();
  const onHome = pathname === "/";
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const sectionLinks = [
    { href: "services", label: t.nav.services },
    { href: "process", label: t.nav.process },
    { href: "industries", label: t.nav.industries },
    { href: "contact", label: t.nav.contact },
  ];

  const pageLinks = [
    { to: "/about", label: t.nav.about, featured: true },
    { to: "/ios", label: t.nav.ios },
    { to: "/android", label: t.nav.android },
    { to: "/web", label: t.nav.web },
    { to: "/company-values", label: t.nav.values },
  ];

  useEffect(() => {
    return subscribeScroll(({ eased }) => {
      const next = eased > 20;
      setScrolled((prev) => (prev === next ? prev : next));
    });
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      data-scrolled={scrolled}
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-6"
      }`}
    >
      <div className={`container transition-all duration-500 ${scrolled ? "max-w-6xl" : "max-w-7xl"}`}>
        <nav
          aria-label="Primary"
          className={`site-nav flex items-center justify-between rounded-full px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center group shrink-0" dir="ltr" aria-label="Capsorix — Premium Software Systems, home">
            <img
              src={capsorixLogo}
              alt="Capsorix — Premium Software Systems"
              width={620}
              height={160}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-7 sm:h-9 md:h-10 w-auto select-none transition-opacity duration-300 group-hover:opacity-90"
              draggable={false}
            />
          </Link>

          <ul className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={sectionHref(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary-glow transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="h-4 w-px bg-border/50" aria-hidden />
            {pageLinks.map((link) => {
              const active = pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium transition-colors relative ${
                      link.featured
                        ? `rounded-full px-3 py-1.5 border transition-all duration-500 ${
                            active
                              ? "text-primary-glow border-primary/45 bg-primary/10 shadow-gold"
                              : "text-foreground/90 border-primary/25 hover:border-primary/45 hover:text-primary-glow"
                          }`
                        : `after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gradient-gold after:transition-all after:duration-300 ${
                            active
                              ? "text-primary-glow after:w-full"
                              : "text-muted-foreground hover:text-primary-glow after:w-0 hover:after:w-full"
                          }`
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <a
              href={sectionHref("contact")}
              className="btn-shimmer hidden lg:inline-flex items-center gap-2 rounded-full bg-gold-animated px-4 lg:px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03]"
            >
              <span className="relative z-10 lang-morph">{t.nav.cta}</span>
            </a>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="capsorix-navigation-panel"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((current) => !current)}
              className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background/40 text-foreground/85 transition-all duration-300 hover:border-primary/45 hover:text-primary-glow"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="capsorix-navigation-panel"
            className="xl:hidden mt-3 rounded-[1.75rem] glass-strong p-4 sm:p-5 shadow-elegant animate-fade-in"
          >
            <div className="sm:hidden mb-4 flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 p-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={closeMenu}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:text-primary-glow"
                >
                  {link.label}
                </a>
              ))}
              {pageLinks.map((link) => {
                const active = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "border-primary/35 bg-primary/10 text-primary-glow"
                        : "border-transparent text-foreground/85 hover:border-primary/20 hover:bg-primary/10 hover:text-primary-glow"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
