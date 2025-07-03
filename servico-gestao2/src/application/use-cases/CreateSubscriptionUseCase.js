const Subscription = require('../../domain/entities/Subscription');
const axios = require('axios');

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

    try {
      await axios.post('http://servico-planos-ativos:3002/active-plans/add', {
        subscriptionCode: createdSubscription.id
      });
      console.log(`Notified ServicoPlanosAtivos about subscription: ${createdSubscription.id}`);
    } catch (error) {
      console.error(`Failed to notify ServicoPlanosAtivos: ${error.message}`);
    }

    return createdSubscription;
  }
}

module.exports = CreateSubscriptionUseCase;