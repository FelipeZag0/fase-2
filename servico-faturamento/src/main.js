const Server = require('./server');
const PaymentController = require('./infra/controllers/PaymentController');
const PaymentRepository = require('./infra/repositories/PaymentRepository');
const RegisterPaymentUseCase = require('./application/use-cases/RegisterPaymentUseCase');
const { appRouter } = require('./infra/web/routes');
const express = require('express'); // Adicionado

async function main() {
  console.log("Iniciando ServicoFaturamento...");
  const paymentRepository = new PaymentRepository();
  const registerPaymentUseCase = new RegisterPaymentUseCase(paymentRepository);
  const paymentController = new PaymentController(registerPaymentUseCase);

  appRouter.get('/test', (req, res) => {
    console.log("Rota /test acessada!");
    res.status(200).json({ status: "online", service: "ServicoFaturamento" });
  });

  appRouter.post('/registrarpagamento', paymentController.registerPayment.bind(paymentController));

  const server = new Server(appRouter);
  
  // MIDDLEWARE ADICIONADO PARA CORRIGIR PARSING DE JSON
  server.app.use(express.json());
  
  server.start();
}

main();