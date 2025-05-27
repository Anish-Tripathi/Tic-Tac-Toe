let boxes = document.querySelectorAll(".box");
let rst = document.querySelector(".reset");
let win = document.querySelector(".win");
let msg = document.querySelector(".msg");
let newBtn = document.querySelector(".new");

let turn = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to show the winner or draw message
const showWinner = (winner) => {
  if (winner === "Draw") {
    win.innerText = `Match Drawn!! Try again`;
  } else {
    win.innerText = `Congratulations!! Winner is ${winner}`;
  }
  msg.classList.remove("hide"); // Show the message
};

// Function to check the winner
const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1); // Show the winner
        disableAllBoxes(); // Stop further clicks after a winner is found
        return;
      }
    }
  }

  // If all boxes are filled and no winner, it's a draw
  if (count === 9) {
    showWinner("Draw");
  }
};

// Function to disable all boxes
const disableAllBoxes = () => {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none"; // Prevent further clicks
  });
};

// Function to reset the game
const resetGame = () => {
  boxes.forEach((box) => {
    box.innerText = ""; // Clear the box
    box.style.pointerEvents = "auto"; // Enable clicks
  });
  win.innerText = ""; // Clear the winner message
  msg.classList.add("hide"); // Hide the message
  turn = true; // Reset turn
  count = 0; // Reset count
};

// Add click event to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turn) {
        box.innerText = "X";
        box.style.color = "white";
      } else {
        box.innerText = "O";
        box.style.color = "rgb(247, 157, 12)";
      }
      count++; // Increment the move count
      turn = !turn; // Toggle turn
      checkWinner(); // Check if there's a winner
    }
  });
});

// Reset button logic
rst.addEventListener("click", resetGame);

// New Game button logic
newBtn.addEventListener("click", resetGame);
