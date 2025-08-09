// Settings game name
let gameName = "Guess The Word";

document.title = gameName;

document.querySelector("h1").innerHTML = gameName;

document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Elzero Web School`;

// Setting Game Options

let numOfTries = 8;
let numOfLetters = 6;
let currentTry = 1;
let numOfHints = 2;

// Manage words
let wordToGuess = "";
const word = [
  "Create",
  "Delete",
  "Update",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = word[Math.floor(Math.random() * word.length)].toLowerCase();

let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHintFunc);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i} </span>`;
    if (i !== 1) {
      tryDiv.classList.add("disabled-input");
    }
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  // Focus on first input in first try element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-input input"
  );
  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });
  console.log(wordToGuess);
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) {
          inputs[nextInput].focus();
        }
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) {
          inputs[prevInput].focus();
        }
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const inputLetter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (inputLetter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(inputLetter) && inputLetter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }

  // Check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You Win. The Word is <span>${wordToGuess}</span>`;

    if (numOfHints === 2) {
      messageArea.innerHTML = `<p>Congrats! You win. You didn't use hints</p>`;
    }
    // Add disabled class in all tries div
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("disabled-inputs");
    });
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You lose The word is <span>${wordToGuess}<\span>`;
    }
  }
}

function getHintFunc() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }
  if (numOfHints === 0) {
    getHintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if(event.key === "Backspace"){
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement)

    if (currentIndex > 0){
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus(); 
    }
  }
}

document.addEventListener("keydown", handleBackSpace);

window.onload = function () {
  generateInput();
};
