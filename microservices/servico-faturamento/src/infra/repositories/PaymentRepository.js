// File: microservices/servico-faturamento/src/infra/repositories/PaymentRepository.js
// This is a simplified in-memory repository for demonstration.
// In a real application, this would interact with a database.

class PaymentRepository {
  constructor() {
    this.payments = [];
    this.nextId = 1;
  }

  async save(payment) {
    payment.id = this.nextId++;
    this.payments.push(payment);
    console.log(`[ServicoFaturamento] Payment recorded: Subscription ${payment.subscriptionCode}, Amount: ${payment.amountPaid}`);
    return payment;
  }

  async findAll() {
    return this.payments;
  }
}

module.exports = PaymentRepository;