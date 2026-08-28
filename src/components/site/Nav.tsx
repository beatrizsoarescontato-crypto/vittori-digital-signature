import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/contato";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#pilares", label: "Pilares" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-preto/75 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="relative z-50 mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 md:px-12">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="min-w-0 font-serif text-2xl font-semibold tracking-[0.08em] text-marfim"
        >
          VITTORI<span className="text-dourado">.</span>
        </a>

        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label-mono relative py-1 text-marfim/80 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dourado after:transition-all after:duration-500 hover:text-dourado hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono hidden border border-dourado/50 px-5 py-3 text-dourado transition-colors duration-400 hover:bg-dourado hover:text-preto lg:inline-block"
          >
            ✦ Orçamento
          </a>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 flex-col items-end justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`h-px bg-marfim transition-all duration-300 ${open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"}`}
            />
            <span
              className={`h-px bg-dourado transition-all duration-300 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`}
            />
          </button>
        </div>
      </div>

      {/* Barra de progresso de leitura */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-dourado transition-[width] duration-150"
        style={{ width: `${progresso * 100}%` }}
      />

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-preto px-8 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="label-mono mb-6 text-dourado">✦ Navegar</span>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-b border-border/40 py-4 font-serif text-4xl font-light text-marfim"
          >
            {l.label}
          </a>
        ))}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono mt-10 border border-dourado px-6 py-4 text-center text-dourado"
        >
          Pedir orçamento no WhatsApp
        </a>
      </div>
    </header>
  );
}
