import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PortfolioGrid } from "@/components/home/Portfolio";
import { SectionTitle } from "@/components/site/ui";
import { VoltarContexto } from "@/components/site/Navegacao";

const T = "Portfólio · Vittori Creative House";
const D = "Visão geral de sites e páginas criados pela Vittori Creative House.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  return (
    <SiteShell>
      <section data-stage-section="wide" className="reading-veil pb-32 pt-28 md:pt-32">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <VoltarContexto />
          <SectionTitle className="mb-16" eyebrow="Portfólio" lines={["Visão geral", <em key="e" className="italic text-dourado">do que assinamos.</em>]} />
          <PortfolioGrid />
        </div>
      </section>
    </SiteShell>
  );
}
