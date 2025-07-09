const Server = require('./server');
const AppRouter = require('./infrastructure/web/routes/AppRouter');
const sequelize = require('./config/database');

// Repositories
const ClientRepositoryPg = require('./infrastructure/database/repositories/ClientRepositoryPg');
const PlanRepositoryPg = require('./infrastructure/database/repositories/PlanRepositoryPg');
const SubscriptionRepositoryPg = require('./infrastructure/database/repositories/SubscriptionRepositoryPg');
const PaymentRepositoryPg = require('./infrastructure/database/repositories/PaymentRepositoryPg');

// Domain Services
const SubscriptionDomainService = require('./infrastructure/services/SubscriptionDomainService');

// Use Cases
const CreateSubscriptionUseCase = require('./application/use-cases/CreateSubscriptionUseCase');
const ListClientsUseCase = require('./application/use-cases/ListClientsUseCase');
const ListPlansUseCase = require('./application/use-cases/ListPlansUseCase');
const UpdatePlanCostUseCase = require('./application/use-cases/UpdatePlanCostUseCase');
const ListClientSubscriptionsUseCase = require('./application/use-cases/ListClientSubscriptionsUseCase');
const ListPlanSubscribersUseCase = require('./application/use-cases/ListPlanSubscribersUseCase');
const CreateClientUseCase = require('./application/use-cases/CreateClientUseCase');
const UpdateClientUseCase = require('./application/use-cases/UpdateClientUseCase');
const CreatePlanUseCase = require('./application/use-cases/CreatePlanUseCase');
const RegisterPaymentUseCase = require('./application/use-cases/RegisterPaymentUseCase'); // Adicionado

// Controllers
const ClientController = require('./infrastructure/web/controllers/ClientController');
const PlanController = require('./infrastructure/web/controllers/PlanController');
const SubscriptionController = require('./infrastructure/web/controllers/SubscriptionController');
const PaymentController = require('./infrastructure/web/controllers/PaymentController'); // Adicionado

// Message Broker and Axios
const MessageBrokerService = require('./application/services/MessageBrokerService');
const axios = require('axios');

async function main() {
  try {
    await sequelize.sync({ force: true }); // Forçar criação das tabelas
    console.log('Database and tables synchronized with Sequelize.');
  } catch (error) {
    console.error('Unable to synchronize database with Sequelize:', error);
    process.exit(1);
  }

  // Initialize Repositories
  const clientRepository = new ClientRepositoryPg();
  const planRepository = new PlanRepositoryPg();
  const subscriptionRepository = new SubscriptionRepositoryPg();
  const paymentRepository = new PaymentRepositoryPg(); // Adicionado

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
  const createClientUseCase = new CreateClientUseCase(clientRepository);
  const updateClientUseCase = new UpdateClientUseCase(clientRepository);
  const createPlanUseCase = new CreatePlanUseCase(planRepository);
  const registerPaymentUseCase = new RegisterPaymentUseCase( // Adicionado
    subscriptionRepository,
    paymentRepository
  );

  // Controllers
  const clientController = new ClientController(listClientsUseCase, createClientUseCase, updateClientUseCase);
  const planController = new PlanController(listPlansUseCase, createPlanUseCase, updatePlanCostUseCase);
  const subscriptionController = new SubscriptionController(
    createSubscriptionUseCase,
    listClientSubscriptionsUseCase,
    listPlanSubscribersUseCase
  );
  const paymentController = new PaymentController(registerPaymentUseCase); // Adicionado

  // Setup main router
  const appRouter = new AppRouter(
    clientController,
    planController,
    subscriptionController,
    paymentController // Adicionado
  );

  // Microservice integration routes
  appRouter.getRouter().post('/registrarpagamento', async (req, res) => {
    try {
      const response = await axios.post('http://localhost:3001/registrarpagamento', req.body);
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

  appRouter.getRouter().get('/planosativos/:codass', async (req, res) => {
    try {
      const { codass } = req.params;
      const response = await axios.get(`http://localhost:3002/active-plans/${codass}`);
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