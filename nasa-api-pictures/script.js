

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
