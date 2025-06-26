// File: microservices/servico-faturamento/src/infra/controllers/PaymentController.js
class PaymentController {
  constructor(registerPaymentUseCase) {
    this.registerPaymentUseCase = registerPaymentUseCase;
  }

  async registerPayment(req, res) {
    const { dia, mes, ano, codAss, valorPago } = req.body;
    try {
      const payment = await this.registerPaymentUseCase.execute(dia, mes, ano, codAss, valorPago);
      res.status(201).json({ message: 'Pagamento registrado com sucesso!', payment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;