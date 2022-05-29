const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash
const count = 30;
const apiKey = 'o-b5h9TGDkG5I5mp5nbUQSPuhMgcDWQ3kkPACRp7lM8';
const apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;




//Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Check if all images were loaded
function imageLoaded() {
    console.log('imageloaded')
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready)
    }
}

// Create elements for links & photos, add to dom
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total images ', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });


        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.description);
        // img.setAttribute('title', photo.description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        //Put img inside a then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from Unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (e) {
        //catch and show error
        console.log(e);
    }
}

//Check if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    console.log('scrolled')
    if (window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
        console.log('load more')
    }

    })

//On load
getPhotos();