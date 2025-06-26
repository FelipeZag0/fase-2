class IClientRepository {
  async save(client) {
    throw new Error('Method "save" not implemented.');
  }
  async findById(id) {
    throw new Error('Method "findById" not implemented.');
  }
  async findAll() {
    throw new Error('Method "findAll" not implemented.');
  }
}

module.exports = IClientRepository;