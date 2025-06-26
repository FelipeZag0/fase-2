// File: microservices/servico-planos-ativos/src/infra/controllers/ActivePlansController.js
class ActivePlansController {
  constructor(checkSubscriptionUseCase) {
    this.checkSubscriptionUseCase = checkSubscriptionUseCase;
  }

  async checkSubscription(req, res) {
    const { codass } = req.params;
    try {
      const isActive = await this.checkSubscriptionUseCase.execute(parseInt(codass));
      res.status(200).json(isActive);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ActivePlansController;