// File: microservices/servico-faturamento/src/application/use-cases/RegisterPaymentUseCase.js
const Payment = require('../../domain/entities/Payment');

class RegisterPaymentUseCase {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(day, month, year, codAss, valorPago) {
    const paymentDate = new Date(year, month - 1, day); // Month is 0-indexed in Date constructor
    if (isNaN(paymentDate.getTime())) {
      throw new Error('Formato de data de pagamento inválido. Por favor, forneça dia, mês e ano válidos.');
    }

    // In a real scenario, you might want to validate codAss exists in ServicoGestao
    // and if valorPago is positive, etc.

    const payment = new Payment(null, paymentDate, codAss, valorPago);
    await this.paymentRepository.save(payment);

    return payment;
  }
}

module.exports = RegisterPaymentUseCase;