import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
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
      className={`group fixed bottom-6 right-5 z-40 flex size-12 items-center justify-center gap-3 border border-dourado/60 bg-preto/85 text-dourado backdrop-blur-md transition-all duration-500 hover:bg-dourado hover:text-preto md:bottom-8 md:right-8 md:h-auto md:w-auto md:px-5 md:py-3 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="label-mono hidden text-marfim group-hover:text-preto md:inline">Falar agora</span>
    </a>
  );
}
