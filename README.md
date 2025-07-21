# Sistema de Controle de Planos de Operadora v2.0 📡

Sistema de gerenciamento de clientes, planos e assinaturas para operadoras. Projeto desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID, com arquitetura de microserviços para maior escalabilidade e manutenibilidade.

---

## 🛠 Tecnologias Utilizadas

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Dotenv](https://img.shields.io/badge/dotenv-8A9A5B?style=for-the-badge&logo=dotenv&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

## 📋 Visão Geral do Projeto

O sistema permite:
- Cadastro e gestão de clientes e planos
- Criação e acompanhamento de assinaturas
- Atualização de custos de planos
- Registro de pagamentos
- Cache de planos ativos
- Integração entre microserviços
---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL
- NPM

### Configuração Inicial

1. Clone o repositório:
```bash
git clone https://github.com/FelipeZag0/gestao-operadora-2.git
cd gestao-operadora-2
```

2. Instale as dependências para cada serviço:
```bash
cd servico-gestao2 && npm install
cd ../servico-faturamento && npm install
cd ../servico-planos-ativos && npm install
```

3. Configure os arquivos `.env` (copie de `.env.example`):
```env
# servico-gestao2/.env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=senha
DB_NAME=gestao_operadora

# servico-faturamento/.env
PORT=3001

# servico-planos-ativos/.env
PORT=3002
```

### Iniciar os Serviços

Execute cada serviço em terminais separados:
```bash
# Serviço de Gestão
cd servico-gestao2
npm start

# Serviço de Faturamento
cd ../servico-faturamento
npm start

# Serviço de Planos Ativos
cd ../servico-planos-ativos
npm start
```

---

## 📡 Endpoints Principais

### Serviço de Gestão (3000)
| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|------------------------------------|
| POST   | `/gerenciaplanos/clients`    | Cria novo cliente                  |
| GET    | `/gerenciaplanos/clients`    | Lista todos os clientes            |
| POST   | `/gerenciaplanos/plans`      | Cria novo plano                    |
| PUT    | `/gerenciaplanos/plans/:id/cost` | Atualiza custo do plano          |
| POST   | `/gerenciaplanos/subscriptions` | Cria nova assinatura             |
| POST   | `/gerenciaplanos/pagamentos` | Registra pagamento                |

### Serviço de Faturamento (3001)
| Método | Endpoint               | Descrição                     |
|--------|------------------------|-------------------------------|
| POST   | `/registrarpagamento`  | Registra pagamento            |
| GET    | `/test`                | Teste de conexão              |

### Serviço de Planos Ativos (3002)
| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|------------------------------------|
| POST   | `/active-plans/add`          | Adiciona plano ativo               |
| GET    | `/active-plans/:codass`      | Verifica assinatura ativa          |

---

## 🏗️ Estrutura do Projeto

```
servico-gestao2/
├── src/
│   ├── application/          # Casos de uso
│   ├── domain/               # Entidades e regras de negócio
│   ├── infrastructure/       # Implementações concretas
│   └── main.js               # Ponto de entrada
│
servico-faturamento/
├── src/
│   ├── infra/                # Implementações de infra
│   ├── domain/               # Entidades
│   ├── application/          # Casos de uso
│   └── main.js               # Ponto de entrada
│
servico-planos-ativos/
├── src/
│   ├── infra/                # Implementações de infra
│   ├── domain/               # Serviços de domínio
│   ├── application/          # Casos de uso
│   └── main.js               # Ponto de entrada
```

---

## 🧠 Princípios Arquiteturais

1. **Arquitetura Limpa**: Separação clara entre:
   - Camada de Domínio (regras de negócio)
   - Camada de Aplicação (casos de uso)
   - Camada de Infraestrutura (implementações)

2. **SOLID**:
   - Single Responsibility (cada classe com uma responsabilidade)
   - Dependency Inversion (dependências abstraídas)
   - Open/Closed (aberto para extensão, fechado para modificação)

3. **Microserviços**:
   - Serviços independentes e especializados
   - Comunicação via HTTP/REST
   - Banco de dados independente para serviço principal

---

## 📌 Considerações Finais

Esta versão 2.0 traz:
- Arquitetura de microserviços para maior escalabilidade
- Implementação completa de Clean Architecture
- Separação clara de responsabilidades
- Banco de dados relacional com Sequelize
- Cache em memória para planos ativos
- Validações robustas em todas as camadas
