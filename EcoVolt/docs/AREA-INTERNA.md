# Área interna funcional

Frontend: https://ecovolt-sprint4.vercel.app
API: https://ecovolt-api-sprint4.onrender.com

## Fluxos disponíveis
- Cadastro de usuário, login, saída, restauração da sessão, recuperação por código e alteração de senha.
- Perfil com alteração de nome; e-mail identifica a conta e permanece fixo.
- Missões: consulta, pesquisa, participação, detalhes, requisitos e progresso calculado a partir de ações aprovadas.
- Ações: envio com evidência, consulta dos próprios registros, cancelamento enquanto pendente e pedido de revisão após reprovação.
- Avaliadores: fila de atividades, download das evidências, aprovação ou reprovação com justificativa. Autoaprovação e dupla pontuação são bloqueadas.
- Contas de energia: cadastro, edição, exclusão de pendentes e download de comprovantes.
- Recompensas: consulta dos benefícios concedidos ao usuário e resgate único, com aplicação de subsídio em conta pendente quando cabível. Não há movimentação financeira real nem pagamento à concessionária.
- Ranking atualizado com os pontos acumulados em ações e missões aprovadas.

As páginas institucionais públicas, seus componentes, estilos e imagens foram preservados. Login, cadastro e recuperação pertencem ao fluxo de acesso atualizado. As antigas rotas de consulta após o login levam às telas conectadas.

## Acesso do avaliador
O endereço indicado pelo responsável é reservado para cadastro com convite. O código é entregue separadamente, nunca no repositório. O professor define sua própria senha na tela de cadastro e informa o código no campo de convite. Após entrar, usa **Validações → Abrir fila de avaliação**. Outros cadastros são usuários comuns.

## Senhas e sessões
Senhas usam PBKDF2-HMAC-SHA256, salt aleatório e 600.000 iterações. O cadastro fornece um código privado de recuperação; não há envio de e-mails. Guarde o código mostrado na tela. Alterar ou recuperar a senha gera outro código e encerra sessões anteriores. Contas antigas com hashes demonstrativos precisam de tratamento administrativo; as antigas credenciais fictícias da interface não autenticam no servidor.

Sessões opacas de até 12 horas são mantidas na memória da única instância Render. Reinícios e novos deploys exigem login novamente; os dados permanecem no Oracle. O navegador armazena somente o token em sessionStorage. A API identifica o usuário pelo token, nunca por um ID escolhido no frontend.

As rotas CRUD legadas da API ficam bloqueadas para impedir que contornem a autorização. A interface usa `/auth/*` e `/app/*`. A consulta de saúde é pública em `/health`.

## Anexos
JPG, PNG, WEBP, PDF ou MP4, até 5 MB. O conteúdo é persistido como BLOB no Oracle na tabela adicional `T_EV_ARQUIVO_WEB`, criada apenas se ausente. As tabelas existentes não são recriadas. Downloads exigem sessão: o dono acessa seus arquivos e avaliadores acessam evidências de ações. Comprovantes de contas de terceiros ficam restritos ao dono.

## Desenvolvimento e publicação
Frontend: Node 24+, `npm ci`, copiar `.env.example` para `.env.local`, `npm run dev`. Vercel: raiz `EcoVolt`, variável `VITE_API_URL` apontando para a API e novo build após mudanças dessa variável. `vercel.json` fornece fallback para navegação direta.

Backend: Java 21, Maven, pasta `backend`. Variáveis privadas `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `CORS_ALLOWED_ORIGINS` e `PORT`. A lista CORS deve incluir a origem exata do frontend. Nenhuma credencial Oracle faz parte do código. O serviço Render existente acompanha a branch `codex/sprint4-integracao`; a Vercel acompanha `main`. Para alterações futuras, publicar o backend nessa branch e o frontend em main, ou unificar a configuração dos serviços conscientemente.

## Validação em 04/11/2026
- Compilação TypeScript/Vite e testes existentes do frontend aprovados.
- Compilação Java e testes de senha, recuperação, validação monetária e ModelMapper aprovados.
- Duas contas fictícias isoladas foram usadas para testar cadastro, login, duplicidade de e-mail, senha inválida, perfil persistente e acesso negado sem sessão.
- Cadastro, edição, releitura, anexo e exclusão de contas; tentativa de acesso por outro usuário bloqueada.
- Participação em missão, envio com anexo, reprovação, recurso de revisão, aprovação e atualização dos pontos/progresso; autoaprovação e repetição de aprovação bloqueadas.
- Resgate persistente de recompensa e bloqueio de resgate duplicado.
- Cancelamento de envio, recuperação por código, invalidação do código anterior, troca de senha e logout.
- Conferência visual do login, painel e formulário de conta; cadastro pelo botão da interface e layout móvel.

Os registros utilizados nessas verificações são fictícios e removidos ao concluir a validação.

## Operação no Render e limite de sessões Oracle

- Serviço: https://dashboard.render.com/web/srv-dbifnpdg1s2s73c9cll0
- Endpoint público: https://ecovolt-api-sprint4.onrender.com/health
- Branch do backend: `codex/sprint4-integracao`.
- Diagnóstico registrado em 04/11/2026: `ORA-02391: exceeded simultaneous SESSIONS_PER_USER limit`. A configuração do HikariCP foi reduzida para **uma conexão máxima por instância**, com mínimo ocioso zero e inicialização tolerante a indisponibilidade temporária do banco. Isso reduz a pressão sobre o Oracle, mas **não aumenta o limite do banco nem garante o sucesso do deploy**.
- Verifique no Render se o deploy mais recente ficou **Live** e se `/health` responde. Se persistir `ORA-02391`, confira outros processos, instâncias e clientes usando o mesmo usuário Oracle. Aguarde o encerramento natural das sessões antigas ou peça ao administrador do Oracle para identificar e encerrar apenas sessões comprovadamente órfãs, sem interromper operações legítimas.
- Evite redeploys repetidos enquanto o banco está no limite: durante a substituição, duas instâncias podem coexistir e consumir sessões simultaneamente.
- Não coloque credenciais Oracle, código de convite nem códigos de recuperação nos logs, tickets ou GitHub.
- Antes de apresentar ao avaliador, confirme cadastro, login, fila de avaliação, upload e leitura de evidências, autorização e persistência no Oracle. **Essas verificações ainda dependem de um deploy saudável.**
