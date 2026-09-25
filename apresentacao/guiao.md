---
titulo: Documentação como código na EDA
publico: Direção
duracao: 10 a 15 minutos
slides: 7
---

# Guião da apresentação

## 1. Abertura

**O conhecimento da EDA passa a viver no código.**

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

## 5. O resultado

Um ficheiro por objeto, em que cada secção cita a sua fonte (código, OT, EasyVista, SharePoint). Tudo o que a IA gera entra por merge request e só é publicado depois de validado.

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

Se resultar no IS-U, o mesmo modelo aplica-se às restantes aplicações da EDA.
