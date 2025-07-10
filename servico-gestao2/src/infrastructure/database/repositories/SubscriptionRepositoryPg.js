const SubscriptionModel = require('../models/SubscriptionModel');
const Subscription = require('../../../domain/entities/Subscription');
const Client = require('../../../domain/entities/Client');
const ClientModel = require('../models/ClientModel');
const PlanModel = require('../models/PlanModel');

class SubscriptionRepositoryPg {
  async findById(id) {
    const data = await SubscriptionModel.findByPk(id);
    if (!data) return null;

    return new Subscription(
      data.codAss,
      data.codCli,
      data.codPlano,
      data.startDate,
      data.endDate,
      data.status,
      data.cancellationDate,
      data.nextPaymentDate
    );
  }

  async save(subscription) {
    const [data, created] = await SubscriptionModel.upsert({
      codAss: subscription.codAss,
      codCli: subscription.codCli,
      codPlano: subscription.codPlano,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      status: subscription.status,
      cancellationDate: subscription.cancellationDate,
      nextPaymentDate: subscription.nextPaymentDate
    });

    return new Subscription(
      data.codAss,
      data.codCli,
      data.codPlano,
      data.startDate,
      data.endDate,
      data.status,
      data.cancellationDate,
      data.nextPaymentDate
    );
  }

  async findByCodPlano(codPlano) {
    const data = await SubscriptionModel.findAll({ where: { codPlano } });
    return data.map(d => new Subscription(
      d.codAss,
      d.codCli,
      d.codPlano,
      d.startDate,
      d.endDate,
      d.status,
      d.cancellationDate,
      d.nextPaymentDate
    ));
  }

  async findByCodCli(codCli) {
    const data = await SubscriptionModel.findAll({
      where: { codCli },
      include: [ClientModel, PlanModel]
    });

    return data.map(d => new Subscription(
      d.codAss,
      d.codCli,
      d.codPlano,
      d.startDate,
      d.endDate,
      d.status,
      d.cancellationDate,
      d.nextPaymentDate
    ));
  }
}

module.exports = SubscriptionRepositoryPg;