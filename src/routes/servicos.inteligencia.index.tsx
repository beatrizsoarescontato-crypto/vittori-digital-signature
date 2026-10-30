import { createFileRoute, redirect } from "@tanstack/react-router";
/** Página duplicada descontinuada: os três produtos estão na seção Inteligência da home. */
export const Route = createFileRoute("/servicos/inteligencia/")({
  head: () => ({ meta: [
    { title: "Vittori Inteligência · Soluções para sua operação" },
    { name: "description", content: "Conheça os três produtos da Vittori Inteligência na página principal." },
    { property: "og:title", content: "Vittori Inteligência · Soluções para sua operação" },
    { property: "og:description", content: "Atendente de IA, sistema integrado e Estúdio de Posts Modelados." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, follow" },
  ] }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "inteligencia", replace: true }); },
  component: () => null,
});
