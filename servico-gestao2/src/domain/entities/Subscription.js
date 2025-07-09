class Subscription {
  constructor(codAss, codCli, codPlano, startDate, endDate, status, cancellationDate, nextPaymentDate) {
    this.codAss = codAss;
    this.codCli = codCli;
    this.codPlano = codPlano;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.cancellationDate = cancellationDate;
    this.nextPaymentDate = nextPaymentDate;
    this.lastPaymentDate = null; // Adicionado
  }

  // Método adicionado
  markAsPaid(paymentDate) {
    this.lastPaymentDate = paymentDate;
    // Cálculo da próxima data de pagamento
    const nextDate = new Date(paymentDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    this.nextPaymentDate = nextDate;
  }
}

module.exports = Subscription;