
import { Server, Socket } from "socket.io";
import { SubscribeMessage, WebSocketGateway } from "../ws/decorators";
import { WebSocketController } from "../ws/webSocketController";
import { GameService } from "../service/gameService";
import { MatchSchedule } from "../utils";
import MongooseErrorParser from "../utils/mongoosesaverr";


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

  odds(n: number) { return parseFloat(((Math.random() * n) + 1).toFixed(2)) };

  async emitMatchday() {
    const gameService = new GameService();
    const matches = await gameService.getMatch()
    const matchSchedules: MatchSchedule[] = [];

    matchSchedules.push(...[
      {
        matchId: 13,
        team1: matches.data[0],
        team2: matches.data[1],
        odds: {
          team1: this.odds(1.9),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 14, team1: matches.data[2], team2: matches.data[3],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 15, team1: matches.data[4], team2: matches.data[5],
        odds: {
          team1: this.odds(1.9),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 16, team1: matches.data[6], team2: matches.data[7],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 17, team1: matches.data[8], team2: matches.data[9],
        odds: {
          team1: this.odds(1.9),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 19, team1: matches.data[10], team2: matches.data[11],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 20, team1: matches.data[12], team2: matches.data[13],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 21, team1: matches.data[14], team2: matches.data[15],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 22, team1: matches.data[16], team2: matches.data[17],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
      {
        matchId: 23, team1: matches.data[18], team2: matches.data[19],
        odds: {
          team1: this.odds(1),
          team2: this.odds(2),
          draw: this.odds(0.1),
          ygg: this.odds(0.1),
          ngg: this.odds(0.1),
          over15: this.odds(1),
          under15: this.odds(1),
          over35: this.odds(2),
          under35: this.odds(2),
        }
      },
    ])

    return matchSchedules;

  }

  generateTimestamps(): string[] {
    const timestamps: string[] = [];
    const currentTime = new Date();

    currentTime.setMinutes(currentTime.getMinutes() + 3); // Increment current time by 3 minutes

    timestamps.push(currentTime.toISOString());

    // const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour from current time

    // while (currentTime < endTime) {
    //   timestamps.push(currentTime.toISOString());
    //   currentTime.setMinutes(currentTime.getMinutes() + 3); // Increment current time by 3 minutes
    // }

    return timestamps;
  }

  shuffleGames(results: any) {
    // Shuffle the array
    const shuffledArray = MongooseErrorParser.shuffleArray([...results]);

    // Take only the first 12 records
    const selectedRecords = shuffledArray.slice(0, 20);

    return selectedRecords;
  }

  @SubscribeMessage("getmatch")
  async matchday(client: any, payload: any) {
    const gameService = new GameService();

    console.log(`getmatch for :${client.id}`);


    const m = await this.emitMatchday();
    const t = this.generateTimestamps();

    const result = await gameService.bet(m, [])

    const newArray = result.data?.results.map(item => ({
      matchId: item.matchId,
      team1: {
        _id: item.winner === item.firstTeam ? item.winner.id : item.loser?.id,
        name: item.firstTeam.name,
        flagUrl: item.firstTeam.flagUrl,
        score: item.isDraw ? 0 : item.winner === item.firstTeam ? item.winnerGoals : item.loserGoals
      },
      team2: {
        _id: item.winner === item.secondTeam ? item.winner.id : item.loser?.id,
        name: item.secondTeam.name,
        flagUrl: item.secondTeam.flagUrl,
        score: item.isDraw ? 0 : item.winner === item.secondTeam ? item.winnerGoals : item.loserGoals
      }
    }));

    // console.log(m);
    // console.log('====================================');
    // console.log(result.data?.results);
    // console.log('====================================');
    // console.log(newArray);
    // console.log('====================================');

    const data = {
      match: this.shuffleGames(m),//next match schedule
      time: t.shift() // time for next match
    }


    this.sendMessage("matchday", { match: data, live: newArray })

    // const targetTimestamp = new Date(data.time as string).getTime();


    // setInterval(() => {
    //   const currentTimestamp = Date.now();
    //   if (currentTimestamp >= targetTimestamp) {
    //     console.log(targetTimestamp);
    //     this.sendMessage("matchday", { match: data, live: newArray })
    //     console.log('====================================');
    //     // clearInterval(interval); // Stop the interval once the target timestamp is reached
    //   }
    // }, 1000); // Check every second

  }
}