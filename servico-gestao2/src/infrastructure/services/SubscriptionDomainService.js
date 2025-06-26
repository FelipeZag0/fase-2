const ISubscriptionDomainService = require('../../domain/services/ISubscriptionDomainService');

class SubscriptionDomainService extends ISubscriptionDomainService {
  calculateNextPaymentDate(lastPaymentDate, paymentFrequencyInMonths) {
    if (!(lastPaymentDate instanceof Date)) {
      lastPaymentDate = new Date(lastPaymentDate);
    }
    const nextDate = new Date(lastPaymentDate);
    nextDate.setMonth(nextDate.getMonth() + paymentFrequencyInMonths);
    return nextDate;
  }

  isActive(subscription) {
    if (!subscription) return false;
    return subscription.status === 'active' &&
           (!subscription.endDate || new Date(subscription.endDate) > new Date()) &&
           (!subscription.nextPaymentDate || new Date(subscription.nextPaymentDate) >= new Date());
  }
}

module.exports = SubscriptionDomainService;