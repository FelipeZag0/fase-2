// File: servico-gestao/src/domain/entities/Subscription.js
class Subscription {
  constructor(codAss, codCli, codPlano, startDate, endDate, status, cancellationDate, nextPaymentDate) {
    this.codAss = codAss;
    this.codCli = codCli;
    this.codPlano = codPlano;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status; // Ex: 'active', 'inactive', 'cancelled'
    this.cancellationDate = cancellationDate;
    this.nextPaymentDate = nextPaymentDate;
  }

  // Métodos de domínio para a entidade Subscription podem ser adicionados aqui
  // Ex: isActive(), cancel(), etc.

  isActive() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return this.status === 'active' &&
           (!this.endDate || new Date(this.endDate) >= now);
  }

  cancel(cancellationDate = new Date()) {
    this.status = 'cancelled';
    this.cancellationDate = cancellationDate;
  }

  toObject() {
    return {
      codAss: this.codAss,
      codCli: this.codCli,
      codPlano: this.codPlano,
      startDate: this.startDate ? this.startDate.toISOString().split('T')[0] : null,
      endDate: this.endDate ? this.endDate.toISOString().split('T')[0] : null,
      status: this.status,
      cancellationDate: this.cancellationDate ? this.cancellationDate.toISOString().split('T')[0] : null,
      nextPaymentDate: this.nextPaymentDate ? this.nextPaymentDate.toISOString().split('T')[0] : null,
    };
  }
}

module.exports = Subscription;