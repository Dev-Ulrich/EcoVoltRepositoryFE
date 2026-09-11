⚡ EcoVolt — Transformando ações sustentáveis em impacto real

Plataforma web gamificada desenvolvida como parte do FIAP Challenge SoulUp 2026, com o objetivo de incentivar usuários a praticarem ações sustentáveis reais por meio de missões, pontuação, ranking, conquistas e recompensas.

Sumário

Visão Geral

Contexto e Problema

Solução Proposta

Funcionalidades

Mecânica de Gamificação

Sistema de Validação

Tecnologias Utilizadas

Arquitetura da Aplicação

Estrutura do Projeto

Páginas e Rotas

Regras da Demonstração

Como Executar

Credenciais de Teste

Roteiro de Demonstração

Qualidade e Testes

Prévia Visual do Projeto

Roadmap

Repositório e Vídeo Pitch

Equipe

Contato

Licença

Visão Geral

O EcoVolt é uma solução web gamificada integrada à proposta da plataforma SoulUp, desenvolvida para estimular o engajamento contínuo dos usuários em ações sustentáveis.

A aplicação transforma práticas ambientais em uma experiência interativa, reunindo:

ações sustentáveis;

envio de evidências em vídeo;

análise e revisão de ações;

pontos e XP;

missões;

ranking mensal;

tiers;

recompensas e conquistas;

acompanhamento do progresso do participante.

A versão atual do Front-End foi reconstruída como uma Single Page Application (SPA) utilizando React, TypeScript, Vite, Tailwind CSS e React Router, substituindo a implementação anterior baseada em páginas HTML independentes.

O projeto possui uma área institucional pública e uma área interna demonstrativa acessada após login.

Esta aplicação representa um protótipo funcional de Front-End. Autenticação, envio de arquivos, análise das evidências, persistência e recompensas são simulados localmente nesta etapa.

Contexto e Problema

A SoulUp identificou a necessidade de aumentar o engajamento recorrente das pessoas em práticas sustentáveis, indo além de campanhas ou ações pontuais.

O desafio consiste em criar uma experiência capaz de:

incentivar a realização frequente de ações sustentáveis;

comprovar que as ações realmente foram realizadas;

reduzir tentativas de fraude ou exploração do sistema;

fornecer feedback sobre o impacto gerado;

criar uma comunidade com progressão e competição saudável;

oferecer recompensas que estimulem a continuidade do comportamento.

Principais dores endereçadas

baixa retenção em iniciativas sustentáveis tradicionais;

dificuldade em validar ações realizadas fora da plataforma;

pouca visibilidade sobre o progresso individual;

ausência de mecanismos de gamificação contínua;

dificuldade em criar senso de comunidade;

possibilidade de ações repetidas ou fraudulentas para obtenção de pontos;

falta de recompensas concretas associadas ao impacto sustentável.

Solução Proposta

O EcoVolt propõe uma plataforma gamificada em que o usuário realiza ações sustentáveis, envia uma evidência e acompanha o processo de validação.

Fluxo principal da solução

O usuário acessa a plataforma.

Realiza login utilizando uma conta demonstrativa.

Acessa o dashboard da área interna.

Escolhe uma ação sustentável.

Informa os dados solicitados e seleciona um vídeo como evidência.

A ação é registrada com status Em análise.

O usuário acompanha a análise na área de validações.

A demonstração permite simular aprovação ou recusa.

Caso a ação seja recusada, o participante pode solicitar revisão.

Quando uma ação é aprovada, pontos, XP e progresso de missões são atualizados.

O usuário acompanha sua evolução por meio do dashboard, missões, ranking, recompensas e perfil.

Na solução completa idealizada pelo projeto, a análise das evidências poderá combinar regras determinísticas, análise contextual, apoio de Inteligência Artificial e revisão humana quando necessário.

Funcionalidades

Área pública

✅ Página inicial institucional;

✅ Página Como Funciona;

✅ Página Sobre;

✅ Página Quem Somos;

✅ Página FAQ;

✅ Página Contato;

✅ Tela de login;

✅ Tema claro e escuro;

✅ Layout responsivo;

✅ Header e Footer compartilhados;

✅ Menu adaptado para dispositivos móveis;

✅ Página 404 para rotas inexistentes.

Área interna da aplicação

✅ Dashboard do participante;

✅ visualização de pontos;

✅ visualização de XP;

✅ visualização de tier;

✅ resumo de ranking;

✅ resumo de missões;

✅ atividades recentes;

✅ envio de nova ação sustentável;

✅ associação de ações a categorias e ODS;

✅ seleção ou arraste de vídeo;

✅ validação dos dados do formulário;

✅ acompanhamento das ações enviadas;

✅ busca e filtro por status;

✅ visualização dos detalhes de uma ação;

✅ simulação de análise;

✅ simulação de aprovação ou recusa;

✅ solicitação de revisão;

✅ acompanhamento das missões;

✅ filtros de missões por dificuldade e status;

✅ ranking mensal;

✅ filtro do ranking por tier;

✅ catálogo de recompensas;

✅ requisitos e progresso de recompensas;

✅ perfil do participante;

✅ estatísticas;

✅ ODS relacionadas ao usuário;

✅ conquistas.

Recursos de interface

✅ navegação SPA utilizando React Router;

✅ componentes reutilizáveis;

✅ estado compartilhado entre páginas;

✅ tema persistido;

✅ formulários tipados e validados;

✅ feedbacks de erro, sucesso e estados vazios;

✅ compatibilidade com desktop, tablet e mobile.

Mecânica de Gamificação

A gamificação do EcoVolt utiliza pontos, XP, missões, ranking, tiers e conquistas para incentivar recorrência e diversidade das ações sustentáveis.

Pontuação

Cada ação pode possuir uma quantidade de pontos definida conforme critérios como:

impacto ambiental;

dificuldade;

esforço necessário;

categoria;

frequência recomendada;

relação com os Objetivos de Desenvolvimento Sustentável.

Na demonstração atual, a pontuação é aplicada quando uma ação é aprovada.

XP

A aprovação de uma ação também concede XP.

Na implementação demonstrativa atual, uma aprovação concede:

os pontos definidos para a categoria da ação;

40 XP.

Tiers

O conceito do EcoVolt contempla os seguintes tiers:

🔩 Ferro

🥉 Bronze

🥈 Prata

🥇 Ouro

💎 Diamante

🌱 Sustentabilístico

Na versão atual do Front-End, o tier da conta demonstrativa é fixo e utilizado principalmente para apresentação do ranking.

A promoção automática entre tiers não faz parte desta etapa.

Missões

As missões incentivam frequência e diversidade de participação.

A plataforma possui missões com diferentes níveis de dificuldade e apresenta:

progresso;

status;

requisitos;

filtros por dificuldade;

filtros por conclusão.

O progresso de determinadas missões é derivado das ações aprovadas durante a demonstração.

Recompensas

O projeto apresenta um catálogo demonstrativo de recompensas e conquistas.

A interface permite visualizar:

requisito de pontos;

progresso;

estado da recompensa;

filtros do catálogo.

Nesta etapa não existe resgate financeiro real, débito de pontos ou integração com parceiros.

Sistema de Validação

A proposta do EcoVolt utiliza um fluxo de validação para reduzir fraudes e aumentar a confiabilidade das ações registradas.

Modelo conceitual da solução

Etapa

Descrição

1. Regras determinísticas

Verificação dos dados do envio, categoria, limites e histórico

2. Análise contextual

Conferência da coerência entre a ação escolhida e a evidência

3. Apoio de IA

Identificação de inconsistências, repetições ou sinais suspeitos

4. Revisão manual

Análise humana em casos ambíguos ou contestados

5. Recurso do usuário

Possibilidade de solicitar revisão de uma ação recusada

A Inteligência Artificial é considerada uma camada de apoio à validação, e não a única responsável pela decisão.

Funcionamento na versão atual

Como esta entrega é de Front-End, a avaliação real do vídeo ainda não é executada.

A aplicação permite simular o fluxo:

Envio
  ↓
Em análise
  ↓
Aprovado
  ou
Recusado
  ↓
Solicitação de revisão
  ↓
Em revisão
  ↓
Novo resultado simulado

A simulação permite validar o comportamento da interface e a consistência dos dados sem depender de um back-end.

Tecnologias Utilizadas

Front-End atual

Tecnologia

Utilização

React 19

Construção da interface por componentes

TypeScript 6

Tipagem estática, contratos e maior segurança no desenvolvimento

Vite 8

Ambiente de desenvolvimento, build e preview

React Router DOM 7

Navegação entre páginas e rotas da SPA

Tailwind CSS 4

Estilização e composição visual da aplicação

React Hook Form

Gerenciamento e validação de formulários

Lucide React

Ícones reutilizáveis na interface

Context API

Compartilhamento de autenticação e dados da demonstração

sessionStorage

Persistência da identificação da sessão fictícia

Web Storage / preferência local

Persistência de preferências da interface, como tema

Oxlint

Análise estática e padronização do código

Node.js Test Runner

Execução dos testes automatizados

Git e GitHub

Versionamento, colaboração e revisão do projeto

Tecnologias relacionadas ao Challenge

O EcoVolt é um projeto multidisciplinar da FIAP e possui entregas complementares em outras disciplinas.

Área / Disciplina

Tecnologia / Ferramenta

Aplicação no Projeto

Front-End

React, TypeScript, Vite e Tailwind CSS

Interface web atual do EcoVolt

Chatbot

IBM Watson Assistant

Fluxos de conversa e suporte ao usuário

Banco de Dados

Oracle SQL Developer Data Modeler

Modelagem conceitual e lógica

Banco de Dados

Oracle SQL

Scripts DDL e estrutura relacional

Python

Python 3

MVP e aplicação de conceitos de lógica e programação

Java

Java

Modelagem orientada a objetos do domínio

Prototipação

Figma

Apoio à definição e evolução das telas

Versionamento

Git e GitHub

Controle de versão e trabalho colaborativo

Este repositório concentra a implementação atual do Front-End. As demais tecnologias pertencem às entregas complementares do Challenge.

Arquitetura da Aplicação

A versão atual foi organizada para separar responsabilidades e evitar concentração de toda a lógica nos componentes de página.

Camadas principais

pages

Contém as páginas acessadas pelas rotas da aplicação.

As páginas estão separadas entre:

páginas públicas;

páginas da área autenticada.

components

Contém componentes reutilizáveis da interface, incluindo elementos compartilhados entre diferentes páginas.

components/layout

Centraliza os layouts principais:

layout público;

layout da área interna.

routes

Responsável pela definição das rotas da aplicação utilizando React Router.

auth

Responsável pela autenticação demonstrativa, sessão e acesso ao usuário atual.

contexts

Mantém o estado compartilhado da aplicação demonstrativa.

O DemoDataProvider preserva alterações durante a navegação entre rotas e reinicia os dados quando o usuário sai ou troca de conta.

hooks

Disponibiliza hooks personalizados para acesso aos dados compartilhados.

data

Centraliza mocks, dados iniciais e regras da demonstração.

types

Define contratos TypeScript utilizados por entidades como:

usuário;

ação sustentável;

missão;

ranking;

recompensa.

styles

Contém os estilos globais da aplicação.

assets

Armazena imagens e recursos visuais organizados por contexto/página.

Estrutura do Projeto

A estrutura principal atual pode ser representada da seguinte forma:

EcoVoltRepositoryFE/
└── EcoVolt/
    ├── docs/
    │   └── PLANEJAMENTO-ANTERIOR.md
    │
    ├── public/
    │   ├── ecovolt-logo.png
    │   └── ecovolt-logo-dark.png
    │
    ├── src/
    │   ├── assets/
    │   │   ├── brand/
    │   │   └── public/
    │   │       ├── como-funciona/
    │   │       ├── contato/
    │   │       ├── faq/
    │   │       ├── home/
    │   │       ├── quem-somos/
    │   │       └── sobre/
    │   │
    │   ├── auth/
    │   ├── components/
    │   │   └── layout/
    │   ├── contexts/
    │   ├── data/
    │   ├── hooks/
    │   ├── pages/
    │   │   ├── app/
    │   │   └── public/
    │   ├── routes/
    │   │   └── AppRoutes.tsx
    │   ├── styles/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── tests/
    ├── .gitignore
    ├── .oxlintrc.json
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── README.md

A arquitetura atual substitui a organização anterior baseada em diversos arquivos .html, .css e .js independentes.

Páginas e Rotas

Páginas públicas

Rota

Página

Função

/

Home

Apresentação da proposta do EcoVolt

/login

Login

Acesso à conta demonstrativa

/como-funciona

Como Funciona

Explicação do fluxo da plataforma

/sobre

Sobre

Contexto, propósito e informações do projeto

/quem-somos

Quem Somos

Equipe responsável pelo EcoVolt

/faq

FAQ

Perguntas frequentes com busca e filtros

/contato

Contato

Informações da equipe e formulário demonstrativo

rota inexistente

404

Tratamento de páginas não encontradas

Área interna

Rota

Página

Função

/app

Dashboard

Visão geral de pontos, XP, missões, ranking e atividades

/app/enviar-acao

Enviar Ação

Cadastro de uma ação sustentável e seleção de vídeo

/app/validacoes

Validações

Busca, filtros e acompanhamento das ações

/app/validacoes/:acaoId

Detalhes da Ação

Evidência, histórico e análise simulada

/app/validacoes/:acaoId/revisao

Revisão

Solicitação de revisão de uma ação recusada

/app/missoes

Missões

Progresso e filtros das missões

/app/ranking

Ranking

Classificação mensal e filtros por tier

/app/recompensas

Recompensas

Catálogo, requisitos e progresso

/app/perfil

Perfil

Dados da conta, estatísticas, ODS e conquistas

A navegação ocorre sem recarregar toda a página, seguindo o modelo de uma SPA.

Regras da Demonstração

A implementação atual utiliza dados locais e regras determinísticas para permitir a navegação completa pelo fluxo.

Evidências em vídeo

Formatos aceitos:

MP4 (video/mp4);

MOV (video/quicktime);

AVI (video/x-msvideo).

Limite:

até 100 MB

O arquivo precisa possuir tamanho maior que zero.

O vídeo não é enviado para servidor, armazenado ou processado. A demonstração mantém apenas metadados necessários durante a sessão em memória.

Textos

Descrição e justificativa de revisão utilizam validações de tamanho no formulário.

Faixa utilizada na demonstração:

10 a 2.000 caracteres

Aprovação

Quando uma ação é aprovada:

os pontos da categoria são concedidos;

são adicionados 40 XP;

missões relacionadas podem avançar;

indicadores da aplicação são atualizados.

Recusa

A simulação de recusa exige a informação de um motivo.

Revisão

Ações recusadas podem receber uma solicitação de revisão.

O sistema impede que pedidos duplicados ou aprovações repetidas concedam pontuação novamente.

Ranking

O ranking:

é apresentado por tier;

representa um ciclo mensal;

possui critérios determinísticos de ordenação na demonstração.

O tier da conta fictícia é fixo nesta entrega.

Persistência

Os dados de negócio da demonstração ficam somente em memória.

Isso significa que:

navegar entre páginas mantém as alterações;

atualizar a página restaura os mocks;

sair da conta restaura os mocks;

trocar de conta restaura os mocks.

A identificação da sessão fictícia pode permanecer na mesma aba por meio do sessionStorage.

Como Executar

Requisitos

Node.js 24 ou superior;

npm.

1. Clone o repositório

git clone https://github.com/Dev-Ulrich/EcoVoltRepositoryFE.git

2. Acesse a pasta da aplicação

cd EcoVoltRepositoryFE/EcoVolt

3. Instale as dependências

Para uma instalação reproduzível utilizando o package-lock.json:

npm ci

4. Execute o ambiente de desenvolvimento

npm run dev

Abra no navegador o endereço exibido pelo Vite.

Normalmente:

http://localhost:5173

Build de produção

npm run build

Preview da build

npm run preview

Lint

npm run lint

Testes

npm test

Credenciais de Teste

A autenticação implementada nesta etapa é demonstrativa.

Campo

Valor

E-mail

demo@ecovolt.example

Senha

EcoVoltDemo2026

O formulário de login utiliza validação e permite mostrar ou ocultar a senha.

A senha não é armazenada no navegador.

Após a autenticação, somente a identificação fictícia da sessão é mantida no sessionStorage.

Não existe autenticação de produção, banco de usuários ou integração com servidor nesta entrega.

Roteiro de Demonstração

Um fluxo recomendado para apresentar a aplicação é:

Entre utilizando a conta fictícia.

Observe os indicadores iniciais no Dashboard.

Acesse Enviar ação.

Selecione uma categoria sustentável.

Preencha a descrição.

Selecione um vídeo válido.

Envie a ação.

Acesse os detalhes da nova ação.

Utilize a análise simulada.

Simule uma recusa informando um motivo.

Solicite uma revisão.

Preencha a justificativa da revisão.

Volte aos detalhes da ação.

Simule a aprovação.

Confira a atualização dos pontos e XP.

Acesse Missões e observe a evolução.

Acesse Ranking.

Acesse Recompensas.

Acesse Perfil.

Teste os filtros e estados vazios.

Acesse o formulário de Contato.

Teste também o modo claro/escuro e o layout responsivo.

Cenário inicial demonstrativo

A conta fictícia inicia com dados pré-configurados para facilitar a apresentação.

Entre os dados utilizados no cenário estão:

115 pontos;

90 XP;

uma ação aprovada;

duas missões ativas.

Após um dos fluxos demonstrativos de aprovação, os indicadores podem evoluir para:

325 pontos;

380 XP;

duas ações aprovadas;

três missões concluídas.

Esses valores fazem parte dos mocks da demonstração e não representam dados de produção.

Qualidade e Testes

O projeto disponibiliza scripts para verificar a qualidade da aplicação antes da entrega.

Análise estática

npm run lint

O projeto utiliza Oxlint.

Testes automatizados

npm test

Os testes utilizam o test runner nativo do Node.js e cobrem cenários da lógica demonstrativa, incluindo comportamentos relacionados a:

autenticação;

envio de ações;

revisão;

aprovação;

consistência de indicadores.

Build

npm run build

O build executa:

validação TypeScript;

geração da versão de produção com Vite.

Antes da entrega, recomenda-se validar:

navegação;

rotas;

campos inválidos;

responsividade;

teclado;

tema claro/escuro;

estados vazios;

login e logout;

fluxo completo de envio e revisão;

build de produção.

Prévia Visual do Projeto

IMPORTANTE: substituir os placeholders abaixo pelas imagens atualizadas antes da entrega.

Página Inicial

![Página Inicial](CAMINHO-DA-IMAGEM-DA-HOME)

Como Funciona

![Como Funciona](CAMINHO-DA-IMAGEM-COMO-FUNCIONA)

Login

![Login](CAMINHO-DA-IMAGEM-LOGIN)

Dashboard

![Dashboard](CAMINHO-DA-IMAGEM-DASHBOARD)

Envio de Ação

![Envio de Ação](CAMINHO-DA-IMAGEM-ENVIAR-ACAO)

Validações

![Validações](CAMINHO-DA-IMAGEM-VALIDACOES)

Missões

![Missões](CAMINHO-DA-IMAGEM-MISSOES)

Ranking

![Ranking](CAMINHO-DA-IMAGEM-RANKING)

Recompensas

![Recompensas](CAMINHO-DA-IMAGEM-RECOMPENSAS)

Perfil

![Perfil](CAMINHO-DA-IMAGEM-PERFIL)

Responsividade

![Versão Responsiva](CAMINHO-DA-IMAGEM-RESPONSIVA)

Roadmap

Concluído na versão atual

Migração do projeto anterior para React;

adoção de TypeScript;

configuração do Vite;

configuração do Tailwind CSS;

criação da arquitetura de componentes;

implementação de React Router;

criação de layouts compartilhados;

criação da página inicial;

criação da página Como Funciona;

criação da página Sobre;

criação da página Quem Somos;

criação da página FAQ;

criação da página Contato;

criação da tela de Login;

criação da área autenticada demonstrativa;

criação do Dashboard;

criação do fluxo de envio de ações;

criação da página de Validações;

criação dos detalhes de uma ação;

criação do fluxo de solicitação de revisão;

criação da página de Missões;

criação do Ranking;

criação da página de Recompensas;

criação do Perfil;

criação de estados e mocks compartilhados;

implementação de formulários validados;

implementação de tema claro/escuro;

implementação de responsividade;

criação da página 404;

configuração de lint;

criação de testes da lógica demonstrativa;

configuração de build de produção;

versionamento colaborativo com Git e GitHub.

Entregas relacionadas ao Challenge

Modelagem do banco de dados;

scripts DDL em Oracle SQL;

MVP em Python;

projeto Java orientado a objetos;

chatbot com IBM Watson Assistant;

desenvolvimento e evolução do Front-End.

Próximas evoluções possíveis

integração com uma API real;

autenticação segura;

persistência em banco de dados;

armazenamento real de vídeos;

processamento e validação automatizada de evidências;

integração de IA ao fluxo de análise;

painel administrativo;

revisão manual por moderadores;

sistema real de resgate de recompensas;

integração com parceiros;

notificações;

histórico persistente de atividades;

telemetria e métricas da plataforma;

publicação em ambiente de produção.

Repositório e Vídeo Pitch

Repositório oficial

https://github.com/Dev-Ulrich/EcoVoltRepositoryFE

Vídeo Pitch

Substituir pelo novo link do vídeo antes da entrega.

LINK-DO-NOVO-VIDEO-PITCH

Equipe

Projeto desenvolvido pela equipe EcoVolt, da turma 1TDSPW da FIAP.

Integrante

RM

Turma

GitHub

LinkedIn

Victor Ulrich Costa Alves da Silva

568634

1TDSPW

Dev-Ulrich

LinkedIn

Matheus Pereira da Silva Franco

569315

1TDSPW

MatheusPSFranco

LinkedIn

Matheus Luca Fouad Barragão

572228

1TDSPW

MatheusLuca

LinkedIn

Arthur da Silva Santana

571075

1TDSPW

arthursantana1521

LinkedIn

Contato

Em caso de dúvidas sobre o projeto, entre em contato com a equipe EcoVolt.

Responsável para contato:

Nome: Victor Ulrich Costa Alves da Silva

E-mail: victorulrich07@gmail.com

GitHub: https://github.com/Dev-Ulrich

Licença

Projeto acadêmico desenvolvido para fins educacionais como parte do FIAP Challenge SoulUp 2026.

O uso, redistribuição e adaptação deste projeto devem respeitar as diretrizes da FIAP, da proposta do Challenge e dos integrantes da equipe.

<p align="center">
  <strong>EcoVolt</strong> — Transformando ações sustentáveis em impacto real.<br/>
  © 2026 EcoVolt — FIAP Challenge SoulUp
</p>