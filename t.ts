// class Horse {
//   constructor(horseId, name, speed, stamina) {
//     this.horseId = horseId;
//     this.name = name;
//     this.speed = speed;
//     this.stamina = stamina;
//     this.distanceCovered = 0;
//   }

//   run() {
//     const distanceCoveredThisTurn = Math.random() * this.speed;
//     this.distanceCovered += distanceCoveredThisTurn;
//     this.stamina -= distanceCoveredThisTurn * 0.1;

//     if (Math.random() < 0.1) {
//       this.handleRandomEvent();
//     }
//   }

//   handleRandomEvent() {
//     const eventTypes = ['speedBoost', 'staminaBoost', 'obstacle'];
//     const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

//     switch (randomEventType) {
//       case 'speedBoost':
//         this.speed += 5;
//         console.log(`${this.name} got a speed boost!`);
//         break;
//       case 'staminaBoost':
//         this.stamina += 10;
//         console.log(`${this.name} got a stamina boost!`);
//         break;
//       case 'obstacle':
//         this.speed -= 5;
//         console.log(`${this.name} encountered an obstacle and slowed down!`);
//         break;
//     }
//   }

//   clone() {
//     return new Horse(this.horseId, this.name, this.speed, this.stamina);
//   }
// }

// class Race {
//   constructor(raceId, horses) {
//     this.raceId = raceId;
//     this.horses = horses;
//     this.bets = new Map();
//   }

//   placeBet(horseId, desiredPosition, amount) {
//     if (this.bets.has(horseId)) {
//       console.log('You can only place one bet per horse.');
//       return;
//     }

//     this.bets.set(horseId, { desiredPosition, amount });
//   }

//   simulateRace() {
//     const raceDistance = 1000;
//     const raceResults = this.horses.map((horse) => this.simulateRaceForHorse(horse, raceDistance));

//     raceResults.sort((a, b) => b.horse.distanceCovered - a.horse.distanceCovered);

//     raceResults.forEach((result, index) => {
//       result.position = index + 1;
//     });

//     this.displayRaceResults(raceResults);
//     this.checkBets(raceResults);
//   }

//   simulateRaceForHorse(horse, raceDistance) {
//     const clonedHorse = horse.clone();
//     const raceResult = { horse: clonedHorse, position: 0 };

//     while (clonedHorse.distanceCovered < raceDistance && clonedHorse.stamina > 0) {
//       clonedHorse.run();
//     }

//     return raceResult;
//   }

//   displayRaceResults(raceResults) {
//     console.log(`Race ID: ${this.raceId}`);
//     console.log('Race Results:');
//     raceResults.forEach((result) => {
//       console.log(`${result.horse.name} - Position: ${result.position}`);
//     });
//   }

//   checkBets(raceResults) {
//     console.log('\nBetting Results:');
//     this.bets.forEach((betInfo, horseId) => {
//       const betHorse = raceResults.find((result) => result.horse.horseId === horseId);
//       const betPosition = betHorse ? betHorse.position : -1;

//       if (betPosition === betInfo.desiredPosition) {
//         console.log(`Congratulations! You won $${betInfo.amount * 2} on ${betHorse.horse.name} (Position: ${betPosition})`);
//       } else {
//         console.log(`Sorry, you lost $${betInfo.amount} on ${betHorse.horse.name} (Position: ${betPosition})`);
//       }
//     });
//   }
// }

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
// const socket = io.connect("http://localhost:3001");

const existingArray = [
    {
      matchId: 20,
      winner: {
        _id: ('6626b74527dc8ebbbd276871'),
        name: 'Leads',
        flagUrl: 'leads',
        __v: 0
      },
      winnerGoals: 7,
      loser: {
        _id: ('6626b77727dc8ebbbd276877'),
        name: 'Wolves',
        flagUrl: 'wolves',
        __v: 0
      },
      loserGoals: 1,
      isDraw: false,
      firstTeam: {
        _id: ('6626b74527dc8ebbbd276871'),
        name: 'Leads',
        flagUrl: 'leads',
        __v: 0
      },
      secondTeam: {
        _id: ('6626b77727dc8ebbbd276877'),
        name: 'Wolves',
        flagUrl: 'wolves',
        __v: 0
      },
      remainingResults: {
        _id: ('6622023a494741b25421da7d'),
        wins: 0,
        draws: 0,
        losses: 0,
        active: true,
        __v: 0
      },
      odds: { team1: 1.37, team2: 1.05, draw: 1.01 }
    }
  ];
  
  const newArray = existingArray.map(item => ({
    matchId: item.matchId,
    team1: { ...item.firstTeam, score: item.winnerGoals }, // Include score for team1
    team2: { ...item.secondTeam, score: item.loserGoals } // Include score for team2
  }));
  
  console.log(newArray);