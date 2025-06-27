// File: servico-gestao/src/infrastructure/web/controllers/SubscriptionController.js
class SubscriptionController {
  constructor(createSubscriptionUseCase, listClientSubscriptionsUseCase, listPlanSubscribersUseCase) {
    this.createSubscriptionUseCase = createSubscriptionUseCase;
    this.listClientSubscriptionsUseCase = listClientSubscriptionsUseCase;
    this.listPlanSubscribersUseCase = listPlanSubscribersUseCase;
  }

  async createSubscription(req, res) {
    try {
      const { codCli, codPlano, startDate } = req.body;
      // Validação básica dos inputs
      if (!codCli || !codPlano || !startDate) {
        return res.status(400).json({ error: 'Client ID, Plan ID, and Start Date are required.' });
      }
      const subscription = await this.createSubscriptionUseCase.execute(codCli, codPlano, startDate);
      res.status(201).json(subscription);
    } catch (error) {
      console.error('Error creating subscription:', error);
      if (error.message.includes('Client not found') || error.message.includes('Plan not found')) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('Formato de startDate inválido')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to create subscription.' });
    }
  }

  async listClientSubscriptions(req, res) {
    try {
      const { codCli } = req.params;
      const subscriptions = await this.listClientSubscriptionsUseCase.execute(Number(codCli));
      res.status(200).json(subscriptions);
    } catch (error) {
      console.error('Error listing client subscriptions:', error);
      res.status(500).json({ error: 'Failed to retrieve client subscriptions.' });
    }
  }

  async listPlanSubscribers(req, res) {
    try {
      const { codPlano } = req.params;
      const subscribers = await this.listPlanSubscribersUseCase.execute(Number(codPlano));
      res.status(200).json(subscribers);
    } catch (error) {
      console.error('Error listing plan subscribers:', error);
      res.status(500).json({ error: 'Failed to retrieve plan subscribers.' });
    }
  }
}

module.exports = SubscriptionController;