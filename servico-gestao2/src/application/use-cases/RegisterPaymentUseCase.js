const axios = require('axios'); // Adicionado
const Payment = require('../../domain/entities/Payment');

class RegisterPaymentUseCase {
  constructor(subscriptionRepository, paymentRepository) {
    this.subscriptionRepository = subscriptionRepository;
    this.paymentRepository = paymentRepository;
  }

  async execute(codAss, dia, mes, ano, valorPago) {
    const subscription = await this.subscriptionRepository.findById(codAss);
    if (!subscription) {
      throw new Error('Subscription not found.');
    }

    const paymentDate = new Date(ano, mes - 1, dia);
    if (isNaN(paymentDate.getTime())) {
      throw new Error(`Invalid payment date: ${ano}-${mes}-${dia}`);
    }
    
    const payment = new Payment(
      null,
      codAss,
      valorPago,
      paymentDate
    );
    
    await this.paymentRepository.save(payment);
    
    // Atualizar a assinatura se necessário
    subscription.lastPaymentDate = paymentDate;
    await this.subscriptionRepository.save(subscription);

    // NOTIFICAR SERVIÇO DE PLANOS ATIVOS
    try {
      await axios.post('http://localhost:3002/active-plans/add', {
        subscriptionCode: codAss
      });
      console.log(`[ServicoGestao] Notified ServicoPlanosAtivos about payment for subscription ${codAss}`);
    } catch (error) {
      console.error(`[ServicoGestao] Failed to notify ServicoPlanosAtivos: ${error.message}`);
    }

    return subscription;
  }
}

module.exports = RegisterPaymentUseCase;
