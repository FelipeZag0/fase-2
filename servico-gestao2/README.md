# Sistema de Controle de Planos de Operadora - Fase 1: ServicoGestao

[cite\_start]Este projeto representa a Fase 1 do Sistema de Controle de Planos de Operadora [cite: 1][cite\_start], com foco na implementação do `ServicoGestao`[cite: 91]. [cite\_start]Ele gerencia o cadastro de clientes, planos e assinaturas[cite: 24]. [cite\_start]A arquitetura foi concebida seguindo a Arquitetura Limpa de Robert Martin[cite: 84], aplicando princípios SOLID e padrões de projeto para garantir um sistema robusto e de fácil manutenção.

## Sumário

1.  [Introdução](https://www.google.com/search?q=%231-introdu%C3%A7%C3%A3o)
2.  [Objetivos do Projeto (Fase 1)](https://www.google.com/search?q=%232-objetivos-do-projeto-fase-1)
3.  [Design Arquitetural](https://www.google.com/search?q=%233-design-arquitetural)
      * [Arquitetura Limpa](https://www.google.com/search?q=%23clean-architecture)
      * [Diagrama UML (Descrição Conceitual)](https://www.google.com/search?q=%23uml-diagram-conceptual-description)
      * [Princípios SOLID](https://www.google.com/search?q=%23solid-principles)
      * [Padrões de Projeto Utilizados](https://www.google.com/search?q=%23design-patterns-used)
4.  [Tecnologias Utilizadas](https://www.google.com/search?q=%234-tecnologias-utilizadas)
5.  [Configuração e Instalação](https://www.google.com/search?q=%235-configura%C3%A7%C3%A3o-e-instala%C3%A7%C3%A3o)
6.  [Executando a Aplicação](https://www.google.com/search?q=%236-executando-a-aplica%C3%A7%C3%A3o)
7.  [Endpoints da API (ServicoGestao)](https://www.google.com/search?q=%237-endpoints-da-api-servicogestao)
8.  [Executando Testes](https://www.google.com/search?q=%238-executando-testes)
9.  [Conclusão e Desafios](https://www.google.com/search?q=%239-conclus%C3%A3o-e-desafios)

## 1\. Introdução

[cite\_start]O mercado de serviços de internet exige uma gestão eficiente de planos e assinaturas[cite: 77, 78]. [cite\_start]Este projeto visa fornecer um sistema backend para pequenas e grandes operadoras de internet [cite: 79] [cite\_start]que gerencia planos, clientes e suas assinaturas de forma eficiente[cite: 81]. [cite\_start]A Fase 1 foca no `ServicoGestao`, que é o módulo principal [cite: 23] [cite\_start]e cuida das operações fundamentais de gerenciamento[cite: 24]. [cite\_start]A capacidade de verificar a validade das assinaturas rapidamente é um requisito crucial[cite: 3]. [cite\_start]O sistema completo deve ser capaz de responder rapidamente se uma assinatura é válida[cite: 3]. [cite\_start]Cada instância do sistema atenderá a uma única operadora[cite: 8, 9].

## 2\. Objetivos do Projeto (Fase 1)

[cite\_start]Os objetivos da Fase 1, conforme o enunciado[cite: 90], são:

  * [cite\_start]**Modelar todo o sistema:** Incluindo todos os serviços, mesmo que apenas o principal seja implementado[cite: 90].
  * [cite\_start]**Implementar o `ServicoGestao`:** Este serviço é responsável pelo cadastramento e manutenção de dados de clientes, planos e assinaturas [cite: 15, 24][cite\_start], além de registrar pagamentos[cite: 16].
      * [cite\_start]Cadastrar/listar clientes[cite: 46].
      * [cite\_start]Cadastrar/listar planos[cite: 48].
      * [cite\_start]Cadastrar assinaturas[cite: 49].
      * [cite\_start]Atualizar o custo mensal de um plano[cite: 51].
      * [cite\_start]Listar assinaturas de um cliente[cite: 55].
      * [cite\_start]Listar assinaturas de um plano[cite: 57].
      * [cite\_start]Prever um endpoint para o registro de pagamentos (observador de evento, `POST /registrarpagamento`)[cite: 59, 62].
  * [cite\_start]**Aplicar Arquitetura Limpa:** Organizar o código segundo os preceitos da Arquitetura Limpa[cite: 94, 104].
  * [cite\_start]**Aderir aos Princípios SOLID:** Explicar como as classes seguem os princípios SOLID[cite: 93].
  * [cite\_start]**Utilizar Padrões de Projeto:** Demonstrar os padrões de projeto utilizados[cite: 94].
  * [cite\_start]**Uso de ORM:** Utilizar mapeamento objeto-relacional para interação com o banco de dados[cite: 104].
  * [cite\_start]**Documentação:** Fornecer um documento PDF com a descrição da arquitetura e instruções de execução [cite: 92, 98][cite\_start], além de um arquivo Postman atualizado[cite: 100].

## 3\. Design Arquitetural

### Clean Architecture

[cite\_start]O projeto segue a Arquitetura Limpa (Clean Architecture), um padrão que organiza o código em camadas concêntricas[cite: 84]. O princípio fundamental é a **Regra de Dependência**: dependências de código-fonte devem sempre apontar para dentro. As camadas internas (políticas de negócio) não devem ter conhecimento sobre as camadas externas (mecanismos como UI ou bancos de dados).

  * **Entidades (Domain Layer):** O círculo mais interno. Contém as regras de negócio de alto nível e as entidades do sistema. São objetos puros de negócio, independentes de frameworks ou bancos de dados. [cite\_start]Inclui `Client`, `Plan`, `Subscription` e `Payment`[cite: 11]. [cite\_start]Define interfaces (ou "ports") para comunicação com camadas externas, como `IClientRepository`[cite: 12].
  * **Casos de Uso (Application Layer):** Contém as regras de negócio específicas da aplicação. Orquestra o fluxo de dados para e das Entidades. Define o que a aplicação faz, mas não como. Ex: `RegisterClientUseCase`. Depende apenas da camada de Domínio.
  * **Adaptadores (Infrastructure Layer):** Camada de adaptação. Converte dados entre o formato das camadas internas e o formato de agentes externos (banco de dados, web). Inclui implementações concretas de repositórios (e.g., `ClientRepositoryPg` usando Sequelize), modelos ORM, controladores web e roteadores. Depende das camadas de Aplicação e Domínio.
  * **Frameworks & Drivers (Presentation Layer):** A camada mais externa. Contém frameworks e ferramentas (Express.js, PostgreSQL). É aqui que as dependências são "ligadas" (composition root, e.g., `main.js`). Depende da camada de Infraestrutura.

### UML Diagram (Descrição Conceitual)

[cite\_start]Embora não seja um diagrama visual, a estrutura de classes e pacotes do sistema segue o design abaixo[cite: 92]:

**Pacotes:**

  * **`Domain`**:

      * **Entidades**: `Client`, `Plan`, `Subscription`, `Payment`.
          * [cite\_start]`Client`: `id`, `name`, `email`[cite: 12].
          * [cite\_start]`Plan`: `codigo` (id), `nome`, `custoMensal`, `data` (última modificação), `descricao`[cite: 12].
          * [cite\_start]`Subscription`: `codigo` (id), `codPlano`, `codCli`, `inicioFidelidade`, `fimFidelidade`, `dataUltimoPagamento`, `custoFinal`, `descricao`[cite: 12, 13].
          * [cite\_start]`Payment`: `codigo` (id), `codAss`, `valorPago`, `dataPagamento`[cite: 13].
      * **Interfaces de Repositório**: `IClientRepository`, `IPlanRepository`, `ISubscriptionRepository`, `IPaymentRepository`. Estas definem contratos para persistência de dados.
      * **Interfaces de Serviços de Domínio**: `ISubscriptionDomainService`. Encapsula regras de negócio complexas que podem envolver múltiplas entidades.

  * **`Application`**:

      * **Casos de Uso**: `RegisterClientUseCase`, `ListClientsUseCase`, `RegisterPlanUseCase`, `ListPlansUseCase`, `CreateSubscriptionUseCase`, `ListClientSubscriptionsUseCase`, `ListPlanSubscribersUseCase`, `RegisterPaymentUseCase`. Cada um representa uma funcionalidade específica da aplicação.

  * **`Infrastructure`**:

      * **`database`**:
          * [cite\_start]`models`: `ClientModel`, `PlanModel`, `SubscriptionModel`, `PaymentModel` (modelos Sequelize para mapeamento ORM)[cite: 104].
          * `repositories`: `ClientRepositoryPg`, `PlanRepositoryPg`, `SubscriptionRepositoryPg`, `PaymentRepositoryPg` (implementações concretas das interfaces de repositório).
      * **`services`**: `SubscriptionDomainService` (implementação concreta de `ISubscriptionDomainService`).
      * **`web`**:
          * `controllers`: `ClientController`, `PlanController`, `SubscriptionController`, `PaymentController` (recebem requisições HTTP e chamam os casos de uso).
          * `routes`: `AppRouter` (define os endpoints da API).

**Relacionamentos:**

  * **Dependência (Inward):** As camadas internas são independentes das externas. Por exemplo, `RegisterClientUseCase` (Aplicação) depende de `IClientRepository` (Domínio), não de `ClientRepositoryPg` (Infraestrutura). `ClientController` (Infraestrutura) depende de `RegisterClientUseCase` (Aplicação).
  * **Implementação:** As classes de repositório em `Infrastructure` implementam as interfaces definidas em `Domain`.

### Princípios SOLID

[cite\_start]O código é estruturado para aderir aos princípios SOLID[cite: 93]:

  * **Single Responsibility Principle (SRP):** Cada classe tem uma única responsabilidade clara.
      * Exemplo: A entidade `Client` lida apenas com dados e validações de cliente [src/domain/entities/Client.js]. `ClientRepositoryPg` é responsável exclusivamente pela persistência de dados de cliente [src/infrastructure/database/repositories/ClientRepositoryPg.js]. `RegisterClientUseCase` encapsula a lógica de negócio para registrar um cliente [src/application/use-cases/RegisterClientUseCase.js].
  * **Open/Closed Principle (OCP):** Entidades de software devem ser abertas para extensão, mas fechadas para modificação.
      * Exemplo: Para adicionar uma nova funcionalidade (e.g., um novo tipo de listagem de assinaturas), um novo caso de uso (`ListExpiredSubscriptionsUseCase`) pode ser criado sem modificar os casos de uso ou entidades existentes.
  * **Liskov Substitution Principle (LSP):** Objetos de um supertipo devem poder ser substituídos por objetos de um subtipo sem quebrar o sistema.
      * Exemplo: Qualquer classe que dependa de `IClientRepository` [src/domain/repositories/IClientRepository.js] pode receber `ClientRepositoryPg` [src/infrastructure/database/repositories/ClientRepositoryPg.js] ou uma futura implementação (e.g., `ClientRepositoryInMemory`) sem quebrar a funcionalidade.
  * **Interface Segregation Principle (ISP):** Clientes não devem ser forçados a depender de interfaces que não usam.
      * Exemplo: Em vez de uma única interface `IRepository` genérica, existem interfaces específicas como `IClientRepository`, `IPlanRepository`, `ISubscriptionRepository` [src/domain/repositories/], cada uma com métodos relevantes para sua respectiva entidade.
  * **Dependency Inversion Principle (DIP):** Módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações. Abstrações não devem depender de detalhes; detalhes devem depender de abstrações.
      * Exemplo: `RegisterClientUseCase` (módulo de alto nível) depende da interface `IClientRepository` (abstração), não da implementação concreta `ClientRepositoryPg` (módulo de baixo nível) [src/application/use-cases/RegisterClientUseCase.js]. A injeção de dependência em `main.js` [src/main.js] garante que as implementações concretas sejam fornecidas em tempo de execução.

### Padrões de Projeto Utilizados

  * **Repository Pattern:** Desacopla a lógica de negócio da lógica de acesso a dados. Interfaces são definidas na camada de Domínio, e implementações concretas na camada de Infraestrutura [src/domain/repositories/, src/infrastructure/database/repositories/].
  * **Use Case / Interactor Pattern:** Cada caso de uso é uma classe separada que encapsula uma funcionalidade específica da aplicação [src/application/use-cases/]. Isso garante a SRP para a lógica de aplicação.
  * **Dependency Injection (DI):** As dependências são fornecidas aos objetos em vez de serem criadas internamente. Isso promove o baixo acoplamento e facilita os testes unitários. A injeção de dependência é evidente na construção dos objetos em `src/main.js`.
  * [cite\_start]**Observer Pattern (Conceitual para Fase 2):** Embora a implementação completa de eventos assíncronos seja para a Fase 2, o endpoint `POST /registrarpagamento` do `ServicoGestao` [cite: 62] [cite\_start]está preparado para atuar como um publicador de eventos de pagamento[cite: 64, 65]. [cite\_start]O `ServicoGestao` também observará eventos de pagamento [cite: 58, 59] [cite\_start]para atualizar a validade da assinatura[cite: 36, 37].

## 4\. Tecnologias Utilizadas

  * **Node.js**: Ambiente de execução JavaScript.
  * **Express.js**: Framework web minimalista para Node.js.
  * **PostgreSQL**: Sistema de Gerenciamento de Banco de Dados Relacional (SGBDR).
  * [cite\_start]**Sequelize ORM**: Mapeador Objeto-Relacional para Node.js, facilitando a interação com PostgreSQL[cite: 104].
  * **Dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.

## 5\. Configuração e Instalação

Para configurar e executar o projeto localmente, siga os passos:

1.  **Clonar o Repositório:**

    ```bash
    git clone <seu-repositorio-url>
    cd subscription-management-system # Ou o nome da pasta do projeto
    ```

2.  **Instalar Dependências:**

    ```bash
    npm install
    ```

3.  **Configurar Banco de Dados:**

      * Certifique-se de ter o **PostgreSQL** instalado e em execução.
      * Crie um novo banco de dados (ex: `subscription_db`).
      * Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`) e preencha com suas credenciais do PostgreSQL:
        ```dotenv
        DB_DIALECT=postgres
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=seu_usuario
        DB_PASSWORD=sua_senha
        DB_NAME=subscription_db
        PORT=3000
        ```
        Substitua `seu_usuario`, `sua_senha` e `subscription_db` pelos seus dados reais.

4.  **Sincronizar Modelos (Criar Tabelas):**
    As tabelas serão criadas automaticamente quando a aplicação for iniciada pela primeira vez (ver `src/main.js`). Em um ambiente de produção, seria preferível usar ferramentas de migração de banco de dados.

## 6\. Executando a Aplicação

Para iniciar a aplicação `ServicoGestao`:

```bash
npm start
```

O servidor será iniciado na porta definida no seu arquivo `.env` (padrão: `3000`). Você verá uma mensagem como `Server running on port 3000`.

## 7\. Endpoints da API (ServicoGestao)

O `ServicoGestao` fornece os seguintes endpoints RESTful. [cite\_start]Você pode usar o arquivo `FASE1 - template.postman_collection.json` [cite: 100] para testá-los.

**Base URL:** `http://localhost:3000`

### Clientes

  * [cite\_start]**`GET /gerenciaplanos/clientes`** [cite: 46]

      * [cite\_start]**Descrição:** Lista todos os clientes cadastrados[cite: 46].
      * [cite\_start]**Parâmetros de Entrada:** Nenhum[cite: 46].
      * [cite\_start]**JSON Resposta:** `Array` de objetos `Client`[cite: 46].

  * **`POST /gerenciaplanos/cliente`** (Implícito pelo requisito de cadastro de clientes, embora não detalhado no PDF como endpoint POST na Tabela 5)

      * **Descrição:** Cadastra um novo cliente.
      * **Corpo da Requisição (JSON):** `{"name": "...", "email": "..."}`
      * **JSON Resposta:** Objeto `Client` criado com status `201 Created`.

### Planos

  * [cite\_start]**`GET /gerenciaplanos/planos`** [cite: 47, 48]

      * [cite\_start]**Descrição:** Lista todos os planos cadastrados[cite: 48].
      * [cite\_start]**Parâmetros de Entrada:** Nenhum[cite: 48].
      * [cite\_start]**JSON Resposta:** `Array` de objetos `Plan`[cite: 48].

  * **`POST /gerenciaplanos/planos`** (Implícito pelo requisito de cadastro de planos)

      * **Descrição:** Cadastra um novo plano.
      * **Corpo da Requisição (JSON):** `{"name": "...", "description": "...", "monthlyCost": ...}`
      * **JSON Resposta:** Objeto `Plan` criado com status `201 Created`.

  * [cite\_start]**`PATCH /gerenciaplanos/planos/:idPlano`** [cite: 51]

      * [cite\_start]**Descrição:** Atualiza o custo mensal de um plano específico[cite: 51].
      * [cite\_start]**Parâmetros de Entrada (Path):** `idPlano` (código do plano)[cite: 51].
      * [cite\_start]**Corpo da Requisição (JSON):** `{"custoMensal": <novo_valor>}`[cite: 51].
      * [cite\_start]**JSON Resposta:** Objeto `Plan` atualizado[cite: 51].

### Assinaturas

  * [cite\_start]**`POST /gerenciaplanos/assinaturas`** [cite: 49, 50]

      * [cite\_start]**Descrição:** Cria uma nova assinatura[cite: 49].
      * **Corpo da Requisição (JSON):** `{"clientId": <código_cliente>, "planId": <código_plano>, "startDate": "YYYY-MM-DD"}`. (Adição de `startDate` para coerência com a entidade `Subscription`).
      * [cite\_start]**JSON Resposta:** Objeto `Subscription` criado[cite: 49].

  * [cite\_start]**`GET /gerenciaplanos/assinaturascliente/:codCli`** [cite: 54, 55]

      * [cite\_start]**Descrição:** Retorna a lista de assinaturas de um cliente específico[cite: 55].
      * [cite\_start]**Parâmetros de Entrada (Path):** `codCli` (código do cliente)[cite: 55].
      * [cite\_start]**JSON Resposta:** `Array` de objetos `Subscription` (código assinatura, código cliente, código plano, data de início, data de fim, status)[cite: 55].

  * [cite\_start]**`GET /gerenciaplanos/assinaturaplano/:codPlano`** [cite: 56, 57]

      * [cite\_start]**Descrição:** Retorna a lista de assinaturas de um plano específico[cite: 57].
      * [cite\_start]**Parâmetros de Entrada (Path):** `codPlano` (código do plano)[cite: 57].
      * [cite\_start]**JSON Resposta:** `Array` de objetos `Subscription`[cite: 57].

  * [cite\_start]**`GET /gerenciaplanos/assinaturas/{tipo}`** [cite: 52, 53]

      * [cite\_start]**Descrição:** Retorna a lista com todas as assinaturas de um determinado tipo[cite: 53].
      * [cite\_start]**Parâmetros de Entrada (Path):** `tipo` (pode ser `TODOS`, `ATIVOS`, `CANCELADOS`)[cite: 53].
      * [cite\_start]**JSON Resposta:** `Array` de objetos `Subscription` com `status` (`ATIVO` ou `CANCELADO`)[cite: 53]. *A implementação incluirá a lógica para filtrar por status.*

### Pagamentos (Via `ServicoGestao` nesta fase)

  * [cite\_start]**`POST /registrarpagamento`** [cite: 61, 62]
      * **Descrição:** Solicita o registro de um pagamento. Em Fase 1, o `ServicoGestao` processa diretamente e atualiza a data do último pagamento da assinatura. [cite\_start]Em Fase 2, o `ServicoFaturamento` gerará este evento assíncrono[cite: 64, 65, 66, 67].
      * **Corpo da Requisição (JSON):**
        ````json
        {
            "dia": <dia_do_pagamento>,
            "mes": <mês_do_pagamento>,
            "ano": <ano_do_pagamento>,
            "codAss": <código_da_assinatura>,
            "valorPago": <valor_pago>
        }
        [cite_start]``` [cite: 62, 63]
        ````
      * **JSON Resposta:** `200 OK` e um objeto com a assinatura atualizada (para fins de feedback na Fase 1), ou `404 Not Found` se a assinatura não existir.

## 8\. Executando Testes

*(Esta seção é um placeholder. Para um projeto completo, seriam necessários testes unitários e de integração com Jest.)*

Para executar os testes (se implementados), use:

```bash
npm test
```

## 9\. Conclusão e Desafios

[cite\_start]*(Esta seção deve ser preenchida pelo aluno conforme os critérios de avaliação[cite: 96, 97]. Deve abordar o processo de desenvolvimento, os desafios encontrados, como foram resolvidos e quaisquer referências que auxiliaram. Se for uma fase de refatoração, listar os pontos ajustados e os pendentes.)*

-----

## `uml_description.md` (Descrição Conceitual do Diagrama UML)

```markdown
# Descrição Conceitual do Diagrama UML para o Sistema de Gerenciamento de Assinaturas

Este documento fornece uma descrição conceitual dos diagramas de classe e pacotes UML para o Sistema de Gerenciamento de Assinaturas, com foco no microsserviço `ServicoGestao` e na aplicação da Arquitetura Limpa. [cite_start]Esta é uma representação textual do design, detalhando os componentes principais, suas responsabilidades e relacionamentos[cite: 92].

## 1. Diagrama de Pacotes

O sistema é logicamente organizado nos seguintes pacotes, que correspondem às camadas da Arquitetura Limpa:

* [cite_start]**`Domain`**: [cite: 11]
    * **Propósito**: Contém a lógica de negócio central, entidades, objetos de valor e interfaces (portas) que definem os contratos de interação. É independente de tecnologias ou frameworks específicos.
    * **Conteúdo**:
        * `entities/`: Define as entidades de negócio puro do sistema (`Client`, `Plan`, `Subscription`, `Payment`). Essas entidades encapsulam as regras de negócio de nível mais alto e não possuem dependências de camadas externas.
        * `repositories/`: Contém interfaces (abstrações) para operações de persistência de dados (e.g., `IClientRepository`, `IPlanRepository`). Essas interfaces definem *o quê* pode ser feito com os dados, não *como*.
        * `services/`: Contém interfaces para serviços de domínio que encapsulam regras de negócio complexas que podem envolver múltiplas entidades (e.g., `ISubscriptionDomainService`).

* **`Application`**:
    * **Propósito**: Contém as regras de negócio específicas da aplicação e os Casos de Uso. Orquestra o fluxo de dados para e das Entidades. Define *o que* a aplicação faz.
    * **Dependências**: Depende apenas do pacote `Domain`.
    * **Conteúdo**:
        * `use-cases/`: Cada classe aqui representa um Caso de Uso específico ou funcionalidade da aplicação (e.g., `RegisterClientUseCase`, `CreateSubscriptionUseCase`). Essas classes coordenam a interação entre as entidades de domínio e as interfaces de repositório.

* **`Infrastructure`**:
    * **Propósito**: Contém os detalhes de implementação de preocupações externas, como bancos de dados, frameworks web e implementações concretas das interfaces definidas na camada `Domain`.
    * **Dependências**: Depende dos pacotes `Application` e `Domain`.
    * **Conteúdo**:
        * `database/`:
            * `models/`: Define os modelos ORM (e.g., `ClientModel`, `PlanModel`) que mapeiam para tabelas do banco de dados.
            * `repositories/`: Contém as implementações concretas das interfaces de repositório definidas no pacote `Domain` (e.g., `ClientRepositoryPg`, `PlanRepositoryPg`). Essas classes lidam com as interações reais com o banco de dados usando o ORM.
        * `services/`: Contém implementações concretas de serviços de domínio definidos como interfaces no pacote `Domain` (e.g., `SubscriptionDomainService`).
        * `web/`:
            * `controllers/`: Lida com as requisições HTTP recebidas, extrai dados, chama os casos de uso apropriados da camada `Application` e formata as respostas HTTP.
            * `routes/`: Define os endpoints da API e os mapeia para os métodos dos controladores.

* **`Presentation` (Implícito / Ponto de Entrada da Aplicação)**:
    * **Propósito**: A camada mais externa, responsável por configurar todas as dependências e iniciar a aplicação. Atua como o *composition root*.
    * **Conteúdo**: `main.js` (ponto de entrada principal), `server.js` (configuração do aplicativo Express).

**Fluxo de Dependência (para dentro):** `Presentation` -> `Infrastructure` -> `Application` -> `Domain`

## 2. Diagrama de Classes (Classes Chave e Relacionamentos)

Esta seção detalha as classes primárias dentro de cada pacote e seus relacionamentos.

### Pacote `Domain`

* **Entidades (Objetos de Negócio Puro):**
    * `Client`
        * [cite_start]Atributos: `id: number`, `name: string`, `email: string`[cite: 12].
        * Responsabilidades: Encapsular dados do cliente, validações básicas.
    * `Plan`
        * [cite_start]Atributos: `id: number`, `name: string`, `description: string`, `monthlyCost: number`[cite: 12].
        * Responsabilidades: Encapsular dados do plano, validações básicas.
    * `Subscription`
        * [cite_start]Atributos: `id: number`, `clientId: number`, `planId: number`, `startDate: Date`, `endDate: Date (nullable)`, `status: string` (e.g., 'active', 'inactive', 'canceled'), `lastPaymentDate: Date (nullable)`, `nextPaymentDate: Date (nullable)`[cite: 12, 13].
        * [cite_start]Responsabilidades: Encapsular dados da assinatura, definir o estado da assinatura, lógica de negócio relacionada à fidelidade (1 ano por padrão)[cite: 25].
    * `Payment`
        * [cite_start]Atributos: `id: number`, `subscriptionId: number`, `amount: number`, `paymentDate: Date`[cite: 13].
        * Responsabilidades: Encapsular o registro de pagamento.

* **Interfaces de Repositório (Portas):**
    * `IClientRepository` <<interface>>
        * Métodos: `save(client: Client): Promise<Client>`, `findById(id: number): Promise<Client | null>`, `findAll(): Promise<Client[]>`
    * `IPlanRepository` <<interface>>
        * Métodos: `save(plan: Plan): Promise<Plan>`, `findById(id: number): Promise<Plan | null>`, `findAll(): Promise<Plan[]>`, `update(plan: Plan): Promise<Plan>`
    * `ISubscriptionRepository` <<interface>>
        * Métodos: `save(subscription: Subscription): Promise<Subscription>`, `findById(id: number): Promise<Subscription | null>`, `findByClientId(clientId: number): Promise<Subscription[]>`, `findByPlanId(planId: number): Promise<Subscription[]>`, `update(subscription: Subscription): Promise<Subscription>`
    * `IPaymentRepository` <<interface>>
        * Métodos: `save(payment: Payment): Promise<Payment>`

* **Interfaces de Serviços de Domínio (Portas):**
    * `ISubscriptionDomainService` <<interface>>
        * Métodos: `calculateNextPaymentDate(lastPaymentDate: Date, paymentFrequencyInMonths: number): Date`, `isActive(subscription: Subscription): boolean`
        * Responsabilidades: Encapsular regras de negócio complexas relacionadas a assinaturas, como cálculo da próxima data de pagamento ou verificação de validade.

### Pacote `Application`

* **Casos de Uso (Interactors):**
    * `RegisterClientUseCase`
        * Dependências: `IClientRepository`
        * Método: `execute(name: string, email: string): Promise<Client>`
    * `ListClientsUseCase`
        * Dependências: `IClientRepository`
        * Método: `execute(): Promise<Client[]>`
    * `RegisterPlanUseCase`
        * Dependências: `IPlanRepository`
        * Método: `execute(name: string, description: string, monthlyCost: number): Promise<Plan>`
    * `ListPlansUseCase`
        * Dependências: `IPlanRepository`
        * Método: `execute(): Promise<Plan[]>`
    * `CreateSubscriptionUseCase`
        * Dependências: `IClientRepository`, `IPlanRepository`, `ISubscriptionRepository`, `ISubscriptionDomainService`
        * Método: `execute(clientId: number, planId: number, startDate: Date): Promise<Subscription>`
    * `ListClientSubscriptionsUseCase`
        * Dependências: `ISubscriptionRepository`
        * Método: `execute(clientId: number): Promise<Subscription[]>`
    * `ListPlanSubscribersUseCase`
        * Dependências: `ISubscriptionRepository`
        * Método: `execute(planId: number): Promise<Subscription[]>`
    * `RegisterPaymentUseCase`
        * Dependências: `ISubscriptionRepository`, `IPaymentRepository`
        * Método: `execute(codAss: number, dia: number, mes: number, ano: number, valorPago: number): Promise<Subscription>`

### Pacote `Infrastructure`

* **Database (Modelos ORM):**
    * `ClientModel` (Modelo Sequelize)
        * Mapeia para a entidade `Client`.
        * Atributos: `id`, `name`, `email`
    * `PlanModel` (Modelo Sequelize)
        * Mapeia para a entidade `Plan`.
        * Atributos: `id`, `name`, `description`, `monthlyCost`
    * `SubscriptionModel` (Modelo Sequelize)
        * Mapeia para a entidade `Subscription`.
        * Atributos: `id`, `clientId`, `planId`, `startDate`, `endDate`, `status`, `lastPaymentDate`, `nextPaymentDate`
        * Associações: `belongsTo(ClientModel)`, `belongsTo(PlanModel)`
    * `PaymentModel` (Modelo Sequelize)
        * Mapeia para a entidade `Payment`.
        * Atributos: `id`, `subscriptionId`, `amount`, `paymentDate`
        * Associações: `belongsTo(SubscriptionModel)`

* **Repositórios (Implementações Concretas):**
    * `ClientRepositoryPg`
        * Implementa: `IClientRepository`
        * Dependências: `ClientModel`
    * `PlanRepositoryPg`
        * Implementa: `IPlanRepository`
        * Dependências: `PlanModel`
    * `SubscriptionRepositoryPg`
        * Implementa: `ISubscriptionRepository`
        * Dependências: `SubscriptionModel`
    * `PaymentRepositoryPg`
        * Implementa: `IPaymentRepository`
        * Dependências: `PaymentModel`

* **Serviços (Implementações Concretas):**
    * `SubscriptionDomainService`
        * Implementa: `ISubscriptionDomainService`
        * Dependências: Nenhuma (lógica de negócio pura).

* **Web (Controladores e Rotas):**
    * `ClientController`
        * Dependências: `RegisterClientUseCase`, `ListClientsUseCase`
        * Métodos: `registerClient(req, res)`, `listClients(req, res)`
    * `PlanController`
        * Dependências: `RegisterPlanUseCase`, `ListPlansUseCase`
        * Métodos: `registerPlan(req, res)`, `listPlans(req, res)`
    * `SubscriptionController`
        * Dependências: `CreateSubscriptionUseCase`, `ListClientSubscriptionsUseCase`, `ListPlanSubscribersUseCase`
        * Métodos: `createSubscription(req, res)`, `listClientSubscriptions(req, res)`, `listPlanSubscribers(req, res)`
    * `PaymentController`
        * Dependências: `RegisterPaymentUseCase`
        * Métodos: `registerPayment(req, res)`
    * `AppRouter`
        * Dependências: `ClientController`, `PlanController`, `SubscriptionController`, `PaymentController`
        * Responsabilidades: Configura as rotas do Express e as conecta aos métodos dos controladores.

## 3. Sumário dos Relacionamentos

* **Implementações**: As classes de repositório concretas em `Infrastructure` implementam suas respectivas interfaces no `Domain`.
* **Dependências**:
    * Casos de Uso dependem de Interfaces de Repositório (camada Domain).
    * Controladores dependem de Casos de Uso (camada Application).
    * Implementações de Repositório dependem de Modelos ORM (camada Infrastructure).
    * O `main.js`/`server.js` (camada Presentation) lida com a instanciação e injeção de dependência, conectando todas as partes.

