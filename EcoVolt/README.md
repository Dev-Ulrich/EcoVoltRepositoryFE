# EcoVolt — CP de Front-End

SPA acadêmica do Challenge FIAP x SoulUp, desenvolvida com React, TypeScript, Vite, Tailwind CSS, React Router e React Hook Form. A demonstração conecta ações sustentáveis, análise, revisão, missões, pontos, ranking e conquistas.

[Repositório](https://github.com/Dev-Ulrich/EcoVoltRepositoryFE) · [Planejamento anterior e prompts da equipe](docs/PLANEJAMENTO-ANTERIOR.md)

## Executar

Requer Node.js 24 ou superior e npm. Na raiz do repositório:

```bash
cd EcoVolt
npm ci
npm run dev
```

Se já estiver na pasta que contém `package.json`, não execute `cd EcoVolt`. Abra o endereço exibido pelo Vite.

```bash
npm run lint
npm test
npm run build
npm run preview
```

Não há API, SQLite, backend ou dependência de contas externas. O preview serve a versão compilada do frontend.

## Conta fictícia

- **E-mail:** `demo@ecovolt.example`
- **Senha:** `EcoVoltDemo2026`

As credenciais também aparecem no login. O formulário valida e-mail e senha com React Hook Form, permite mostrar/ocultar senha e bloqueia envios repetidos. O logout remove o acesso e retorna ao login.

A autenticação é somente demonstrativa. Apenas o ID fictício fica no `sessionStorage`, sem senha. Se o navegador bloquear o armazenamento, o acesso funciona em memória até recarregar.

## Telas e funções

| Rota | Funções |
| --- | --- |
| `/` | Apresentação, exemplos e acesso à conta/proposta |
| `/login` | Validação, acesso fictício e redirecionamento |
| `/como-funciona` | Explicação das etapas e limites da demonstração |
| `/sobre` | Propósito e contexto acadêmico |
| `/quem-somos` | Integrantes, fotos e perfis |
| `/faq` | Busca, filtros de assunto e perguntas expansíveis |
| `/contato` | Links da equipe e formulário validado com confirmação simulada |
| `/app` | Pontos, XP, tier, ranking, missões, atividades e atalhos |
| `/app/enviar-acao` | Categoria/ODS, descrição, seleção ou arraste de vídeo, validação e envio local |
| `/app/validacoes` | Listagem, busca por descrição e filtro por status |
| `/app/validacoes/:acaoId` | Dados do envio, evidência, histórico de revisão e análise simulada |
| `/app/validacoes/:acaoId/revisao` | Justificativa validada, cancelamento e revisão local |
| `/app/missoes` | Progresso, resumo, filtros de dificuldade/status e estado vazio |
| `/app/ranking` | Classificação mensal, pódio, filtro por tier e destaque do participante |
| `/app/recompensas` | Saldo de pontos, catálogo, requisitos, progresso e filtros |
| `/app/perfil` | Dados da conta, estatísticas, ODS e conquistas |
| Rotas inexistentes | Página 404; IDs de ação inválidos têm mensagem e retorno |

Todas as telas usam a navegação React Router. Menu mobile, tema claro/escuro, preferência de tema salva, Header, Footer e componentes comuns são compartilhados.

## Roteiro para demonstrar

1. Entre com a conta fictícia. O cenário inicial tem **115 pontos, 90 XP, uma ação aprovada e duas missões ativas**.
2. Abra **Enviar ação**, selecione Compostagem orgânica, escreva uma descrição e selecione um vídeo válido. É possível remover o arquivo antes do envio.
3. Envie e confira os detalhes. A ação fica **Em análise** e não concede pontos ainda.
4. Em **Experimentar análise simulada**, informe um motivo e clique em **Simular recusa**.
5. Clique em **Solicitar revisão**, escreva a justificativa e confirme. O status passa a **Em revisão**.
6. Simule a aprovação nos detalhes. A demonstração passa a **325 pontos, 380 XP, duas ações aprovadas e três missões concluídas** para esse cenário.
7. Navegue por Dashboard, Missões, Ranking, Recompensas e Perfil para conferir a mesma evolução.
8. Experimente filtros e combinações sem resultados. O saldo não muda ao filtrar.
9. Teste o formulário de Contato: a confirmação é local, sem envio de e-mail.
10. Recarregue a página para restaurar os mocks ou use **Sair** para encerrar o acesso.

## Regras locais

- Evidência: MP4 (`video/mp4`), MOV (`video/quicktime`) ou AVI (`video/x-msvideo`), maior que zero e até 100 MB.
- Descrição e justificativa: 10 a 2.000 caracteres nos formulários.
- O arquivo não é enviado, hospedado ou reproduzido. Apenas nome, tipo e tamanho ficam no estado de memória.
- Aprovar concede os pontos da categoria e **40 XP**. Recusar exige motivo. Apenas ações em análise ou revisão aceitam um resultado.
- Uma ação recusada pode receber revisão. Pedidos duplicados e novas aprovações de uma ação já aprovada não duplicam pontos.
- As missões de ações derivam seu progresso das aprovações. Seus bônus são contabilizados uma única vez pelos dados derivados.
- O ranking é mensal, por tier, com desempate pelo ID crescente. O tier da conta é fixo; não há promoção automática de tier ou níveis por XP nesta CP.
- Recompensas são um catálogo/conquistas com requisitos e estados derivados. **Não há resgate, débito de pontos ou benefício financeiro real.**
- Datas do ciclo são ilustrativas, sem campanha ou contagem regressiva real.

As ações, revisões e análises ficam **somente na memória**. Navegar pelas telas preserva a demonstração; recarregar, sair ou trocar de conta restaura os mocks. A sessão de acesso pode permanecer na mesma aba após recarregar, mas os novos registros não. Abrir diretamente a URL de uma ação criada em uma sessão anterior exibe “Ação não encontrada”.

## Organização

- `src/types/`: contratos tipados de usuário, ação, missão, ranking e recompensa.
- `src/data/`: mocks, regras e transições puras da demonstração.
- `src/auth/`: contexto, sessão fictícia e `useAuth`.
- `src/contexts/`: provedor dos dados de negócio.
- `src/hooks/useDemoData.ts`: acesso compartilhado aos dados e operações.
- `src/components/`: componentes comuns, layouts e componentes dos módulos.
- `src/pages/`: telas públicas e da área do participante.
- `tests/`: cenários de autenticação, envio, revisão, aprovação e consistência dos indicadores.

As páginas de negócio consomem `useDemoData()`; não devem duplicar as listas dos mocks no JSX. O contexto oferece `submitAction`, `requestReview`, `resolveAction`, `getAction` e `getRankingByTier`. `resolveAction` existe exclusivamente para experimentar resultados locais, sem avaliação real de evidências.

## Equipe — 1TDSPW

| Integrante | RM | GitHub |
| --- | --- | --- |
| Victor Ulrich Costa Alves da Silva | 568634 | [Dev-Ulrich](https://github.com/Dev-Ulrich) |
| Matheus Pereira da Silva Franco | 569315 | [MatheusPSFranco](https://github.com/MatheusPSFranco) |
| Matheus Luca Fouad Barragão | 572228 | [MatheusLuca](https://github.com/MatheusLuca) |
| Arthur da Silva Santana | 571075 | [arthursantana1521](https://github.com/arthursantana1521) |

Cada integrante deve usar sua própria identidade Git e registrar contribuições reais. A quantidade de commits individuais deve ser conferida antes da entrega. Os prompts anteriores ficam preservados no registro de planejamento; Victor realiza a integração das branches.

## Entrega e publicação

Execute lint, testes e build. Confira o fluxo acima, campos inválidos, teclado, temas e telas pequenas. Para hospedagem estática, configure as rotas da SPA para retornar `index.html`, inclusive ao atualizar uma URL interna. Publicação e auditoria da participação individual não são realizadas automaticamente pelo build.

Integração real, autenticação segura, armazenamento de vídeos, avaliação externa, resgates financeiros e banco de dados pertencem a outra etapa e estão fora do escopo desta CP.
