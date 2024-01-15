const cardDesigns = [
	'<img src="https://imgv3.fotor.com/images/blog-richtext-image/part-blurry-image.jpg" />',
	'<img src="https://imgv3.fotor.com/images/blog-richtext-image/use-iphone-to-take-photos.png" />',
	'<img src="https://imgv3.fotor.com/images/blog-richtext-image/Comparison-chart-of-clear-and-blurred-license-plate.jpg" />'
];
var cards = [];
var simonCards = [];
var userGuessIndex = 0;
var userTurn = false;
var lockBoard = false;
var click = 1;
var gameBoard = document.getElementById('game-board');
var result = document.getElementById('result');
var name = "";
var maxCards = cardDesigns.length;
var success = 0;
var stage = 0;

initGame();

function initGame() {
    name = prompt('Please enter your name:');
    var numOfCards = parseInt(prompt('Please select amount of pictures (up to ' + maxCards + '):'));
	if(isNaN(numOfCards) || numOfCards < 1 || numOfCards > maxCards){
		resetGame();
	}

    gameBoard.innerHTML = '';
    result.innerHTML = '';
    for (var i = 0; i < numOfCards; i++) {
		cards.push(cardDesigns[i]);
        var card = document.createElement('div');
        card.className = 'card';
		card.id = (i + 1);
        card.innerHTML = cards[i];
        card.addEventListener('click', lightCard); //מאזין לפעולת לחיצה על האובייקט, לאחר לחיצה מפעיל את הפעולה
        gameBoard.appendChild(card);
    }
	simonTurn();
}

function simonTurn(){
	stage ++;
	userTurn = false;
	var randomIndex = Math.floor(Math.random() * cards.length);
	simonCards.push(randomIndex);
	result.innerHTML = "<h2>Simon Turn, Stage: " + stage + "</h2>"; 
	lightAllByOrder(0);
}

function lightAllByOrder(index){
	if(index < simonCards.length){
		var lightElem = document.getElementById((simonCards[index] + 1));
		lightElem.classList.add("light");
		setTimeout(() => {
			lightElem.className = "card";
		}, 500);
		setTimeout(() => {
			lightAllByOrder(index + 1);	//recursive call
		}, 750);
	}else if(index === simonCards.length){ //base level
		userTurn = true;
		result.innerHTML = "<h2>Stage: " + stage + " Guess: " + (success + 1) + " out of " + simonCards.length + "</h2>"; 
	}
}

function lightCard() {
	if (lockBoard || !userTurn) return; //checks if the board is lock and user's turn
	lockBoard = true;
	this.classList.add("light");
	setTimeout(() => {
		this.className = "card";
		
        lockBoard = false;
    }, 250);
	if((simonCards[success] + 1) === parseInt(this.id)){ //user guessed right
		success ++;
		if(success === simonCards.length){ //Last guess
			success = 0;
			setTimeout(() => {
				simonTurn();
			}, 500);
		}else{
			result.innerHTML = "<h2>Stage: " + stage + " Guess: " + (success + 1) + " out of " + simonCards.length + "</h2>"; 	
		}	
	}else{
		alert("You Lost The Game in stage: " + stage);
		resetGame();
	}
}

function resetGame() {
	location.reload();
}