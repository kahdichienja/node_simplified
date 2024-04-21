import { Server, Socket } from 'socket.io';
export class WebSocketController {
    constructor(private client: Socket, private websocketInstance: Server) {}
    protected sendMessage(event: string, data: any) {
      this.client.emit(event, data);
    }
  }