const videoElement = document.getElementById('video')
const button = document.getElementById('button')

// Prompt to select media screen, pass to video element; then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => videoElement.play();
    } catch (e) {
        console.log('error mediastream, ' + e);
    }
}

button.addEventListener('click', async () => {
   // Disable the button when we click on it
   button.disabled = true;

   // Start picture in picture
    await  videoElement.requestPictureInPicture();

    //Reset button
    button.disabled = false;
});

//On load
selectMediaStream();