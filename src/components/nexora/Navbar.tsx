import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { subscribeScroll } from "@/lib/scroll-engine";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageToggle from "./LanguageToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
    { to: "/ios", label: t.nav.ios },
    { to: "/android", label: t.nav.android },
    { to: "/web", label: t.nav.web },
  ];

  useEffect(() => {
    return subscribeScroll(({ eased }) => {
      const next = eased > 20;
      setScrolled((prev) => (prev === next ? prev : next));
    });
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className={`container transition-all duration-500 ${scrolled ? "max-w-6xl" : "max-w-7xl"}`}>
        <nav
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group" dir="ltr">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display font-bold text-primary-foreground text-lg">N</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-gold blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-display text-2xl font-semibold tracking-widest text-gradient-gold">
              NEXORA
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {sectionLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={sectionHref(l.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary-glow transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="h-4 w-px bg-border/50" aria-hidden />
            {pageLinks.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`text-sm font-medium transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gradient-gold after:transition-all after:duration-300 ${
                      active
                        ? "text-primary-glow after:w-full"
                        : "text-muted-foreground hover:text-primary-glow after:w-0 hover:after:w-full"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <a
              href={sectionHref("contact")}
              className="btn-shimmer hidden sm:inline-flex items-center gap-2 rounded-full bg-gold-animated px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03]"
            >
              <span className="relative z-10 lang-morph">{t.nav.cta}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
