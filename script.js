const cells = document.querySelectorAll(".cell");

const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");

const player1Display = document.getElementById("player1-display");
const player2Display = document.getElementById("player2-display");

const startBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restart-game");
const playAgainBtn = document.getElementById("play-again");

const gameMessage = document.getElementById("game-message");
const messageText = document.getElementById("message-text");
const dismissBtn = document.getElementById("dismiss-message");

let gameActive = false;
let currentPlayer = "x";

const players = { x: "", o: "" };

let scoreX = 0;
let scoreO = 0;

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetBoard() {
  cells.forEach((c) => {
    c.textContent = "";
    c.classList.remove("x", "o");
  });
}

function showMessage(text) {
  messageText.textContent = text;
  gameMessage.classList.remove("hidden");
}

function checkWinner() {
  for (let [a, b, c] of wins) {
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      const symbol = cells[a].textContent;
      showMessage(players[symbol] + " wins! 🎉");

      if (symbol === "x") {
        scoreX++;
        score1El.textContent = scoreX;
      } else {
        scoreO++;
        score2El.textContent = scoreO;
      }

      gameActive = false;
      return true;
    }
  }

  if ([...cells].every((c) => c.textContent !== "")) {
    showMessage("both losers 💀");
    gameActive = false;
    return true;
  }

  return false;
}

/* START GAME */
startBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) {
    alert("Enter both names!");
    return;
  }

  resetBoard();
  gameMessage.classList.add("hidden");

  if (Math.random() < 0.5) {
    players.x = p1;
    players.o = p2;
    player1Display.textContent = p1 + " (X)";
    player2Display.textContent = p2 + " (O)";
  } else {
    players.x = p2;
    players.o = p1;
    player1Display.textContent = p1 + " (O)";
    player2Display.textContent = p2 + " (X)";
  }

  currentPlayer = "x";
  gameActive = true;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "x" ? "o" : "x";
  });
});

dismissBtn.addEventListener("click", () => {
  gameMessage.classList.add("hidden");
});

// PLAY AGAIN
playAgainBtn?.addEventListener("click", () => {
  resetBoard();
  gameMessage.classList.add("hidden");
  currentPlayer = "x";
  gameActive = true;
});

// RESTART
restartBtn.addEventListener("click", () => {
  resetBoard();
  gameMessage.classList.add("hidden");

  gameActive = false;
  currentPlayer = "x";

  players.x = "";
  players.o = "";

  player1Input.value = "";
  player2Input.value = "";

  player1Display.textContent = "Player 1";
  player2Display.textContent = "Player 2";

  scoreX = 0;
  scoreO = 0;

  score1El.textContent = "0";
  score2El.textContent = "0";
});
