# Vittori: aplicar a auditoria e o código proposto (pacote enviado)

O pacote traz uma auditoria completa e um código de referência (portal, cena 3D, diretor de seções, pacotes com ícones, seção de processo). Ele mesmo avisa: nunca foi compilado nem testado. Por isso será aplicado **em etapas pequenas, cada uma validada com capturas antes da próxima**, seguindo a ordem que o próprio documento define.

## Etapa 1 — Portal de entrada (esta rodada)
- VITTORI em 3D metálico real, ocupando 75–85% da largura no computador (ajuste próprio no celular), com a estrela ✦ centralizada **abaixo**.
- Aparição gradual, faixa de luz passando pelo metal, halo de luz, fundo espacial bordô com poeira estelar e estrelas cadentes discretas.
- Sem cortina preta cobrindo a cena, sem "Casa criativa · Brasília", sem nome em texto plano substituindo o 3D.
- Dois botões discretos (entrar com som / sem som), sem sobrepor o nome.
- Brilho cinematográfico (bloom) suave nas partes douradas.

## Etapa 2 — Transição e abertura do site (esta rodada)
- Só o clique dispara: nome e estrela se desfazem em pontos dourados, a câmera mergulha, o site aparece ao final.
- Dentro do site, o V existe **apenas em partículas** com halo de eclipse. O V sólido e o VITTORI 3D nunca reaparecem.
- Remover as constelações em linhas.
- Uma única cena 3D no site inteiro (o código antigo de entrada e palco é substituído, não somado).

## Etapas seguintes (próximas rodadas, uma por vez)
3. Transições por seção real (ao chegar em Serviços, Método, Portfólio etc. a cena muda) e fim das faixas opacas repetidas.
4. Design de conteúdo: botões editoriais translúcidos, títulos separados de descrições, "Vittori Inteligência" como título grande, Método/Pilares com números e ícones, planos de cada serviço com ícone próprio (Essencial, Assinatura, Legado distintos), seção de Processo substituindo "O que esperar", textos revisados da auditoria (FAQ, posicionamento, IA sem promessas absolutas).
5. Portfólio em galeria editorial, rodapé leve com assinatura VITTORI CREATIVE HOUSE, CTAs sem nome pessoal.

## Como cada etapa será conferida
Capturas no computador (1440x900, 1280x720), tablet (768x1024) e celular (390x844, 360x740), sequência de quadros da transição, console sem erros, modo de movimento reduzido. Cada item será relatado como: feito e testado, feito sem teste, ou pendente.

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
