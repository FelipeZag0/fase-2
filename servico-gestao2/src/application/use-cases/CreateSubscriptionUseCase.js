// File: servico-gestao/src/application/use-cases/CreateSubscriptionUseCase.js
const Subscription = require('../../domain/entities/Subscription');
const axios = require('axios'); // Add axios for HTTP request

class CreateSubscriptionUseCase {
  constructor(clientRepository, planRepository, subscriptionRepository, subscriptionDomainService) {
    this.clientRepository = clientRepository;
    this.planRepository = planRepository;
    this.subscriptionRepository = subscriptionRepository;
    this.subscriptionDomainService = subscriptionDomainService;
  }

  async execute(codCli, codPlano, startDate) {
    const client = await this.clientRepository.findById(codCli);
    if (!client) {
      throw new Error('Client not found.');
    }

    const plan = await this.planRepository.findById(codPlano);
    if (!plan) {
      throw new Error('Plan not found.');
    }

    const parsedStartDate = new Date(startDate);
    if (isNaN(parsedStartDate.getTime())) {
        throw new Error('Formato de startDate inválido. Por favor, forneça uma data no formato AAAA-MM-DD.');
    }
    parsedStartDate.setHours(0, 0, 0, 0);

    const initialNextPaymentDate = this.subscriptionDomainService.calculateNextPaymentDate(parsedStartDate, 1);

    const subscription = new Subscription(
      null,
      codCli,
      codPlano,
      parsedStartDate,
      null,
      'active',
      null,
      initialNextPaymentDate
    );

    const createdSubscription = await this.subscriptionRepository.save(subscription);

    // Notify ServicoPlanosAtivos about the new active subscription
    try {
      await axios.post('http://servico-planos-ativos:3002/active-plans/add', { // Assuming an endpoint to add to cache
        subscriptionCode: createdSubscription.id
      });
      console.log(`[ServicoGestao] Notified ServicoPlanosAtivos about new subscription: ${createdSubscription.id}`);
    } catch (error) {
      console.error(`[ServicoGestao] Failed to notify ServicoPlanosAtivos for subscription ${createdSubscription.id}:`, error.message);
      // Depending on requirements, you might want to log this, retry, or use a dead-letter queue
    }

    return createdSubscription;
  }
}

module.exports = CreateSubscriptionUseCase;