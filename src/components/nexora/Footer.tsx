import { useI18n } from "@/i18n/I18nProvider";

const Footer = () => {
  const { t } = useI18n();
  const links = [
    { id: "services", label: t.nav.services },
    { id: "process", label: t.nav.process },
    { id: "industries", label: t.nav.industries },
    { id: "contact", label: t.nav.contact },
  ];
  return (
    <footer className="relative border-t border-border/40 mt-10">
      <div className="container py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3" dir="ltr">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-widest text-gradient-gold">CAPSORIX</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">{t.footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-muted-foreground hover:text-primary-glow transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Capsorix Studio. {t.footer.rights}</p>
          <p className="tracking-[0.2em] uppercase">{t.footer.values}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
