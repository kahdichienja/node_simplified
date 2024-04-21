class Horse {
    constructor(horseId, name, speed, stamina) {
      this.horseId = horseId;
      this.name = name;
      this.speed = speed;
      this.stamina = stamina;
      this.distanceCovered = 0;
    }
  
    run() {
      const distanceCoveredThisTurn = Math.random() * this.speed;
      this.distanceCovered += distanceCoveredThisTurn;
      this.stamina -= distanceCoveredThisTurn * 0.1;
  
      if (Math.random() < 0.1) {
        this.handleRandomEvent();
      }
    }
  
    handleRandomEvent() {
      const eventTypes = ['speedBoost', 'staminaBoost', 'obstacle'];
      const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  
      switch (randomEventType) {
        case 'speedBoost':
          this.speed += 5;
          console.log(`${this.name} got a speed boost!`);
          break;
        case 'staminaBoost':
          this.stamina += 10;
          console.log(`${this.name} got a stamina boost!`);
          break;
        case 'obstacle':
          this.speed -= 5;
          console.log(`${this.name} encountered an obstacle and slowed down!`);
          break;
      }
    }
  
    clone() {
      return new Horse(this.horseId, this.name, this.speed, this.stamina);
    }
  }
  
  class Race {
    constructor(raceId, horses) {
      this.raceId = raceId;
      this.horses = horses;
      this.bets = new Map();
    }
  
    placeBet(horseId, desiredPosition, amount) {
      if (this.bets.has(horseId)) {
        console.log('You can only place one bet per horse.');
        return;
      }
  
      this.bets.set(horseId, { desiredPosition, amount });
    }
  
    simulateRace() {
      const raceDistance = 1000;
      const raceResults = this.horses.map((horse) => this.simulateRaceForHorse(horse, raceDistance));
  
      raceResults.sort((a, b) => b.horse.distanceCovered - a.horse.distanceCovered);
  
      raceResults.forEach((result, index) => {
        result.position = index + 1;
      });
  
      this.displayRaceResults(raceResults);
      this.checkBets(raceResults);
    }
  
    simulateRaceForHorse(horse, raceDistance) {
      const clonedHorse = horse.clone();
      const raceResult = { horse: clonedHorse, position: 0 };
  
      while (clonedHorse.distanceCovered < raceDistance && clonedHorse.stamina > 0) {
        clonedHorse.run();
      }
  
      return raceResult;
    }
  
    displayRaceResults(raceResults) {
      console.log(`Race ID: ${this.raceId}`);
      console.log('Race Results:');
      raceResults.forEach((result) => {
        console.log(`${result.horse.name} - Position: ${result.position}`);
      });
    }
  
    checkBets(raceResults) {
      console.log('\nBetting Results:');
      this.bets.forEach((betInfo, horseId) => {
        const betHorse = raceResults.find((result) => result.horse.horseId === horseId);
        const betPosition = betHorse ? betHorse.position : -1;
  
        if (betPosition === betInfo.desiredPosition) {
          console.log(`Congratulations! You won $${betInfo.amount * 2} on ${betHorse.horse.name} (Position: ${betPosition})`);
        } else {
          console.log(`Sorry, you lost $${betInfo.amount} on ${betHorse.horse.name} (Position: ${betPosition})`);
        }
      });
    }
  }
  
  // Example usage:
//   let raceIdCounter = 1;
  
//   const horse1 = new Horse(1, 'SwiftRunner', 20, 100);
//   const horse2 = new Horse(2, 'SpeedyGalloper', 18, 120);
//   const horse3 = new Horse(3, 'StaminaMaster', 15, 150);
  
//   const race = new Race(raceIdCounter++, [horse1, horse2, horse3]);
  
//   // Place bets (horseId, desiredPosition, amount)
//   race.placeBet(1, 3, 50); // Bet $50 on SwiftRunner to finish in 3rd position
//   race.placeBet(2, 1, 30); // Bet $30 on SpeedyGalloper to finish in 1st position
//   race.placeBet(3, 2, 20); // Bet $20 on StaminaMaster to finish in 2nd position
  
//   race.simulateRace();
const NUM_TEAMS = 12;
const NUM_MATCHES = 6;

// Define a function to simulate a single match
function simulateMatch(team1, team2, desiredResults, teamScores) {
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
    return { winner: '', winnerGoals: 0, loser: '', loserGoals: 0, isDraw: true, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
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
    return { winner: '', winnerGoals: 0, loser: '', loserGoals: 0, isDraw: true, firstTeam: team1, secondTeam: team2, remainingResults: desiredResults };
  }
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Simulate the tournament for a single run with controlled results
function simulateTournament(teams, desiredResults) {
  shuffleArray(teams);

  const results = [];
  const teamScores = Array(NUM_TEAMS).fill(0);

  for (let i = 0; i < NUM_MATCHES; i++) {
    const team1 = teams[i];
    const team2 = teams[NUM_TEAMS - i - 1];

    const matchResult = simulateMatch(team1, team2, desiredResults, teamScores);
    results.push({ matchId: i + 1, ...matchResult });

    // Update the remainingResults for the next match
    desiredResults = matchResult.remainingResults;
  }

  return results;
}

// Compare user predictions against actual results
function comparePredictions(predictions, results) {
  return predictions.map(prediction => {
    const result = results.find(matchResult => matchResult.matchId === prediction.matchId);
    const { isDraw, teamIdToWon, teamIdToLose } = prediction;
    
    const comparison = {
      matchId: prediction.matchId,
      wasDraw: result.isDraw,
      teamIdWon: result.winner.id || 0, // 0 when no team won
    };

    // Check if the user prediction matches the actual result
    if (isDraw && result.isDraw) {
      comparison.correctPrediction = true;
    } else if (teamIdToWon === result.winner.id && teamIdToLose === result.loser.id) {
      comparison.correctPrediction = true;
    } else {
      comparison.correctPrediction = false;
    }

    return comparison;
  });
}

// Calculate betting results
function calculateBettingResults(userBets, results) {
  return userBets.map(bet => {
    const matchResult = results.find(match => match.matchId === bet.matchId);
    let odd = 0;
    let winAmount = 0;
    let isWin = false;

    if (matchResult.isDraw && bet.isDraw) {
      odd = bet.odds.draw;
      isWin = true;
      winAmount = bet.amount * odd;
    } else if (matchResult.winner.id === bet.teamIdToWon && matchResult.loser.id === bet.teamIdToLose) {
      odd = bet.odds.win;
      isWin = true;
      winAmount = bet.amount * odd;
    }

    return {
      matchId: bet.matchId,
      betAmount: bet.amount,
      odd,
      winAmount,
      isWin,
    };
  });
}

// Define user bets with odds for each team
const userBets = [
  { matchId: 1, amount: 100, isDraw: false, teamIdToWon: 2, teamIdToLose: 0, odds: { win: 2.5, draw: 3.0 } },
  { matchId: 2, amount: 50, isDraw: true, teamIdToWon: 0, teamIdToLose: 0, odds: { win: 2.0, draw: 3.0 } },
  { matchId: 3, amount: 80, isDraw: false, teamIdToWon: 0, teamIdToLose: 3, odds: { win: 3.0, draw: 2.5 } },
];

// Set your desired number of wins, draws, and losses
let desiredResults = {
  wins: 2,
  draws: 1,
  losses: 3,
};

// Run a single simulation
const teams = [
  { name: "QPD", id: 1 },
  { name: "Team 2", id: 2 },
  { name: "Team 3", id: 3 },
  { name: "Team 4", id: 4 },
  { name: "Team 5", id: 5 },
  { name: "Team 6", id: 6 },
  { name: "Team 7", id: 7 },
  { name: "Team 8", id: 8 },
  { name: "Team 9", id: 9 },
  { name: "Team 10", id: 10 },
  { name: "Team 11", id: 11 },
  { name: "Team 12", id: 12 },
];

const results = simulateTournament(teams, desiredResults);

// Display results
console.log("Results:");
console.log(results);

// Compare predictions against actual results
const predictionResults = comparePredictions(userBets, results);
console.log("Prediction Results:");
console.log(predictionResults);

// Calculate betting results
const bettingResults = calculateBettingResults(userBets, results);
console.log("Betting Results:");
console.log(bettingResults);
