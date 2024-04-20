import { DesiredResult } from "../model/desiredresult";
import { Team } from "../model/team"
export class CreateUserDto {
  first_name!: string;
  last_name!: string;
  email!: string;
  // Add other properties as needed
}

export class MatchSchedule {
  matchId!: number;
  team1!: Team;
  team2!: Team;
}
export class Match {
  team1!: Team;
  team2!: Team;
}
export class UserPredictions {
  isDraw!:boolean;
  teamIdToLose!:number;
  teamIdToWon!:number;
  matchId!:number;

}
export class TournamentPredictionsOutcome {
  winner!: Team|null;
  winnerGoals!: number;
  matchId!: number;
  loser!: Team|null;
  loserGoals!: number;
  isDraw!: boolean;
  firstTeam!: Team;
  secondTeam!: Team;
  remainingResults!: DesiredResult;

}
export class SimulatedMatchOutcome {
  winner!: Team|null;
  winnerGoals!: number;
  loser!: Team|null;
  loserGoals!: number;
  isDraw!: boolean;
  firstTeam!: Team;
  secondTeam!: Team;
  remainingResults!: DesiredResult;
}
