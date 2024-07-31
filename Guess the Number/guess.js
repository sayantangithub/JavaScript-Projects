//The following code will generate a random number from 0 to 1.
const randomNumber = parseInt(Math.random() * 100 + 1);

//Accessing HTML Elements
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remainning = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

//Defining variables
let prevGuess = [];
let numGuess = 1;

//Generally this var is used in Game. To check the user have coins to play the game or not
//We can check this criteria before starting a game.
let playGame = true;

function validateGuess(guess) {
  //this function will check if the userInput is valid or not
  // isNaN(guess) || 0<guess<100
}

function checkGuess(guess) {
  //this method will compare it with the number that has randomly generated.
}

function displayGuess(guess) {
  //we will empty the guessField section.
  //will do an innerHTML on guessSlot
  //update the remaining
}

function displayMessage(message) {
  //print a message accordingly lowOrHi
}

function endGame() {
  //will end the game
}

function newGame() {
  //will start a newGame
}
