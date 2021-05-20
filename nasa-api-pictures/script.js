const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const count = 15;
const apiKey = 'DEMO_KEY';
const apiUrlNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page){
    //Favorites is an Object so we need to use Object.values() to turn to an array
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    currentArray.forEach((result)=> {
        
        //Creating the card container
        const card = document.createElement('div');
        card.classList.add('card');
        //Link that will be wrapping our image

        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        ///Creating the image 

        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'Nasa picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        //Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        //Save text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        
        //favorites page or main page
        if(page=== 'results'){
            saveText.textContent = 'Add to Favorites';
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);

        } else{
            saveText.textContent = 'Remove Favorites';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);

        }
        //Card text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;

        //Footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        //Date
        const date = document.createElement('strong');
        date.textContent = result.date;

        //Copyright
        const copyRightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyRightResult}`;

        //Apending all elements to container
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

function updateDOM(page){
    //Get favorites from Local storage
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));

    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
}

//Get 15 img from NASA API
async function getNasaPic(){
    try{
        const response = await fetch(apiUrlNasa);
        resultsArray = await response.json();
        updateDOM('favorites');

    }catch(error){
        console.log(error)
    }
}



function saveFavorite(itemUrl){
    // looping to select favorite

    resultsArray.forEach((item)=>{

        //Check that the favorites item does not already contain the same favorites url
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item;
            //Show save confirmation for 2 sec 

            saveConfirmed.hidden = false;
            setTimeout(()=> {
                saveConfirmed.hidden = true;
            }, 2000);

            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    })
}


//Remove item from favorites

function removeFavorite(itemUrl){
    if(favorites[itemUrl]){
        delete favorites[itemUrl];
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }

}

//on load
getNasaPic();
 