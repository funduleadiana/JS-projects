const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const apiKey = 'u7fTkZxeDg9nGPabVcY4J7LWYLa7HKlnSIFa9qJtzIM'; 
const count = 50;
let photosArr = [];


const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`



function displayPhotos(){
    
    photosArr.forEach((photo)=> {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })

}

async function getPhotos() {
try{
    const response = await fetch(apiUrl);
    photosArr = await response.json()
    displayPhotos()
    console.log(photosArr)
}catch(error){
    alert('Oops no photos to display', error)
}
}

getPhotos();