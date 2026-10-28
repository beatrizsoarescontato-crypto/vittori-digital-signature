import { createFileRoute } from "@tanstack/react-router";
import { PaginaSimples } from "@/components/site/PaginaSimples";

const T = "Política de Privacidade · Vittori Creative House";
const D = "Política de Privacidade da Vittori Creative House.";

export const Route = createFileRoute("/privacidade")({
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
    <PaginaSimples eyebrow="Privacidade" titulo="Política de Privacidade">
      <p>Texto em revisão final. Publicaremos aqui em breve.</p>
      <p>VITTORI AGÊNCIA DE PUBLICIDADE LTDA · CNPJ 67.786.265/0001-38 · Brasília, DF.</p>
    </PaginaSimples>
  ),
});
