// File: servico-gestao/src/infra/database/Database.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

class Database {
  constructor() {
    this.db = null;
  }

  async initialize() {
    this.db = await open({
      filename: './database.sqlite', // Path from the project root (servico-gestao)
      driver: sqlite3.Database
    });
    await this._runMigrations();
    console.log('Database initialized and migrations run.');
    return this.db;
  }

  async _runMigrations() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS clients (
        codCli INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        cpf TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS plans (
        codPlano INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        cost REAL NOT NULL,
        maxClients INTEGER
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        codAss INTEGER PRIMARY KEY AUTOINCREMENT,
        codCli INTEGER NOT NULL,
        codPlano INTEGER NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT,
        status TEXT NOT NULL,
        cancellationDate TEXT,
        nextPaymentDate TEXT,
        FOREIGN KEY (codCli) REFERENCES clients(codCli),
        FOREIGN KEY (codPlano) REFERENCES plans(codPlano)
      );
    `);
  }
}

module.exports = new Database();