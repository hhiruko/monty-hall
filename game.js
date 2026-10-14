/**
 * @param {boolean} playerSwitches
 * @param {int} doorCount
 * @returns {boolean} Returns `true` if player wins.
 */
const simulateGame = (playerSwitches, doorCount = 3) => {
    if (doorCount < 3) {
        throw new Error("Door count cannot be less than 3.");
    }

    const chooseRandom = (except = []) => {
        if (except.length >= doorCount) {
            throw new Error("Except array length cannot be equal to or exceed the door count.");
        }
        const random = Math.floor(Math.random() * doorCount);
        return except.includes(random) ? chooseRandom(except) : random;
    }

    const switchPlayerDoor = (playerDoor, openDoor) => {
        return chooseRandom([playerDoor, openDoor]);
    }

    let prizeDoor = chooseRandom();
    let playerDoor = chooseRandom();
    let openDoor = chooseRandom([prizeDoor, playerDoor]);

    if (playerSwitches === true) {
        playerDoor = switchPlayerDoor(playerDoor, openDoor);
    }

    return prizeDoor === playerDoor;
}

/**
 * 
 * @param {boolean} playerSwitches 
 * @param {int} doorCount 
 * @param {int} rounds 
 * @returns {int} Returns rounds won.
 */
const roundsWon = (playerSwitches, doorCount, rounds) => {
    let won = 0;

    for (i = 0; i < rounds; i++) {
        won += simulateGame(playerSwitches, doorCount);
    }

    return won;
}


const doorCount = 3;
const rounds = 100000;

const wonNoSwitch = roundsWon(false, doorCount, rounds);
console.log(`Player did not switch, won: ${wonNoSwitch}/${rounds}`);

const wonSwitch = roundsWon(true, doorCount, rounds);
console.log(`Player switched, won: ${wonSwitch}/${rounds}`);
