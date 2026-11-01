import { describe, expect, it } from "vitest";
import { CONTRATACAO_IA, demonstracaoLink, MODALIDADES_IA, REGRAS_IA, type ProdutoSlug } from "./inteligencia";

describe("regras comerciais da Inteligência de 01/11", () => {
  for (const slug of Object.keys(CONTRATACAO_IA) as ProdutoSlug[]) {
    it(`${slug}: implantação e implantação com recorrência`, () => {
      expect(MODALIDADES_IA).toEqual(["implantacao", "implantacao-recorrencia"]);
      expect(CONTRATACAO_IA[slug]).toHaveProperty("implantacao");
    });
    it(`${slug}: demonstração vai ao WhatsApp de Henrique`, () => {
      const link = new URL(demonstracaoLink(slug));
      expect(link.hostname).toBe("wa.me");
      expect(link.pathname).toBe("/5517997220909");
      expect(link.searchParams.get("text")).toContain(slug === "atendente" ? "Atendente de IA" : slug === "sistemas" ? "Sistemas e Painéis" : "Estúdio de Posts Modelados");
    });
  }
  it("Estúdio é contratado como sistema, não por peça", () => expect(REGRAS_IA.postsCobranca).toBe("sistema"));
  it("atualização dos indicadores depende da plataforma integrada", () => expect(REGRAS_IA.indicadoresAtualizacao).toBe("plataforma-integrada"));
  it("personalização depende de escopo e viabilidade", () => expect(REGRAS_IA.personalizacao).toBe("escopo-e-viabilidade"));
  it("suporte e melhorias são contratados, não ilimitados", () => {
    expect(REGRAS_IA.suporte).toBe("contratado");
    expect(REGRAS_IA.melhorias).toBe("contratadas");
  });
});