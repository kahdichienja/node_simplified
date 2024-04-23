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
  odds!: {
    team1: number;
    team2: number;
    draw: number;
    ygg: number;
    ngg: number;
    over15: number;
    under15: number;
    over35: number;
    under35: number;
  };
}
export class Match {
  team1!: Team;
  team2!: Team;
}
export class UserPredictions {
  isDraw!: boolean;
  teamIdToLose!: number;
  teamIdToWon!: number;
  matchId!: number;
  betAmount!: number;
  selectedOdd!: number;

}
export class TournamentPredictionsOutcome {
  winner!: Team | null;
  winnerGoals!: number;
  matchId!: number;
  loser!: Team | null;
  loserGoals!: number;
  isDraw!: boolean;
  firstTeam!: Team;
  secondTeam!: Team;
  remainingResults!: DesiredResult;
  odds!: {
    team1: number;
    team2: number;
    draw: number;
  };

}
export class SimulatedMatchOutcome {
  winner!: Team | null;
  winnerGoals!: number;
  loser!: Team | null;
  loserGoals!: number;
  isDraw!: boolean;
  firstTeam!: Team;
  secondTeam!: Team;
  remainingResults!: DesiredResult;
}
