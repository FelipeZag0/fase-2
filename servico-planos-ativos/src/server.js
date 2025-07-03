// File: microservices/servico-planos-ativos/src/server.js
const express = require('express');
const cors = require('cors');

class Server {
  constructor(appRouter) {
    this.app = express();
    this.port = process.env.PORT || 3002; // Changed port to 3002
    this.appRouter = appRouter;
    this._setupMiddleware();
    this._setupRoutes();
  }

  _setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  _setupRoutes() {
    this.app.use('/', this.appRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`ServicoPlanosAtivos running on port ${this.port}`);
    });
  }
}

module.exports = Server;