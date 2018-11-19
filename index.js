var Word = require("./word.js");
var inquirer = require('inquirer');
var colors = require('colors');

wordList = ["KYRIE IRVING", "GORDON HAYWARD", "JAYSON TATUM", "JAYLEN BROWN", "MARCUS SMART", "TERRY ROZIER", "ROB WILLIAMS", "DANIEL THEIS", "AL HORFORD", "AARON BAYNES", "SEMI OJELEYE", "GUERSCHON YABUSELE"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;


function startGame() {
    if (wordList.length<2) {
        wordList = ["KYRIE IRVING", "GORDON HAYWARD", "JAYSON TATUM", "JAYLEN BROWN", "MARCUS SMART", "TERRY ROZIER", "ROB WILLIAMS", "DANIEL THEIS", "AL HORFORD", "AARON BAYNES", "SEMI OJELEYE", "GUERSCHON YABUSELE"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 8 letter guesses to find the Boston Celtics player.\n".cyan)
    promptUser();
}

function promptUser() {
    if (counter<8) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. ".cyan
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log(chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".yellow);
            counter++;
            console.log(((8 - counter) + " guesses remaining").yellow);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n".yellow);
        promptUser();
    }
}

function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord().america);
        console.log('\nYou win!!\n'.america);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();