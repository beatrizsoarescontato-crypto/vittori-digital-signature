import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ServicePage } from "@/components/servicos/ServicePage";
import { linhaPorSlug } from "@/content/servicos";

export const Route = createFileRoute("/servicos/$linha")({
  loader: ({ params }) => {
    const l = linhaPorSlug(params.linha);
    if (!l) throw notFound();
    return { slug: l.slug };
  },
  head: ({ loaderData }) => {
    const l = loaderData ? linhaPorSlug(loaderData.slug) : undefined;
    if (!l) return { meta: [{ title: "Serviço · Vittori Creative House" }, { name: "robots", content: "noindex" }] };
    const t = `${l.linha} · ${l.titulo}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: l.descricao },
        { property: "og:title", content: t },
        { property: "og:description", content: l.descricao },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: l.linha,
            description: l.descricao,
            provider: { "@type": "LocalBusiness", name: "Vittori Creative House" },
            areaServed: ["BR", "Worldwide"],
          }),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const l = linhaPorSlug(slug)!;
  return (
    <SiteShell>
      <ServicePage l={l} />
    </SiteShell>
  );
}
