// VARIABLES
// ###############################

var arrWordMasterList = ["apple", "banana", "orange", "grape", "strawberry"];
var arrWordPlayList = arrWordMasterList.slice(); // copy the word list into a second array for slicing
var strWord;

var objLetter = {};
var arrLetterObjects = [];
var arrLetterElements = [];
var strLettersGuessed = "";

var score = 0;
var strGuess;

var htmlGuess = document.getElementById("user-guess");
var htmlWordMarquee = document.getElementById("word-marquee");
console.log(htmlWordMarquee);

// MAIN PROCESS
// ###############################

// initialize page

// randomly select a word that hasn't been played yet
var randomIndex = Math.floor(Math.random() * arrWordPlayList.length); // randomly select an index of words-in-play array
console.log(randomIndex);

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

// get letter guess input from user
document.onkeyup = function(event) {
  strGuess = event.key;

  // use regex to check if key pressed is a (single) letter key
  if (/^[a-z]{1}$/i.test(strGuess)) {
    // key press is a letter
    console.log("regex true; key = " + strGuess);
    document.getElementById("user-guess").textContent = strGuess; // render guess on page
    strLettersGuessed += strGuess;
    document.getElementById(
      "letters-guessed-p"
    ).textContent = strLettersGuessed;
    // check guess against each letter in word
    arrLetterObjects.forEach(function(current, index, arr) {
      if (current.letter.toLowerCase() === strGuess.toLowerCase()) {
        // letter was guessed correctly

        // record the letter as guessed
        current.guessed = true;

        // show the correctly guessed letter(s) on the marquee
        document.getElementById(current.wordIndex).textContent = current.letter;

        // if every letter has been guessed correctly
        if (
          arrLetterObjects.every(function(element) {
            return element.guessed === true;
          })
        ) {
          // word is complete: update user score
          // <need code>
          setTimeout(function() {
            alert('You guessed the word "' + strWord + '"!');
          }, 1000);

          // <need code>
          // if not all words played, move to next word...
          // re-initialize page with a new word
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
    // key press is not alpha
    console.log("regex false; key= " + strGuess);
  }
};

// FUNCTIONS
// ###############################

// function to render word platform

function renderMarquee() {}

// example code ------------------------------------------------

// If the first character in the current animal is "c" or "o", alert the following message.
// if (myFarm[j].charAt(0) === "c" || myFarm[j].charAt(0) === "o") {
//   alert("Starts with a c or an o!");
// }
