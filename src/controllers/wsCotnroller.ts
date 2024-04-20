import { SubscribeMessage, WebSocketGateway } from "../ws/decorators";
import { WebSocketController } from "../ws/webSocketController";


@WebSocketGateway() // Decorate the class with WebSocketGateway
export class DeliveryServiceController extends WebSocketController {
  constructor(client: any) {
    super(client);
  }

  // Method with decorator to subscribe to WebSocket event
  @SubscribeMessage("eventname") // Decorate the method with SubscribeMessage
  handleEvent(client: any, payload: any) {

    this.sendMessage("msg", {message: "hellow world"})
    // Logic to handle the event
  }
}
