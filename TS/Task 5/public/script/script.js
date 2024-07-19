"use strict";
function zaidimas(player1, player2) {
    if (player1 === player2) {
        return 'Draw';
    }
    if ((player1 === "scissors" && player2 === "paper") ||
        (player1 === "rock" && player2 === "scissors") ||
        (player1 === "paper" && player2 === "rock")) {
        return "Player 1 won!";
    }
    else {
        return "Player 2 won!";
    }
}
console.log(zaidimas("scissors", "paper"));
console.log(zaidimas("scissors", "rock"));
console.log(zaidimas("paper", "paper"));
