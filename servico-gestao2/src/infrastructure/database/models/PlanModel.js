const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const PlanModel = sequelize.define('Plan', {
  codPlano: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'codPlano'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  monthlyCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  maxClients: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'plans',
  timestamps: false,
});

module.exports = PlanModel;
