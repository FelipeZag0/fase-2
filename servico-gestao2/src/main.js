// File: servico-gestao/src/main.js
const Server = require('./server');
const AppRouter = require('./infrastructure/web/routes/AppRouter');
const sequelize = require('./config/database'); // Importa a instância do Sequelize

// Repositories
const ClientRepositoryPg = require('./infrastructure/database/repositories/ClientRepositoryPg');
// TODO: Você precisará criar e importar PlanRepositoryPg e SubscriptionRepositoryPg para Sequelize
const PlanRepository = require('./infrastructure/database/repositories/PlanRepositoryPg'); 
const SubscriptionRepository = require('./infrastructure/database/repositories/SubscriptionRepositoryPg'); 

// Domain Services
const SubscriptionDomainService = require('./infrastructure/services/SubscriptionDomainService');

// Use Cases
const CreateSubscriptionUseCase = require('./application/use-cases/CreateSubscriptionUseCase');
const ListClientsUseCase = require('./application/use-cases/ListClientsUseCase');
const ListPlansUseCase = require('./application/use-cases/ListPlansUseCase');
const UpdatePlanCostUseCase = require('./application/use-cases/UpdatePlanCostUseCase');
const ListClientSubscriptionsUseCase = require('./application/use-cases/ListClientSubscriptionsUseCase');
const ListPlanSubscribersUseCase = require('./application/use-cases/ListPlanSubscribersUseCase');

// NOVOS Use Cases
const CreateClientUseCase = require('./application/use-cases/CreateClientUseCase'); // NOVO
const UpdateClientUseCase = require('./application/use-cases/UpdateClientUseCase'); // NOVO
const CreatePlanUseCase = require('./application/use-cases/CreatePlanUseCase');     // NOVO

// Controllers
const ClientController = require('./infrastructure/web/controllers/ClientController');
const PlanController = require('./infrastructure/web/controllers/PlanController');
const SubscriptionController = require('./infrastructure/web/controllers/SubscriptionController');

// New for Phase 2: Message Broker and Axios for HTTP requests to microservices
const MessageBrokerService = require('./application/services/MessageBrokerService');
const axios = require('axios');

async function main() {
  // Sincroniza os modelos do Sequelize com o banco de dados
  // Isso criará as tabelas se não existirem, com base nos seus modelos Sequelize (ex: ClientModel)
  try {
    await sequelize.sync({ force: false }); // 'force: true' apaga e recria tabelas (CUIDADO!)
    console.log('Database and tables synchronized with Sequelize.');
  } catch (error) {
    console.error('Unable to synchronize database with Sequelize:', error);
    process.exit(1); // Sai do processo se a sincronização falhar
  }

  // Inicialize Repositórios (agora baseados em Sequelize)
  const clientRepository = new ClientRepositoryPg();
  // TODO: Instancie seus repositórios Plan e Subscription baseados em Sequelize aqui
  // Por enquanto, estou mantendo os antigos PlanRepository e SubscriptionRepository
  // Se eles não forem baseados em Sequelize, você precisará ajustar a lógica interna deles
  const planRepository = new PlanRepository();
  const subscriptionRepository = new SubscriptionRepository();


  // Initialize Domain Services
  const subscriptionDomainService = new SubscriptionDomainService();

  // Initialize Use Cases
  const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    clientRepository,
    planRepository,
    subscriptionRepository,
    subscriptionDomainService
  );
  const listClientsUseCase = new ListClientsUseCase(clientRepository);
  const listPlansUseCase = new ListPlansUseCase(planRepository);
  const updatePlanCostUseCase = new UpdatePlanCostUseCase(planRepository);
  const listClientSubscriptionsUseCase = new ListClientSubscriptionsUseCase(subscriptionRepository);
  const listPlanSubscribersUseCase = new ListPlanSubscribersUseCase(subscriptionRepository);

  // Initialize Controllers
  const clientController = new ClientController(listClientsUseCase);
  const planController = new PlanController(listPlansUseCase, updatePlanCostUseCase);
  const subscriptionController = new SubscriptionController(
    createSubscriptionUseCase,
    listClientSubscriptionsUseCase,
    listPlanSubscribersUseCase
  );

  // Setup main router for ServicoGestao
  const appRouter = new AppRouter(
    clientController,
    planController,
    subscriptionController
  );

  // New routes for microservice integration (API Gateway pattern)

  // Route for ServicoFaturamento - Register Payment
  appRouter.getRouter().post('/registrarpagamento', async (req, res) => {
    try {
      // O nome do host 'servico-faturamento' será resolvido pelo Docker Compose
      const response = await axios.post('http://servico-faturamento:3001/payments', req.body);

      // Publicar evento de pagamento para o message broker (em memória)
      MessageBrokerService.publish('payment_event', req.body);

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error registering payment:', error.message);
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      res.status(500).json({ error: 'Failed to register payment.' });
    }
  });

  // Route for ServicoPlanosAtivos - Check Active Subscription
  appRouter.getRouter().get('/planosativos/:codass', async (req, res) => {
    try {
      const { codass } = req.params;
      // O nome do host 'servico-planos-ativos' será resolvido pelo Docker Compose
      const response = await axios.get(`http://servico-planos-ativos:3002/active-plans/${codass}`);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error checking active plan:', error.message);
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      res.status(500).json({ error: 'Failed to check active plan.' });
    }
  });

  const server = new Server(appRouter);
  server.start();
}

main();