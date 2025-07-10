const IPlanRepository = require('../../../domain/repositories/IPlanRepository');
const PlanModel = require('../models/PlanModel');
const Plan = require('../../../domain/entities/Plan');

class PlanRepositoryPg extends IPlanRepository {
  async create(plan) {
    try {
      console.log('Creating plan:', plan);
      const createdPlan = await PlanModel.create({
        name: plan.name,
        description: plan.description,
        monthlyCost: plan.monthlyCost.toFixed(2)
      });

      return new Plan(
        createdPlan.codPlano,
        createdPlan.name,
        createdPlan.description,
        parseFloat(createdPlan.monthlyCost)
      );
    } catch (error) {
      console.error('Error creating plan:', error);
      throw new Error('Failed to create plan. Please try again later.');
    }
  }
  async save(plan) {
    const createdPlan = await PlanModel.create(plan);
    return new Plan(createdPlan.codPlano, createdPlan.name, createdPlan.description, parseFloat(createdPlan.monthlyCost));
  }

  async findById(id) {
    const planData = await PlanModel.findByPk(id);
    if (!planData) {
      return null;
    }
    return new Plan(
      planData.codPlano, 
      planData.name, 
      planData.description, 
      parseFloat(planData.monthlyCost)
    );
  }

  async findAll() {
    const plansData = await PlanModel.findAll();
    return plansData.map(data => new Plan(
      data.codPlano, 
      data.name, 
      data.description, 
      parseFloat(data.monthlyCost))
    );
  }

  async update(plan) {
    if (!plan.codPlano) {
      throw new Error('ID do plano não fornecido para atualização.');
    }

    const [updatedRows] = await PlanModel.update(
      {
        name: plan.name,
        description: plan.description,
        monthlyCost: plan.monthlyCost
      },
      {
        where: { codPlano: plan.codPlano }
      }
    );

    if (updatedRows === 0) {
      return null;
    }
    return plan;
  }

}

module.exports = PlanRepositoryPg;