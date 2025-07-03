// File: microservices/servico-planos-ativos/src/domain/services/ActivePlanCacheService.js
class ActivePlanCacheService {
  constructor(subscriptionCacheRepository) {
    this.subscriptionCacheRepository = subscriptionCacheRepository;
  }

  async isSubscriptionActive(subscriptionCode) {
    return await this.subscriptionCacheRepository.isActive(subscriptionCode);
  }

  async markSubscriptionAsActive(subscriptionCode) {
    await this.subscriptionCacheRepository.addActiveSubscription(subscriptionCode);
  }

  async removeSubscriptionFromCache(subscriptionCode) {
    await this.subscriptionCacheRepository.removeActiveSubscription(subscriptionCode);
  }
}

module.exports = ActivePlanCacheService;