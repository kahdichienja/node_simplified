// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { RegisterControllers } from './middleware';
import { GameController } from './controllers/gameController';
import initializeDb from './db';
import { RegisterWebsockets } from './ws/decorators';
import { DeliveryServiceController } from './controllers/wsCotnroller';



const port = 3001;

const bootstrap = express();

const httpServer = createServer(bootstrap);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


initializeDb(db => {

  bootstrap.use(express.json({
    limit: '100kb'
  }));
  bootstrap.use(express.urlencoded({ extended: true }));
  // UserController, TodoController,
  @RegisterControllers([ GameController], bootstrap)
  class App  {}

  // Register WebSocket controllers with decorator
  @RegisterWebsockets(io, [DeliveryServiceController])
  class WebSocketServer {}

});


httpServer.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});

