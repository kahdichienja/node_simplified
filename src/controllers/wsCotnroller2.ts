
import { Socket } from "socket.io";
import { SubscribeMessage, WebSocketGateway } from "../ws/decorators";
import { WebSocketController } from "../ws/webSocketController";


@WebSocketGateway()
export class WSController extends WebSocketController {

  @SubscribeMessage("ev")
  handleEvent(client: Socket, payload: any) {
    console.log('====================================');
    console.log(client.handshake.headers);
    console.log('====================================');
    this.sendMessage("message",  client.handshake.auth);
  }
  @SubscribeMessage("greet")
  greeting(client: any, payload: any) {
    this.sendMessage("message", { greeting: "Hello!" });
  }
}