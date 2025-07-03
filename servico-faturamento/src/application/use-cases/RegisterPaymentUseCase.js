const Payment = require('../../domain/entities/Payment');

class RegisterPaymentUseCase {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(day, month, year, codAss, valorPago) {
    const diaInt = parseInt(day);
    const mesInt = parseInt(month);
    const anoInt = parseInt(year);
    const valorFloat = parseFloat(valorPago);

    if (isNaN(diaInt) || isNaN(mesInt) || isNaN(anoInt) || isNaN(valorFloat)) {
      throw new Error('Valores numéricos inválidos');
    }

    const paymentDate = new Date(anoInt, mesInt - 1, diaInt);

    if (isNaN(paymentDate.getTime())) {
      throw new Error('Data inválida');
    }

    if (valorFloat <= 0) {
      throw new Error('Valor deve ser positivo');
    }

    const payment = new Payment(null, paymentDate, codAss, valorFloat);
    await this.paymentRepository.save(payment);

    return payment;
  }
}

module.exports = RegisterPaymentUseCase;