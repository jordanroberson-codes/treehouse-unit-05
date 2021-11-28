//Variables
const buttons = document.querySelectorAll("#qwerty");
let phrase = document.querySelector("#phrase ul");
const startGame = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
let missed = 0;
var keyButtons = document.querySelectorAll("#qwerty button");
const hearts = document.querySelectorAll(".tries img");
const title = document.querySelector(".title");
const phrases = [
  "refactoring",
  "media queries",
  "object oriented programming",
  "framework",
  "data structures",
  "agile software development",
];

//Event handler when button is clicked starts game and hides the main overlay
startGame.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
});

//Selects a random phrase in the array by calculating the phrases length and multiplying it by Math.random(), then it returns a random number with the string attached to that index. It then splits that string into characters.

function getRandomPhraseAsArray(phrases) {
  let randomNumber = Math.floor(Math.random() * phrases.length);
  let newPhrase = phrases[randomNumber];
  let characters = newPhrase.split("");
  return characters;
}
const randomPhrase = getRandomPhraseAsArray(phrases);

//Creates a for loop based on the arr.length or amount of characters and adds them to the DOM. Then the loop determines whether the characters are letters or spaces and adds them to the appropriate class.
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const characterList = document.querySelector("#phrase ul");
    const listItem = document.createElement("li");
    if (arr[i] === " ") {
      listItem.classList.add("space");
    }
    if (arr[i] !== " ") {
      listItem.classList.add("letter");
      listItem.textContent = arr[i];
    }
    characterList.appendChild(listItem);
  }
}

addPhraseToDisplay(randomPhrase);

//Create a checkLetter Function
function checkLetter(userGuess) {
  const totalLI = document.getElementsByClassName("letter");
  let match = null;
  for (let i = 0; i < totalLI.length; i++) {
    if (userGuess === totalLI[i].innerText.toLowerCase()) {
      totalLI[i].classList.add("show");
      match = totalLI[i].innerText;
    }
  }
  return match;
}

//event listener for clicks
for (let i = 0; i < keyButtons.length; i++) {
  keyButtons[i].addEventListener("click", (event) => {
    let guess = event.target.innerText;
    checkLetter(guess);
    event.target.className += "chosen";
    event.target.disabled += "true";
    let clickedLetter = checkLetter(guess);
    if (clickedLetter === null) {
      hearts[missed].src = "images/lostHeart.png";
      missed++;
    }

    checkWin();
  });
}

//Checks for correct letters and will determine if the player wins or loses
function checkWin() {
  let letter = document.querySelectorAll("li.letter");
  let show = document.querySelectorAll("li.show");

  if (show.length === letter.length) {
    overlay.className = "win";
    overlay.style.display = "flex";
    title.textContent = "AWESOME JOB!";
  }

  if (missed >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    title.textContent = "sorry, better luck next time";
  }
}
