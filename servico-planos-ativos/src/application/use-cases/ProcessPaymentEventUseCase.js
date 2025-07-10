
class ProcessPaymentEventUseCase {
  constructor(activePlanCacheService) {
    this.activePlanCacheService = activePlanCacheService;
  }

  async execute(subscriptionCode, day, month, year) {
    // Converter para número
    const code = parseInt(subscriptionCode, 10);

    if (isNaN(code)) {
      throw new Error(`Código de assinatura inválido: ${subscriptionCode}`);
    }

    // Somente uma chamada para ativação
    await this.activePlanCacheService.markSubscriptionAsActive(code);

    // Debug do cache
    await this.activePlanCacheService.debugCache();

    // Log informativo
    console.log(`[ServicoPlanosAtivos] Assinatura ${code} marcada como ativa (pagamento: ${day}/${month}/${year})`);
  }
}

module.exports = ProcessPaymentEventUseCase;