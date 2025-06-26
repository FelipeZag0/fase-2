// File: microservices/servico-faturamento/src/main.js
const Server = require('./server');
const PaymentController = require('./infra/controllers/PaymentController');
const PaymentRepository = require('./infra/repositories/PaymentRepository');
const RegisterPaymentUseCase = require('./application/use-cases/RegisterPaymentUseCase');
const { appRouter } = require('./infra/web/routes'); // Import the router instance

async function main() {
  const paymentRepository = new PaymentRepository();
  const registerPaymentUseCase = new RegisterPaymentUseCase(paymentRepository);
  const paymentController = new PaymentController(registerPaymentUseCase);

  appRouter.post('/payments', paymentController.registerPayment.bind(paymentController)); // Bind context

  const server = new Server(appRouter);
  server.start();
}

main();