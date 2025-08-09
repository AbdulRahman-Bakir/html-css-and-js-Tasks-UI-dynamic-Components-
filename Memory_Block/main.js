// Step 1
// Get the user name and remove the splash Screen from the game
document.querySelector(".control-buttons").onclick = function () {
  let yourName = prompt("What is your name:");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

// Step 2

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
// let orderRange = Array.from(Array(blocks.length).keys());

// Add Order Css Property to game blocks

blocks.forEach((block, index) => {
  shuffle(orderRange);
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //   If there are two selected blocks
  if (allFlippedBlocks.length === 2) {
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function

function stopClicking() {
  // Add class no clicking on Main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // Remove class no-clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.shuffle === secondBlock.dataset.shuffle) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle Function

function shuffle(array) {
  // Settings vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length by 1
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
