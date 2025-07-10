class Plan {
  constructor(codPlano, name, description, monthlyCost) {
    if (!name || name.trim() === '') {
      throw new Error('Plan name cannot be empty.');
    }
    if (monthlyCost === undefined || monthlyCost < 0) {
      throw new Error('Monthly cost must be a non-negative number.');
    }

    this.codPlano = codPlano;
    this.name = name;
    this.description = description;
    this.monthlyCost = monthlyCost;
  }

  updateCost(newCost) {
    if (newCost === undefined || newCost < 0) {
      throw new Error('New monthly cost must be a non-negative number.');
    }
    this.monthlyCost = newCost;
  }
}

module.exports = Plan;