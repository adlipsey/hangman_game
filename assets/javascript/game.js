var wordBank = ["lager", "stout", "pilsner", "pale ale", "porter", "weizen", "bock", "lambic", "schwarzbier", "saison", "dubbel", "tripel", "kolsch", "doppelbock"];
var	correctWord = [];
var	displayWord = [];
var	wrongLetters = [];

var hangman = {
	guessesLeft: 10,
	gamesWon: 0,


	pickWord : function() {
		var index = Math.floor( Math.random() * wordBank.length);
		correctWord = wordBank[index].split("");
	},

	drawBoard : function() {
		document.getElementById("wins").innerHTML = hangman.gamesWon;
		document.getElementById("guesses").innerHTML = hangman.guessesLeft;
		for(var i = 0; i < correctWord.length; i++) {
			if (correctWord[i] === " ") {
				displayWord[i] = " ";
			}
			else {
				displayWord[i] = "_";
			}
		}
		
		document.getElementById("board").innerHTML = displayWord.join("");
	},


	playGame : function() {
		document.addEventListener('keyup', function userInput(guess) {
			if(correctWord.includes(guess.key)) {
				for(var i = 0; i < correctWord.length; i++){
					if(guess.key === correctWord[i]) {
					 	displayWord[i] = guess.key; 
					}
				}
			}
			else if (wrongLetters.includes(guess.key)) {
			}
			else {
				wrongLetters.push(guess.key);
				document.getElementById("usedLetters").innerHTML = wrongLetters;
				hangman.guessesLeft --;
				document.getElementById("guesses").innerHTML = hangman.guessesLeft;
			}
			
			document.getElementById("board").innerHTML = displayWord.join("");
				
			if(correctWord.join("") == displayWord.join("")) {
				hangman.youWon();
				return;	
			}
			if(hangman.guessesLeft === 0) {
				hangman.youLost();
				return;
			}
		})
			
	},

	youWon : function() {
		document.getElementById("game-over").innerHTML = "Congratulations! You won!"
		hangman.gamesWon ++;
		document.getElementById("wins").innerHTML = hangman.gamesWon;
			hangman.newGame();
		
	} ,

	youLost : function() {
		document.getElementById("game-over").innerHTML = "Sorry, you ran out of guesses! Try a different word."
			hangman.newGame();
		
	},

	reset : function() {
		console.log("I am being run");
		//document.removeEventListener('keyup', userInput());
		wrongLetters = [];
		document.getElementById("usedLetters").innerHTML = "";
		document.getElementById("guesses").innerHTML = "";
		hangman.guessesLeft = 10;
		displayWord = [];
		document.getElementById("board").innerHTML = "";
	},

	newGame : function() {
		hangman.reset();
		hangman.pickWord();
		hangman.drawBoard();
		hangman.playGame();
	},
}

hangman.newGame();