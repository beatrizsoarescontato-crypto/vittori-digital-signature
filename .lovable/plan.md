# Etapa 4: direção de arte dos componentes internos

Nada da abertura, do mergulho, do V em partículas, do halo da dispersão ou das otimizações de fluidez será tocado.

## Cuidados reforçados na aprovação
- Cards com personalidade e composição próprias por serviço, não caixas de vidro iguais trocando ícone e texto.
- Revisão tipográfica e de contraste em todas as seções: Pilares, Para Quem, O que esperar, Bastidores, FAQ, chamada final e páginas internas.
- Controles flutuantes realmente funcionais no celular, com área reservada e sem cobrir informação, não apenas menores.
- Vidro, reflexos e luz discretos e usados com intenção; dourado não em tudo; sem custo para a fluidez.
- Etapa 5 (portfólio editorial e rodapé) continua registrada como próxima fase.

## Passo 0: registrar pendências (primeira ação do Build, sem corrigir nada)
No `roadmap.md`, numa seção própria "Pendências para a rodada de refinamento", todas desmarcadas:
- Etapa 3: movimentos de câmera por seção; mudança de atmosfera e nebulosa entre seções; gravações completas de validação; emenda visual entre a hero e a seção seguinte.
- Etapas 1 e 2: recuperar os reflexos cintilantes sobre o metal do VITTORI como na versão anterior; avaliar a redução dos cerca de 2 segundos de espera antes do cenário aparecer, sem prejudicar a fluidez.
- Etapa 3 marcada como "evolução visual aprovada, itens acima em aberto".

## 1. Sistema de botões único (base de tudo)
Quatro funções com o mesmo vocabulário visual:
- **Principal**: vidro bordô profundo translúcido, contorno dourado em degradê fino, reflexo que atravessa o botão ao passar o mouse, seta que avança. Substitui o bordô sólido da hero.
- **Secundário**: transparente, contorno dourado fino, preenchimento suave de luz ao interagir.
- **Link de texto** ("Conhecer", "Ver projeto"): sublinhado dourado que se desenha e seta.
- **Ícone** (setas do carrossel, controles): círculo de vidro com contorno dourado.
Foco de teclado visível em todos. Aplicado em hero, cabeçalho, serviços, Inteligência, chamada final, páginas de serviço e "Comece".

## 2. Dourado com acabamento
Novo tratamento para palavras douradas ("presença", "Um time só", "Método Vittori"): degradê de vários tons de ouro (champanhe, ouro velho, bronze), textura granulada quase invisível e um reflexo lento que passa uma vez ao entrar na tela. Sem brilho exagerado; respeita movimento reduzido.

## 3. Escala tipográfica equilibrada
Cinco níveis fixos, usados em todo o site:
- Manchete (um pouco menor que hoje nas seções internas).
- Título de bloco/serviço (maior que hoje).
- Rótulo/categoria: deixa de ser letra minúscula espaçada quase ilegível; tamanho e contraste maiores.
- Descrição: corpo confortável, contraste alto.
- Entregáveis/detalhes: lista com ícone fino.
Reduz o salto entre títulos enormes e informações minúsculas.

## 4. Cards dos serviços (redesenho real)
- Vidro escuro translúcido em vez de retângulo opaco; contorno dourado de 1px que acende só no canto próximo ao cursor (luz localizada).
- Cada frente com identidade própria: um ícone desenhado maior em traço fino, um numeral editorial (01 a 07) e uma composição levemente diferente (posição do ícone, detalhe de ornamento ✦, linha diagonal).
- Hierarquia: categoria > título > frase curta > "Conhecer".
- Inteligência continua em destaque, mas em vidro bordô translúcido com brilho interno, não bloco vermelho sólido.
- Leve inclinação 3D ao passar o mouse (desligada no celular e em movimento reduzido). Arraste e setas mantidos.

## 5. Método Vittori
Linha do tempo horizontal no computador (vertical no celular): numerais grandes em dourado com acabamento, um fio dourado que se desenha ligando os quatro passos conforme a rolagem, ícone próprio em cada etapa, título e descrição separados, entregável em destaque. Deixa de ser quatro colunas iguais.

## 6. Vittori Inteligência
- Os três produtos viram painéis com protagonismo: nome grande, benefício em uma linha em dourado, explicação curta, e a demonstração enquadrada como uma tela premium (moldura de vidro, contorno dourado, sombras suaves).
- A conversa do WhatsApp e os simuladores ganham o mesmo acabamento, funcionando como hoje.
- Mesma hierarquia aplicada nas páginas de cada produto.

## 7. Páginas de serviço e planos
Cabeçalho com hierarquia nova, planos em cards de vidro com ícones próprios por plano, entregáveis em lista com ícone, plano recomendado destacado por luz, não por bloco sólido. Calculadora mantida, com o novo visual.

## 8. Controles flutuantes
Som e "Falar agora" viram pílulas compactas de vidro com contorno dourado. No celular: apenas ícones, menores, com espaço reservado no fim das seções para nunca cobrir conteúdo; escondem-se durante a rolagem rápida e voltam ao parar.

## 9. Textos da auditoria em todo o site
Varredura completa, não seção por seção. Já localizado:
- Card de Performance: "Anúncio que traz cliente, não só curtida." → "Campanhas orientadas a oportunidades reais de negócio."
- Seção "Você é bom no que faz...": a frase "Anúncios que trazem cliente, não só curtida." ainda aparece na sua captura; será corrigida também.
- Busca por qualquer outra variação ("curtida", promessas de resultado) em textos, páginas de serviço e títulos de página.

## Desempenho e responsividade
- Tudo em CSS (degradês, vidro, máscaras); nenhum novo elemento 3D. Desfoque de vidro limitado a poucos elementos e desligado em aparelhos fracos/celular, trocado por transparência simples.
- Efeitos de luz pelo cursor só no computador.
- Movimento reduzido: sem inclinação, sem reflexos animados.
- Conferência em 390, 768, 1280 e 1920 px.

## Validação antes de entregar
- Capturas antes/depois de: hero (botões), serviços, Método, Inteligência, uma página de serviço com planos, controles no celular.
- Gravação curta rolando a página no computador e no celular.
- Testes existentes passando, sem erros no console; conferir que abertura e halo continuam idênticos.
- Nada marcado como aprovado sem sua avaliação.

## Detalhes técnicos
- `src/styles.css`: tokens `--gold-1..4`, `--glass-*`, utilitários `.text-gold-rich`, `.glass-card`, `.glow-edge` (variável `--mx/--my` do cursor), nova escala `.t-display/.t-title/.t-label/.t-body/.t-meta`.
- `src/components/site/ui.tsx`: `Btn` com variantes `primary | secondary | link | icon` (mapear as antigas `solid/ghost/light/ghostLight` para não quebrar chamadas).
- `src/components/home/ServicosHome.tsx`: novo card com numeral, ornamento por slug, hook leve de luz pelo cursor.
- `src/components/home/Blocos.tsx` (`Metodo` e chamada final), `Abertura.tsx` (botões, texto "Resolve"), `InteligenciaDestaque.tsx`.
- `src/components/servicos/ServicePage.tsx`, `Calculadora.tsx`, rotas `servicos.inteligencia.*`, `comece.tsx`.
- `SoundToggle.tsx`, `WhatsAppFab.tsx`, `Nav.tsx` (botão do cabeçalho).
- `src/content/servicos.ts`: textos da auditoria.
- Não tocar: `StageCanvas.tsx`, `SceneReadiness.tsx`, `EntryGate.tsx`, `experienceRules.ts`, `stageScroll.ts`.
- `roadmap.md`: pendências do Passo 0.
