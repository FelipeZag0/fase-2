// File: servico-gestao/src/application/use-cases/UpdateClientUseCase.js
const Client = require('../../domain/entities/Client'); // Importa a entidade Client

class UpdateClientUseCase {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(codCli, name, email, cpf) {
    const existingClient = await this.clientRepository.findById(codCli);
    if (!existingClient) {
      throw new Error(`Client with ID ${codCli} not found.`);
    }

    // Atualiza a entidade existente
    existingClient.name = name;
    existingClient.email = email;
    existingClient.cpf = cpf;

    return await this.clientRepository.update(existingClient);
  }
}

module.exports = UpdateClientUseCase;