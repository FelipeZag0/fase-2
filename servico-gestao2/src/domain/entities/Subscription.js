class Subscription {
  constructor(id, codCli, codPlano, startDate, endDate, status, lastPaymentDate, nextPaymentDate) {
    if (!codCli) {
      throw new Error('Subscription must be associated with a client.');
    }
    if (!codPlano) {
      throw new Error('Subscription must be associated with a plan.');
    }
    if (!startDate || !(startDate instanceof Date)) {
      throw new Error('Start date must be a valid Date object.');
    }
    if (status && !['active', 'inactive', 'canceled'].includes(status)) {
        throw new Error('Invalid subscription status.');
    }

    this.id = id;
    this.codCli = codCli;
    this.codPlano = codPlano;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status || 'active'; // Default to active
    this.lastPaymentDate = lastPaymentDate;
    this.nextPaymentDate = nextPaymentDate;
  }

  markAsPaid(paymentDate) {
    if (!paymentDate || !(paymentDate instanceof Date)) {
      throw new Error('Payment date must be a valid Date object.');
    }
    this.lastPaymentDate = paymentDate;
    // For now, let's assume a simple monthly payment cycle for nextPaymentDate calculation.
    const nextMonth = new Date(paymentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.nextPaymentDate = nextMonth;
    this.status = 'active'; // Re-activate if paid
  }

  cancel() {
    this.status = 'canceled';
    this.endDate = new Date();
  }

  isActive() {
    return this.status === 'active' && (!this.endDate || this.endDate > new Date());
  }
}

module.exports = Subscription;