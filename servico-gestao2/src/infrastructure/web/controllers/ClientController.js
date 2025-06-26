class ClientController {
  constructor(registerClientUseCase, listClientsUseCase) {
    this.registerClientUseCase = registerClientUseCase;
    this.listClientsUseCase = listClientsUseCase;
  }

  async registerClient(req, res) {
    try {
      const { name, email } = req.body;
      const client = await this.registerClientUseCase.execute(name, email);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listClients(req, res) {
    try {
      const clients = await this.listClientsUseCase.execute();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = ClientController;