import { describe, expect, it } from "vitest";
import { retornoPara } from "./navContexto";

describe("retornoPara", () => {
  it("serviço volta à seção Serviços", () => {
    expect(retornoPara("/servicos/presenca")).toMatchObject({ to: "/", hash: "servicos", label: "Voltar aos serviços" });
  });
  it("página da Inteligência volta à seção Inteligência", () => {
    expect(retornoPara("/servicos/inteligencia/")).toMatchObject({ to: "/", hash: "inteligencia" });
  });
  it("produto de IA volta à página da Inteligência", () => {
    expect(retornoPara("/servicos/inteligencia/atendente")).toMatchObject({ to: "/servicos/inteligencia", label: "Voltar à Vittori Inteligência" });
  });
  it("portfólio volta à seção Portfólio", () => {
    expect(retornoPara("/portfolio")).toMatchObject({ to: "/", hash: "portfolio" });
  });
  it("comece volta ao contato sem origem e à origem quando conhecida", () => {
    expect(retornoPara("/comece")).toMatchObject({ hash: "contato" });
    expect(retornoPara("/comece", "metodo")).toMatchObject({ hash: "metodo" });
  });
  it("serviço aberto a partir da Inteligência volta à Inteligência", () => {
    expect(retornoPara("/servicos/digital", "inteligencia")).toMatchObject({ hash: "inteligencia" });
  });
  it("páginas legais voltam ao início, home não tem retorno", () => {
    expect(retornoPara("/termos")).toMatchObject({ to: "/", label: "Voltar ao início" });
    expect(retornoPara("/")).toBeNull();
  });
});
