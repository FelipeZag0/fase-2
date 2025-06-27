// File: servico-gestao/src/application/use-cases/CreateClientUseCase.js
const Client = require('../../domain/entities/Client');

class CreateClientUseCase {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(name, email, cpf) {
    // Validações de negócio aqui (ex: formato de email, CPF)
    // Cuidado: As validações de unicidade devem ser tratadas pelo repositório/banco de dados,
    // mas você pode ter validações de formato ou regras de negócio mais complexas aqui.

    const newClient = new Client(null, name, email, cpf); // id = null para novo cliente
    return await this.clientRepository.create(newClient);
  }
}

module.exports = CreateClientUseCase;