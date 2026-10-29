# Navegação contextual e links do cabeçalho

Abertura cinematográfica, mergulho, V em partículas, halo e o retorno direto para "Criamos presença." ficam como estão.

## O que a visitante vai notar
1. **Voltar ao lugar de origem em todas as páginas internas**, discreto e no topo de cada página, com trilha (breadcrumb) quando fizer sentido:
   - Serviços (as 7 linhas): "← Voltar aos serviços", que leva à seção Serviços da home. Trilha: Início / Serviços / nome da linha.
   - Vittori Inteligência (página principal): "← Voltar à Inteligência", que leva à seção Inteligência da home.
   - Atendente, Estúdio de Posts, Sistemas: "← Voltar à Vittori Inteligência", que leva à página da Inteligência. Trilha: Início / Inteligência / produto.
   - Portfólio: "← Voltar ao portfólio", que leva à seção Portfólio da home.
   - Comece: volta à seção de onde a pessoa clicou (quando sabemos qual é) ou à seção Contato.
   - Privacidade, Termos, Cookies: "← Voltar ao início" (o rodapé é a origem).
   - Quando a pessoa chegou por um botão de outra seção (por exemplo, um "Saiba mais" do bloco Inteligência que abre um serviço), o texto do link acompanha essa origem.
2. **Cabeçalho certeiro de qualquer página**: Serviços, Como trabalhamos, Inteligência, Portfólio e Contato levam sempre à seção certa da home, com o título visível logo abaixo do cabeçalho, sem ficar escondido.
3. **Botões voltar/avançar do navegador** devolvem a pessoa à mesma altura da página onde ela estava.

## Detalhes técnicos
- Componente único `VoltarContexto` (link + breadcrumb no estilo `vlink`/`t-meta`), renderizado por `PageHero` e `PaginaSimples`; cada rota informa seu destino padrão.
- Origem: CTAs internos passam `search={{ de: "servicos" | "inteligencia" | "portfolio" | "contato" | ... }}` (validado com `fallback`, sem enum fechado); sem `de`, usa o destino padrão da página.
- Nav: Inteligência e Portfólio passam a apontar para `/#inteligencia` e `/#portfolio` (páginas completas seguem acessíveis pelos botões das seções).
- Rolagem por âncora: `scroll-margin-top` igual à altura do cabeçalho em todas as `section[id]`; um pequeno ajuste após a navegação que espera a home montar e as revelações estabilizarem antes de rolar até a âncora (corrige os casos em que hoje a posição falha). Mesmo clique na home faz rolagem suave; `prefers-reduced-motion` rola sem animação.
- `scrollRestoration` do roteador mantido; `getScrollRestorationKey` e verificação de que o voltar do navegador não é sobrescrito pela rolagem de âncora.
- Sem tocar em `StageCanvas`, `SceneReadiness`, `EntryGate`, `experienceRules`, `stageScroll`; a fase "inside" continua valendo ao voltar para a home.
- Teste pequeno da regra "página → destino de retorno" e verificação no Playwright (desktop e celular): cada link do cabeçalho a partir da home e de uma página interna, cada "Voltar" e voltar/avançar do navegador, conferindo que o título da seção fica visível abaixo do cabeçalho.
- Registrar no `roadmap.md`; Etapa 5 continua como próxima.
