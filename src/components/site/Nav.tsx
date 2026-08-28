import { useEffect, useState } from "react";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#pilares", label: "Pilares" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#contato", label: "Contato" },
];

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-preto/80 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          className="font-serif text-2xl font-semibold tracking-[0.08em] text-marfim"
        >
          VITTORI<span className="text-dourado">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="eyebrow relative py-1 text-marfim transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dourado after:transition-all after:duration-400 hover:text-dourado hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-[6px] md:hidden"
        >
          <span
            className={`h-px bg-marfim transition-all duration-300 ${open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"}`}
          />
          <span
            className={`h-px bg-dourado transition-all duration-300 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-preto px-8 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="eyebrow mb-8">✦ Vittori Creative House</span>
        <nav className="flex flex-col gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl font-light text-marfim transition-colors hover:text-dourado"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="rule-gold mt-10 w-24" />
        <p className="mt-6 text-sm text-muted-foreground">Brasília — DF</p>
      </div>
    </header>
  );
}
