const Client = require('../../domain/entities/Client');

class CreateClientUseCase {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

async execute(name, email, cpf) {
  const newClient = new Client(null, name, email, cpf); // Passa o cpf
  return await this.clientRepository.create(newClient);
}
}

module.exports = CreateClientUseCase;