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
		document.addEventListener('keydown', function(guess) {
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
				console.log(wrongLetters);
				document.getElementById("usedLetters").innerHTML = wrongLetters;
				hangman.guessesLeft --;
				document.getElementById("guesses").innerHTML = hangman.guessesLeft;
			}
			document.getElementById("board").innerHTML = displayWord.join("");
		})
	},

	//add check for win condition

	//add check for lose condition 
}

hangman.pickWord();
console.log(correctWord);
hangman.drawBoard();
hangman.playGame();