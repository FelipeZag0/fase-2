class ISubscriptionRepository {
  async save(subscription) {
    throw new Error('Method "save" not implemented.');
  }
  async findById(id) {
    throw new Error('Method "findById" not implemented.');
  }
  async findByCodCli(codCli) {
    throw new Error('Method "findBycodCli" not implemented.');
  }
  async findByCodPlano(codPlano) {
    throw new Error('Method "findBycodPlano" not implemented.');
  }
  async update(subscription) {
    throw new Error('Method "update" not implemented.');
  }
}

module.exports = ISubscriptionRepository;