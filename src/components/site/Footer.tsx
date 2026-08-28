import { EMAIL, whatsappLink } from "@/lib/contato";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <p className="font-serif text-4xl font-semibold tracking-[0.06em] text-marfim">
              VITTORI<span className="text-dourado">.</span>
            </p>
            <p className="caption mt-4 max-w-xs leading-relaxed">
              Creative House · Brasília — DF · Estratégia, design e conteúdo para marcas de alto
              padrão.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="label-mono text-dourado">Navegar</p>
            <nav className="mt-5 flex flex-col gap-3">
              {[
                { href: "#sobre", l: "Sobre" },
                { href: "#pilares", l: "Pilares" },
                { href: "#servicos", l: "Serviços" },
                { href: "#portfolio", l: "Portfólio" },
                { href: "#processo", l: "Processo" },
              ].map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className="text-sm text-marfim/60 transition-colors hover:text-dourado"
                >
                  {i.l}
                </a>
              ))}
            </nav>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="label-mono text-dourado">Contato</p>
            <nav className="mt-5 flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-marfim/60 transition-colors hover:text-dourado"
              >
                {EMAIL}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-marfim/60 transition-colors hover:text-dourado"
              >
                WhatsApp · +55 61 99999-9999
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-marfim/60 transition-colors hover:text-dourado"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-marfim/60 transition-colors hover:text-dourado"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16">
          <div className="rule-gold w-full" />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="caption">
              © {new Date().getFullYear()} Vittori Creative House — Criamos presença.
            </p>
            <a href="#top" className="caption transition-colors hover:text-dourado">
              ✦ Voltar ao topo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
