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

    const paymentDate = new Date(ano, mes - 1, dia); // Month is 0-indexed

    const payment = new Payment(null, codAss, valorPago, paymentDate);
    await this.paymentRepository.save(payment);

    subscription.markAsPaid(paymentDate);
    await this.subscriptionRepository.update(subscription);

    return subscription;
  }
}

module.exports = RegisterPaymentUseCase;