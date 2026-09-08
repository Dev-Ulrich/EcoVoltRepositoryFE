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

`dev` e `preview` servem apenas o frontend, sem API ou banco de dados. `npm test` valida a autenticação demonstrativa local e não inicia servidor HTTP.

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

Para manter a aplicação utilizável, esta etapa também prepara o tipo de usuário, o mock da conta e o login por e-mail com React Hook Form. Os demais mocks, páginas internas e a rota dinâmica de ação continuam pendentes. A remoção se refere à versão atual dos arquivos; o histórico Git não foi reescrito.

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