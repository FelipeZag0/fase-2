const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database.js'); 
const ClientModel = require('./ClientModel');
const PlanModel = require('./PlanModel');

const SubscriptionModel = sequelize.define('Subscription', {
  codAss: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'codAss'
  },
  codCli: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClientModel,
      key: 'codCli',
    },
  },
  codPlano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanModel,
      key: 'codPlano',
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

SubscriptionModel.belongsTo(ClientModel, { foreignKey: 'codCli' });
SubscriptionModel.belongsTo(PlanModel, { foreignKey: 'codPlano' });

// Um cliente pode ter muitas assinaturas
ClientModel.hasMany(SubscriptionModel, { foreignKey: 'codCli' });

// Um plano pode ter muitas assinaturas
PlanModel.hasMany(SubscriptionModel, { foreignKey: 'codPlano' });

module.exports = SubscriptionModel;