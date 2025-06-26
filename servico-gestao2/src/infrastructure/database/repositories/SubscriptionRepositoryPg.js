// File: servico-gestao/src/infra/repositories/SubscriptionRepository.js
const Subscription = require('../../domain/entities/Subscription');

class SubscriptionRepository {
  constructor(db) {
    this.db = db;
  }

  async save(subscription) {
    if (subscription.id) {
      // Update existing subscription
      await this.db.run(
        `UPDATE subscriptions SET clientCode = ?, planCode = ?, startDate = ?, cancellationDate = ?, status = ?, reasonForCancellation = ?, nextPaymentDate = ? WHERE id = ?`,
        [
          subscription.clientCode,
          subscription.planCode,
          subscription.startDate.toISOString(),
          subscription.cancellationDate ? subscription.cancellationDate.toISOString() : null,
          subscription.status,
          subscription.reasonForCancellation,
          subscription.nextPaymentDate ? subscription.nextPaymentDate.toISOString() : null,
          subscription.id
        ]
      );
      return subscription;
    } else {
      // Insert new subscription
      const result = await this.db.run(
        `INSERT INTO subscriptions (clientCode, planCode, startDate, cancellationDate, status, reasonForCancellation, nextPaymentDate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          subscription.clientCode,
          subscription.planCode,
          subscription.startDate.toISOString(),
          subscription.cancellationDate ? subscription.cancellationDate.toISOString() : null,
          subscription.status,
          subscription.reasonForCancellation,
          subscription.nextPaymentDate ? subscription.nextPaymentDate.toISOString() : null
        ]
      );
      subscription.id = result.lastID;
      return subscription;
    }
  }

  async findById(id) {
    const row = await this.db.get(`SELECT * FROM subscriptions WHERE id = ?`, id);
    if (!row) return null;
    return new Subscription(
      row.id,
      row.clientCode,
      row.planCode,
      new Date(row.startDate),
      row.cancellationDate ? new Date(row.cancellationDate) : null,
      row.status,
      row.reasonForCancellation,
      row.nextPaymentDate ? new Date(row.nextPaymentDate) : null
    );
  }

  async findByClientCode(clientCode) {
    const rows = await this.db.all(`SELECT * FROM subscriptions WHERE clientCode = ?`, clientCode);
    return rows.map(row => new Subscription(
      row.id,
      row.clientCode,
      row.planCode,
      new Date(row.startDate),
      row.cancellationDate ? new Date(row.cancellationDate) : null,
      row.status,
      row.reasonForCancellation,
      row.nextPaymentDate ? new Date(row.nextPaymentDate) : null
    ));
  }

  async findByPlanCode(planCode) {
    const rows = await this.db.all(`SELECT * FROM subscriptions WHERE planCode = ?`, planCode);
    return rows.map(row => new Subscription(
      row.id,
      row.clientCode,
      row.planCode,
      new Date(row.startDate),
      row.cancellationDate ? new Date(row.cancellationDate) : null,
      row.status,
      row.reasonForCancellation,
      row.nextPaymentDate ? new Date(row.nextPaymentDate) : null
    ));
  }

  async findActiveSubscriptions() {
    const rows = await this.db.all(`SELECT * FROM subscriptions WHERE status = 'active'`);
    return rows.map(row => new Subscription(
      row.id,
      row.clientCode,
      row.planCode,
      new Date(row.startDate),
      row.cancellationDate ? new Date(row.cancellationDate) : null,
      row.status,
      row.reasonForCancellation,
      row.nextPaymentDate ? new Date(row.nextPaymentDate) : null
    ));
  }
}

module.exports = SubscriptionRepository;