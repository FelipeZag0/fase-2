// File: microservices/servico-planos-ativos/src/infra/repositories/SubscriptionCacheRepository.js
// This is a simplified in-memory cache for demonstration.
// In a real application, this would use a proper caching solution like Redis.

class SubscriptionCacheRepository {
  constructor() {
    this.activeSubscriptions = new Set(); // Stores active subscription IDs
  }

  async isActive(subscriptionCode) {
    return this.activeSubscriptions.has(subscriptionCode);
  }

  async addActiveSubscription(subscriptionCode) {
    this.activeSubscriptions.add(subscriptionCode);
    console.log(`[ServicoPlanosAtivos Cache] Added subscription ${subscriptionCode}`);
  }

  async removeActiveSubscription(subscriptionCode) {
    this.activeSubscriptions.delete(subscriptionCode);
    console.log(`[ServicoPlanosAtivos Cache] Removed subscription ${subscriptionCode}`);
  }
}

module.exports = SubscriptionCacheRepository;