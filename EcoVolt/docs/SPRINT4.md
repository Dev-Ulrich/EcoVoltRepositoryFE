# Sprint 4 — Integração com API Java

> Documentação operacional e funcional da entrega. O README contém apenas o sumário e aponta para esta página. Não publique credenciais, convites de avaliador ou códigos de recuperação.

## Sumário

- [1. Visão geral e escopo](#1-visão-geral-e-escopo)
- [2. Links e versões](#2-links-e-versões)
- [3. Arquitetura e tecnologias](#3-arquitetura-e-tecnologias)
- [4. Como executar](#4-como-executar)
- [5. Publicação no Vercel e Render](#5-publicação-no-vercel-e-render)
- [6. Funcionalidades e rotas](#6-funcionalidades-e-rotas)
- [7. Roteiro de testes funcionais](#7-roteiro-de-testes-funcionais)
- [8. Resultado da verificação final](#8-resultado-da-verificação-final)
- [9. Evidências e capturas de tela](#9-evidências-e-capturas-de-tela)
- [10. Troubleshooting](#10-troubleshooting)
- [11. Entrega, vídeo e cuidados](#11-entrega-vídeo-e-cuidados)

## 1. Visão geral e escopo

O EcoVolt é uma aplicação web de sustentabilidade e gamificação, desenvolvida com React, TypeScript e Vite, com API Java/Spring Boot e Oracle. O projeto reúne páginas institucionais, consulta de missões e energia e uma área autenticada. A Sprint 4 integra o frontend ao backend, com persistência de dados e controles de acesso. Para comportamento da área autenticada, leia [Área interna funcional](AREA-INTERNA.md). Para detalhes da experiência demonstrativa **anterior**, veja [Histórico da Sprint 3](SPRINT3-HISTORICO.md).

Não confunda o frontend histórico da Sprint 3 com os recursos autenticados da Sprint 4. As rotas legadas `/missoes`, `/missoes/:id` e `/energia` utilizam endpoints Java; a área `/app` possui fluxos ligados a `/auth/*` e `/app/*`, documentados separadamente.

## 2. Links e versões

| Recurso | Endereço ou configuração |
| --- | --- |
| Aplicação web | https://ecovolt-sprint4.vercel.app |
| API Java | https://ecovolt-api-sprint4.onrender.com |
| Saúde da API | https://ecovolt-api-sprint4.onrender.com/health |
| Repositório | https://github.com/Dev-Ulrich/EcoVoltRepositoryFE |
| Branch de desenvolvimento do backend (Render) | `codex/sprint4-integracao` |
| Branch configurada anteriormente para o frontend (Vercel) | `main` |
| Console do Render | https://dashboard.render.com/web/srv-dbifnpdg1s2s73c9cll0 |
| Vídeo do grupo (até 3 minutos) | Pendente de gravação e publicação |

O link da documentação deve apontar para a mesma branch em que ela foi consultada. Alterações em `codex/sprint4-integracao` não aparecem automaticamente no README da `main`, nem vice-versa.

## 3. Arquitetura e tecnologias

- **Frontend:** React, React Router, TypeScript, Vite, Tailwind CSS e React Hook Form.
- **Backend:** Java 21, Spring Boot, Spring JDBC e driver Oracle JDBC.
- **Banco:** Oracle existente, sem recriação ou apagamento automático do schema na inicialização.
- **Hospedagem:** Vercel para o frontend e Render (serviço Docker) para a API.
- **Segurança:** a API autenticada usa token de sessão, senhas com hash e perfis de acesso. Credenciais do banco ficam exclusivamente no backend.

Estrutura principal: `EcoVolt/` contém a SPA, `EcoVolt/docs/` concentra a documentação e `backend/` contém a API Java. O arquivo `render.yaml` descreve a implantação, e `EcoVolt/vercel.json` configura o fallback de navegação da SPA.

## 4. Como executar

### 4.1 Frontend — desenvolvimento local

1. Instale Node.js 24 ou superior e npm.
2. Clone o repositório e entre na pasta `EcoVolt`.
3. Execute `npm ci`.
4. Copie `.env.example` para `.env.local` e ajuste `VITE_API_URL` para o endereço HTTPS da API, sem barra final.
5. Execute `npm run dev` e abra o endereço informado pelo Vite.
6. Execute `npm run build`, `npm test` e `npm run lint` antes do commit.

```bash
git clone https://github.com/Dev-Ulrich/EcoVoltRepositoryFE.git
cd EcoVoltRepositoryFE/EcoVolt
npm ci
cp .env.example .env.local
npm run dev
# Em outro terminal, nesta pasta:
npm run build
npm test
npm run lint
```

Em Windows PowerShell, a cópia pode ser feita com `Copy-Item .env.example .env.local`.

### 4.2 Backend — desenvolvimento local

1. Instale Java 21 e Maven.
2. Entre na pasta `backend`.
3. Defina as variáveis `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` e `CORS_ALLOWED_ORIGINS` no ambiente local.
4. Garanta que o usuário Oracle tenha acesso às tabelas e sequências esperadas.
5. Execute `mvn test`, `mvn package` e `mvn spring-boot:run`.

Não adicione um arquivo com senhas reais ao repositório. A conexão local ao Oracle depende das permissões e das regras de rede do serviço acadêmico.

## 5. Publicação no Vercel e Render

### 5.1 Frontend no Vercel

1. Vincule o repositório `Dev-Ulrich/EcoVoltRepositoryFE` à Vercel.
2. Configure **Root Directory:** `EcoVolt`.
3. Configure **Build Command:** `npm run build` e **Output Directory:** `dist` (preset Vite).
4. Crie ou revise `VITE_API_URL=https://ecovolt-api-sprint4.onrender.com` nos ambientes aplicáveis.
5. Confira a branch de produção (a configuração anterior usa `main`); cada push em `main` pode gerar uma nova publicação.
6. Confirme o deploy como **Ready**, abra o domínio e teste pelo menos `/`, `/login`, `/cadastro`, `/missoes`, `/energia` e `/app`. Abrir diretamente uma rota interna deve retornar a SPA, não 404 da hospedagem.
7. Caso a variável de ambiente seja alterada, faça novo build: variáveis `VITE_*` são incorporadas no bundle durante a compilação.

### 5.2 Backend no Render

1. Abra o [serviço existente no Render](https://dashboard.render.com/web/srv-dbifnpdg1s2s73c9cll0).
2. Confirme repositório, branch `codex/sprint4-integracao`, **Root Directory:** `backend` e execução por Docker com `./Dockerfile`.
3. Revise as variáveis secretas `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` e `CORS_ALLOWED_ORIGINS`. Inclua `https://ecovolt-sprint4.vercel.app` como origem exata permitida.
4. Aguarde o auto-deploy associado ao commit (sem acionar deploys repetidos durante substituição).
5. Confirme status **Live**, mensagens de inicialização do Spring Boot e resposta positiva de `GET /health`.
6. Teste uma operação de leitura e, em ambiente seguro, o fluxo de autenticação e persistência. **Live** indica que o processo foi implantado, não garante o funcionamento de todas as rotas.

O pool Oracle foi reduzido a uma conexão por instância para diminuir o risco do erro `ORA-02391`. Isso não modifica o limite de sessões do usuário no Oracle.

## 6. Funcionalidades e rotas

| Rota web | Finalidade | Verificação esperada |
| --- | --- | --- |
| `/` | Página inicial institucional | Renderização responsiva, navegação |
| `/sobre`, `/quem-somos`, `/faq`, `/contato` | Páginas institucionais | Links, imagens, formulários e teclado |
| `/missoes` | Consulta Java de missões | Carregamento, pesquisa, filtro, erro e vazio |
| `/missoes/:id` | Detalhe Java de missão | ID válido, ID inválido e rota direta |
| `/energia` | Consulta e CRUD Java de contas | Persistência e validação em usuário de teste |
| `/cadastro`, `/login`, `/recuperar-senha` | Acesso à área interna | Sessão, recuperação e mensagens |
| `/app` | Painel autenticado | Autorização, indicadores reais |
| `/app/missoes`, `/app/ranking`, `/app/recompensas` | Gamificação | Dados, estados vazios e vínculos |
| `/app/enviar-acao`, `/app/validacoes`, `/app/contas` | Evidências e gestão | Criar, consultar, editar/revisar, permissões |

Os endpoints históricos de CRUD não substituem a autenticação e autorização das rotas novas. Não use dados pessoais nem documentos verdadeiros nos testes acadêmicos.

## 7. Roteiro de testes funcionais

Marque cada item como aprovado **somente depois de executar a ação na versão publicada**.

- [ ] Homepage e páginas institucionais abrem no desktop e celular (larguras 390 px, 768 px e 1280 px).
- [ ] Links, menu, foco por teclado e navegação por URL direta funcionam.
- [ ] `/missoes` lista dados da API e apresenta erro informativo quando necessário.
- [ ] `/missoes/1` e IDs inválidos são tratados corretamente.
- [ ] `/energia` permite CRUD de registro **fictício**, com releitura após atualizar a página; apenas o registro criado para teste é excluído.
- [ ] Cadastro de usuário comum e login funcionam sem divulgar senha.
- [ ] Rotas `/app` bloqueiam acesso sem autenticação.
- [ ] Perfil, missões, ranking e recompensas refletem os dados corretos da conta.
- [ ] Envio de evidência fictícia e revisão por avaliador autorizado obedecem às permissões.
- [ ] CORS permite o frontend oficial e bloqueia origens não autorizadas.
- [ ] `npm run build`, `npm test` e `npm run lint` passam com a mesma revisão do commit publicado.
- [ ] A API continua disponível após período de inatividade e reinicialização do Render.

## 8. Resultado da verificação final

Verificação de infraestrutura em 04/11/2026–05/11/2026 (UTC):

| Item | Resultado | Evidência |
| --- | --- | --- |
| Render / implantação da API | **Confirmado: Live** no deploy `dep-dblu6gvb9u1s73872jh0`, commit `8a67db4` | Status de deploy do Render e logs `Started EcovoltApiApplication`, `EcoVoltOraclePool - Start completed`, `Your service is live` |
| Compilação frontend no código examinado | **Falha estática localizada e corrigida:** quatro componentes `Live*` usados em `AppRoutes.tsx` sem imports | Imports adicionados às branches `main` e `codex/sprint4-integracao`; é necessário confirmar o build na Vercel |
| URL pública Vercel | **Não confirmada nesta verificação** | O ambiente de verificação não conseguiu resolver o domínio via HTTPS; verificar o painel e a abertura real do site |
| `GET /health` externo | **Não confirmado nesta verificação** | Status Render Live disponível; requisição externa independente não concluída |
| Login, upload, aprovação e CRUD publicados | **Não reexecutados nesta verificação** | Exigem browser e operações seguras na versão publicada |
| Screenshots da Sprint 4 | **Pendentes de captura atualizada** | Imagens presentes no repositório são da documentação anterior; não foram substituídas por capturas fictícias |

A Sprint 4 possui registros anteriores de testes de integração em 30/10/2026 no documento original, e de fluxos autenticados em 04/11/2026 em [Área interna funcional](AREA-INTERNA.md). São registros históricos de execução; não devem ser confundidos com uma nova bateria de testes completa.

## 9. Evidências e capturas de tela

As imagens atuais do repositório são anteriores à presente verificação e ficam preservadas, sem alteração, em [`docs/images/`](images/). O contexto histórico foi movido para [Sprint 3 — Histórico](SPRINT3-HISTORICO.md). **Não apresente essas imagens como prints do deploy atual.**

Para atualizar prints reais, após confirmar o Vercel publicado:

1. Abra a aplicação em uma janela sem extensões, com zoom 100%, removendo dados pessoais de qualquer captura.
2. Capture a página inicial e a tela de login.
3. Use uma conta fictícia para capturar o dashboard, missões, envio de ação, fila de validações e contas de energia.
4. Faça também uma captura mobile (390 px) das telas com responsividade relevante.
5. Exporte em PNG ou JPG, nomes claros, por exemplo `sprint4-home.png`, `sprint4-login.png`, `sprint4-dashboard.png`, `sprint4-missoes.png`, `sprint4-validacoes.png`, `sprint4-energia.png` e `sprint4-mobile.png`.
6. Grave os arquivos reais em `EcoVolt/docs/images/` e atualize este capítulo para incluir as imagens por links relativos.
7. Registre commit e data do deploy usado na captura; remova tokens, credenciais, e-mails privados e códigos de recuperação da tela.

As capturas atuais devem ser incluídas nesta seção antes da entrega final; não crie ilustrações artificiais para simular screenshots de uma interface publicada.

## 10. Troubleshooting

- **Vercel / build TypeScript:** confira `EcoVolt/src/routes/AppRoutes.tsx` e os imports `LiveLayout`, `LiveMissions`, `LiveMissionDetail` e `LiveEnergy`; rode `npm run build` e inspecione o log de produção.
- **Página em branco / rotas diretas:** confira erros do console, `VITE_API_URL`, `EcoVolt/vercel.json` e se `dist` foi gerada.
- **CORS:** inclua a origem HTTPS exata da Vercel em `CORS_ALLOWED_ORIGINS`; reinicie somente quando necessário.
- **Render `ORA-02391`:** significa limite de sessões Oracle por usuário excedido. A aplicação foi configurada com pool de uma conexão. Verifique outros serviços, clientes e sessões antigas; peça ao administrador do Oracle para identificar sessões órfãs. Não encerre sessões de terceiros sem autorização.
- **Render inicia, mas API retorna erro:** consulte logs de requisição e erros de SQL; implantação Live não é garantia de banco saudável em todas as rotas.
- **Primeira visita lenta:** o plano gratuito do Render pode hibernar, causando atraso na reativação.
- **Dúvidas sobre avaliador:** consulte [Área interna](AREA-INTERNA.md). Convites são distribuídos fora do GitHub.

## 11. Entrega, vídeo e cuidados

O grupo deve conferir a execução presencial, gravar e publicar o vídeo de até 3 minutos demonstrando frontend, integração Java, banco e acesso por perfil autorizado, e então substituir o status de pendência por um link real. Não invente links nem mencione testes como aprovados sem executá-los. Evite alterações em produção durante a apresentação. Preserve o histórico de commits de cada integrante; assistência de IA não substitui a revisão do grupo.
