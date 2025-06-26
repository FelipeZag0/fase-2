const Client = require('../../domain/entities/Client');

class RegisterClientUseCase {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(name, email) {
    const client = new Client(null, name, email);
    return this.clientRepository.save(client);
  }
}

module.exports = RegisterClientUseCase;