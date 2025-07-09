class PlanController {
  constructor(listPlansUseCase, createPlanUseCase, updatePlanCostUseCase) {
    this.listPlansUseCase = listPlansUseCase;
    this.createPlanUseCase = createPlanUseCase;
    this.updatePlanCostUseCase = updatePlanCostUseCase;
  }

  // CORREÇÃO: Método renomeado para listPlans
  async listPlans(req, res) {
    try {
      const plans = await this.listPlansUseCase.execute();
      res.status(200).json(plans);
    } catch (error) {
      console.error('Error listing plans:', error.message);
      res.status(500).json({ error: 'Failed to list plans.' });
    }
  }

  // CORREÇÃO: Método renomeado para createPlan
  async createPlan(req, res) {
    console.log('Recebido para criar plano:', req.body);
    try {
      const { name, description, price } = req.body;

      const priceNumber = parseFloat(price);

      if (!name || !description || isNaN(priceNumber)) {
        return res.status(400).json({
          error: 'Bad Request: name, description, and valid price are required.'
        });
      }

      const newPlan = await this.createPlanUseCase.execute(
        name, 
        description, 
        priceNumber, 
      );

      console.log('Plano criado:', newPlan);

      res.status(201).json(newPlan);
    } catch (error) {
      console.error('Error creating plan:', error.message);
      res.status(500).json({
        error: 'Failed to create plan.',
        details: error.message
      });
    }
  }

  // CORREÇÃO: Método renomeado para updatePlanCost
  async updatePlanCost(req, res) {
    const { id } = req.params;
    const { newPrice } = req.body;
    console.log(`Recebido para atualizar custo do plano ${id}:`, req.body);
    try {
      if (typeof newPrice !== 'number') {
        return res.status(400).json({ error: 'Bad Request: newPrice (number) is required.' });
      }
      const updatedPlan = await this.updatePlanCostUseCase.execute(id, newPrice);
      if (!updatedPlan) {
        return res.status(404).json({ error: 'Plan not found.' });
      }
      res.status(200).json(updatedPlan);
    } catch (error) {
      console.error('Error updating plan cost:', error.message);
      res.status(500).json({ error: 'Failed to update plan cost.' });
    }
  }
}

module.exports = PlanController;