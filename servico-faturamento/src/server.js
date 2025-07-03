// File: microservices/servico-faturamento/src/server.js
const express = require('express');
const cors = require('cors');

class Server {
  constructor(appRouter) {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.appRouter = appRouter;
    this._setupMiddleware();
    this._setupRoutes();
  }

  _setupMiddleware() {
    this.app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET', 'OPTIONS'],
      allowedHeaders: ['Content-Type']
    }));
    
    this.app.use(express.json());
  }

  _setupRoutes() {
    this.app.use(this.appRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`ServicoFaturamento running on port ${this.port}`);
    });
  }
}

module.exports = Server;