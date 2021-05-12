const form = document.getElementById('form');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');


let isValid = false;
let passwordsMatch = false;

function displayErrorMessage(){
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
}

function validateForm(){
    //using constraint API

    isValid = form.checkValidity();
    if(!isValid){
         message.textContent = 'Please fill out all fields';
        displayErrorMessage();
        return;
    }
    if(password1 === password2){
        passwordsMatch = true;
        password1.style.borderColor = 'green';
        password2.style.borderColor = 'green';
    }else{
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.';
       displayErrorMessage()
        password1.style.borderColor = 'red';
        password2.style.borderColor = 'red';
        return;
    }
    //If form is valid and passwords match
    if(isValid && passwordsMatch){
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
        message.style.borderColor = 'green';
    }
}


function processFormData(e){
    e.preventDefault();
    validateForm();
}

form.addEventListener('submit', processFormData);