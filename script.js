const cells = document.querySelectorAll(".cell");

const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");

const player1Display = document.getElementById("player1-display");
const player2Display = document.getElementById("player2-display");

const player1Card = document.getElementById("player1-card");
const player2Card = document.getElementById("player2-card");

const startBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restart-game");

let currentPlayer = "";
let gameActive = false;

let players = {
  x: "",
  o: "",
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      const winningSymbol = cells[a].textContent;
      const winnerName = players[winningSymbol];

      alert(`${winnerName} wins!`);
      gameActive = false;
      return true;
    }
  }

  const draw = [...cells].every((cell) => cell.textContent !== "");

  if (draw) {
    alert("Wow both losers?");
    gameActive = false;
    return true;
  }

  return false;
}

startBtn.addEventListener("click", () => {
  const p1Name = player1Input.value || "Player 1";
  const p2Name = player2Input.value || "Player 2";

  player1Display.textContent = p1Name;
  player2Display.textContent = p2Name;

  const random = Math.random() < 0.5;

  if (random) {
    players.x = p1Name;
    players.o = p2Name;

    player1Display.textContent = `${p1Name} (X)`;
    player2Display.textContent = `${p2Name} (O)`;

    player1Card.classList.add("active");
    player2Card.classList.remove("active");
  } else {
    players.x = p2Name;
    players.o = p1Name;

    player1Display.textContent = `${p1Name} (O)`;
    player2Display.textContent = `${p2Name} (X)`;

    player2Card.classList.add("active");
    player1Card.classList.remove("active");
  }

  currentPlayer = "x";
  gameActive = true;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) return;

    if (currentPlayer === "x") {
      currentPlayer = "o";
      player1Card.classList.remove("active");
      player2Card.classList.add("active");
    } else {
      currentPlayer = "x";
      player2Card.classList.remove("active");
      player1Card.classList.add("active");
    }
  });
});

restartBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });

  gameActive = false;
  currentPlayer = "";
  players = { x: "", o: "" };

  player1Card.classList.remove("active");
  player2Card.classList.remove("active");

  player1Display.textContent = "Player 1";
  player2Display.textContent = "Player 2";

  player1Input.value = "";
  player2Input.value = "";
});
