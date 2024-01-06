document.addEventListener("DOMContentLoaded", function () {
//Initial game variables//
  let luckPoints = 0;
  const maxLuckPoints = 3;
  let currentSquareIndex = 0;

// Update luck bar based on luck points
  function updateLuckBar() {
    const luckBar = document.getElementById("currentLuck");
    const percentage = (luckPoints / maxLuckPoints) * 100;
    luckBar.style.width = percentage + "%";
  }
//Create 6 sided die
  function createDice(number) {
    const dotPositionMatrix = {
      1: [[50, 50]],
      2: [
        [20, 20],
        [80, 80],
      ],
      3: [
        [20, 20],
        [50, 50],
        [80, 80],
      ],
      4: [
        [20, 20],
        [20, 80],
        [80, 20],
        [80, 80],
      ],
      5: [
        [20, 20],
        [20, 80],
        [50, 50],
        [80, 20],
        [80, 80],
      ],
      6: [
        [20, 20],
        [20, 80],
        [50, 20],
        [50, 80],
        [80, 20],
        [80, 80],
      ],
    };

    const dice = document.createElement("div");

    dice.classList.add("dice");
    dice.dataset.value = number;
    for (const dotPosition of dotPositionMatrix[number]) {
      const dot = document.createElement("div");

      dot.classList.add("dice-dot");
      dot.style.setProperty("--top", dotPosition[0] + "%");
      dot.style.setProperty("--left", dotPosition[1] + "%");
      dice.appendChild(dot);
    }

    return dice;
  }

  //Random die number 
  function randomizeDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";

    for (let i = 0; i < numberOfDice; i++) {
      const random = Math.floor(Math.random() * 6 + 1);
      const dice = createDice(random);

      diceContainer.appendChild(dice);
    }
  }

  //Check/use the accumlated luck points
  function useLuck() {
    if (luckPoints > 0) {
      alert("You used a luck point!");
      luckPoints--;
      updateLuckBar();
    } else {
      alert("You have no luck points to use.");
    }
  }

  //Check if die result is 1 or 6
  function checkDiceResult() {
    const diceResult = parseInt(diceContainer.firstChild.dataset.value);

    if (diceResult === 1 || diceResult === 6) {
      luckPoints = Math.min(luckPoints + 1, maxLuckPoints);
      alert(
        "You rolled a " +
          diceResult +
          "! Hua Cheng grants you luck and safe passage."
      );
    } else {
      alert(
        "You rolled a " +
          diceResult +
          ". Luck is not on your side. Use your saved luck or face your fears."
      );
    }

    updateLuckBar();
  }

  // Create game board cells
  function createGameBoard() {
    const board = document.getElementById("board");

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
      }
    }
  }

//call gameboard function
  createGameBoard();

//const and elements for dice and game board
  const NUMBER_OF_DICE = 1;
  const diceContainer = document.querySelector(".dice-container");
  const btnRollDice = document.querySelector(".btn-roll-dice");
  const btnUseLuck = document.querySelector(".btn-use-luck");
  const avatar = document.getElementById("avatar");

//randomize dice and add event listeners
  randomizeDice(diceContainer, NUMBER_OF_DICE);

  btnRollDice.addEventListener("click", () => {
    const interval = setInterval(() => {
      randomizeDice(diceContainer, NUMBER_OF_DICE);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      checkDiceResult();
      moveAvatar();
    }, 1000);
  });

  btnUseLuck.addEventListener("click", useLuck);

//move avatar on game board
  function moveAvatar() {
    const cells = document.querySelectorAll(".cell");

    if (cells.length === 0) {
      console.error("No cells found on the game board.");
      return;
    }

    if (currentSquareIndex >= cells.length) {
      currentSquareIndex = 0;
    }

    const cell = cells[currentSquareIndex];
    const cellRect = cell.getBoundingClientRect();

    avatar.style.left = cellRect.left + "px";
    avatar.style.top = cellRect.top + "px";

    currentSquareIndex += 1;
  }

  updateLuckBar();
});
