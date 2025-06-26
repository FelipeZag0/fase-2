class Payment {
  constructor(id, subscriptionId, amount, paymentDate) {
    if (!subscriptionId) {
      throw new Error('Payment must be associated with a subscription.');
    }
    if (amount === undefined || amount <= 0) {
      throw new Error('Payment amount must be a positive number.');
    }
    if (!paymentDate || !(paymentDate instanceof Date)) {
      throw new Error('Payment date must be a valid Date object.');
    }

    this.id = id;
    this.subscriptionId = subscriptionId;
    this.amount = amount;
    this.paymentDate = paymentDate;
  }
}

module.exports = Payment;