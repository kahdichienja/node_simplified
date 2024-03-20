// server.ts
import express from 'express';
import { RegisterControllers } from './middleware';

const app = express();
const port = 3000;

// Register controllers decorated with @Controller() at application startup
@RegisterControllers()
class App {
  static app = app;
}

App.app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
