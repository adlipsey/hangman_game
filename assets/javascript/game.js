var wordBank = ["lager", "chardonnay", "stout", "riesling", "pilsner", "merlot", "pale ale", "pinot noir", "porter", "white zin", "weizen", "sauvignon blanc", "bock", "pinot grigio", "lambic", "margarita", "schwarzbier", "manhattan", "saison", "daiquiri", "dubbel", "mojito", "tripel", "martini", "kolsch", "bloody mary", "doppelbock", "cosmopolitan"];
var	correctWord = [];
var	displayWord = [];
var	wrongLetters = [];

var hangman = {
	guessesLeft: 10,
	gamesWon: 0,


	pickWord : function() {
		//Create random value corresponding to indices of wordBank array
		var index = Math.floor( Math.random() * wordBank.length);
		//Split word at random index into correctWord array
		correctWord = wordBank[index].split("");
	},

	drawBoard : function() {
		//Display current number of wins
		document.getElementById("wins").innerHTML = hangman.gamesWon;
		//Display current number of guesses
		document.getElementById("guesses").innerHTML = hangman.guessesLeft;
		//Iterates through correctWord creating a copy in displayWord
		for(var i = 0; i < correctWord.length; i++) {
			//Spaces in multi-word strings are preserved
			if (correctWord[i] === " ") {
				displayWord[i] = " ";
			}
			//All other characters are hidden with _
			else {
				displayWord[i] = "_";
			}
		}
		//Displays the "hidden" displayWord array as string 
		document.getElementById("board").innerHTML = displayWord.join("");
	},


	playGame : function() {
		//Initiates Listener for user kepresses
		document.addEventListener('keyup', function userInput(guess) {
			//If key press is in correctWord, finds all occurences and reveals them in displayWord
			if(correctWord.includes(guess.key)) {
				for(var i = 0; i < correctWord.length; i++){
					if(guess.key === correctWord[i]) {
					 	displayWord[i] = guess.key; 
					}
				}
			}
			//If not in correctWord but is in wrongLetters, nothing happens
			else if (wrongLetters.includes(guess.key)) {
			}
			//If not in correct word or wrongLetters, added to wrongLetters, guessesLeft decremented by 1
			else {
				wrongLetters.push(guess.key);
				document.getElementById("usedLetters").innerHTML = wrongLetters;
				hangman.guessesLeft --;
				document.getElementById("guesses").innerHTML = hangman.guessesLeft;
				document.getElementById ("hangmanPic").src = "./assets/images/bev_nap"+hangman.guessesLeft+".png";
			}
			//Updates displayWord on screen
			document.getElementById("board").innerHTML = displayWord.join("");
			//Resets win/lose screen for later
			document.getElementById("game-over").className = "hidden";

			//Checks for win condition
			if(correctWord.join("") == displayWord.join("")) {
				hangman.youWon();
				document.removeEventListener('keyup', userInput);
			}
			//Checks for lose condition
			if(hangman.guessesLeft === 0) {
				document.removeEventListener('keyup', userInput);
				hangman.youLost();
			}
		})
	},

	youWon : function() {
		//Changes game-over message class to trigger transition animation
		document.getElementById("game-over").className = "fade-out";
		//Displays win message to game-over ID
		document.getElementById("game-over").innerHTML = "Congratulations! You won! Press Enter key to play again.";
		//Increments # of games won
		hangman.gamesWon ++;
		//Displays current number of games won to document
		document.getElementById("wins").innerHTML = hangman.gamesWon;
		//Adds event listener for Enter key
		document.addEventListener('keyup', function again(yes) {
			if(yes.keyCode == 13){
				//Removes listener after it served its purpose
				document.removeEventListener('keyup', again);
				//Triggers a new game
				hangman.newGame();
			};
		})
	} ,

	youLost : function() {
		//Changes game-over message class to trigger transition animation
		document.getElementById("game-over").className = "fade-out";
		//Displays lose message to game-over ID
		document.getElementById("game-over").innerHTML = "Sorry, you ran out of guesses! Press Enter key to play again.";
		//Displays correctWord to document in place of unfinished displayWord
		document.getElementById("board").innerHTML = correctWord.join("");
		//Adds event listener for Enter key
		document.addEventListener('keyup', function again(yes) {
			if(yes.keyCode == 13){
				//Removes listener after it served its purpose
				document.removeEventListener('keyup', again);
				//Triggers a new game
				hangman.newGame();
			};
		})
	},

	reset : function() {
		//Clears wrongLetters array
		wrongLetters = [];
		//Clears usedLetters HTML div
		document.getElementById("usedLetters").innerHTML = "";
		//Clears guesses HTML div
		document.getElementById("guesses").innerHTML = "";
		//Resets guessesLeft to 10
		hangman.guessesLeft = 10;
		//Clears displayWord array
		displayWord = [];
		//Clears board HTML div
		document.getElementById("board").innerHTML = "";
		//Resets hangmanPic to 10
		document.getElementById("hangmanPic").src = "./assets/images/bev_nap10.png";

	},

	newGame : function() {
		hangman.reset();
		hangman.pickWord();
		hangman.drawBoard();
		hangman.playGame();
	},
}

hangman.newGame();