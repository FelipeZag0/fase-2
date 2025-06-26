// File: microservices/servico-faturamento/src/domain/entities/Payment.js
class Payment {
  constructor(id, paymentDate, subscriptionCode, amountPaid) {
    this.id = id;
    this.paymentDate = paymentDate;
    this.subscriptionCode = subscriptionCode;
    this.amountPaid = amountPaid;
  }
}

module.exports = Payment;