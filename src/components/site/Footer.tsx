export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-preto py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-serif text-3xl font-semibold tracking-[0.08em] text-marfim">
            VITTORI<span className="text-dourado">.</span>
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed tracking-[0.14em] text-muted-foreground uppercase">
            Creative House · Brasília — DF
          </p>
        </div>

        <nav className="flex flex-wrap gap-8">
          <a
            href="https://instagram.com"
            className="eyebrow text-marfim/70 transition-colors hover:text-dourado"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            className="eyebrow text-marfim/70 transition-colors hover:text-dourado"
          >
            LinkedIn
          </a>
          <a
            href="#top"
            className="eyebrow text-marfim/70 transition-colors hover:text-dourado"
          >
            Topo
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] px-6 md:px-12">
        <div className="rule-gold w-full" />
        <p className="mt-6 text-[0.65rem] tracking-[0.28em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} Vittori Creative House — Criamos presença.
        </p>
      </div>
    </footer>
  );
}
