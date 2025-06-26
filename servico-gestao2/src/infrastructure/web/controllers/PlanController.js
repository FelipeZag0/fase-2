const PlanRepositoryPg = require('../../database/repositories/PlanRepositoryPg.js');
class PlanController {
  constructor(registerPlanUseCase, listPlansUseCase) {
    this.registerPlanUseCase = registerPlanUseCase;
    this.listPlansUseCase = listPlansUseCase;
    // Se no futuro você criar um UpdatePlanCostUseCase, ele seria injetado aqui:
    // this.updatePlanCostUseCase = updatePlanCostUseCase;
  }

  async registerPlan(req, res) {
    try {
      const { name, description, monthlyCost } = req.body;
      const plan = await this.registerPlanUseCase.execute(name, description, monthlyCost);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listPlans(req, res) {
    try {
      const plans = await this.listPlansUseCase.execute();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async updatePlanCost(req, res) {
    try {
      const { idPlano } = req.params; // Captura o ID do plano da URL
      const { newMonthlyCost } = req.body; // Captura o novo custo do corpo da requisição

      // VALIDAÇÃO BÁSICA
      if (!newMonthlyCost || typeof newMonthlyCost !== 'number' || newMonthlyCost <= 0) {
        return res.status(400).json({ error: 'O novo custo mensal deve ser um número positivo.' });
      }

      const planRepository = new PlanRepositoryPg(); // Instancia o repositório diretamente AQUI (temporariamente)
      
      // ****** MUDANÇA AQUI: Chamando o método 'update' existente no repositório ******
      const updatedPlan = await planRepository.update({ id: idPlano, monthlyCost: newMonthlyCost });
      // *****************************************************************************

      if (!updatedPlan) {
        return res.status(404).json({ error: 'Plano não encontrado.' });
      }

      res.status(200).json(updatedPlan);
    } catch (error) {
      console.error('Erro ao atualizar o custo do plano:', error);
      res.status(500).json({ error: error.message || 'Erro interno do servidor ao atualizar o custo do plano.' });
    }
  }
}

module.exports = PlanController;