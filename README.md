# Sistema de Gestão de Assinaturas com Arquitetura de Microsserviços

Este projeto implementa um sistema completo de gestão de assinaturas utilizando uma arquitetura de microsserviços. O sistema é composto por três serviços principais que trabalham em conjunto para gerenciar clientes, planos, assinaturas, pagamentos e status de planos ativos.

## Diagrama de Arquitetura

```
+-------------------+     HTTP      +-------------------+     HTTP      +---------------------+
|                   |<------------>|                   |<------------>|                     |
|  Serviço Gestão   |               |  Serviço Fatura- |               |  Serviço Planos     |
|  (Node.js)        |     Eventos   |  mento (Node.js) |     Eventos   |  Ativos (Node.js)   |
|  Porta: 3000      |<------------>|  Porta: 3001     |<------------>|  Porta: 3002        |
+-------------------+               +-------------------+               +---------------------+
        |  ^                               |  ^                               |  ^
        |  |                               |  |                               |  |
        v  |                               v  |                               v  |
+-------------------+               +-------------------+               +---------------------+
|   PostgreSQL      |               |   In-memory DB    |               |   In-memory Cache   |
|   (Dados persistentes)|               |   (Pagamentos)    |               |   (Planos ativos)   |
+-------------------+               +-------------------+               +---------------------+
```

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para todos os serviços
- **Express**: Framework web para construção das APIs REST
- **Sequelize**: ORM para acesso ao banco de dados PostgreSQL
- **Docker**: Conteinerização dos serviços e dependências
- **PostgreSQL**: Banco de dados relacional para o serviço de gestão
- **Axios**: Comunicação HTTP entre serviços

## Serviços

### 1. Serviço de Gestão (servico-gestao2)
**Porta:** 3000  
Responsável pelo gerenciamento de clientes, planos e assinaturas. Mantém os dados principais do sistema em um banco PostgreSQL.

Principais funcionalidades:
- CRUD de clientes
- CRUD de planos de assinatura
- Gerenciamento de assinaturas (criação, listagem)
- Integração com outros serviços

### 2. Serviço de Faturamento (servico-faturamento)
**Porta:** 3001  
Responsável pelo registro e processamento de pagamentos. Utiliza um banco de dados em memória.

Principais funcionalidades:
- Registro de pagamentos
- Validação de dados de pagamento
- Comunicação de eventos de pagamento

### 3. Serviço de Planos Ativos (servico-planos-ativos)
**Porta:** 3002  
Mantém um cache de assinaturas ativas para consulta rápida. Utiliza uma estrutura em memória.

Principais funcionalidades:
- Cache de assinaturas ativas
- Verificação rápida do status de assinaturas
- Atualização baseada em eventos de pagamento

## Como Executar o Projeto

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Passo a Passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-assinaturas.git
cd sistema-assinaturas
```

2. Inicie os serviços com Docker Compose:
```bash
docker-compose up --build
```

3. Os serviços estarão disponíveis nas seguintes portas:
   - Serviço Gestão: http://localhost:3000
   - Serviço Faturamento: http://localhost:3001
   - Serviço Planos Ativos: http://localhost:3002

## Endpoints da API

### Serviço de Gestão (http://localhost:3000)

**Clientes**
- `GET /gerenciaplanos/clients` - Lista todos os clientes
- `POST /gerenciaplanos/clients` - Cria um novo cliente
- `PUT /gerenciaplanos/clients/:id` - Atualiza um cliente

**Planos**
- `GET /gerenciaplanos/plans` - Lista todos os planos
- `POST /gerenciaplanos/plans` - Cria um novo plano
- `PUT /gerenciaplanos/plans/:id/cost` - Atualiza custo de um plano

**Assinaturas**
- `POST /gerenciaplanos/subscriptions` - Cria nova assinatura
- `GET /gerenciaplanos/subscriptions/client/:codCli` - Assinaturas por cliente
- `GET /gerenciaplanos/subscriptions/plan/:codPlano` - Assinaturas por plano

### Serviço de Faturamento (http://localhost:3001)
- `POST /registrarpagamento` - Registra um novo pagamento

### Serviço de Planos Ativos (http://localhost:3002)
- `POST /active-plans/add` - Adiciona assinatura ao cache
- `GET /active-plans/:codass` - Verifica se assinatura está ativa

## Exemplos de Uso

### Criar um novo cliente
```bash
curl -X POST http://localhost:3000/gerenciaplanos/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "cpf": "123.456.789-00"
  }'
```

### Registrar um pagamento
```bash
curl -X POST http://localhost:3001/registrarpagamento \
  -H "Content-Type: application/json" \
  -d '{
    "dia": 15,
    "mes": 7,
    "ano": 2025,
    "codAss": 1,
    "valorPago": 199.90
  }'
```

### Verificar se assinatura está ativa
```bash
curl -X GET http://localhost:3002/active-plans/1
```

## Fluxo de Funcionamento

1. Um novo cliente é cadastrado via Serviço de Gestão
2. O cliente assina um plano, criando uma assinatura
3. O Serviço de Gestão notifica o Serviço de Planos Ativos sobre a nova assinatura
4. Quando um pagamento é registrado via Serviço de Faturamento:
   - O pagamento é validado e armazenado
   - Um evento é publicado para o Serviço de Planos Ativos
   - O Serviço de Planos Ativos atualiza o status da assinatura
5. Qualquer serviço pode verificar o status de uma assinatura consultando o Serviço de Planos Ativos

## Coleção Postman

Uma coleção completa do Postman está disponível no arquivo:
`felipe_zago_Desenvolvimento_de_Sistemas_backend_Fase-2.postman-collection.json`

Para importar:
1. Abra o Postman
2. Clique em "Import"
3. Selecione o arquivo JSON fornecido

A coleção contém todos os endpoints configurados com exemplos de requisição.