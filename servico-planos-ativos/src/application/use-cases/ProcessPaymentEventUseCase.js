// File: microservices/servico-planos-ativos/src/application/use-cases/ProcessPaymentEventUseCase.js
class ProcessPaymentEventUseCase {
  constructor(activePlanCacheService) {
    this.activePlanCacheService = activePlanCacheService;
  }

  async execute(subscriptionCode, day, month, year) {
    const paymentDate = new Date(year, month - 1, day);
    // In a real system, you would verify the payment details
    // For this demonstration, we'll assume a payment means the subscription is active.
    this.activePlanCacheService.markSubscriptionAsActive(subscriptionCode);
    console.log(`[ServicoPlanosAtivos] Subscription ${subscriptionCode} marked as active due to payment on ${paymentDate.toISOString().split('T')[0]}`);
  }
}

module.exports = ProcessPaymentEventUseCase;