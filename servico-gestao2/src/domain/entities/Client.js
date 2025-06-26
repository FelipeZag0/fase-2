class Client {
  constructor(id, name, email) {
    if (!name || name.trim() === '') {
      throw new Error('Client name cannot be empty.');
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Invalid client email.');
    }

    this.id = id;
    this.name = name;
    this.email = email;
  }

  isValidEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  updateName(newName) {
    if (!newName || newName.trim() === '') {
      throw new Error('New client name cannot be empty.');
    }
    this.name = newName;
  }
}

module.exports = Client;