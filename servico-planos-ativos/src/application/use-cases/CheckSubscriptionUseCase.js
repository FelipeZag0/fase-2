// File: microservices/servico-planos-ativos/src/application/use-cases/CheckSubscriptionUseCase.js
class CheckSubscriptionUseCase {
  constructor(activePlanCacheService) {
    this.activePlanCacheService = activePlanCacheService;
  }

  async execute(subscriptionCode) {
    return this.activePlanCacheService.isSubscriptionActive(subscriptionCode);
  }
}

module.exports = CheckSubscriptionUseCase;