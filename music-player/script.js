const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');




const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('nxt');

const songs = [
    {
        name: 'mp-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto',
    },
    {
        name: 'mp-2',
        displayName: 'Seven Nation Army remix',
        artist: 'Jacinto', 
    },
    {
        name: 'mp-3',
        displayName: 'Goodnight Disco',
        artist: 'Jacinto',
    },
    {
        name: 'metric-1',
        displayName: 'unknown',
        artist: 'Jacinto',
    }

]

let isPlaying = false;
let songIndex = 0;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', ()=> (isPlaying)? pauseSong() : playSong());

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);