// VARIABLES
// ###############################

var arrWordMasterList = ["apple", "banana", "orange", "grape", "strawberry"];
var arrWordPlayList = arrWordMasterList.slice(); // copy the word list into a second array for slicing
var strWord;
var arrLetterElements = [];
var strLettersGuessed;
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

// render word marquee
for (i = 0; i < strWord.length; i++) {
  var letterDiv = document.createElement("div");
  letterDiv.setAttribute("id", i);
  letterDiv.setAttribute("letter-value-data", strWord.charAt(i));
  letterDiv.setAttribute("letter-guessed-data", false);
  letterDiv.setAttribute("class", "word-marquee-letters");
  letterDiv.textContent = "_";

  arrLetterElements.push(letterDiv);
  //   console.log("arrayLetters" + i + ".id = " + arrLetters[i].getAttribute("id"));

  htmlWordMarquee.appendChild(letterDiv);
}

// get letter guess input from user
document.onkeyup = function(event) {
  strGuess = event.key;
  document.getElementById("user-guess").textContent = strGuess;

  // use regex to see if key press is alpha
  if (/[a-z]/i) {
    // key pressed was an alpha, now check the guess against each letter in word
    arrLetterElements.forEach(function(current, index, arr) {
      var letter = current.getAttribute("letter-value-data");
      if (letter.toLowerCase() === strGuess.toLowerCase()) {
        current.textContent = letter;
        current.setAttribute("letter-guessed-data", true);
      }
      //   console.log("currentLetter = " + currentLetter.getAttribute("letter-value-data"));
    });
  } else {
    // key pressed wasn't an alpha
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
