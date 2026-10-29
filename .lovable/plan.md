# Etapa 3: seções respirando dentro do universo 3D

Observação: as duas capturas citadas não chegaram anexadas nesta mensagem. A proposta abaixo parte da descrição escrita delas (seção "Você é bom no que faz..." e cabeçalho). Se quiser, reenvie as imagens antes de aprovar.

## O que já está integrado e será preservado
- Entrada, mergulho, V em partículas, eclipse, halo da dispersão, Bloom e otimizações de fluidez: sem alteração.
- Cena única por trás de todas as páginas: mantida.

## O que continua pendente e entra agora
1. **Coreografia do V por seção (resolve a leitura em "Você é bom no que faz...")**
   - O V passa a ter um "roteiro" por seção, ligado à posição real de cada bloco na tela, não ao progresso geral da página.
   - Em seções de texto, o V desliza para o lado oposto ao texto (texto à esquerda, V à direita), recua em profundidade e fica menor e mais suave atrás das frases.
   - Nas pausas entre seções, ele volta ao centro e se dispersa levemente, formando a ponte visual entre um bloco e outro.
   - O halo e o eclipse ficam intactos; apenas a intensidade atrás de texto é contida, sem tocar no pico bonito da dispersão.
   - Nada de esconder o V nem de caixas opacas.
2. **Fim dos fundos sólidos repetitivos**
   - Remover as faixas marrom/preto translúcidas de cada seção; o cenário aparece contínuo.
   - Legibilidade garantida por uma névoa suave e localizada só atrás do bloco de texto (gradiente que some nas bordas), não um retângulo.
   - Chamada final mantém o bordô como clímax, mas em gradiente que se funde ao espaço.
3. **Transições vinculadas a cada seção**
   - Cada seção dispara uma mudança própria no cenário ao entrar: leve avanço de câmera, mudança de tom da nebulosa e dispersão/reagrupamento do V.
   - Títulos entram em sincronia com essa mudança.
   - Movimento reduzido: sem câmera, apenas troca suave.
4. **Cabeçalho contínuo**
   - Em vez de virar faixa preta marcada, ele ganha um véu escuro em degradê que se dissolve para baixo, com desfoque leve e um fio dourado fino quase imperceptível. Sem borda dura.
5. **Texto da auditoria**
   - Confirmado: "Anúncios que trazem cliente, não só curtida." vira "Campanhas orientadas a oportunidades reais de negócio."

## Registrado para a Etapa 4 (não feito agora)
- Botão bordô sólido da hero destoa do cenário; todos os botões serão refeitos no padrão da auditoria: translúcidos, contorno dourado, acabamento editorial, interações delicadas.
- Nesta etapa nenhum componente novo usará botão sólido.

## Validação antes de entregar
- Gravações computador e celular rolando a página inteira, mostrando o V saindo de trás dos textos e as transições.
- Capturas da seção "Você é bom no que faz..." e do cabeçalho antes/depois.
- Teste automático da regra "V nunca no centro atrás de texto legível".
- Conferir que entrada, halo e fluidez continuam iguais.

## Detalhes técnicos
- `stageScroll`: adicionar mapa de seções (`data-stage-section` + posição/lado medidos por IntersectionObserver/resize) em vez de só `p` global.
- `experienceRules`: função pura `sectionChoreography(section, localProgress)` retornando x, z, escala, dispersão e `readingSafety`; testes com valores concretos.
- `StageCanvas`: o V lê essa coreografia; `eclipseState` já separa `readingSafety` do pico, então o pico fica intacto.
- CSS: utilitário `.reading-veil` (radial-gradient com máscara); remover `bg-marrom/50`, `bg-preto/45` etc. das seções de `Abertura.tsx`, `Blocos.tsx`, `ServicosHome`, `InteligenciaDestaque`, `Portfolio`.
- `Nav.tsx`: trocar `bg-preto/85 border-b` por pseudo-elemento em gradiente + `backdrop-blur` mascarado.
- `roadmap.md`: registrar o item dos botões na Etapa 4.
