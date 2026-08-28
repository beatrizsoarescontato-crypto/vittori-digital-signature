/** Contato público da Vittori (nenhum dado sensível — apenas canais divulgados). */
export const WHATSAPP_NUMERO = "5561999999999";
export const WHATSAPP_TEXTO_PADRAO =
  "Olá, Vittori. Vi o site e quero conversar sobre um projeto.";
export const whatsappLink = (texto: string = WHATSAPP_TEXTO_PADRAO) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
export const EMAIL = "contato@vittori.house";
