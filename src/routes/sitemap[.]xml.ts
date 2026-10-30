import { createFileRoute } from "@tanstack/react-router";
import { LINHAS, PRODUTOS_IA } from "@/content/servicos";

const BASE = "https://vittoricreativehouse.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          "/",
          "/portfolio",
          ...LINHAS.map((l) => `/servicos/${l.slug}`),
          ...PRODUTOS_IA.map((p) => `/servicos/inteligencia/${p.slug}`),
          "/privacidade",
          "/cookies",
          "/termos",
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${BASE}${p}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
