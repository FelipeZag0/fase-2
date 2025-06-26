const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database.js'); 

const ClientModel = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = ClientModel;