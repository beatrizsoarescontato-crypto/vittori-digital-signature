import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", hash: "servicos", label: "Serviços" },
  { to: "/", hash: "metodo", label: "Como trabalhamos" },
  { to: "/servicos/inteligencia", label: "Inteligência" },
  { to: "/", hash: "contato", label: "Contato" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        scrolled ? "border-b border-border bg-preto/85 py-3 backdrop-blur-md" : "border-b border-transparent py-6"
      }`}
    >
      <div className="relative z-50 mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 md:px-12">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-2xl font-semibold tracking-[0.08em] text-marfim"
        >
          VITTORI<span className="text-dourado">.</span>
        </Link>

        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                className="label-mono py-1 text-marfim/80 transition-colors duration-300 hover:text-dourado"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/comece"
            className="label-mono hidden border border-dourado/50 px-5 py-3 text-dourado transition-colors duration-500 hover:bg-dourado hover:text-preto lg:inline-block"
          >
            Agendar uma conversa
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-end justify-center gap-[6px] lg:hidden"
          >
            <span className={`h-px w-6 bg-marfim transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px bg-dourado transition-all duration-300 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-preto px-8 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            {...("hash" in l ? { hash: l.hash } : {})}
            onClick={() => setOpen(false)}
            className="border-b border-border/40 py-4 font-serif text-4xl font-light text-marfim"
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/comece"
          onClick={() => setOpen(false)}
          className="label-mono mt-10 bg-bordo px-6 py-4 text-center text-marfim"
        >
          Agendar uma conversa
        </Link>
      </div>
    </header>
  );
}
