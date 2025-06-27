// File: servico-gestao/src/infrastructure/web/controllers/PlanController.js
class PlanController {
  constructor(listPlansUseCase, updatePlanCostUseCase, createPlanUseCase) {
    this.listPlansUseCase = listPlansUseCase;
    this.updatePlanCostUseCase = updatePlanCostUseCase;
    this.createPlanUseCase = createPlanUseCase; // Novo
  }

  async listPlans(req, res) {
    try {
      const plans = await this.listPlansUseCase.execute();
      res.status(200).json(plans);
    } catch (error) {
      console.error('Error listing plans:', error);
      res.status(500).json({ error: 'Failed to retrieve plans.' });
    }
  }

  // Novo método para criar planos
  async createPlan(req, res) {
    try {
      const { name, description, cost, maxClients } = req.body;
      if (!name || !cost) {
        return res.status(400).json({ error: 'Name and Cost are required for a plan.' });
      }
      const newPlan = await this.createPlanUseCase.execute(name, description, cost, maxClients);
      res.status(201).json(newPlan);
    } catch (error) {
      console.error('Error creating plan:', error);
      if (error.message.includes('unique constraint')) {
        return res.status(409).json({ error: 'Plan with this name already exists.' });
      }
      res.status(500).json({ error: 'Failed to create plan.' });
    }
  }

  async updatePlanCost(req, res) {
    try {
      const { id } = req.params;
      const { newCost } = req.body;
      if (typeof newCost !== 'number' || newCost < 0) {
        return res.status(400).json({ error: 'New cost must be a non-negative number.' });
      }
      const updatedPlan = await this.updatePlanCostUseCase.execute(Number(id), newCost);
      res.status(200).json(updatedPlan);
    } catch (error) {
      console.error('Error updating plan cost:', error);
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to update plan cost.' });
    }
  }
}

module.exports = PlanController;