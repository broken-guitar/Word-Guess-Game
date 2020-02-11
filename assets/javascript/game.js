// VARIABLES
// ###############################

var arrWordMasterList = ["apple", "banana", "orange", "grape", "strawberry"];
var arrWordPlayList = [];
var strWord;

var arrLetterObjects = [];
var arrLetterElements = [];
var strLettersGuessed

var gameOver = false;
var wordOver = false;
var userGuessSuccess = false;
var userScore = 0;
var strGuess;
var guessesLeft;

var htmlGameBanner = document.getElementById("game-banner");
var htmlWordMarquee = document.getElementById("word-marquee");
var htmlGuess = document.getElementById("user-guess");
var htmlLettersGuessed = document.getElementById("letters-guessed-p");
var htmlUserScore = document.getElementById("user-score-p");
var htmlGuessesLeft = document.getElementById("guesses-left-p");





// initialize
strWord = "";
htmlUserScore.textContent = "Score: " + userScore;
arrWordPlayList = arrWordMasterList.slice(); // copy the word list into a second array for splicing (to prevent word replays)
selectNewWord();



// get guess input from user
document.onkeyup = function (event) {
  strGuess = event.key;

  // clear game banner if user is playing
  if (wordOver === false) {
    htmlGameBanner.innerHTML = ""
    userGuessSuccess = false;
  }
  

  // use regex to check if key pressed is a (single) letter key
  if (/^[a-z]{1}$/i.test(strGuess)) {

    // key press is a letter

    // check if letter is already guessed
    if (strLettersGuessed.indexOf(strGuess.toUpperCase()) === -1) {

      // letter was not guessed yet

      // render guess on page
      htmlGuess.textContent = strGuess;

      //save guess, sort alpha (prevent spelling bad words!); and render
      strLettersGuessed += strGuess.toUpperCase();
      htmlLettersGuessed.textContent = sortAlphabetically(strLettersGuessed);

      // check guess against each letter in word
      arrLetterObjects.forEach(function (current, index, arr) {
        if (current.letter.toLowerCase() === strGuess.toLowerCase()) {

          // LETTER GUESSED CORRECTLY

          // record the letter as guessed
          current.guessed = true;
          userGuessSuccess = true;
          // show the correctly guessed letter(s) on the marquee
          document.getElementById(current.wordIndex).textContent = current.letter;

          // if every letter has been guessed correctly...
          if (
            arrLetterObjects.every(function (element) {
              return element.guessed === true;
            })
          ) {
            // ...then word is complete, update user score
            userScore += 1;
            htmlUserScore.textContent = "Score: " + userScore;
            htmlGameBanner.innerHTML = "You guessed the word <strong>" + strWord + "</strong>! <p id='continue'>Press any key to continue</p>"

            setTimeout(function () {

            }, 500);

            // select a new word
            selectNewWord();

          } else {
            // word is not complete
          }
        } else {
          // letter was NOT guessed correctly
        }
      });
      if (userGuessSuccess === false){
        console.log('minus');
        guessesLeft -= 1;
        htmlGuessesLeft.textContent = "Guesses left: " + guessesLeft;
        if (guessesLeft < 1){
          wordOver = true;
          htmlGameBanner.innerHTML = "You ran out of guesses! <p id='continue'>Press any key to continue</p>"
          selectNewWord();
         
        } 
      }
      

    } else {
      console.log("already guessed '" + strGuess + "'"); // ??? do something if letter was already guessed?
    }
  } else {
    // key press is not alpha
    console.log("regex false; key= " + strGuess);
  }
}



// FUNCTIONS
// ###############################

// selects a new word and updates page
function selectNewWord() {

  // check if all words played
  if (arrWordPlayList.length < 1){
    alert("Game Over!")

  }

  //reset vars and elements
  userGuessSuccess = false;
  wordOver = false; 
  guessesLeft = 0;
  strLettersGuessed = "";
  arrLetterObjects.splice(0, arrLetterObjects.length);
  arrLetterElements.splice(0, arrLetterElements.length);
  htmlWordMarquee.innerHTML = '';
  htmlGuess.innerHTML = '';
  htmlLettersGuessed.innerHTML = '';

  // randomly select a word that hasn't been played yet  
  if (strWord === "") {
    // first word of the game
    var randomIndex = Math.floor(Math.random() * arrWordPlayList.length); // randomly select an index of words-in-play array
  } else {
    // remove the last played word, then randomly select the next word
    var lastWordIndex = arrWordPlayList.indexOf(strWord);
    arrWordPlayList.splice(lastWordIndex, 1);
    var randomIndex = Math.floor(Math.random() * arrWordPlayList.length); // randomly select an index of words-in-play array
  }

  strWord = arrWordPlayList[randomIndex]; // select a word from the play list with random index
  console.log(strWord);

  guessesLeft = uniqueLetterCount(strWord);
  htmlGuessesLeft.textContent = "Guesses left: " + guessesLeft

  // initialize word marquee; loop through each letter in the word
  for (i = 0; i < strWord.length; i++) {
    
    // create letter object to store info about the  letter in the word
    var objLetter = {
      wordIndex: i,
      letter: strWord.charAt(i),
      guessed: false
    };
    
    // push to an array to access later
    arrLetterObjects.push(objLetter);

    // create an html element for the letter
    var letterDiv = document.createElement("div");
    letterDiv.setAttribute("id", i);
    letterDiv.setAttribute("class", "word-marquee-letters");
    letterDiv.textContent = "_";

    // render the letter element on the page
    htmlWordMarquee.appendChild(letterDiv);
  }
}

function sortAlphabetically(string) {
  var arrSplit = string.split('');
  var arrSort = arrSplit.sort();
  var arrJoin = arrSort.join('');
  return arrJoin;
}

// return number of unique letters in a word
function uniqueLetterCount(string){
  var strTemp = string;
  var uniques = "";
  for (var i = 0; i < strTemp.length; i++){
    if (uniques.indexOf(strTemp[i]) == -1){
      uniques += strTemp[i];
    }
  }
  return uniques.length;
}