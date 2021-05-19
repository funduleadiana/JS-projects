const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const count = 15;
const apiKey = 'DEMO_KEY';
const apiUrlNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];


//Get 15 img from NASA API
async function getNasaPic(){
    try{
        const response = await fetch(apiUrlNasa);
        resultsArray = await response.json();
        console.log(resultsArray);

    }catch(error){
        console.log(error)
    }
}

getNasaPic();
