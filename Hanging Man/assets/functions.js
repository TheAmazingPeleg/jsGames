var words = ["GAL GADOT", "SCA RLET JOHAN SON"];
var wordIndex = Math.floor(Math.random() * words.length);
var word = words[wordIndex];
var sizeNoSpaces = word.replaceAll(' ', '').length;
var guessed = [];
var count = 0;
var size = word.length;
var mistakes = 0;

initGame();

function initGame(){
	const mistakesElem = document.getElementById('mistake');
	mistakesElem.innerHTML = "0";
	wipeLetters();
	initLetters();
	initButtons();
}

function initButtons(){
	const buttons = document.getElementById('lettersButtons');
	buttons.innerHTML = "";
	for(var i = 0; i < 26; i ++){
		buttons.innerHTML += "<button onclick=guessedLetter(\"" + String.fromCharCode(i + 65) + "\")>" + String.fromCharCode(i + 65) + "</button>";
	}
}

function initLetters(){
	const letters = document.getElementById('letters');
	letters.innerHTML = "";
	for(var i = 0; i < guessed.length; i ++){	
		letters.innerHTML += guessed[i] + " ";
	}
}

function guessedLetter(L){
	const mistakesElem = document.getElementById('mistake');
	mistakesElem.innerHTML = mistakes;
	var tempCount = count;
	for(var i = 0; i < size; i ++){
		if(word[i] === L && guessed[i] != word[i]){
			guessed[i] = word[i];
			count ++;
		}
	}
	if(tempCount === count){
		mistakes ++;
		mistakesElem.innerHTML = mistakes;
	}
	if(mistakes === 5){
		alert("You Lost!");
		location.reload();
	}else{
		initLetters();
		if(count === sizeNoSpaces){
			setTimeout(() => {
				alert("You Won!");
				location.reload();
			}, 50);
		}
	}
}

function wipeLetters(){
	for(var i = 0; i < size; i ++){
		if(word[i] === " "){
			guessed.push('-');
		}else{
			guessed.push('_');
		}
	}
}