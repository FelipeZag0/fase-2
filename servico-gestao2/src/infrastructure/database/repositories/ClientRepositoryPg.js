const IClientRepository = require('../../../domain/repositories/IClientRepository');
const ClientModel = require('../models/ClientModel');
const Client = require('../../../domain/entities/Client');

class ClientRepositoryPg extends IClientRepository {
  async save(client) {
    const createdClient = await ClientModel.create(client);
    return new Client(createdClient.id, createdClient.name, createdClient.email);
  }

  async findById(id) {
    const clientData = await ClientModel.findByPk(id);
    if (!clientData) {
      return null;
    }
    return new Client(clientData.id, clientData.name, clientData.email);
  }

  async findAll() {
    const clientsData = await ClientModel.findAll();
    return clientsData.map(data => new Client(data.id, data.name, data.email));
  }
}

module.exports = ClientRepositoryPg;