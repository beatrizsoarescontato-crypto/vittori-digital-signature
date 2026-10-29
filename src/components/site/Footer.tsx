import { Link } from "@tanstack/react-router";
import { EMAIL, INSTAGRAM, VITTORI_WHATS_LABEL, whatsappLink } from "@/lib/contato";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 bg-preto/85 py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl font-light text-marfim">
            VITTORI<span className="text-dourado">.</span>
          </p>
          <p className="caption mt-3">Creative House</p>
          <p className="mt-8 font-serif text-2xl italic text-marfim/80">
            Criamos presença. <span className="text-dourado">✦</span>
          </p>
        </div>

        <div className="space-y-3 text-sm text-marfim/70 md:col-span-4">
          <p className="label-mono mb-5 text-dourado">Contato</p>
          <p>Brasília, DF. Atendemos todo o Brasil e o exterior.</p>
          <p>
            <strong className="font-semibold text-marfim">Telefone</strong>: {" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-marfim hover:text-dourado">
              {VITTORI_WHATS_LABEL}
            </a>
          </p>
          {EMAIL && (
            <p>
              E-mail:{" "}
              <a href={`mailto:${EMAIL}`} className="text-marfim hover:text-dourado">
                {EMAIL}
              </a>
            </p>
          )}
          {INSTAGRAM && (
            <p>
              Instagram:{" "}
              <a
                href={`https://instagram.com/${INSTAGRAM.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-marfim hover:text-dourado"
              >
                {INSTAGRAM}
              </a>
            </p>
          )}
        </div>

        <nav className="flex flex-col gap-3 text-sm text-marfim/85 md:col-span-3">
          <p className="label-mono mb-5 text-dourado">Legal</p>
          <Link to="/privacidade" className="hover:text-dourado">Privacidade</Link>
          <Link to="/cookies" className="hover:text-dourado">Cookies</Link>
          <Link to="/termos" className="hover:text-dourado">Termos</Link>
          <p className="caption mt-4">CNPJ 67.786.265/0001-38</p>
        </nav>
      </div>
    </footer>
  );
}
