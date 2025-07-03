const Server = require('./server');
const ActivePlansController = require('./infra/controllers/ActivePlansController');
const SubscriptionCacheRepository = require('./infra/repositories/SubscriptionCacheRepository');
const ActivePlanCacheService = require('./domain/services/ActivePlanCacheService');
const CheckSubscriptionUseCase = require('./application/use-cases/CheckSubscriptionUseCase');
const ProcessPaymentEventUseCase = require('./application/use-cases/ProcessPaymentEventUseCase');
const { appRouter } = require('./infra/web/routes');
const MessageBrokerService = require('../../servico-gestao2/src/application/services/MessageBrokerService');

async function main() {
  const subscriptionCacheRepository = new SubscriptionCacheRepository();
  const activePlanCacheService = new ActivePlanCacheService(subscriptionCacheRepository);
  const processPaymentEventUseCase = new ProcessPaymentEventUseCase(activePlanCacheService);

  const activePlansController = new ActivePlansController(activePlanCacheService);

  appRouter.post('/active-plans/add', activePlansController.addActiveSubscription.bind(activePlansController));
  appRouter.get('/active-plans/:codass', activePlansController.checkSubscription.bind(activePlansController));

  MessageBrokerService.subscribe('payment_event', (data) => {
    console.log('Received payment event:', data);
    processPaymentEventUseCase.execute(data.codAss, data.dia, data.mes, data.ano);
  });

  const server = new Server(appRouter);
  server.start();
}

main();