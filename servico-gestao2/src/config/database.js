// File: servico-gestao/src/config/database.js
require('dotenv').config(); // Carrega variáveis de ambiente do .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Ou 'mysql', 'mssql', 'sqlite' etc.
    logging: false, // Desabilita logs do Sequelize, defina como true para depuração
  }
);

// Testa a conexão (opcional, mas recomendado para verificar ao iniciar)
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Sai do processo se a conexão falhar
  }
}

testConnection();

module.exports = sequelize;