import { createFileRoute } from "@tanstack/react-router";
import { ClientBackgroundCanvas } from "@/components/ClientCanvas";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Pilares } from "@/components/site/Pilares";
import { Servicos } from "@/components/site/Servicos";
import { Portfolio } from "@/components/site/Portfolio";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Footer } from "@/components/site/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TITULO = "Vittori Creative House — Criamos presença";
const DESC =
  "Agência criativa de alto padrão em Brasília: estratégia de marca, identidade visual, direção de arte, conteúdo e presença digital.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();

  return (
    <div className="relative bg-preto">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <ClientBackgroundCanvas />
      </div>

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Sobre />
        <Pilares />
        <Servicos />
        <Portfolio />
        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
