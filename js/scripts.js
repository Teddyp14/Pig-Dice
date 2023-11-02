//Business Logic
function PlayerCreate(playerName, turnScore, overallScore, playerRoll) {
    this.playerName = playerName;
    this.turnScore = turnScore;
    this.overallScore = overallScore;
    this.playerRoll = playerRoll;
}

function diceRoll() {
    const randomInt = Math.floor(Math.random() * 6) + 1;
    return randomInt;
}

function getTurnScore(roll) {
    let turnScore = 0;
    if (roll >= 2) {
        turnScore += roll;
    }
    return turnScore
}

PlayerCreate.prototype.addTurnScore = function () {
    const roll = diceRoll();
    this.playerRoll = roll;
    const turnScoreValue = getTurnScore(roll);
    if (turnScoreValue === 0) {
        this.turnScore = 0;
    } else { this.turnScore += turnScoreValue };
}

PlayerCreate.prototype.addOverallScore = function () {
    this.overallScore += this.turnScore;
    this.turnScore = 0;
}

//UI Logic
let player1 = new PlayerCreate("", 0, 0, "");
let player2 = new PlayerCreate("", 0, 0, "");

function winner1() {
    const removePlayer1 = document.querySelector("div#player1");
    const removePlayer2 = document.querySelector("div#player2");
    removePlayer1.remove();
    removePlayer2.remove();
    document.querySelector("h1#player1Wins").removeAttribute("class", "hidden");
    document.querySelector("div#scores").setAttribute("class", "hidden");
}

function winner2() {
    const removePlayer1 = document.querySelector("div#player1");
    const removePlayer2 = document.querySelector("div#player2");
    removePlayer1.remove();
    removePlayer2.remove();
    document.querySelector("h1#player2Wins").removeAttribute("class", "hidden");
    document.querySelector("div#scores").setAttribute("class", "hidden");
}

function handleNameForm() {
    event.preventDefault();
    const p1Name = document.querySelector("input#p1Name").value;
    const p2Name = document.querySelector("input#p2Name").value;
    const p1Header = document.querySelector("h2#firstPlayer");
    const p2Header = document.querySelector("h2#secondPlayer");
    const p1Score = document.querySelector("span#firstPlayerScore");
    const p2Score = document.querySelector("span#secondPlayerScore");
    const p1Wins = document.querySelector("h1#player1Wins");
    const p2Wins = document.querySelector("h1#player2Wins");
    player1.playerName = p1Name;
    player2.playerName = p2Name;
    p1Header.innerText = player1.playerName;
    p2Header.innerText = player2.playerName;
    p1Score.innerText = player1.playerName + ": ";
    p2Score.innerText = player2.playerName + ": ";
    p1Wins.innerText = player1.playerName + " wins!";
    p2Wins.innerText = player2.playerName + " wins!";
    document.querySelector("div#player1").removeAttribute("class", "hidden");
    document.querySelector("div#scores").removeAttribute("class", "hidden");
    document.querySelector("form#playerNameForm").setAttribute("class", "hidden");
}

function endTurn1() {
    player1.addOverallScore();
    const player1Score = document.querySelector("span#p1Score");
    const h2 = document.createElement("h2");
    h2.append(player1.overallScore);
    player1Score.innerText = h2.textContent;
    if (player1.overallScore >= 100) {
        winner1();
    }
    document.querySelector("#p2TurnScore").innerText = "0"
    document.querySelector("div#player2").removeAttribute("class", "hidden");
    document.querySelector("div#player1").setAttribute("class", "hidden");
}

function endTurn2() {
    player2.addOverallScore();
    const player2Score = document.querySelector("span#p2Score");
    const h2 = document.createElement("h2");
    h2.append(player2.overallScore);
    player2Score.innerText = h2.textContent;
    if (player2.overallScore >= 100) {
        winner2();
    }
    document.querySelector("#p1TurnScore").innerText = "0"
    document.querySelector("div#player1").removeAttribute("class", "hidden");
    document.querySelector("div#player2").setAttribute("class", "hidden");
}

function rollDice1() {
    player1.addTurnScore()
    const player1Turn = document.querySelector("#p1TurnScore");
    const player1Roll = document.querySelector("#p1NumberRolled");
    player1Turn.innerText = player1.turnScore;
    player1Roll.innerText = player1.playerRoll;

    if (player1.turnScore === 0) {
        document.querySelector("#p2NumberRolled").innerText = "";
        document.querySelector("#p2TurnScore").innerText = "0";
        document.querySelector("div#player2").removeAttribute("class", "hidden");
        document.querySelector("div#player1").setAttribute("class", "hidden");
    }
    if ((player1.overallScore + player1.turnScore) >= 100) {
        winner1();
    }
    return player1.turnScore;
}

function rollDice2() {
    player2.addTurnScore();
    const player2Turn = document.querySelector("#p2TurnScore");
    const player2Roll = document.querySelector("#p2NumberRolled");
    player2Turn.innerText = player2.turnScore;
    player2Roll.innerText = player2.playerRoll;
    if (player2.turnScore === 0) {
        document.querySelector("#p1NumberRolled").innerText = "";
        document.querySelector("#p1TurnScore").innerText = "0";
        document.querySelector("div#player1").removeAttribute("class", "hidden");
        document.querySelector("div#player2").setAttribute("class", "hidden");
    }

    if ((player2.overallScore + player2.turnScore) >= 100) {
        winner2();
    }
    return player2.turnScore;
}

window.addEventListener("load", function () {
    document.querySelector("form#playerNameForm").addEventListener("submit", handleNameForm);

    document.querySelector("button#p1Roll").addEventListener("click", rollDice1);
    document.querySelector("button#p2Roll").addEventListener("click", rollDice2);
    document.querySelector("button#p1End").addEventListener("click", endTurn1);
    document.querySelector("button#p2End").addEventListener("click", endTurn2);

    document.querySelector("h1#player1Wins").setAttribute("class", "hidden");
    document.querySelector("h1#player2Wins").setAttribute("class", "hidden");

    document.querySelector("div#player1").setAttribute("class", "hidden");
    document.querySelector("div#player2").setAttribute("class", "hidden");
    document.querySelector("div#scores").setAttribute("class", "hidden");
});