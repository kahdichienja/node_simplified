// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { RegisterControllers } from './middleware';
// import { UserController } from './controllers/userController';
// import TodoController from './controllers/todoController';
import { GameController } from './controllers/gameController';
import initializeDb from './db';
// import { GameService } from './service/gameService';
// import { MatchSchedule } from './utils';
// import MongooseErrorParser from './utils/mongoosesaverr';
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
  @RegisterWebsockets([DeliveryServiceController])
  class WebSocketServer {
    // Logic to handle WebSocket server initialization and routing
  }

});

// WebSocket handling
// io.on('connection', async (socket) => {
//   console.log(`WebSocket client connected: ${socket.id}`);
//   // Handle WebSocket events here

//   // receive_message
//   socket.emit("receive_message", { message: `Hello, world! : ${socket.id}` });

//   const gameService = new GameService();

  
  
  
  
//   // async function emitMatchday() {
//   //   const matches = await gameService.getMatch()
//   //   const matchSchedules: MatchSchedule[] = []; 
         
  
//   //   matchSchedules.push(...[
//   //     { matchId: 13, team1: matches.data[0], team2: matches.data[1] },
//   //     { matchId: 14, team1: matches.data[2], team2: matches.data[3] },
//   //     { matchId: 15, team1: matches.data[4], team2: matches.data[5] },
//   //     { matchId: 16, team1: matches.data[6], team2: matches.data[7] },
//   //     { matchId: 17, team1: matches.data[8], team2: matches.data[9] },
//   //     { matchId: 18, team1: matches.data[10], team2: matches.data[11] },
//   //   ])
//   //   socket.emit("matchday", matchSchedules);
//   // }

//   // emitMatchday()

//   // setInterval(emitMatchday, 10000);

//   socket.on('disconnect', () => {
//     console.log(`WebSocket client disconnected: ${socket.id}`);
//   });
// });

httpServer.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});

