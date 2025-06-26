const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database.js'); 

const PlanModel = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
}, {
  tableName: 'plans',
  timestamps: false,
});

module.exports = PlanModel;