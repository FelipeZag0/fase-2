class ISubscriptionDomainService {
  calculateNextPaymentDate(lastPaymentDate, paymentFrequencyInMonths) {
    throw new Error('Method "calculateNextPaymentDate" not implemented.');
  }

  isActive(subscription) {
    throw new Error('Method "isActive" not implemented.');
  }
}

module.exports = ISubscriptionDomainService;