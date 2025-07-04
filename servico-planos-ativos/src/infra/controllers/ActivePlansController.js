class ActivePlansController {
  constructor(activePlanCacheService) {
    this.activePlanCacheService = activePlanCacheService;
  }

  async addActiveSubscription(req, res) {
    const { subscriptionCode } = req.body;
    try {
      await this.activePlanCacheService.markSubscriptionAsActive(parseInt(subscriptionCode));
      res.status(200).json({
        message: `Subscription ${subscriptionCode} marked as active`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkSubscription(req, res) {
    const { codass } = req.params;
    try {
      const isActive = await this.activePlanCacheService.isSubscriptionActive(parseInt(codass));
      res.status(200).json(isActive);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ActivePlansController;