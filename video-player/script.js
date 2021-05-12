const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlay(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}
function playPause(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }else{
        video.pause();
       showPlay();
    }
}

video.addEventListener('ended', showPlay);


// Progress Bar ---------------------------------- //

function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}
// update progress

function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration)* 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)}/`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //



// Ev listeners 

playBtn.addEventListener('click', playPause);
video.addEventListener('click', playPause);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);