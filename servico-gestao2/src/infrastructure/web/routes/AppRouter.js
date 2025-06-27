const express = require('express');

class AppRouter {
  constructor(clientController, planController, subscriptionController) {
    this.router = express.Router();
    this.clientController = clientController;
    this.planController = planController;
    this.subscriptionController = subscriptionController;
    this._setupRoutes();
  }

  _setupRoutes() {
    // Client routes
    this.router.get('/gerenciaplanos/clients', this.clientController.listClients.bind(this.clientController));
    this.router.post('/gerenciaplanos/clients', this.clientController.createClient.bind(this.clientController));
    this.router.put('/gerenciaplanos/clients/:id', this.clientController.updateClient.bind(this.clientController));

    // Plan routes
    // CORREÇÃO: Usando métodos com nomes corretos
    this.router.get('/gerenciaplanos/plans', this.planController.listPlans.bind(this.planController));
    this.router.post('/gerenciaplanos/plans', this.planController.createPlan.bind(this.planController));
    this.router.put('/gerenciaplanos/plans/:id/cost', this.planController.updatePlanCost.bind(this.planController));

    // Subscription routes
    this.router.post('/gerenciaplanos/subscriptions', this.subscriptionController.createSubscription.bind(this.subscriptionController));
    this.router.get('/gerenciaplanos/subscriptions/client/:codCli', this.subscriptionController.listClientSubscriptions.bind(this.subscriptionController));
    this.router.get('/gerenciaplanos/subscriptions/plan/:codPlano', this.subscriptionController.listPlanSubscribers.bind(this.subscriptionController));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AppRouter;