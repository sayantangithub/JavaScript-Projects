# Desinging a Number Guessing Game
## Defining the Project
Here I am creating a Game that will ask the player to guess a number between 0 to 100. It will give 10 chances to 
the player and display the previously guessed number. It will display if the number is too high or low based on the input.

## Html outline

<img src="https://github.com/user-attachments/assets/c174f1fa-3f16-44a2-9e34-9e0ad99ece2f" alt="Number Guessing Game" width="300">

## Here is structure of JS file

```javascript
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

```
