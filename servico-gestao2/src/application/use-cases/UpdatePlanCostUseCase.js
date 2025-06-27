// File: servico-gestao/src/application/use-cases/UpdatePlanCostUseCase.js
class UpdatePlanCostUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  async execute(codPlano, newCost) {
    if (newCost <= 0) {
      throw new Error('O custo do plano deve ser um valor positivo.');
    }

    const plan = await this.planRepository.findById(codPlano);
    if (!plan) {
      throw new Error('Plano não encontrado.');
    }

    plan.cost = newCost;
    await this.planRepository.update(plan);

    return plan;
  }
}

module.exports = UpdatePlanCostUseCase;