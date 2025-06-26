class ListPlanSubscribersUseCase {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(codPlano) {
    return this.subscriptionRepository.findByCodPlano(codPlano);
  }
}

module.exports = ListPlanSubscribersUseCase;