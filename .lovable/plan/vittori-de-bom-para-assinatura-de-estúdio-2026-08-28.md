# Vittori — de "bom" para assinatura de estúdio

Objetivo: quem abre o site sente que está diante de um estúdio caro, não de um template. Foco em 3D com propósito (estilo Exoform: um objeto que atravessa a página conduzido pelo scroll), tipografia editorial de verdade, e performance/segurança sem abrir mão do peso visual.

## 1. Cena 3D com narrativa (o maior salto)

- **Fundo bordô atrás do monograma**: cúpula/plano bordô (#8B0F1A) com gradiente radial escurecendo nas bordas, atrás do "V". O bordô passa a ser a "parede" do estúdio; o preto vira o resto da página.
- **Estrela ✦ de volta e com papel**: estrela em latão orbitando o "V" no hero, mais estrelas menores como pontuação entre seções (marcadores de seção, não confete).
- **Um único objeto conduzido pelo scroll**: em vez de canvas separados por seção, o "V" + estrela vivem numa cena fixa que gira, translada e troca de material ao longo do scroll (ScrollTrigger com scrub). No hero está frontal e grande; em Sobre gira e desce para a lateral; nos Pilares fragmenta em 4 estrelas; no Portfólio recua; no CTA volta centralizado e brilhando.
- **Materiais mais nobres**: latão escovado com anisotropia (mapa de ruído direcional), leve dispersão nas arestas (bevel real na geometria) e reflexo de "estúdio" com 3 lightformers (marfim frontal, dourado lateral, bordô de contorno).
- **Partículas com contenção**: menos partículas, maiores, com desfoque e profundidade de campo suave — poeira dourada, não neve.

## 2. Tirar a cara de IA do design

- **Grid quebrado e assimétrico**: hoje tudo é centrado/empilhado. Passar para grid editorial de 12 colunas com blocos deslocados, texto em colunas estreitas (máx. ~54 caracteres), números de seção grandes em marfim translúcido.
- **Tipografia com hierarquia extrema**: títulos em Cormorant 96–160px, tracking negativo, itálico em uma palavra-chave por título; olho editorial (lead) em Montserrat 300 com muito entrelinha; labels em caixa alta 10px tracking 0.3em.
- **Regras e detalhes de impressão**: linhas de 1px em dourado a 20% separando seções, marcadores ✦, numeração romana nos pilares, legendas de imagem estilo catálogo.
- **Cor usada com intenção**: bordô como bloco de cor cheia em uma ou duas seções (não só accent), marfim como fundo de uma seção para quebrar o "site escuro inteiro" — contraste de capítulos.
- **Textura**: grão sutil, vinheta e leve papel/mármore em overlays de baixa opacidade para tirar o "digital limpo demais".
- **Microcopy autoral**: substituir frases genéricas ("soluções sob medida") por afirmações curtas e secas de marca.

## 3. Movimento com assinatura

- Revelação de títulos por máscara linha a linha (clip-path), não fade genérico.
- Cursor customizado com estado (ver / arrastar / abrir) nas peças de portfólio.
- Imagens do portfólio com parallax interno (imagem se move mais devagar que o card) e escala on hover com easing longo.
- Transição de seção em "cortina" bordô no CTA final.
- Contadores/anos e lista de serviços com stagger; accordion de serviços com altura animada suave.
- `prefers-reduced-motion` respeitado: tudo cai para estados estáticos.

## 4. Conversão (o povo tem que querer fechar)

- Hero com CTA duplo claro: "Iniciar projeto" (WhatsApp) + "Ver portfólio".
- Barra de prova social: nichos atendidos, anos, número de marcas, cidades.
- Cases com estrutura de resultado: desafio → o que fizemos → resultado (mesmo que qualitativo por agora).
- Bloco "Como trabalhamos" em 4 passos com prazos — reduz atrito de orçamento.
- Bloco de depoimentos (2–3) em formato editorial com aspas grandes.
- CTA final com formulário curto (nome, marca, WhatsApp, o que precisa) além do botão direto.
- Botão flutuante de WhatsApp discreto, em dourado, aparecendo após o primeiro scroll.

## 5. Responsivo de verdade

- Auditoria em 360, 390, 768, 1024, 1440 e 1920 com capturas.
- Tipografia fluida com `clamp()` em todos os títulos (hoje há saltos).
- 3D no mobile: cena simplificada (menos partículas, DPR limitado, estrela única) e o "V" nunca cobre texto.
- Alvos de toque ≥ 44px, accordion e menu testados por teclado.

## 6. Performance

- Canvas 3D só depois da hydration e apenas quando visível (IntersectionObserver + pausa do render loop fora de vista).
- `dpr` adaptativo e `frameloop="demand"` onde possível.
- Imagens do portfólio em WebP responsivo, `loading="lazy"`, dimensões explícitas para zerar layout shift; imagem do hero com prioridade.
- Fontes com `display=swap`, subset latin, preconnect.
- Meta de LCP < 2.5s e nenhuma janela longa de bloqueio na thread principal.

## 7. Segurança e SEO

- Nada de segredo no cliente; formulário enviado por função de servidor com validação Zod e rate limit por IP (requer backend/Lovable Cloud — confirmar se quer armazenar os leads).
- Headers de segurança e links externos com `rel="noopener noreferrer"`.
- JSON-LD `LocalBusiness` + `Organization` (Brasília, serviços, redes), canonical, sitemap, robots.
- `og:image` real gerada com o monograma para o preview no WhatsApp/LinkedIn.
- Alt text descritivo em todas as peças, hierarquia de headings correta, foco visível.

## Detalhes técnicos

- Uma cena R3F persistente em `src/components/three/StageCanvas.tsx` controlada por um store leve de progresso de scroll (Zustand ou ref + ScrollTrigger), substituindo `HeroCanvas` + `BackgroundCanvas`.
- Geometria do "V" com `ExtrudeGeometry` + bevel; estrela ✦ reaproveitada de `shapes.ts` com bevel próprio.
- GSAP timeline única com `scrub` e `snap` opcional por seção; `useScrollReveal` refatorado para máscaras de linha via `SplitText` manual (split por span, sem plugin pago).
- Tokens novos em `src/styles.css`: superfícies bordô/marfim, grão, sombras de estúdio, escala tipográfica fluida.

## Ordem sugerida

1. Fundo bordô + estrela + cena única guiada por scroll.
2. Redesign editorial das seções (grid, tipografia, capítulos de cor, texturas).
3. Blocos de conversão (prova social, processo, depoimentos, formulário).
4. Responsivo, performance, SEO/segurança e auditoria final com capturas.
