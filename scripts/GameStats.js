let gameDuration = 0;
let gameRounds = 0;
let winner = '';

function setWinner(value) {
    winner = value;
}

function setDuration(duration){
    gameDuration = duration;
}

function setRounds(rounds){
    gameRounds = rounds;
}

export { gameDuration, gameRounds, winner, setWinner, setDuration, setRounds };