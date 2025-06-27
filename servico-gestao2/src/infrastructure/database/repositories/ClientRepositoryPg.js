// File: servico-gestao/src/infrastructure/database/repositories/ClientRepositoryPg.js
const ClientModel = require('../models/ClientModel');
const Client = require('../../../domain/entities/Client'); // Assumindo que você tem uma entidade de domínio Client

class ClientRepositoryPg {
  constructor() {
    // O sequelize gerencia a conexão, não precisamos passar 'db' aqui diretamente
  }

  async findById(codCli) {
    const clientData = await ClientModel.findByPk(codCli);
    if (!clientData) {
      return null;
    }
    // Converte o modelo Sequelize para sua entidade de domínio
    return new Client(clientData.codCli, clientData.name, clientData.email, clientData.cpf);
  }

  async findAll() {
    const clientsData = await ClientModel.findAll();
    // Converte os modelos Sequelize para suas entidades de domínio
    return clientsData.map(clientData => new Client(clientData.codCli, clientData.name, clientData.email, clientData.cpf));
  }

  async create(client) {
    const newClient = await ClientModel.create({
      name: client.name,
      email: client.email,
      cpf: client.cpf
    });
    return new Client(newClient.codCli, newClient.name, newClient.email, newClient.cpf);
  }

  async update(client) {
    const [updatedRows] = await ClientModel.update({
      name: client.name,
      email: client.email,
      cpf: client.cpf
    }, {
      where: { codCli: client.codCli }
    });
    if (updatedRows === 0) {
      throw new Error(`Client with codCli ${client.codCli} not found or no changes made.`);
    }
    return client; // Retorna a entidade atualizada
  }

  async delete(codCli) {
    const deletedRows = await ClientModel.destroy({
      where: { codCli: codCli }
    });
    return deletedRows > 0; // Retorna true se algo foi deletado
  }
}

module.exports = ClientRepositoryPg;