import { useEffect, useState } from "react";
import { setSound } from "@/lib/ambientAudio";

const KEY = "vittori-entrada";

/** Prólogo cinematográfico: contador, nome e escolha de som. Uma vez por sessão. */
export function EntryGate() {
  const [aberto, setAberto] = useState(true);
  const [saindo, setSaindo] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) {
      setAberto(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    let n = 0;
    const id = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      setPct(n);
      if (n >= 100) window.clearInterval(id);
    }, 60);
    return () => {
      window.clearInterval(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const entrar = (som: boolean) => {
    sessionStorage.setItem(KEY, "1");
    if (som) void setSound(true);
    setSaindo(true);
    document.documentElement.style.overflow = "";
    window.setTimeout(() => setAberto(false), 1400);
  };

  if (!aberto) return null;
  const pronto = pct >= 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Entrada do site Vittori"
      className={`entry-gate fixed inset-0 z-[100] flex flex-col items-center justify-center bg-preto px-6 transition-all duration-[1400ms] ease-out ${
        saindo ? "pointer-events-none opacity-0 [filter:blur(12px)]" : "opacity-100"
      }`}
    >
      <div aria-hidden className="entry-stars absolute inset-0" />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(55% 55% at 50% 50%, color-mix(in oklab, var(--bordo) 45%, transparent), transparent 75%)" }} />

      <p className="label-mono relative text-dourado">✦ Casa criativa · Brasília</p>
      <p className="entry-word relative mt-8 font-serif text-[clamp(3.5rem,14vw,11rem)] font-light leading-none tracking-[0.12em] text-marfim">
        VITTORI
      </p>
      <p className="relative mt-6 font-serif text-xl italic text-marfim/70 md:text-2xl">Mais que uma agência. Uma assinatura.</p>

      <div className="relative mt-14 h-12">
        {!pronto ? (
          <p className="label-mono tabular-nums text-marfim/60" aria-live="polite">
            {pct}% carregado
          </p>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row animate-in fade-in duration-700">
            <button
              type="button"
              onClick={() => entrar(true)}
              className="label-mono min-h-12 border border-dourado bg-dourado px-8 text-preto transition-colors hover:bg-marfim"
            >
              Entrar com som
            </button>
            <button
              type="button"
              onClick={() => entrar(false)}
              className="label-mono min-h-12 border border-marfim/30 px-8 text-marfim transition-colors hover:border-dourado hover:text-dourado"
            >
              Entrar em silêncio
            </button>
          </div>
        )}
      </div>
      <p className="caption relative mt-10 text-center">Experiência melhor com fones de ouvido.</p>
    </div>
  );
}
