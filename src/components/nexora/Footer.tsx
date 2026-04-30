const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 mt-10">
      <div className="container py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-widest text-gradient-gold">NEXORA</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Engineered in shadow. Delivered in light. We build digital empires for those who lead.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {["Services", "Process", "Industries", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-primary-glow transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NEXORA Studio. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Crafted with obsession</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;