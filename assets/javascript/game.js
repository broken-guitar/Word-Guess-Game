// VARIABLES
// ###############################

var arrWordMasterList = ["apple", "banana", "orange", "grape", "strawberry"];
var arrWordPlayList = arrWordMasterList.slice(); // copy the word list into a second array for slicing
var strWord;
var arrLetters = [];
var arrLettersGuessed = [];
var score = 0;
var strGuess;

var htmlGuess = document.getElementById("user-guess");

// MAIN PROCESS 
// ###############################

// initialize page

// randomly select a word that hasn't been played yet
var randomIndex = Math.floor(Math.random() * arrWordPlayList.length); // randomly select an index of words-in-play array
console.log(randomIndex);

strWord = arrWordPlayList[randomIndex]; // get string value from array with random index
console.log(strWord)

// show word letter placeholders

// get letter guess input from user
document.onkeyup = function (event) {
    strGuess = event.key;
    console.log(strGuess);
    // htmlGuess.textContent = strGuess;
    document.getElementById("user-guess").textContent = strGuess;

};






// FUNCTIONS 
// ###############################

// function to render word platform

function renderMarquee() {


};


// example code ------------------------------------------------

// If the first character in the current animal is "c" or "o", alert the following message.
if (myFarm[j].charAt(0) === "c" || myFarm[j].charAt(0) === "o") {
    alert("Starts with a c or an o!");
}

document.onkeyup = function (event) {
    userText.textContent = event.key;
};

var userText = document.getElementById("user-text");

// Next, we give JavaScript a function to execute when onkeyup event fires.
// Let's start by grabbing a reference to the <span> below.
document.onkeyup = function (event) {
    userText.textContent = event.key;
}