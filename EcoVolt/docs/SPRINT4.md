# Sprint 4 — integração Java

## Requisitos e implementação
React + Vite + TypeScript e Tailwind preservados da Sprint 3. Páginas institucionais existentes: início, sobre, equipe (fotos/RM/turma/GitHub/LinkedIn), FAQ e contato.

- `/missoes`: GET /missao, pesquisa e filtro de ativas.
- `/missoes/:id`: GET /missao/{id}, rota dinâmica com validação de parâmetro.
- `/energia`: GET, POST, PUT e DELETE /conta-energia; GET /usuario para seleção de chave estrangeira.
- Carregamento, erro, lista vazia, confirmação de exclusão, prevenção de envio duplicado e mensagens de sucesso.
- Configuração `VITE_API_URL` sem credenciais do Oracle no navegador.

A área `/app` é a demonstração preservada da Sprint 3. Seu login não autentica na API e suas simulações não são persistidas no Oracle. A API original não tem controle de acesso: use uma base acadêmica sem dados pessoais reais. CORS limita origens de navegador, mas não substitui autenticação.

## Como usar
Repositório: https://github.com/Dev-Ulrich/EcoVoltRepositoryFE

Frontend: pasta `EcoVolt`. Node 24+, `npm ci`, copiar `.env.example` para `.env.local`, preencher a URL HTTPS da API, `npm run dev`. Verificação: `npm run build` e `npm test`.

API: pasta `backend`, Java 21 e Maven. Dockerfile de múltiplas etapas; configurar SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD e CORS_ALLOWED_ORIGINS. O schema não é inicializado nem apagado na partida. Requer tabelas e usuários existentes no Oracle. Origem da API: https://github.com/MatheusPSFranco/EcoVolt-API-Restful (base a144c852c4088e1bd612a1d76058f9ab7d029bca).

Render: Web Service, Docker, contexto e Dockerfile na pasta backend, plano Free. Configurar as variáveis no painel. O arquivo render.yaml também descreve a configuração, sem segredos.

Vercel: importar o repositório frontend, Root Directory `EcoVolt`, preset Vite, build `npm run build`, saída `dist`. Configurar VITE_API_URL antes do build. Adicionar a URL exata do frontend em CORS_ALLOWED_ORIGINS da API. As URLs publicadas devem ser registradas no README após confirmação de funcionamento.

Vídeo YouTube (máximo 3 minutos): pendente de gravação pelo grupo.

## Roteiro de validação
1. Abrir as páginas institucionais em 390, 768 e 1280 pixels; testar menu e teclado.
2. Em Missões, buscar, filtrar e abrir um ID; testar um ID inválido e um inexistente.
3. Em Energia, cadastrar uma conta de teste com um usuário válido, recarregar, editar e recarregar. Conferir persistência no Oracle.
4. Excluir somente a conta de teste após confirmação e recarregar.
5. Indisponibilizar a API de teste e conferir mensagens de erro, sem falsos dados de sucesso.
6. Abrir `/missoes/1` diretamente na URL Vercel para validar fallback SPA.

## Uso de IA
Ferramenta: Codex/OpenAI. Solicitação: ler requisitos da Sprint 4, preparar integração do frontend com API Java, publicar e dividir em cinco commits por integrante. Código de HTTP, telas conectadas, testes e configuração de deploy foram preparados com assistência de IA. O grupo deve revisar os contratos, testar o CRUD e explicar as decisões no vídeo; o material não comprova participação individual por si só. Não foram criados commits em nome de integrantes.

## URLs publicadas
Frontend: https://ecovolt-sprint4.vercel.app
API: https://ecovolt-api-sprint4.onrender.com

## Validação realizada em 30/10/2026
Build TypeScript/Vite aprovado. Três arquivos de testes frontend aprovados, incluindo HTTP (POST/204/erro de servidor/rede/configuração ausente). Teste Java de regressão do ModelMapper aprovado. Consultas remotas de missões, usuários e contas retornaram 200. CRUD remoto de conta de teste: POST 201, GET 200, PUT 200, leitura após atualização confirmada e DELETE 204. Somente o registro criado para o teste foi excluído.

Correção de backend: MatchingStrategies.STRICT evita que idUsuario/idRecompensa sejam mapeados como id da conta. Credenciais foram configuradas no Render e não constam do código. Plano Free pode demorar ao retornar de inatividade; o cliente espera até 90 segundos.

A publicação pontual da integração na Vercel preserva main como branch de produção para futuros pushes. Não fazer push de código incompleto em main: isso pode substituir a versão publicada. Depois de finalizar os commits individuais, enviar a versão completa para main.
