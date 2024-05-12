let gameDuration = 0;
let gameRounds = 0;
let winner = '';
let hasEnded = false;

function setWinner(value) {
    winner = value;
}

function setDuration(duration){
    gameDuration = duration;
}

function setRounds(rounds){
    gameRounds = rounds;
}

function setHasEnded(bool){
    hasEnded = bool;
}

export { gameDuration, gameRounds, winner, hasEnded, setWinner, setDuration, setRounds, setHasEnded };