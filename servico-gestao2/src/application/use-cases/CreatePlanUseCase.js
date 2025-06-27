// File: servico-gestao/src/application/use-cases/CreatePlanUseCase.js
const Plan = require('../../domain/entities/Plan');

class CreatePlanUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  async execute(name, description, cost, maxClients) {
    // Validações de negócio (ex: custo positivo, maxClients válido)
    if (cost < 0) {
      throw new Error('Plan cost cannot be negative.');
    }
    if (maxClients !== null && maxClients !== undefined && maxClients <= 0) {
      throw new Error('Max clients must be a positive number or null.');
    }

    const newPlan = new Plan(null, name, description, cost, maxClients); // id = null para novo plano
    return await this.planRepository.create(newPlan);
  }
}

module.exports = CreatePlanUseCase;