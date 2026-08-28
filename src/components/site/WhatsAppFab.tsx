import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/contato";

export function WhatsAppFab() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Vittori no WhatsApp"
      className={`fixed bottom-6 right-5 z-40 flex min-h-12 items-center gap-3 border border-dourado/60 bg-preto/85 px-5 py-3 backdrop-blur-md transition-all duration-500 hover:bg-dourado md:bottom-8 md:right-8 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="text-dourado transition-colors group-hover:text-preto">✦</span>
      <span className="label-mono text-marfim">Falar agora</span>
    </a>
  );
}
