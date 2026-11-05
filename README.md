# VITTORI CREATIVE HOUSE

Crie um site institucional one-page para a "Vittori Creative House", uma agência criativa de alto padrão (estratégia, design e conteúdo) de Brasília. O tom da marca é: "Vittori é mais que uma agência. É uma assinatura. Criamos presença."

ARQUIVOS DE REFERÊNCIA (vou anexar — use-os como guia OBRIGATÓRIO):

IDENTIDADE VISUAL (obrigatória, seguir à risca):

- Paleta: Bordô #8B0F1A, Marrom Escuro #281C15, Marrom Quente #6A4A33, Dourado #C8A25A, Marfim #F2EFE6, Preto #0D0D0D.

- Tipografia: Cormorant Garamond (títulos, serifada elegante de contraste alto) + Montserrat (corpo, leve 300).

- Símbolos: a estrela ✦ como pontuação visual (rara, uma por composição, em dourado) e o monograma "V" gigante como marca d'água e elemento de assinatura.

- Direção fotográfica: cinematográfica — luz e sombra dramáticas, mármore, madeira escura, latão, couro, flores escuras, objetos de design. Tom quente, profundo e atmosférico. NADA de banco de imagens genérico.

SEÇÕES: Hero (frase "Criamos presença. Você deixa legado."), Sobre (manifesto + V gigante), Os 4 Pilares (Excelência, Estratégia, Criatividade, Presença), Serviços (Estratégia de Marca, Identidade Visual, Design & Direção de Arte, Conteúdo & Copy, Presença Digital), Portfólio, CTA final, Footer.

ELEMENTOS 3D E MOVIMENTO (parte mais importante):

- Use Three.js ou React Three Fiber para criar objetos 3D REAIS e autorais, não só efeitos de CSS:

  1. Um monograma "V" 3D em metal dourado escovado com textura de latão, girando lentamente em loop no hero, com iluminação dramática (spotlight) e reflexos.

  2. Estrelas ✦ 3D flutuantes espalhadas pelo site, em dourado, com leve rotação e parallax conforme o scroll.

  3. Partículas douradas (particle system) ao fundo, densidade baixa e elegante.

  4. Cards de portfólio com tilt 3D real (reagem ao mouse com perspectiva) e profundidade.

- Scroll animado com ScrollTrigger (GSAP): parallax nas seções, texto que revela por camadas, o "V" que escala/rotaciona conforme rola.

- Transições suaves entre seções, sem cortes secos.

REGRA ANTI-IA / ANTI-GENÉRICO (crítico):

- NÃO use templates prontos de landing page, gradientes neon, blur excessivo, glassmorphism genérico, emojis, ou aquela estética "AI website" de cards iguais e fontes padrão.

- Nada de imagens de banco óbvias (apertos de mão, pessoas sorrindo em escritório, mãos em laptop).

- O site deve parecer feito por um estúdio de design de luxo: muito respiro (whitespace), tipografia grande e editorial, hierarquia clara, materiais nobres.

- O dourado é acento — nunca domine a composição. O fundo predominante deve ser escuro (preto/marrom escuro) com o dourado como ponto de luz.

- Cada seção deve ter personalidade própria, não ser um grid repetido de cards idênticos.

RESPONSIVO: mobile perfeito, menu hambúrguer elegante, animações suaves (sem travar).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vittori-digital-signature.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3ad80d55-ebc1-46fa-a05d-2b345ab2ad68).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
