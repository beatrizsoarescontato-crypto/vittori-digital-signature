/** Canais públicos da Vittori. Nenhum dado sensível. */
export const VITTORI_WHATS = "5561981371674";
export const VITTORI_WHATS_LABEL = "(61) 9 8137-1674";
export const HENRIQUE_WHATS = "5517997220909";
export const HENRIQUE_WHATS_LABEL = "(17) 99722-0909";

/** Preencher quando existirem. Enquanto vazios, não aparecem no site. */
export const EMAIL = "";
export const INSTAGRAM = "";

export const MSG_VITTORI = "Olá! Vim pelo site da Vittori e quero conversar sobre a minha marca.";

export type ProdutoIA = "Atendente de IA" | "Sistemas e Painéis" | "Estúdio de Posts";

const wa = (numero: string, texto: string) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

export const whatsappLink = (texto: string = MSG_VITTORI) => wa(VITTORI_WHATS, texto);

export const henriqueLink = (produto?: ProdutoIA, texto?: string) =>
  wa(
    HENRIQUE_WHATS,
    texto ??
      (produto
        ? `Olá, Henrique! Vim pelo site da Vittori e quero entender a ${produto}.`
        : "Olá, Henrique! Vim pelo site da Vittori e quero entender a Vittori Inteligência."),
  );

/** Flags de prova: só ligar quando houver material real. */
export const SHOW_PROOF = false;
export const SHOW_BACKSTAGE_VIDEO = false;
export const SHOW_INTEL_VIDEOS = false;
