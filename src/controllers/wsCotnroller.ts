
import { Server, Socket } from "socket.io";
import { SubscribeMessage, WebSocketGateway } from "../ws/decorators";
import { WebSocketController } from "../ws/webSocketController";


@WebSocketGateway()
export class DeliveryServiceController extends WebSocketController {

    constructor(client: Socket, websocketInstance: Server) {
        super(client, websocketInstance);
    }

    @SubscribeMessage("eventname")
    handleEvent(client: any, payload: any) {
        this.sendMessage("msg", payload);
    }
}