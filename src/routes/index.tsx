import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Abertura, Resolve } from "@/components/home/Abertura";
import { ServicosHome } from "@/components/home/ServicosHome";
import { InteligenciaDestaque } from "@/components/home/InteligenciaDestaque";
import {
  ChamadaFinal,
  Metodo,
} from "@/components/home/Blocos";
import { VITTORI_WHATS } from "@/lib/contato";

const TITULO = "Vittori Creative House · Agência criativa em Brasília";
const DESC =
  "Social media, tráfego pago, audiovisual, sites e inteligência artificial para negócios que querem ser escolhidos pela qualidade. Brasília e todo o Brasil.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vittori Creative House",
  legalName: "VITTORI AGÊNCIA DE PUBLICIDADE LTDA",
  taxID: "67.786.265/0001-38",
  description: DESC,
  slogan: "Criamos presença.",
  url: "https://vittoricreativehouse.com.br",
  telephone: `+${VITTORI_WHATS}`,
  address: { "@type": "PostalAddress", addressLocality: "Brasília", addressRegion: "DF", addressCountry: "BR" },
  areaServed: ["BR", "Worldwide"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITULO },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://vittoricreativehouse.com.br/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Abertura />
      <Resolve />
      <ServicosHome />
      <InteligenciaDestaque />
      <Metodo />
      <ChamadaFinal />
    </SiteShell>
  );
}
