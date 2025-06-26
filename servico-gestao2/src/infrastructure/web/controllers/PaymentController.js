class PaymentController {
  constructor(registerPaymentUseCase) {
    this.registerPaymentUseCase = registerPaymentUseCase;
  }

  async registerPayment(req, res) {
    try {
      const { dia, mes, ano, codAss, valorPago } = req.body;
      const updatedSubscription = await this.registerPaymentUseCase.execute(codAss, dia, mes, ano, valorPago);
      res.status(200).json({ message: 'Payment registered successfully.', subscription: updatedSubscription });
    } catch (error) {
      if (error.message === 'Subscription not found.') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;