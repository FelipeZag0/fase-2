const Payment = require('../../domain/entities/Payment');

class PaymentController {
  constructor(registerPaymentUseCase) {
    this.registerPaymentUseCase = registerPaymentUseCase;
  }

  async registerPayment(req, res) {
    console.log('Body recebido:', req.body);

    try {
      // Conversão explícita
      const diaInt = parseInt(req.body.dia, 10);
      const mesInt = parseInt(req.body.mes, 10);
      const anoInt = parseInt(req.body.ano, 10);
      const codAssInt = parseInt(req.body.codAss, 10);
      const valorPagoNum = parseFloat(req.body.valorPago);

      // Validação
      if ([diaInt, mesInt, anoInt, codAssInt].some(v => isNaN(v))
        || isNaN(valorPagoNum)) {
        return res
          .status(400)
          .json({ error: 'Dados inválidos. Verifique os campos enviados.' });
      }

      const updatedSubscription = await this
        .registerPaymentUseCase
        .execute(
          diaInt,     // day
          mesInt,     // month
          anoInt,     // year
          codAssInt,  // codAss (subscriptionCode)
          valorPagoNum // valorPago (amountPaid)
        );

      return res
        .status(201)
        .json({
          message: 'Pagamento registrado com sucesso!',
          subscription: updatedSubscription
        });

    } catch (error) {
      console.error('ERRO CRÍTICO:', error);
      return res
        .status(500)
        .json({ error: 'Erro interno no servidor.' });
    }
  }
}

module.exports = PaymentController;
