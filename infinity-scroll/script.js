const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


const apiKey = 'u7fTkZxeDg9nGPabVcY4J7LWYLa7HKlnSIFa9qJtzIM'; 
const count = 30;
let photosArr = [];


const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }

}

//Helper function to Dry out code
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArr.length;
    photosArr.forEach((photo)=> {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })

}

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArr = await response.json()
        displayPhotos()
    
    }catch(error){
        alert('Oops no photos to display', error)
    }
}

window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});



getPhotos();