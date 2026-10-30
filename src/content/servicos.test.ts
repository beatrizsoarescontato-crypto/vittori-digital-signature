import { describe, expect, it } from "vitest";
import { linhaPorSlug } from "./servicos";

describe("limites de Presença fornecidos no pacote de 30/10", () => {
  const planos = linhaPorSlug("presenca")?.planos ?? [];
  for (const [nome, publicacoes, reels, quantidadeCaptacoes, horasPorCaptacao, directsPorDiaUtil] of [
    ["Essencial", 12, 2, 1, 2, 0],
    ["Assinatura", 16, 4, 1, 5, 0],
    ["Legado", 22, 8, 2, 5, 2],
  ] as const) {
    const plano = () => planos.find(p => p.nome === nome);
    it(`${nome}: total mensal de publicações`, () => expect(plano()?.publicacoes).toBe(publicacoes));
    it(`${nome}: limite de Reels`, () => expect(plano()?.reels).toBe(reels));
    it(`${nome}: Reel de até 60 segundos`, () => expect(plano()?.duracaoReelSegundos).toBe(60));
    it(`${nome}: número de captações`, () => expect(plano()?.quantidadeCaptacoes).toBe(quantidadeCaptacoes));
    it(`${nome}: horas por sessão independente`, () => expect(plano()?.horasPorCaptacao).toBe(horasPorCaptacao));
    it(`${nome}: verificações de Direct por dia útil`, () => expect(plano()?.directsPorDiaUtil).toBe(directsPorDiaUtil));
  }
});