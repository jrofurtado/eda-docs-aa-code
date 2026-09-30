---
titulo: Documentação como código na EDA
publico: Direção
duracao: 10 a 15 minutos
slides: 7
---

# Guião da apresentação

## 0. Intro (só na versão EDA)

Ecrã inicial com "Iniciar apresentação". Ao clicar, cerca de 25 segundos em cinco atos, com legenda sempre visível no canto e som sintetizado (tecla `M` para silenciar):

1. **Hoje:** referências dispersas em cinzento (ficheiros Word e PDF, evolutivas, OTs, "quem sabe disto?").
2. **A IA recolhe:** um núcleo de IA surge com uma onda de choque. Um varrimento tipo radar lê cada referência, que se desfaz em partículas e entra em espiral no núcleo.
3. **Escreve Markdown:** o núcleo desloca-se e escreve o documento `.md`, que fica emoldurado no GitLab com o selo "merge request · revisto por pessoas".
4. **Dois leitores:** do documento partem dois caminhos. Uma segunda IA lê o Markdown e responde a uma pergunta com fontes. O PDF gerado desdobra-se e uma pessoa lê-o.
5. **A proposta:** "Escrita por IA. Revista por pessoas. Lida por todos." Um varrimento amarelo EDA abre o slide 1.

`→` passa ao ato seguinte, `Esc` salta a intro, `I` repete-a.

## 1. Abertura

**O conhecimento da EDA passa a viver no código.**

Interação: arrastar a nuvem para a rodar; clicar para a dispersar.

Documentação como código: um só repositório GitLab, em Markdown, escrito e lido por pessoas e por IA. Começamos pelo SAP IS-U.

> Notas: hoje o conhecimento sobre as nossas aplicações está sobretudo nas pessoas. A proposta é tratá-lo como tratamos o código: versionado, revisto e sempre atualizado. A nuvem de partículas representa o conhecimento fragmentado; no último slide aparece consolidado.

## 2. Onde está hoje o conhecimento

| Fonte | Situação |
| --- | --- |
| Cabeça das pessoas | A fonte mais completa, e a que sai com cada reforma ou mudança de funções |
| RCD | Alguma documentação, sem estrutura comum nem ligação às aplicações |
| SharePoint dos projetos | Documentação que fica parada no dia em que o projeto fecha |
| EasyVista | Incidentes e evolutivas: o porquê de cada alteração, espalhado por tickets |
| Word, PDF, Excel, imagens | Difíceis de pesquisar, comparar e manter |

Cinco ilhas sem pontes. Cada pergunta sobre uma aplicação depende de encontrar a pessoa certa.

Interação: o botão "Construir as pontes" liga as cinco ilhas a um repositório comum no GitLab.

## 3. A mudança

A documentação vai ser escrita e lida sobretudo por IA. O formato tem de acompanhar.

- **Markdown como formato base.** Texto simples e estruturado, que os modelos leem e escrevem melhor do que Word ou PDF.
- **GitLab como fonte de verdade.** Cada alteração passa por merge request, com autor, data e revisor.
- **PDF gerado para quem precisa.** O pipeline gera PDF e portal a partir do mesmo ficheiro.

Fluxo: `.md` → merge request → pipeline CI → PDF · portal · assistente IA

## 4. Prova de conceito: reverse engineering do SAP IS-U

| Fonte | Contribui com |
| --- | --- |
| Código ABAP via abapGit | O quê: o que cada objeto Z faz e de que depende |
| Ordens de transporte (E070, E071) | Quando e quem: a linha do tempo de cada objeto |
| Evolutivas no EasyVista | Porquê: a razão de negócio de cada alteração |
| Projetos no SharePoint | Contexto funcional do processo |

Um agente de IA (Codex ou Claude Code) lê, cruza e escreve Markdown no repositório `sap-isu-docs`. O número da evolutiva na descrição da OT é o que liga o código ao pedido de negócio.

Interação: o botão "Executar o agente" simula a execução passo a passo (fontes, cruzamento, novos ficheiros e merge request).

## 5. O resultado

Um ficheiro por objeto, em que cada secção cita a sua fonte (código, OT, EasyVista, SharePoint). Tudo o que a IA gera entra por merge request e só é publicado depois de validado.

Interação: "Pergunte ao repositório" responde a três perguntas de análise de impacto, cita as fontes e destaca as linhas usadas.

> Notas: o exemplo mostrado é ilustrativo. O objeto e os números de OT e evolutiva são fictícios.

## 6. Plano: oito semanas

| Semanas | Fase | Atividades |
| --- | --- | --- |
| 1–2 | Preparar | Escolher o processo, validar segurança e RGPD, instalar abapGit em desenvolvimento |
| 3–4 | Extrair | Código, OTs, evolutivas e documentos para GitLab; converter para Markdown |
| 5–6 | Gerar | Agente de IA produz a documentação; comparar Codex e Claude Code |
| 7–8 | Validar | Revisão pelos key users, pipeline de PDF, recomendação para escalar |

Critérios de escolha do processo: muito código Z, muitas evolutivas, poucas pessoas que o dominam.

**Metas propostas:** pelo menos 80% dos objetos Z do processo documentados; exatidão de pelo menos 4 em 5 na avaliação dos key users; análises de impacto em minutos em vez de dias.

**Riscos e mitigação**

- Confidencialidade: licenças empresariais sem treino com os nossos dados; anonimizar tickets com dados de clientes.
- Qualidade: revisão humana obrigatória antes de publicar.
- Ligação OT ↔ evolutiva: medir na semana 1; tornar o número da evolutiva obrigatório nas novas OTs.
- Documentação que envelhece: regenerar a cada OT importada em produção.

## 7. Decisão

1. Aprovação da prova de conceito (oito semanas, um processo do SAP IS-U)
2. Acessos de leitura: SAP IS-U de desenvolvimento, ordens de transporte, EasyVista, SharePoint dos projetos IS-U
3. Ferramentas de IA em regime empresarial para duas a três pessoas
4. Duas a três pessoas key user, cerca de 2 horas por semana nas semanas 7 e 8
5. Parecer de segurança e RGPD antes da extração de dados

Interação: cada pedido pode ser marcado; a esfera acende por faixas até ficar completa.

Se resultar no IS-U, o mesmo modelo aplica-se às restantes aplicações da EDA.

## 8. Bastidores: como esta apresentação foi feita

**Esta apresentação é, ela própria, documentação como código.**

- Um ficheiro HTML num repositório Git, com este guião em Markdown ao lado.
- Feita com Claude Code, a partir de pedidos em português, sem ferramentas de design nem de vídeo.
- 3D, animação e som gerados por código: nenhum ficheiro de imagem, vídeo ou áudio.

O painel mostra o `git log` real, com o pedido que originou cada commit. Uma das versões (a intro com quatro agentes) foi revertida, o que mostra o controlo de versões a funcionar. O botão "Reproduzir o histórico" percorre a evolução passo a passo.

## 9. Perguntas

**Perguntas?** O resumo dos cinco pedidos fica visível durante a conversa, e a esfera de partículas consolidada roda devagar em fundo.

"Respostas preparadas": tópicos discretos que só o orador abre, se a pergunta surgir.

- **E se a IA inventar?** Nada é publicado sem revisão humana por merge request, e cada secção indica a fonte.
- **Os nossos dados saem da EDA?** Ferramentas em regime empresarial, sem treino com os nossos dados; tickets anonimizados; parecer de segurança e RGPD antes de arrancar.
- **Quanto custa?** Licenças para duas a três pessoas durante oito semanas e tempo dos key users. O valor das licenças fica a confirmar com os fornecedores.
- **Porquê GitLab e não SharePoint?** O GitLab guarda versões, com autor, data e revisor; o SharePoint pode continuar a receber os PDF gerados.
- **Codex ou Claude Code?** A prova de conceito compara as duas com os mesmos critérios.
- **E depois da prova de conceito?** Alargar a outros processos e aplicações, com regeneração a cada ordem de transporte em produção.

Narração: "Obrigado pela vossa atenção. Ficamos disponíveis para as vossas perguntas."
