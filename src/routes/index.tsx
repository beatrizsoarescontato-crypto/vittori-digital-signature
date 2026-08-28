import { createFileRoute } from "@tanstack/react-router";
import { ClientStage } from "@/components/ClientCanvas";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Pilares } from "@/components/site/Pilares";
import { Servicos } from "@/components/site/Servicos";
import { Portfolio } from "@/components/site/Portfolio";
import { Processo } from "@/components/site/Processo";
import { Depoimentos } from "@/components/site/Depoimentos";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TITULO = "Vittori Creative House — Criamos presença";
const DESC =
  "Agência criativa de alto padrão em Brasília: estratégia de marca, identidade visual, direção de arte, conteúdo e presença digital.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vittori Creative House",
  description: DESC,
  slogan: "Criamos presença.",
  url: "https://vittori.house",
  email: "contato@vittori.house",
  telephone: "+55-61-99999-9999",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brasília",
    addressRegion: "DF",
    addressCountry: "BR",
  },
  areaServed: "BR",
  knowsAbout: [
    "Estratégia de marca",
    "Identidade visual",
    "Direção de arte",
    "Conteúdo e copy",
    "Presença digital",
  ],
  sameAs: ["https://instagram.com", "https://www.linkedin.com"],
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
    links: [{ rel: "canonical", href: "https://vittori.house/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();

  return (
    <div className="relative bg-preto">
      {/* Cena 3D única, atravessando toda a página */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ClientStage />
      </div>

      <Nav />
      <Cursor />

      <main className="relative z-10">
        <Hero />
        <Sobre />
        <Pilares />
        <Servicos />
        <Portfolio />
        <Processo />
        <Depoimentos />
        <CtaFinal />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <WhatsAppFab />
    </div>
  );
}
