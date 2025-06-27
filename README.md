# Sistema de Gestão de Assinaturas - Fase 2

Este projeto implementa um sistema de gestão de assinaturas para provedores de internet, seguindo os princípios de uma arquitetura limpa e incorporando microsserviços para gestão de faturamento e planos ativos.

-----

## Estrutura do Projeto

O projeto é composto por três serviços principais:

  - **Serviço de Gestão (Serviço Principal):** Responsável pela gestão de clientes, planos e assinaturas.
  - **Serviço de Faturamento (Microsserviço):** Gerencia pagamentos e cobranças.
  - **Serviço de Planos Ativos (Microsserviço):** Mantém um cache de assinaturas ativas e responde a consultas sobre a validade das assinaturas.

-----

## Tecnologias Utilizadas

  - Node.js
  - Express.js
  - SQLite (para o banco de dados do Serviço de Gestão)
  - Message Broker (em memória para demonstração, com possibilidade de extensão para RabbitMQ/Kafka)
  - Docker e Docker Compose

-----

## Configuração e Execução

### Pré-requisitos

  - Docker Desktop instalado e em execução.
  - Node.js e npm (opcional, caso prefira executar os serviços individualmente sem Docker Compose).

### Passos para Executar com Docker Compose

1.  **Clone o repositório (se aplicável) ou crie a estrutura do projeto conforme descrito.**

2.  **Navegue até o diretório raiz do projeto (onde o `docker-compose.yml` está localizado).**

3.  **Construa e inicie os serviços:**

    ```bash
    docker-compose up --build
    ```

    Este comando irá:

      - Construir as imagens Docker para cada serviço com base em seus `Dockerfile` (que simplesmente copiarão o código e instalarão as dependências).
      - Iniciar todos os três serviços em modo *detached*.

4.  **Verifique se os serviços estão em execução:**

    Você deverá ver uma saída indicando que cada serviço está "escutando" em sua respectiva porta (3000, 3001, 3002).

### Executando Serviços Individualmente (sem Docker Compose)

1.  **Navegue para o diretório de cada serviço (`servico-gestao`, `microservices/servico-faturamento`, `microservices/servico-planos-ativos`).**

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie cada serviço:**

    ```bash
    npm run dev
    ```

    (Este comando utiliza `nodemon` para reinícios automáticos em caso de alterações no código. Para produção, `npm start` seria usado.)

-----

## Endpoints da API (via Serviço de Gestão - Porta 3000)

O `ServicoGestao` principal atua como um *API Gateway* para certas funcionalidades. A coleção do Postman (`postman-collection.json`) oferece um conjunto abrangente de requisições.

### Serviço de Gerenciamento de Planos (Serviço de Gestão)

  - **GET /gerenciaplanos/clients**: Lista todos os clientes.
  - **POST /gerenciaplanos/clients**: Cria um novo cliente.
    ```json
    {
        "name": "João da Silva",
        "email": "joao.silva@example.com"
    }
    ```
  - **PUT /gerenciaplanos/clients/:id**: Atualiza um cliente.
    ```json
    {
        "name": "João da Silva Sauro"
    }
    ```
  - **GET /gerenciaplanos/plans**: Lista todos os planos.
  - **POST /gerenciaplanos/plans**: Cria um novo plano.
    ```json
    {
        "name": "Internet Básica",
        "description": "100 Mbps",
        "price": 50.00
    }
    ```
  - **PUT /gerenciaplanos/plans/:id/cost**: Atualiza o custo de um plano.
    ```json
    {
        "newPrice": 55.00
    }
    ```
  - **POST /gerenciaplanos/subscriptions**: Cria uma nova assinatura.
    ```json
    {
        "codCli": 1,
        "codPlano": 1,
        "startDate": "2023-01-01"
    }
    ```
  - **GET /gerenciaplanos/subscriptions/client/:codCli**: Lista assinaturas para um cliente específico.
  - **GET /gerenciaplanos/subscriptions/plan/:codPlano**: Lista assinantes para um plano específico.

### Serviço de Faturamento (Acessado via Serviço de Gestão - Porta 3000)

  - **POST /registrarpagamento**: Registra um pagamento para uma assinatura. Esta requisição é tratada pelo `ServicoGestao`, que então a encaminha para o `ServicoFaturamento` (http://servico-faturamento:3001/payments).
    ```json
    {
        "dia": 25,
        "mes": 6,
        "ano": 2025,
        "codAss": 1,
        "valorPago": 49.99
    }
    ```

### Serviço de Planos Ativos (Acessado via Serviço de Gestão - Porta 3000)

  - **GET /planosativos/:codass**: Verifica se uma assinatura específica está ativa. Esta requisição é tratada pelo `ServicoGestao`, que então a encaminha para o `ServicoPlanosAtivos` (http://servico-planos-ativos:3002/active-plans/:codass).

-----

## Coleção Postman

Uma coleção Postman chamada `postman-collection.json` é fornecida no diretório raiz. Você pode importar este arquivo para o Postman para testar facilmente todos os *endpoints*.

-----

## Conclusão e Observações de Desenvolvimento

### Desafios Encontrados e Soluções

1.  **Comunicação Entre Serviços:**

      * **Desafio:** Decidir entre comunicação síncrona e assíncrona para diferentes cenários.
      * **Solução:** Para consultas diretas ao `ServicoFaturamento` e `ServicoPlanosAtivos`, foram escolhidas requisições HTTP síncronas, com o `ServicoGestao` atuando como proxy/gateway. Para eventos de pagamento (que precisam atualizar o cache no `ServicoPlanosAtivos` sem bloquear o fluxo principal), um padrão de *message broker* assíncrono foi implementado. Embora um *message broker* completo como RabbitMQ não tenha sido configurado devido à complexidade dentro do escopo do projeto, um `MessageBrokerService` em memória foi criado para simular esse comportamento, demonstrando a arquitetura orientada a eventos.

2.  **Manutenção do Cache de Planos Ativos:**

      * **Desafio:** O `ServicoPlanosAtivos` precisa manter um cache rápido e atualizado de assinaturas ativas.
      * **Solução:** Implementado um `SubscriptionCacheRepository` dentro do `ServicoPlanosAtivos` que armazena assinaturas ativas. Este cache é atualizado quando novas assinaturas são criadas (via chamada HTTP direta do `ServicoGestao`) e, crucialmente, quando pagamentos são registrados (via *message broker*). O `CheckSubscriptionUseCase` no `ServicoPlanosAtivos` consulta diretamente este cache.

3.  **Adaptação da Arquitetura Limpa para Microsserviços:**

      * **Desafio:** Aplicar os princípios da Arquitetura Limpa em múltiplos serviços, garantindo clara separação de preocupações dentro de cada um e definindo interfaces claras entre eles.
      * **Solução:** Cada microsserviço (`ServicoFaturamento`, `ServicoPlanosAtivos`) foi projetado com sua própria estrutura de Arquitetura Limpa (Entidades, Casos de Uso, Repositórios, Controladores). Os pontos de comunicação (`MessageBrokerService`, requisições HTTP) foram tratados como interfaces externas, permitindo que cada serviço permanecesse em grande parte independente em sua lógica interna.

4.  **Gerenciamento de Banco de Dados (SQLite para `ServicoGestao`):**

      * **Desafio:** Garantir que o banco de dados SQLite para o `ServicoGestao` seja devidamente inicializado e persistido (para desenvolvimento local).
      * **Solução:** O `Database.js` no `ServicoGestao` lida com a criação do arquivo `database.sqlite` e das tabelas necessárias na inicialização, caso não existam. Para Docker, uma montagem de volume garante que o arquivo do banco de dados persista entre as reinicializações do contêiner durante o desenvolvimento.

### Referências que Auxiliaram no Desenvolvimento

  - **Clean Architecture por Robert C. Martin (Uncle Bob):** Os princípios fundamentais para estruturar as camadas da aplicação.
  - **Documentação Node.js & Express.js:** Para a construção das APIs RESTful.
  - **Documentação SQLite:** Para operações básicas de banco de dados.
  - **Padrão: API Gateway:** Entendimento de como um serviço central pode rotear requisições para múltiplos microsserviços.
  - **Padrão: Publicador/Assinante (Message Broker):** Para implementar comunicação assíncrona entre serviços.

-----

Esta fase integrou com sucesso o `ServicoGestao` principal com novos microsserviços, demonstrando padrões de comunicação entre serviços e estendendo as capacidades do sistema conforme os requisitos do projeto.

