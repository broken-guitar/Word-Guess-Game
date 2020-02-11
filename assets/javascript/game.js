// VARIABLES
// ###############################

var arrWordMasterList = ["apple", "banana", "orange", "grape", "strawberry"];
var arrWordPlayList = [];
var strWord;

var arrLetterObjects = [];
var arrLetterElements = [];
var strLettersGuessed

var gameRun = true;
var wordRun = true;
var score = 0;
var strGuess;

var htmlWordMarquee = document.getElementById("word-marquee");
var htmlGuess = document.getElementById("user-guess");
var htmlLettersGuessed = document.getElementById("letters-guessed-p");





// initialize
strWord = "";
arrWordPlayList = arrWordMasterList.slice(); // copy the word list into a second array for splicing (to prevent word replays)
selectWord();



// get letter guess input from user
document.onkeyup = function (event) {
  strGuess = event.key;

  // use regex to check if key pressed is a (single) letter key
  if (/^[a-z]{1}$/i.test(strGuess)) {

    // key press is a letter

    // check if letter is already guessed
    if (strLettersGuessed.indexOf(strGuess) === -1) {

      console.log("letter '" + strGuess + "' was not guessed yet");

      // render guess on page
      htmlGuess.textContent = strGuess;

      //save guess, sort alpha (prevent spelling bad words!), and render
      strLettersGuessed += strGuess;
      htmlLettersGuessed.textContent = sortAlphabetically(strLettersGuessed);

      // check guess against each letter in word
      arrLetterObjects.forEach(function (current, index, arr) {
        if (current.letter.toLowerCase() === strGuess.toLowerCase()) {

          // record the letter as guessed
          current.guessed = true;

          // show the correctly guessed letter(s) on the marquee
          document.getElementById(current.wordIndex).textContent = current.letter;

          // if every letter has been guessed correctly...
          if (
            arrLetterObjects.every(function (element) {
              return element.guessed === true;
            })
          ) {
            // ...then word is complete, update user score
            // <need code>

            setTimeout(function () {
              alert('You guessed the word "' + strWord + '"!');
            }, 500);

            // select a new word
            selectWord();

          } else {
            // word is not complete
            // <need code> tell loop to continue
          }
        } else {
          // letter was NOT guessed correctly
          // add letter to letters-guessed content
        }
      });
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

// select new word and render page
function selectWord() {

  //clear elements and variables
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

  strWord = arrWordPlayList[randomIndex]; // get string value from array with random index
  console.log(strWord);

  // initialize word marquee; loop through each letter in the word
  for (i = 0; i < strWord.length; i++) {
    // create letter object to store info about the letter in the word,
    // then store push to an array to access later
    var objLetter = {
      wordIndex: i,
      letter: strWord.charAt(i),
      guessed: false
    };

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

function sortAlphabetically(str) {
  var arrSplit = str.split('');
  var arrSort = arrSplit.sort();
  var arrJoin = arrSort.join('');
  return arrJoin;
}