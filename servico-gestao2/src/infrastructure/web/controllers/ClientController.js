// File: servico-gestao/src/infrastructure/web/controllers/ClientController.js
const Client = require('../../../domain/entities/Client'); // Importa a entidade Client

class ClientController {
  constructor(listClientsUseCase, createClientUseCase, updateClientUseCase) {
    this.listClientsUseCase = listClientsUseCase;
    this.createClientUseCase = createClientUseCase; // Novo
    this.updateClientUseCase = updateClientUseCase; // Novo
  }

  async listClients(req, res) {
    try {
      const clients = await this.listClientsUseCase.execute();
      res.status(200).json(clients);
    } catch (error) {
      console.error('Error listing clients:', error);
      res.status(500).json({ error: 'Failed to retrieve clients.' });
    }
  }

  // Novo método para criar clientes
  async createClient(req, res) {
    try {
      const { name, email, cpf } = req.body;
      // Validação básica
      if (!name || !email || !cpf) {
        return res.status(400).json({ error: 'Name, email, and CPF are required.' });
      }
      const client = await this.createClientUseCase.execute(name, email, cpf);
      res.status(201).json(client);
    } catch (error) {
      console.error('Error creating client:', error);
      if (error.message.includes('unique constraint')) { // Exemplo para erro de unicidade
        return res.status(409).json({ error: 'Client with this email or CPF already exists.' });
      }
      res.status(500).json({ error: 'Failed to create client.' });
    }
  }

  // Novo método para atualizar clientes
  async updateClient(req, res) {
    try {
      const { id } = req.params;
      const { name, email, cpf } = req.body;
      // Validação básica
      if (!name || !email || !cpf) {
        return res.status(400).json({ error: 'Name, email, and CPF are required for update.' });
      }
      const updatedClient = await this.updateClientUseCase.execute(Number(id), name, email, cpf);
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error('Error updating client:', error);
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('unique constraint')) {
        return res.status(409).json({ error: 'Another client with this email or CPF already exists.' });
      }
      res.status(500).json({ error: 'Failed to update client.' });
    }
  }
}

module.exports = ClientController;