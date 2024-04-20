import { DesiredResult } from "../model/desiredresult";
import { MatchSchedule, Match, TournamentPredictionsOutcome, SimulatedMatchOutcome, UserPredictions } from "../utils";

const NUM_TEAMS = 12;
class GameEngine {

    // Define a function to simulate a single match
    static simulateMatch(match: Match, desiredResults: DesiredResult, teamScores: any): SimulatedMatchOutcome {
        const { team1, team2 } = match;
        const { wins, draws, losses } = desiredResults;

        if (wins > 0) {
            desiredResults.wins--;
            const winnerGoals = Math.floor(Math.random() * 7) + 1; // Random goals between 1 and 7
            const loserGoals = Math.floor(Math.random() * winnerGoals);
            teamScores[team1.id - 1] += winnerGoals;
            teamScores[team2.id - 1] += loserGoals;
            return { winner: team1, winnerGoals, loser: team2, loserGoals, isDraw: false, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        }

        if (draws > 0) {
            desiredResults.draws--;
            const drawGoals = Math.floor(Math.random() * 7); // Random goals between 0 and 6
            teamScores[team1.id - 1] += drawGoals;
            teamScores[team2.id - 1] += drawGoals;
            return { winner: null, winnerGoals: 0, loser: null, loserGoals: 0, isDraw: true, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        }

        if (losses > 0) {
            desiredResults.losses--;
            const winnerGoals = Math.floor(Math.random() * 7) + 1;
            const loserGoals = Math.floor(Math.random() * winnerGoals);
            teamScores[team2.id - 1] += winnerGoals;
            teamScores[team1.id - 1] += loserGoals;
            return { winner: team2, winnerGoals, loser: team1, loserGoals, isDraw: false, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        }

        // If no specific condition is met, simulate the match randomly
        const score1 = Math.floor(Math.random() * 7); // Random goals between 0 and 6
        const score2 = Math.floor(Math.random() * 7);

        teamScores[team1.id - 1] += score1;
        teamScores[team2.id - 1] += score2;

        if (score1 > score2) {
            return { winner: team1, winnerGoals: score1, loser: team2, loserGoals: score2, isDraw: false, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        } else if (score1 < score2) {
            return { winner: team2, winnerGoals: score2, loser: team1, loserGoals: score1, isDraw: false, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        } else {
            return { winner: null, winnerGoals: 0, loser: null, loserGoals: 0, isDraw: true, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
        }

    }

    // Function to shuffle an array using Fisher-Yates algorithm
    static shuffleArray(array: MatchSchedule[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Simulate the tournament for a single run with controlled results and a predefined match schedule
    static simulateTournament(matchSchedule: MatchSchedule[], desiredResults: DesiredResult): TournamentPredictionsOutcome[] {
        this.shuffleArray(matchSchedule);

        const results: TournamentPredictionsOutcome[] = [];
        const teamScores = Array(NUM_TEAMS).fill(0);

        for (const match of matchSchedule) {
            const { team1, team2 } = match;

            const matchResult = this.simulateMatch({ team1, team2 }, desiredResults, teamScores);

            results.push({matchId: match.matchId,...matchResult});

            // Update the remainingResults for the next match
            desiredResults = matchResult.remainingResults;
        }

        return results;
    }

    // Compare user predictions against actual results
    static comparePredictions(predictions: UserPredictions[], results: TournamentPredictionsOutcome[]) {
        return predictions.map(prediction => {
            const result = results.find(matchResult => matchResult.matchId === prediction.matchId);

            const { isDraw, teamIdToWon, teamIdToLose } = prediction;

            const comparison = {
                matchId: prediction.matchId,
                wasDraw: result!.isDraw,
                correctPrediction: false,
                teamIdWon: result!.winner!.id || '0', // 0 when no team won
            };

            // Check if the user prediction matches the actual result
            if (isDraw && result!.isDraw) {
                // check if the draw was selected by the user
                comparison.correctPrediction = true;
            } else if (teamIdToWon !== 0 && teamIdToWon === result!.winner!.id) {
                // if teamId to win is not zero (Zero being it wasn't selected) and its' id matches the result, correct prediction
                comparison.correctPrediction = true;
            } else if (teamIdToLose !== 0 && teamIdToLose === result!.loser!.id) {
                // if teamId to lose is not zero (Zero being it wasn't selected) and its' id matches the result, correct prediction
                comparison.correctPrediction = true;
            } else {
                comparison.correctPrediction = false;
            }

            return comparison;
        });
    }

}


export default GameEngine;