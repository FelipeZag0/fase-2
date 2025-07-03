class Client {
  constructor(id, name, email, cpf) { // Adiciona parâmetro cpf
    if (!name || name.trim() === '') {
      throw new Error('Nome do cliente não pode estar vazio.');
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error('E-mail do cliente inválido.');
    }
    if (!cpf || !this.isValidCPF(cpf)) { // Adiciona validação de CPF
      throw new Error('CPF do cliente inválido.');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf; // Adiciona propriedade cpf
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Adiciona método de validação de CPF
  isValidCPF(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf); // Validação básica de formato de CPF
  }
}

module.exports = Client;