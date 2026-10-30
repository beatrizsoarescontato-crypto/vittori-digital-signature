import { describe, expect, it } from "vitest";
import { henriqueLink, whatsappLink } from "./contato";

describe("canais comerciais preservados", () => {
  it("CTAs da Inteligência usam Henrique, (17) 99722-0909", () => {
    expect(new URL(henriqueLink("Atendente de IA")).pathname).toBe("/5517997220909");
  });
  it("CTAs institucionais usam (61) 98137-1674", () => {
    expect(new URL(whatsappLink()).pathname).toBe("/5561981371674");
  });
});