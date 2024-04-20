import { Socket } from 'socket.io';

export class WebSocketController {
  constructor(private client: Socket) {}

  // Method to send messages to clients
  protected sendMessage(event: string, data: any) {
    this.client.emit(event, data);
  }
}
