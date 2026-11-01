import { henriqueLink, type ProdutoIA } from "@/lib/contato";

/** Commercial constraints supplied by the owner, not inferred package promises. */
export const CONTRATACAO_IA = {
  atendente: {
    produto: "Atendente de IA" as ProdutoIA,
    implantacao: "Criação, configuração e implementação da atendente.",
  },
  sistemas: {
    produto: "Sistemas e Painéis" as ProdutoIA,
    implantacao: "Configuração, integração e personalização do sistema unificado.",
  },
  "estudio-de-posts": {
    produto: "Estúdio de Posts" as ProdutoIA,
    implantacao: "Criação, configuração e personalização do sistema.",
  },
} as const;

export type ProdutoSlug = keyof typeof CONTRATACAO_IA;
export const MODALIDADES_IA = ["implantacao", "implantacao-recorrencia"] as const;
export const REGRAS_IA = {
  personalizacao: "escopo-e-viabilidade",
  suporte: "contratado",
  melhorias: "contratadas",
  postsCobranca: "sistema",
  indicadoresAtualizacao: "plataforma-integrada",
} as const;
export const RECORRENCIA_IA = "Implementação acompanhada de suporte, manutenção e melhorias previstas no contrato.";

export function demonstracaoLink(slug: ProdutoSlug) {
  const produto = slug === "atendente" ? "Atendente de IA" : slug === "sistemas" ? "Sistemas e Painéis" : "Estúdio de Posts Modelados";
  return henriqueLink(CONTRATACAO_IA[slug].produto, `Olá, Henrique! Vim pelo site da Vittori e gostaria de agendar uma demonstração do produto ${produto}.`);
}