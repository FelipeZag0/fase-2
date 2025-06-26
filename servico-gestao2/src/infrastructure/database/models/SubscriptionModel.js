const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database.js'); 
const ClientModel = require('./ClientModel');
const PlanModel = require('./PlanModel');

const SubscriptionModel = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codCli: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClientModel,
      key: 'id',
    },
  },
  codPlano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanModel,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  lastPaymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  nextPaymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'subscriptions',
  timestamps: false,
});

SubscriptionModel.belongsTo(ClientModel, { foreignKey: 'codCli', as: 'client' });
SubscriptionModel.belongsTo(PlanModel, { foreignKey: 'codPlano', as: 'plan' });

module.exports = SubscriptionModel;