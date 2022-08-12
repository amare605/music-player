// const
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// 歌曲名稱
const songs = ['hey', 'summer', 'ukulele'];

// 記錄第幾首歌曲
let songIndex = 2;

// 載入這DOM 就撥這首歌
loadSong(songs[songIndex]);


// function
// 載入歌曲
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


// pause song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// 檢查是要play還是paused
function isPlaying(){
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
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


// 顯示進度條
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


// 設定進度條
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}



// event listener
// 播放或暫停
playBtn.addEventListener('click', isPlaying);


// 換歌
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// 顯示歌曲進度條
audio.addEventListener('timeupdate', updateProgress);

// 點選進度條
progressContainer.addEventListener('click', setProgress);


// 歌結束自動換下一首
audio.addEventListener('ended' ,nextSong);
