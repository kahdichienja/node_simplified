
import { Server, Socket } from "socket.io";
import { SubscribeMessage, WebSocketGateway } from "../ws/decorators";
import { WebSocketController } from "../ws/webSocketController";
import { GameService } from "../service/gameService";
import { MatchSchedule } from "../utils";


@WebSocketGateway()
export class DeliveryServiceController extends WebSocketController {

  constructor(client: Socket, websocketInstance: Server) {
    super(client, websocketInstance);
  }

  @SubscribeMessage("eventname")
  handleEvent(client: any, payload: any) {
    this.sendMessage("msg", { handleEvent: "test event", ...{ payload } });
  }
  @SubscribeMessage("greeting")
  greeting(client: any, payload: any) {
    this.sendMessage("msg", { greeting: "Hello!" });
  }

  async emitMatchday() {
    const gameService = new GameService();
    const matches = await gameService.getMatch()
    const matchSchedules: MatchSchedule[] = [];

    matchSchedules.push(...[
      { matchId: 13, team1: matches.data[0], team2: matches.data[1] },
      { matchId: 14, team1: matches.data[2], team2: matches.data[3] },
      { matchId: 15, team1: matches.data[4], team2: matches.data[5] },
      { matchId: 16, team1: matches.data[6], team2: matches.data[7] },
      { matchId: 17, team1: matches.data[8], team2: matches.data[9] },
      { matchId: 18, team1: matches.data[10], team2: matches.data[11] },
    ])

    return matchSchedules;

  }

  @SubscribeMessage("getmatch")
  async matchday(client: any, payload: any) {

    console.log(`getmatch for :${client.id}`);

    setInterval(async () => {
      const m = await this.emitMatchday();
      this.sendMessage("matchday", m)
    }, 5000);
  }
}