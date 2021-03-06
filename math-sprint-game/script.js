// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';
// Scroll
let valueY = 0;


//Play again
function playAgain(){
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
}
//show score page function
function showScorePage(){
  //Show play again button after 1 s
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}
//Format and display scores
function scoresToDOM(){
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  itemContainer.scrollTo({top: 0, behavior: 'instant'})
  showScorePage();
}

//Stop timer, process results, go to score page
function checkTime(){
  if(playerGuessArray.length == questionAmount){
    clearInterval(timer);
    //Looping through euqations array in order to check if value coincides with guess
    equationsArray.forEach((equation, i) => {
      if(equation.evaluated === playerGuessArray[i]){
        //Correct guess 
      }else{
        penaltyTime += 0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    console.log('time', timePlayed , 'penalty', penaltyTime, 'final', finalTime);
    scoresToDOM();
  }
}

//Add a tenth of a second to time played
function addTime(){
  timePlayed += 0.1;
  checkTime();
}


//Start timer when game page is clicked
function startTimer(){
  //Reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);

}

//Scroll and store user guess
function select(guessedTrue){
  //Scroll 80px 
  valueY += 80;
  itemContainer.scroll(0, valueY);
  //Add player guess to array
  return guessedTrue? playerGuessArray.push('true') : playerGuessArray.push('false')
}

//Display game page
function showGamePage(){
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

//Get random number 
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

//Shuffle Array - shuffle algorithm Fisher-Yates
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
 
}


//Add equations to DOM
function equationsToDOM(){
  equationsArray.forEach(equation => {
    //Create item
    const item = document.createElement('div');
    item.classList.add('item');
    //Equation text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    //Append the elem
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}
// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer 
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

function countdownStart(){
  countdown.textContent = '3';
  setTimeout(()=> {
    countdown.textContent = '2';
  }, 1000);
  setTimeout(()=> {
    countdown.textContent = '1';
  }, 2000);
  setTimeout(()=> {
    countdown.textContent = 'GO!';
  }, 3000);

}

//Navigate to countdown page
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  populateGamePage();
  setTimeout(showGamePage, 4000);
}

//Get the value from our selected radio function
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;
    }  
  });
  return radioValue;
};

function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  if (questionAmount) {
    showCountdown();
  }

}

startForm.addEventListener('click', ()=> {
  radioContainers.forEach((radioEl)=> {
    //Remove selected label from each one of our items
    radioEl.classList.remove('selected-label');
    //Add it back if the radio input is checked
    if(radioEl.children[1].checked){
      radioEl.classList.add('selected-label');
    }
  });
});

//Ev listeners
startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);
playAgainBtn.addEventListener('click', playAgain);