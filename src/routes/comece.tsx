import { createFileRoute } from "@tanstack/react-router";
import { PaginaSimples } from "@/components/site/PaginaSimples";
import { Btn } from "@/components/site/ui";
import { whatsappLink } from "@/lib/contato";

const T = "Agendar uma conversa · Vittori Creative House";
const D = "Uma conversa de até 40 minutos para entender o seu momento e mostrar por onde começar.";

export const Route = createFileRoute("/comece")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <PaginaSimples eyebrow="Comece" titulo="Conte o que você está construindo.">
      <p>{D}</p>
      <div className="pt-6">
        <p className="mb-5 font-semibold text-marfim">Beatriz Soares</p>
        <Btn href={whatsappLink()}>Falar no WhatsApp</Btn>
      </div>
    </PaginaSimples>
  ),
});
