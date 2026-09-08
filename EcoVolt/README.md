# EcoVolt — versão Front-End da CP

SPA com React, TypeScript, Vite, Tailwind CSS e React Router. Formulário de login com React Hook Form.

## Executar e validar

Use Node.js 24 ou superior e npm. Na pasta `EcoVolt/`, que contém `package.json`:

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm test
npm run build
npm run preview
```

`dev` e `preview` servem apenas o frontend, sem API ou banco de dados. `npm test` valida autenticação, mocks e transições do estado demonstrativo, sem iniciar servidor HTTP.

## Acesso demonstrativo

- E-mail: `demo@ecovolt.example`
- Senha fictícia: `EcoVoltDemo2026`

Esses dados são públicos e exclusivos da demonstração. O login não oferece autenticação real. O dashboard usa dados fictícios de `src/data/mockUsers.ts`, tipados em `src/types/user.ts`.

A sessão guarda somente o ID fictício em `sessionStorage`: permanece ao atualizar a página na mesma aba e termina ao sair ou fechar a aba. Se o navegador bloquear o armazenamento, o login funciona em memória até recarregar. Nenhuma senha é salva no armazenamento do navegador, e nenhuma operação é persistida em banco. O controle de acesso às rotas demonstra a navegação; não é uma barreira de segurança.

## Etapa 2 — retirar o backend da CP

- [x] Remover `server/api.ts`, `server/api.test.ts` e a pasta `server/`.
- [x] Remover `data/ecovolt.sqlite` e a pasta de banco `data/` na raiz da aplicação; manter `src/data/` para mocks.
- [x] Retirar `createApi`, `ecovolt-local-api` e os middlewares de desenvolvimento/preview do Vite.
- [x] Retirar `server/**/*.ts` de `tsconfig.node.json`.
- [x] Substituir o script de testes da API por testes locais do login demonstrativo; revisar dependências.
- [x] Substituir as chamadas de login, logout e verificação de sessão por estado React e simulação local.
- [x] Retirar cookies de autenticação, hash de senha e regras de backend da implementação.
- [x] Atualizar `.gitignore` para bancos locais, segredos, certificados, logs e temporários, além de `node_modules/` e `dist/`.
- [x] Conferir imports e configurações para não dependerem do backend.

Para manter a aplicação utilizável, esta etapa também prepara o tipo de usuário, o mock da conta e o login por e-mail com React Hook Form. Os mocks e o estado compartilhado foram implementados na etapa 3. As páginas internas e a rota dinâmica de ação continuam pendentes. A remoção se refere à versão atual dos arquivos; o histórico Git não foi reescrito.

## Próximas páginas

EnviarAcaoPage
É uma funcionalidade principal do projeto: envio de ação sustentável com vídeo/evidência.

ValidacoesPage
Depende dos envios. Boa para listar status: em análise, aprovado, recusado, revisão.

RevisaoPage
Faz sentido depois de validações, porque é o fluxo de contestar uma recusa.

MissoesPage
Importante para gamificação, mas pode vir depois do fluxo principal de envio/validação.

RankingPage
Usa dados de pontuação/tier, então fica melhor depois do dashboard/missões.

RecompensasPage
Complementa ranking e pontos.

PerfilPage
Fecha bem a área logada com conquistas, estatísticas e dados do usuário.

Páginas públicas: Sobre, QuemSomos/Integrantes, FAQ, Contato
   São importantes para apresentação, mas têm menos impacto na lógica principal.

HomePage final
   Eu deixaria a home real para perto do fim, porque ela deve apresentar o produto já com os nomes e caminhos finais definidos.

## Etapa 3 — tipos, mocks e estado compartilhado

- [x] Tipos de usuário, ação, missão, ranking e recompensa em `src/types/`.
- [x] `mockUsers.ts`, `mockActions.ts`, `mockMissions.ts`, `mockRanking.ts` e `mockRewards.ts` em `src/data/`.
- [x] IDs, categorias, status, tier, pontos, XP e progresso tipados; dados separados do JSX.
- [x] Ações demonstrativas em análise, aprovadas, recusadas e em revisão.
- [x] Contexto compartilhado com envio e pedido de revisão locais.
- [x] Dados identificados como demonstrativos, com política de reinício documentada.
- [x] Hooks `useAuth` e `useTheme` mantidos; `useDemoData` disponibiliza os dados de negócio.

### Como consumir nas próximas telas

`DemoDataProvider` envolve todas as rotas dentro de `AuthProvider`. Use `useAuth()` para entrar/sair e `useDemoData()` para dados e operações de negócio. Não importe as listas de mocks diretamente nas páginas: elas inicializam o contexto. Os catálogos de categorias e rótulos podem ser importados para apresentar nomes legíveis.

```tsx
const { user, actions, missions, ranking, rewards, getAction, submitAction, requestReview } = useDemoData()
```

- `user`: indicadores derivados das ações aprovadas e missões concluídas do participante. Use este usuário para pontos/XP nas telas de negócio; o usuário do `useAuth` identifica a sessão.
- `actions` e `missions`: dados do participante autenticado.
- `ranking`: classificação mensal do tier atual, ordenada por pontos; empate usa o ID do participante em ordem crescente. Outros períodos ainda não são simulados.
- `rewards`: catálogo demonstrativo com estados disponível, em progresso e bloqueado; não há resgate implementado.
- `getAction(id)`: encontra a ação do participante ou retorna `undefined`, útil para a futura rota dinâmica.
- `submitAction({ category, description, evidence })`: cria uma ação em análise e retorna o ID. `evidence` contém apenas `{ name, type, size }`, com tamanho em bytes; não guarda `File`, vídeo ou URL remota. Aceita MP4, MOV e AVI, até 100 MB, com descrição de pelo menos 10 caracteres.
- `requestReview(id, justification)`: coloca uma ação recusada em revisão, registra justificativa/data e preserva seu ID e motivo de recusa. Exige pelo menos 10 caracteres e impede nova revisão de uma ação já em revisão.

As operações podem lançar erros de validação: os formulários devem capturá-los e exibir a mensagem. A atualização do contexto ocorre na próxima renderização do React. Não altere os objetos retornados diretamente.

### Consistência e duração da demonstração

O dashboard já usa o contexto e apresenta as ações compartilhadas. Os dados iniciais têm **115 pontos, 90 XP, uma ação aprovada e duas missões ativas**. Envios e revisões não concedem pontos, XP ou progresso por si só. Aprovação, conclusão de missões e resgate de recompensas ainda não são operações disponíveis.

As alterações ficam **somente na memória**: navegar entre as rotas mantém o estado; recarregar, sair ou trocar de conta restaura os mocks iniciais. A sessão demonstrativa pode continuar após recarregar porque somente o ID de acesso fica no `sessionStorage`; as ações criadas não ficam salvas ali.

O contexto usa `useReducer` para transições imutáveis e `useContext` para compartilhar dados. `useState` continua na autenticação e `useEffect` no tema, onde há sincronização com o navegador. Não foi adicionado efeito para persistir ações nem chamada de rede.

A criação das telas de envio, detalhes e revisão fica nas próximas etapas; a base compartilhada e suas operações já estão disponíveis e testadas.
