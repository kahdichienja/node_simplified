import { Get, Post, RequestBody } from "../core";
import { SetresultsDto, TeamDto } from "../dtos/gameDto";
import { GameService } from "../service/gameService";

export class GameController {

  constructor(private readonly gameService: GameService) {
    this.gameService = new GameService
  }

  @Post('/api/v1/match/setresults')
  async setResults(@RequestBody() result: SetresultsDto,) {
    return await this.gameService.setDiseiredResult(result);
  }
  @Post('/api/v1/match/addteam')
  async addteam(@RequestBody() dto: TeamDto,) {
    return await this.gameService.addteam(dto);
  }
  @Get('/api/v1/match/desiredresults')
  async getResults() {
    // const d = await this.gameService.activeDisiredResult()
    // console.log(d.data?.wins);

    return await this.gameService.getDisiredResults();
  }
  @Get('/api/v1/match/all')
  async getMatch() {

    return await this.gameService.getMatch();
  }

  
}