const Plan = require('../../domain/entities/Plan');

class RegisterPlanUseCase {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  async execute(name, description, monthlyCost) {
    const plan = new Plan(null, name, description, monthlyCost);
    return this.planRepository.save(plan);
  }
}

module.exports = RegisterPlanUseCase;