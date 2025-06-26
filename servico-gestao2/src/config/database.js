const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Set to true to see SQL queries in console
  }
);

module.exports = {
  sequelize: sequelize, // Exporta a instância completa do Sequelize (se precisar dela em outro lugar)
  authenticate: sequelize.authenticate.bind(sequelize), // Exporta o método authenticate
  sync: sequelize.sync.bind(sequelize), // Exporta o método sync
};