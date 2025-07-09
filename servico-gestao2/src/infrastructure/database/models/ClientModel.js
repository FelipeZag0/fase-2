const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const ClientModel = sequelize.define('Client', {
  codCli: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'codCli' // Garante que o nome da coluna no banco é 'codCli'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'clients', // Nome da tabela no banco de dados
  timestamps: false // Se suas tabelas não tiverem 'createdAt' e 'updatedAt'
});

module.exports = ClientModel;