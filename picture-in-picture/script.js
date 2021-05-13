const videoEl = document.getElementById('video');
const button = document.getElementById('button');


//Selecting a media stream

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadedmetadata = () => {
            videoEl.play();
        }

    }catch(error){
        console.log(error);
    }
}



button.addEventListener('click', async () => {
    //Disable the button
    button.disabled = true;
    //Start Picture in Picture
    await videoEl.requestPictureInPicture();
    //Reset the button
    button.disabled = false;
});


selectMediaStream();