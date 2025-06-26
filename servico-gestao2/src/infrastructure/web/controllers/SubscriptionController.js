class SubscriptionController {
  constructor(createSubscriptionUseCase, listClientSubscriptionsUseCase, listPlanSubscribersUseCase) {
    this.createSubscriptionUseCase = createSubscriptionUseCase;
    this.listClientSubscriptionsUseCase = listClientSubscriptionsUseCase;
    this.listPlanSubscribersUseCase = listPlanSubscribersUseCase;
  }

  async createSubscription(req, res) {
    try {
      const { codCli, codPlano, startDate } = req.body;
      const subscription = await this.createSubscriptionUseCase.execute(codCli, codPlano, startDate);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listClientSubscriptions(req, res) {
    try {
      const { codCli } = req.params;
      const subscriptions = await this.listClientSubscriptionsUseCase.execute(parseInt(codCli));
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async listPlanSubscribers(req, res) {
    try {
      const { codPlano } = req.params;
      const subscriptions = await this.listPlanSubscribersUseCase.execute(parseInt(codPlano));
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = SubscriptionController;