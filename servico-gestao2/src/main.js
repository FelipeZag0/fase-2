// File: servico-gestao/src/main.js
const Server = require('./server');
const AppRouter = require('./infra/web/index'); // Corrigido para index.js
const Database = require('./infra/database/Database');

// Repositories
const ClientRepository = require('./infra/repositories/ClientRepository');
const PlanRepository = require('./infra/repositories/PlanRepository');
const SubscriptionRepository = require('./infra/repositories/SubscriptionRepository');

// Domain Services
const SubscriptionDomainService = require('./domain/services/SubscriptionDomainService');

// Use Cases
const CreateSubscriptionUseCase = require('./application/use-cases/CreateSubscriptionUseCase');
const ListClientsUseCase = require('./application/use-cases/ListClientsUseCase');
const ListPlansUseCase = require('./application/use-cases/ListPlansUseCase');
const UpdatePlanCostUseCase = require('./application/use-cases/UpdatePlanCostUseCase');
const ListClientSubscriptionsUseCase = require('./application/use-cases/ListClientSubscriptionsUseCase');
const ListPlanSubscribersUseCase = require('./application/use-cases/ListPlanSubscribersUseCase');


// Controllers
const ClientController = require('./infra/web/controllers/ClientController');
const PlanController = require('./infra/web/controllers/PlanController');
const SubscriptionController = require('./infra/web/controllers/SubscriptionController');

// New for Phase 2: Message Broker and Axios for HTTP requests to microservices
const MessageBrokerService = require('./application/services/MessageBrokerService');
const axios = require('axios'); // For making HTTP requests to other microservices

async function main() {
  const db = await Database.initialize();

  // Initialize Repositories
  const clientRepository = new ClientRepository(db);
  const planRepository = new PlanRepository(db);
  const subscriptionRepository = new SubscriptionRepository(db);

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
      const { dia, mes, ano, codAss, valorPago } = req.body;
      // Call ServicoFaturamento
      const response = await axios.post('http://servico-faturamento:3001/payments', {
        dia, mes, ano, codAss, valorPago
      });

      // Publish payment event to message broker
      MessageBrokerService.publish('payment_event', {
        codAss, dia, mes, ano, valorPago
      });

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
      // Call ServicoPlanosAtivos
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