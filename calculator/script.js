const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
//calculate first and second values depending on operator

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

function sendNumberValue(number){
    // if current display value is 0 replace if not add numnber
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
function addDecimal(){
    // if operator pressed don't add decimal
    if(awaitingNextValue) return;
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}



// operator functionality

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // To prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    //Ready for next value 
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset all values
function resetAll(){

    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//Event listeners

inputBtns.forEach(button=> {
    if(button.classList.length === 0){
        button.addEventListener('click', ()=>sendNumberValue(button.value));
    }else if(button.classList.contains('operator')){
        button.addEventListener('click', ()=>useOperator(button.value));
    }else if(button.classList.contains('decimal')){
        button.addEventListener('click', ()=>addDecimal());
    }
})

clearBtn.addEventListener('click', resetAll)