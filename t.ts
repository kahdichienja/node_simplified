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

const linearSearch = (arr: any[], target: any) => {

  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === target) {
      return index;
    };
  }
  return -1
}

const binarySearch = (array: any[], target: any) => {

  // Sort the array before performing binary search
  array.sort((a, b) => a - b);

  let leftIndex = 0, rightIndex = array.length - 1;

  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2)

    if (target === array[middleIndex]) {
      return middleIndex;
    }

    if (target < array[middleIndex]) {
      rightIndex = middleIndex - 1

    } else {
      leftIndex = middleIndex + 1
    }

  }

  return -1;

}

const binarySearchWords = (array: any[], target: any) => {
  array.sort()

  let left = 0, right = array.length - 1;

  while (left <= right) {
    let middleIndex = Math.floor((right + left) / 2)
    let comparator = target.localeCompare(array[middleIndex])

    if (comparator === 0) {
      return middleIndex
    } else if (comparator < 0) {
      right = middleIndex - 1
    } else {
      left = middleIndex + 1
    }

  }

  return -1;
}

function search(array: any[], target: any, left: number, right: number) {

  if (left > right) {
    return -1;
  }
  let middleIndex = Math.floor((right + left) / 2)

  if (target === array[middleIndex]) {
    return middleIndex;
  }
  /**
   * the recursion part
   */

  if (target < array[middleIndex]) {
    return search(array, target, left, middleIndex - 1)
  } else {
    return search(array, target, middleIndex + 1, right)
  }

}

const recursiveBinarySearch = (array: any[], target: any) => {

  array.sort()

  return search(array, target, 0, array.length - 1)
}


const rbs = recursiveBinarySearch(["quit", "banana", "oragnegs", "home", "studies"], "studies")



const quickSort = (arr: any[]): any[] => {
  if(arr.length<2) return arr

  let pivot = arr[arr.length-1]

  let right: any[] = [];
  let left: any[] = [];

  for (let index = 0; index < arr.length-1; index++) {
    const element = arr[index];
      if (element<pivot) {
        left.push(element);
      } else {
        right.push(element)
      }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

const r = quickSort([2, -3, 10, 17, -1])

console.log(r);