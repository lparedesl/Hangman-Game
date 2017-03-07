var tvShows = [
	"Breaking Bad", "Prison Break", "Game of Thrones", "The Walking Dead", "Boardwalk Empire", "Westworld", "The Wire", "Mad Men", "Narcos", "Seinfeld", "Friends", "How I Met Your Mother", "The Big Bang Theory", "The Simpsons", "Family Guy", "South Park", "Dexter", "The X-Files", "House of Cards", "Hannibal", "Suits", "Vikings"
]

var keyOptions = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x" , "c", "v", "b", "n", "m", "-", " "]

var wins = 0;
var losses = 0;
var totalGuesses = 7;
var guessedLetters = [];

// Function to replace character
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

// Reset TV Show name, Guesses Remaining and Letters Gussed
function reset() {
	guessesRemaining = totalGuesses;
	(document.getElementById("guesses")).textContent = guessesRemaining;
	guessedLetters = [];
	(document.getElementById("guessedLetters")).textContent = guessedLetters;
	(document.getElementById("spaces")).style.letterSpacing = 10;
	(document.getElementById("spaces")).textContent = "_____";
	(document.getElementById("image")).src = "assets/images/Initial.png";
	n = 0;
	j = 0;
}

// Start Game
function playGame() {
	document.getElementById("button").blur();
	reset();
	play = true;
	gameEnded = false;
	pickTvShow();
	(document.getElementById("guesses")).textContent = totalGuesses;
	// Update spaces for TV Show name
	(document.getElementById("spaces")).textContent = spaces;
}

// Pick random TV Show
function pickTvShow() {
	currentTvShow = tvShows[Math.floor(Math.random() * tvShows.length)];
	letters = currentTvShow.split("");

	for (var i = 0; i < letters.length; i++) {
		if (i === 0) {
			spaces = "_";
		}
		else {
			spaces = spaces.concat("_");
		}
	}
	var spacesLetters = spaces.split("");
}

var n = 0;
var j = 0;
var play = false;
var gameEnded = false;
var guessesRemaining = totalGuesses;

// When user presses any key...
document.onkeyup = function(event) {
	userLetter = (event.key).toLowerCase();
	if (keyOptions.indexOf(userLetter) !== -1 && play === true) {
		// Do this if the user wants to keep playing
		if (gameEnded === false) {
			// Check if guessed letter is contained in TV Show name
			var correct = false;
			for (var i = 0; i < letters.length; i++) {
				if (userLetter === letters[i].toLowerCase()) {
					spaces = spaces.replaceAt(i, letters[i]);
					correct = true;
				}
				else {
					spaces = spaces.replaceAt(i, spaces[i]);
				}
				(document.getElementById("spaces")).textContent = spaces;
			}
			
			// Check if key press is not among guessed letters
			if (guessedLetters.indexOf(userLetter.toUpperCase()) === -1) {

				// Update letters guessed
				guessedLetters.push(userLetter.toUpperCase());
				(document.getElementById("guessedLetters")).textContent = guessedLetters;

				// If guessed letter is not in the TV Show name either
				if (correct === false) {
					// Update number of guesses remaining
					guessesRemaining--
					(document.getElementById("guesses")).textContent = guessesRemaining;

					// Update Image
					j++
					var newImg = "assets/images/" + j + ".png";
					(document.getElementById("image")).src = newImg;
				}
			}
		}

		// Game ends
		if (spaces.indexOf("_") === -1 || guessesRemaining === 0) {

			if (spaces.indexOf("_") === -1) {
				(document.getElementById("spaces")).style.letterSpacing = 0;
			}

			(document.getElementById("spaces")).textContent = spaces;

			// User wins
			if (spaces.indexOf("_") === -1 && gameEnded === false) {
				wins++
				(document.getElementById("wins")).textContent = wins;
			}

			// User losses
			if (guessesRemaining === 0 && gameEnded === false) {
				losses++
				(document.getElementById("losses")).textContent = losses;
			}

			newGame();

		}

		n++
	}
}

function newGame() {
	// When user won
	if (spaces.indexOf("_") === -1) {
		setTimeout(function() { 
			nextGame = confirm("You won!\n\nDo you want to play again?");
			if (nextGame) {
				playGame();
			}
			else {
				reset();
				gameEnded = true;
				play = false;
			}
		}, 100);
	}

	// When user lost
	if (guessesRemaining === 0) {
		setTimeout(function() { 
			nextGame = confirm("You lost. The TV Show was: " + currentTvShow + ".\n\nDo you want to play again?");
			if (nextGame) {
				playGame();
			}
			else {
				reset();
				gameEnded = true;
				play = false;
			}
		}, 100);
	}
}