import { linhaPorSlug } from "@/content/servicos";

/** Seções da home que podem ser origem/destino de retorno. */
export const SECOES: Record<string, string> = {
  servicos: "Voltar aos serviços",
  inteligencia: "Voltar à Inteligência",
  portfolio: "Voltar ao portfólio",
  metodo: "Voltar ao método",
  contato: "Voltar ao contato",
};

const NOMES_IA: Record<string, string> = {
  atendente: "Atendente",
  "estudio-de-posts": "Estúdio de Posts",
  sistemas: "Sistemas e Painéis",
};

export type Retorno = {
  to: "/";
  hash?: string;
  label: string;
  trilha: { label: string; to?: "/"; hash?: string }[];
};

const limpa = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/** Para onde o "Voltar" de cada página leva. `origem` = seção da home de onde a pessoa saiu (se conhecida). */
export function retornoPara(pathname: string, origem?: string | null): Retorno | null {
  const p = limpa(pathname);
  if (p === "/") return null;
  const daHome = origem && SECOES[origem] ? origem : null;
  const inicio = { label: "Início", to: "/" as const };

  const ia = p.match(/^\/servicos\/inteligencia\/([^/]+)$/);
  if (ia) {
    const nome = NOMES_IA[ia[1] ?? ""] ?? "Produto";
    const trilha = [inicio, { label: "Inteligência", to: "/" as const, hash: "inteligencia" }, { label: nome }];
    if (daHome && daHome !== "inteligencia") return { to: "/", hash: daHome, label: SECOES[daHome] ?? "Voltar", trilha };
    return { to: "/", hash: "inteligencia", label: "Voltar à Vittori Inteligência", trilha };
  }
  if (p === "/servicos/inteligencia") {
    const h = daHome ?? "inteligencia";
    return { to: "/", hash: h, label: SECOES[h] ?? "Voltar", trilha: [inicio, { label: "Inteligência" }] };
  }
  const linha = p.match(/^\/servicos\/([^/]+)$/);
  if (linha) {
    const h = daHome ?? "servicos";
    const nome = linhaPorSlug(linha[1] ?? "")?.linha ?? "Serviço";
    return { to: "/", hash: h, label: SECOES[h] ?? "Voltar", trilha: [inicio, { label: "Serviços", to: "/", hash: "servicos" }, { label: nome }] };
  }
  if (p === "/portfolio") {
    const h = daHome ?? "portfolio";
    return { to: "/", hash: h, label: SECOES[h] ?? "Voltar", trilha: [inicio, { label: "Portfólio" }] };
  }
  if (p === "/comece") {
    const h = daHome ?? "contato";
    return { to: "/", hash: h, label: SECOES[h] ?? "Voltar", trilha: [inicio, { label: "Comece" }] };
  }
  return { to: "/", label: "Voltar ao início", trilha: [] };
}
