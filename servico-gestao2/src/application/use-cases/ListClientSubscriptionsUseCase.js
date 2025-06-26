class ListClientSubscriptionsUseCase {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(codCli) {
    return this.subscriptionRepository.findBycodCli(codCli);
  }
}

module.exports = ListClientSubscriptionsUseCase;