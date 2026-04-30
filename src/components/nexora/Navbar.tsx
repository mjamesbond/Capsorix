import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display font-bold text-primary-foreground text-lg">N</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-gold blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-display text-2xl font-semibold tracking-widest text-gradient-gold">
              NEXORA
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary-glow transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="btn-shimmer hidden sm:inline-flex items-center gap-2 rounded-full bg-gold-animated px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-[1.03]"
          >
            <span className="relative z-10">Start Your Project</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;