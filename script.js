const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");

const player1Display = document.getElementById("player1-display");
const player2Display = document.getElementById("player2-display");

const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");

const startGameBtn = document.getElementById("start-game");
const restartGameBtn = document.getElementById("restart-game");

let gameState = {
  players: [],
  scores: [0, 0],
  currentPlayer: 0,
};

startGameBtn.addEventListener("click", () => {
  const name1 = player1Input.value || "Player 1";
  const name2 = player2Input.value || "Player 2";

  gameState.players = [name1, name2].sort(() => Math.random() - 0.5);
  gameState.scores = [0, 0];
  gameState.currentPlayer = 0;

  player1Display.textContent = `${gameState.players[0]} (X)`;
  player2Display.textContent = `${gameState.players[1]} (O)`;

  updateScores();

  console.log("Game started");
});

restartGameBtn.addEventListener("click", () => {
  gameState.scores = [0, 0];
  gameState.currentPlayer = 0;

  player1Display.textContent = "Player 1";
  player2Display.textContent = "Player 2";

  player1Input.value = "";
  player2Input.value = "";

  updateScores();

  console.log("Game fully reset");
});

function updateScores() {
  player1Score.textContent = gameState.scores[0];
  player2Score.textContent = gameState.scores[1];
}

function addWin(playerIndex) {
  gameState.scores[playerIndex]++;
  updateScores();
}

console.log("script loaded correctly");
