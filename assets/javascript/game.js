var wordBank = ["lager", "stout", "pilsner", "pale ale", "porter", "weizen", "bock", "lambic", "schwarzbier", "saison", "dubbel", "tripel", "kolsch", "doppelbock"];
var	correctWord = [];
var	boardDisplay = [];
var	wrongLetters = [];

var hangman = {
	guessesLeft: 10,
	gamesWon: 0,


	pickWord : function() {
		var index = Math.floor( Math.random() * (wordBank.length - 1));
		var word = wordBank[index];
		correctWord = word.split("");
	},

	drawBoard : function() {
		var display = [];
		document.getElementById("guesses").innerHTML = hangman.guessesLeft;
		for(var i = 0; i < correctWord.length; i++) {
			if (correctWord[i] === " ") {
				display[i] = " ";
				document.getElementById("board").innerHTML += (display[i] + " ");
			}
			else {
				display[i] = "_";
				document.getElementById("board").innerHTML += (display[i] + " ");
			}
		}
		
		return display;
	},

	isLetter : function (arr, letter) {
		if(arr.indexOf(letter) === -1) {
			return false;
		}
		else {
			return true;
		}
	},

	playGame : function() {
		document.addEventListener('keydown', function(guess) {
			if(hangman.isLetter(correctWord, guess.key)) {
				document.getElementById("board").innerHTML = "";
				for(var i = 0; i < correctWord.length; i++){
					if(guess.key === correctWord[i]) {
					 	boardDisplay[i] = guess.key ; 
					}
					document.getElementById("board").innerHTML += (boardDisplay[i] + " ");
				}
			}
			else if (hangman.isLetter(wrongLetters, guess.key)) {
			}
			else {
				wrongLetters.push(guess.key);
				console.log(wrongLetters);
				document.getElementById("usedLetters").innerHTML = wrongLetters;
				hangman.guessesLeft --;
				document.getElementById("guesses").innerHTML = hangman.guessesLeft;
			}
		})
	},

	//add check for win condition

	//add check for lose condition 
}

hangman.pickWord();
console.log(correctWord);
boardDisplay = hangman.drawBoard();
hangman.playGame();