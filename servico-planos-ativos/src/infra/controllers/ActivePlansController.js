class ActivePlansController {
  constructor(activePlanCacheService) {
    this.activePlanCacheService = activePlanCacheService;
  }

  async addActiveSubscription(req, res) {
    const { subscriptionCode } = req.body;

    const code = parseInt(subscriptionCode, 10);
    if (isNaN(code)) {
      return res.status(400).json({ error: 'Invalid subscriptionCode' });
    }

    try {
      await this.activePlanCacheService.markSubscriptionAsActive(code);
      res.status(200).json({
        message: `Subscription ${code} marked as active`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkSubscription(req, res) {
    const { codass } = req.params;
    try {
      const isActive = await this.activePlanCacheService.isSubscriptionActive(parseInt(codass));
      res.status(200).json({ active: isActive });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ActivePlansController;
