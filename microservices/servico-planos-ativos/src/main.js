// File: microservices/servico-planos-ativos/src/main.js
const Server = require('./server');
const ActivePlansController = require('./infra/controllers/ActivePlansController');
const SubscriptionCacheRepository = require('./infra/repositories/SubscriptionCacheRepository');
const ActivePlanCacheService = require('./domain/services/ActivePlanCacheService');
const CheckSubscriptionUseCase = require('./application/use-cases/CheckSubscriptionUseCase');
const ProcessPaymentEventUseCase = require('./application/use-cases/ProcessPaymentEventUseCase');
const { appRouter } = require('./infra/web/routes');
const MessageBrokerService = require('../../servico-gestao/src/application/services/MessageBrokerService'); // Importing from ServicoGestao for shared in-memory broker

async function main() {
  const subscriptionCacheRepository = new SubscriptionCacheRepository();
  const activePlanCacheService = new ActivePlanCacheService(subscriptionCacheRepository);
  const checkSubscriptionUseCase = new CheckSubscriptionUseCase(activePlanCacheService);
  const processPaymentEventUseCase = new ProcessPaymentEventUseCase(activePlanCacheService);

  const activePlansController = new ActivePlansController(checkSubscriptionUseCase);

  appRouter.get('/active-plans/:codass', activePlansController.checkSubscription.bind(activePlansController));

  // Subscribe to payment events
  MessageBrokerService.subscribe('payment_event', (data) => {
    console.log('[ServicoPlanosAtivos] Received payment event:', data);
    processPaymentEventUseCase.execute(data.codAss, data.dia, data.mes, data.ano);
  });

  const server = new Server(appRouter);
  server.start();
}

main();