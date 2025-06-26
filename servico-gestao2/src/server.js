// File: servico-gestao/src/server.js
const express = require('express');
const cors = require('cors');

class Server {
  constructor(appRouter) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.appRouter = appRouter;
    this._setupMiddleware();
    this._setupRoutes();
  }

  _setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  _setupRoutes() {
    this.app.use('/', this.appRouter.getRouter());
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`ServicoGestao running on port ${this.port}`);
    });
  }
}

module.exports = Server;