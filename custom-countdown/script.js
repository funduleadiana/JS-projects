const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; 

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
//Set Date Input Min with today's date 

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate UI and countdown

function updateDOM(){
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance % minute)/second);

    //Populating our countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    //hide the input container
    inputContainer.hidden = true;
    //show countdown
    countdownEl.hidden = false;

}

function updateCountdown(e){
   e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    //Get version of current date
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}


countdownForm.addEventListener('submit', updateCountdown)