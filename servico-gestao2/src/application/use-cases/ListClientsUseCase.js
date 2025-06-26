class ListClientsUseCase {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute() {
    return this.clientRepository.findAll();
  }
}

module.exports = ListClientsUseCase;