import { Linkedin } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import capsorixLogo from "@/assets/capsorix-logo.png";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.797l-5.32-6.61L4.3 22H1.04l8.04-9.19L1.5 2h6.93l4.81 6.04L18.244 2Zm-1.19 18h1.88L7.04 4H5.04l12.014 16Z" />
  </svg>
);

const socials = [
  { href: "https://x.com/capsorix", label: "X (Twitter)", Icon: XIcon },
  { href: "https://www.linkedin.com/company/capsorix", label: "LinkedIn", Icon: Linkedin },
];

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
            <div className="mb-4" dir="ltr">
              <img
                src={capsorixLogo}
                alt="Capsorix"
                width={620}
                height={160}
                className="h-10 w-auto select-none"
                draggable={false}
              />
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
          <div className="flex items-center gap-3" dir="ltr">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/40 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary-glow hover:shadow-gold hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
          <p className="tracking-[0.2em] uppercase">{t.footer.values}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
