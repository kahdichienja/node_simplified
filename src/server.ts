// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { RegisterControllers } from './middleware';
import { UserController } from './controllers/userController';
import TodoController from './controllers/todoController';


const port = 3001;

const bootstrap = express();

const httpServer = createServer(bootstrap);
const io = new SocketServer(httpServer);

bootstrap.use(express.json({
  limit: '100kb'
}));
bootstrap.use(express.urlencoded({ extended: true }));

// Register controllers decorated with @Controller() at application startup


@RegisterControllers([UserController, TodoController], bootstrap)
class App  {}


httpServer.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});

