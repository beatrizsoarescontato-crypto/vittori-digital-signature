# Vittori Creative House — site one-page

Site institucional one-page, escuro e cinematográfico, com 3D autoral (Three.js/R3F) e scroll animado. Tudo em português, seguindo à risca a paleta e tipografia da marca.

## Direção visual

- Fundo predominante preto #0D0D0D e marrom escuro #281C15; bordô #8B0F1A em blocos de tensão; dourado #C8A25A apenas como ponto de luz; marfim #F2EFE6 para texto.
- Cormorant Garamond para títulos (grandes, editoriais, itálico em palavras-chave), Montserrat 300 para corpo, com tracking largo em labels em caixa alta.
- Estrela ✦ como pontuação rara: no máximo uma por composição, sempre dourada.
- Monograma "V" como marca d'água gigante e elemento de assinatura.
- Muito respiro, sem cards idênticos repetidos: cada seção com composição própria (assimetria, listas editoriais, numeração, régua dourada).
- Sem glassmorphism genérico, gradientes neon, emojis, blur excessivo ou fotos de banco óbvias.

## Seções

1. **Hero** — "Criamos presença. Você deixa legado." com monograma "V" 3D em latão escovado girando em loop, spotlight dramático e reflexos; partículas douradas discretas ao fundo.
2. **Sobre** — manifesto ("Vittori é mais que uma agência. É uma assinatura.") em duas colunas assimétricas, com "V" gigante como marca d'água que escala e rotaciona no scroll.
3. **Os 4 Pilares** — Excelência, Estratégia, Criatividade, Presença: layout em faixas horizontais numeradas (01–04) que revelam por camadas, não um grid de cards.
4. **Serviços** — Estratégia de Marca, Identidade Visual, Design & Direção de Arte, Conteúdo & Copy, Presença Digital: lista editorial tipo índice; ao hover, a linha expande com descrição e detalhe dourado.
5. **Portfólio** — projetos com tilt 3D real reagindo ao mouse, com profundidade e imagens cinematográficas geradas (mármore, madeira escura, latão, couro, flores escuras). Serão projetos-vitrine fictícios com nomes/segmentos plausíveis, prontos para você substituir.
6. **CTA final** — "Pronto para criar presença?" em bloco bordô profundo, com contato direto (e-mail / WhatsApp). Sem formulário nem backend nesta etapa.
7. **Footer** — monograma, Brasília, redes, assinatura discreta.

## 3D e movimento

- React Three Fiber + drei em canvas client-only: monograma "V" 3D em metal dourado escovado (material metálico + iluminação com Lightformers, sem HDR externo), estrelas ✦ 3D flutuantes com parallax de scroll, e particle system dourado de baixa densidade.
- GSAP + ScrollTrigger: parallax por seção, revelação de texto em camadas, transformação do "V" conforme o scroll, transições suaves entre seções.
- Mobile: 3D com menos partículas e pixel ratio limitado; respeita `prefers-reduced-motion`.

## Responsivo

Mobile impecável: tipografia fluida, menu hambúrguer elegante em overlay escuro com links serifados grandes, tilt desativado no toque.

## Detalhes técnicos

- Reescrita de `src/routes/index.tsx` como a one-page, com componentes por seção em `src/components/`.
- Tokens de cor/tipografia da marca em `src/styles.css` (`@theme inline`), sem classes de cor hardcoded.
- Fontes Cormorant Garamond + Montserrat via `<link>` no `__root.tsx`.
- Canvas 3D montado com `ssr: false` / client-only para não renderizar no servidor.
- Imagens do portfólio e texturas geradas por IA no estilo cinematográfico definido, salvas em `src/assets/`.
- SEO: `head()` próprio na rota com título, descrição, og e twitter da Vittori.
