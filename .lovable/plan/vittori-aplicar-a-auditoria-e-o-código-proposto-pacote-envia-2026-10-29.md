# Vittori: aplicar a auditoria e o código proposto (pacote enviado)

O pacote traz uma auditoria completa e um código de referência (portal, cena 3D, diretor de seções, pacotes com ícones, seção de processo). Ele mesmo avisa: nunca foi compilado nem testado. Por isso será aplicado **em etapas pequenas, cada uma validada antes da próxima**, seguindo a ordem que o próprio documento define. Nenhuma etapa conta como aprovada só porque o código compilou.

**Arquitetura única (confirmado):** portal e site interno usam uma só cena 3D, montada uma única vez. `EntryGate`, `StageCanvas` antigos e qualquer cena paralela são removidos, sem sobreposição nem componentes conflitantes.

## Etapa 1 — Portal de entrada (esta rodada, validada ANTES da transição)
- VITTORI em 3D com acabamento sofisticado: serifa elegante (Cormorant), proporções refinadas, profundidade fina (chanfro delicado, sem extrusão pesada ou cara de WordArt), reflexos realistas de metal nobre, 75–85% da largura no computador, ajuste próprio no celular.
- Estrela ✦ centralizada **abaixo**, respeitando a identidade visual.
- Iluminação cinematográfica percorrendo as letras, halo de luz, aparição gradual.
- Fundo de espaço infinito: gradientes bordô profundos em movimento, vários planos de partículas em profundidades diferentes, estrelas cintilantes, poeira cósmica e estrelas cadentes raras. Nada de pontos sobre cor estática.
- Sem cortina preta, sem "Casa criativa · Brasília", sem nome em texto plano substituindo o 3D.
- Dois botões discretos (entrar com som / sem som), sem sobrepor o nome.
- Brilho cinematográfico (bloom) suave nas partes douradas.
- Checkpoint: capturas desktop/mobile e gravação do portal revisadas por mim antes de seguir.

## Etapa 2 — Transição e abertura do site (esta rodada)
- Só o clique dispara: VITTORI e estrela se dissolvem em partículas, a câmera mergulha pelo cenário e revela a hero. Não é fade, blur nem camada HTML sumindo.
- O V surge formado por partículas douradas, com animação própria de eclipse e contraluz. Nenhum V sólido gigante em nenhum momento nem seção; o VITTORI 3D nunca reaparece.
- O fundo mantém profundidade contínua dentro do site, nunca vira só fundo escuro com partículas soltas.
- Composição própria para computador e para celular, com impacto nos dois.
- Remover as constelações em linhas.
- Preservar conteúdos, projetos e funções corretos existentes.
- Checkpoint final: gravação em vídeo do portal e da transição completa, além de capturas, antes de considerar concluído.

## Etapas seguintes (obrigatórias, próximas rodadas, uma por vez)
3. Transições reais por seção (Serviços, Método, Portfólio etc. mudam a cena) e fim dos fundos sólidos repetitivos.
4. Design de conteúdo: botões sofisticados não genéricos, hierarquia tipográfica, títulos e descrições bem separados, legibilidade em todas as páginas, "Vittori Inteligência" em destaque, Método/Pilares com números e ícones, serviços e planos completos com ícone próprio (Essencial, Assinatura, Legado distintos), seção de Processo substituindo "O que esperar", textos comerciais corrigidos pela auditoria.
5. Portfólio editorial, rodapé refinado com assinatura VITTORI CREATIVE HOUSE, CTAs sem nome pessoal.

A falta dos SVGs oficiais não impede nada: uso as referências visuais existentes e deixo V, estrela e logo prontos para troca.

## Como cada etapa será conferida
Capturas no computador (1440x900, 1280x720), tablet (768x1024) e celular (390x844, 360x740); gravação em vídeo do portal e da sequência completa entregue nos Arquivos; demonstração navegável pela prévia; tempo de carregamento, console sem erros e modo de movimento reduzido. Cada item será relatado como: feito e testado, feito sem teste, ou pendente.

## Limites honestos
- Não posso garantir "à prova de erros" nem testar em todas as placas de vídeo reais; som e fluidez precisam da sua avaliação.
- Estrela e V usam formas provisórias até chegarem os vetores oficiais.
- A música continua sintetizada; trilha épica de verdade precisa de um arquivo de áudio licenciado.

## Detalhes técnicos
- Adicionar dependência `@react-three/postprocessing` (Bloom); incluir no prebundle do Vite junto às libs 3D existentes, mantendo a deduplicação do React.
- Criar `src/components/experience/` a partir de `Scene.tsx`, `Experience.tsx`, `engine.ts`, `SectionDirector.ts`, `experience.css`, adaptando imports, tipos e o contrato de `ambientAudio.ts` reais (o pacote usa `setSound`, conferir API).
- `SiteShell` passa a montar só `VittoriExperience`; remover `EntryGate` e `StageCanvas` antigos e atualizar a regra correspondente em `AGENTS.md`.
- Adicionar IDs reais às seções (`#inicio`, `#servicos`, `#metodo`, `#portfolio`, ...); marcadores ausentes são ignorados.
- `ServicePackages` e `ProcessSection` entram na etapa 4, ligados a `servicos.ts`, sem preços internos.
