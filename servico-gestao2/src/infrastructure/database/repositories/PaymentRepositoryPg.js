const IPaymentRepository = require('../../../domain/repositories/IPaymentRepository');
const PaymentModel = require('../models/PaymentModel');
const Payment = require('../../../domain/entities/Payment');

class PaymentRepositoryPg extends IPaymentRepository {
  async save(payment) {
    const createdPayment = await PaymentModel.create(payment);
    return new Payment(createdPayment.id, createdPayment.subscriptionId, parseFloat(createdPayment.amount), createdPayment.paymentDate);
  }
}

module.exports = PaymentRepositoryPg;