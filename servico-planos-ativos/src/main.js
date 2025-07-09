const Server = require('./server');
const ActivePlansController = require('./infra/controllers/ActivePlansController');
const SubscriptionCacheRepository = require('./infra/repositories/SubscriptionCacheRepository');
const ActivePlanCacheService = require('./domain/services/ActivePlanCacheService');
const ProcessPaymentEventUseCase = require('./application/use-cases/ProcessPaymentEventUseCase');
const { appRouter } = require('./infra/web/routes');
const express = require('express');

async function main() {
  const subscriptionCacheRepository = new SubscriptionCacheRepository();
  const activePlanCacheService = new ActivePlanCacheService(subscriptionCacheRepository);
  const processPaymentEventUseCase = new ProcessPaymentEventUseCase(activePlanCacheService);

  const activePlansController = new ActivePlansController(activePlanCacheService);

  appRouter.post('/active-plans/add', activePlansController.addActiveSubscription.bind(activePlansController));
  appRouter.get('/active-plans/:codass', activePlansController.checkSubscription.bind(activePlansController));

  // Middleware para parsing de JSON
  const app = express();
  app.use(express.json());
  app.use(appRouter);

  const server = new Server(appRouter);
  server.start();
}

main();