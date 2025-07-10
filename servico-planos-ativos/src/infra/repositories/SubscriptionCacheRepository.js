
// File: servico-planos-ativos/src/infra/repositories/SubscriptionCacheRepository.js
class SubscriptionCacheRepository {
  constructor() {
    this.activeSubscriptions = new Map();
  }

  async isActive(subscriptionCode) {
    return this.activeSubscriptions.has(subscriptionCode);
  }

  async addActiveSubscription(subscriptionCode) {
    this.activeSubscriptions.set(subscriptionCode, true);
    console.log(`[ServicoPlanosAtivos Cache] Added subscription ${subscriptionCode}`);
  }

  async removeActiveSubscription(subscriptionCode) {
    this.activeSubscriptions.delete(subscriptionCode);
    console.log(`[ServicoPlanosAtivos Cache] Removed subscription ${subscriptionCode}`);
  }

  async debugCache() {
    console.log(`[ServicoPlanosAtivos Cache] Current active subscriptions: ${Array.from(this.activeSubscriptions.keys()).join(', ')}`);
  }
}

module.exports = SubscriptionCacheRepository;