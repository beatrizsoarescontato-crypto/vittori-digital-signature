import { createFileRoute, redirect } from "@tanstack/react-router";
import { whatsappLink } from "@/lib/contato";

const T = "Contato pelo WhatsApp · Vittori Creative House";
const D = "Converse com a Vittori sobre o próximo passo da sua marca pelo WhatsApp oficial.";

export const Route = createFileRoute("/comece")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  beforeLoad: () => { throw redirect({ href: whatsappLink(), statusCode: 302 }); },
  component: () => null,
});
