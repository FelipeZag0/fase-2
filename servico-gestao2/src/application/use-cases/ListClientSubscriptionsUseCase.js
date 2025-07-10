class ListClientSubscriptionsUseCase {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(codCli) {
    return this.subscriptionRepository.findByCodCli(codCli);
  }
}

module.exports = ListClientSubscriptionsUseCase;