const Plan = require('../../domain/entities/Plan');

class CreatePlanUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  async execute(name, description, monthlyCost, maxClients = null) {
    if (monthlyCost < 0) {
      throw new Error('Plan cost cannot be negative.');
    }

    if (maxClients !== null && maxClients < 0) {
      throw new Error('Max clients cannot be negative.');
    }

    const newPlan = new Plan(
      null,
      name,
      description,
      monthlyCost,
    );

    const createdPlan = await this.planRepository.create(newPlan);
    return createdPlan;
  }
}

module.exports = CreatePlanUseCase;