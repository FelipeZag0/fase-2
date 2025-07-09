const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database.js'); 
const SubscriptionModel = require('./SubscriptionModel');

const PaymentModel = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subscriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SubscriptionModel,
      key: 'codAss',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'payments',
  timestamps: false,
});

PaymentModel.belongsTo(SubscriptionModel, {
  foreignKey: 'subscriptionId',
  targetKey: 'codAss',
  as: 'subscription'
});

module.exports = PaymentModel;