# API EcoVolt — suporte à área autenticada

Java 21 / Spring Boot / Oracle. A configuração usa somente variáveis de ambiente. Consulte `../EcoVolt/docs/AREA-INTERNA.md` para operação e validação.

O código original da API foi preservado. O pacote `app` implementa autenticação, autorização por usuário, anexos e operações transacionais da interface. As rotas legadas são bloqueadas para evitar acesso sem isolamento.

A primeira inicialização cria somente `T_EV_ARQUIVO_WEB` se a tabela não existir. Não executar o antigo script `database.sql`, que contém remoção de tabelas.

`mvn test` executa as verificações unitárias. `mvn package` gera o JAR. O Dockerfile usa Java 21.
