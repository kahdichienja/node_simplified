// server.ts
import express from 'express';
import { RegisterControllers } from './middleware';
import UserController from './controllers/userController';
import TodoController from './controllers/todoController';

const port = 3000;

// Register controllers decorated with @Controller() at application startup
@RegisterControllers([UserController, TodoController])
class App {
  static app = express();
}
App.app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
