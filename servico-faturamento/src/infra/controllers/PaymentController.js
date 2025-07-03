const Payment = require('../../domain/entities/Payment')

class PaymentController {
  constructor(registerPaymentUseCase) {
    this.registerPaymentUseCase = registerPaymentUseCase;
  }

  async registerPayment(req, res) {
    console.log('Body recebido:', req.body);

    try {
      const { dia, mes, ano, codAss, valorPago } = req.body;

      if (!dia || !mes || !ano || !codAss || !valorPago) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const payment = await this.registerPaymentUseCase.execute(
        parseInt(dia),
        parseInt(mes),
        parseInt(ano),
        parseInt(codAss),
        parseFloat(valorPago)
      );

      res.status(201).json({ message: 'Pagamento registrado com sucesso!', payment });
    } catch (error) {
      console.log('ERRO CRÍTICO:', error);
      res.status(400).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = PaymentController;