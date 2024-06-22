function toggleNavLinks(){
    let x = document.getElementById("navLinks");
    if (x.style.display === "block"){
        x.style.display = "none";
    }else{
        x.style.display = "block";
    }
}

const deleteBtn = document.querySelectorAll('.del')
const artistItem = document.querySelectorAll('.artistName')
const songItem = document.querySelectorAll('.songName')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteSong)
})

Array.from(artistItem).forEach((el)=>{
    el.addEventListener('submit', changeArtistName)
})

Array.from(artistItem).forEach((el)=>{
    el.addEventListener('submit', addBio)
})
Array.from(artistItem).forEach((el)=>{
    el.addEventListener('submit', changeBio)
})
Array.from(artistItem).forEach((el)=>{
    el.addEventListener('submit', addArtistImg)
})

Array.from(songItem).forEach((el)=>{
    el.addEventListener('submit', addSong)
})

async function deleteSong(){
    const songId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/deleteSong', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'songIdFromJSFile': songId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function addBio(){
    const artistId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/createBio', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'artistIdFromJSFile': artistId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addArtistImg(){
    const artistId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/addArtistImg', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'artistIdFromJSFile': artistId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function changeBio(){
    const artistId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/changeBio', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'artistIdFromJSFile': artistId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
async function changeArtistName(){
    const artistId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/changeArtistName', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'artistIdFromJSFile': artistId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
async function changeArtistImg(){
    const artistId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/changeArtistImg', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'artistIdFromJSFile': artistId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
async function addSong(){
    const songId = this.parentNode.dataset.id
    try{
        const response = await fetch('artistdash/addSong', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'songIdFromJSFile': songId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

function toggleNavLinks(){
    let x = document.getElementById("navLinks");
    if (x.style.display === "block"){
        x.style.display = "none";
    }else{
        x.style.display = "block";
    }
}
// load sound via <audio tag
const audioElement = document.querySelector("audio");
const audioCtx = new AudioContext();
const track = audioCtx.createMediaElementSource(audioElement);

// Player controls and attributes
const playButton = document.querySelector(".player-play-btn");
const playIcon = playButton.querySelector(".player-icon-play");
const pauseIcon = playButton.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");
const volumeControl = document.querySelector(".player-volume")

window.addEventListener("load", () => {
  // Set times after page load
  setTimes();

  // Update progress bar and time values as audio plays
  audioElement.addEventListener("timeupdate", () => {
    progressUpdate();
    setTimes();
  });

  // Play button toggle
  playButton.addEventListener("click", () => {
    // check if context is in suspended state (autoplay policy)
    // By default browsers won't allow you to autoplay audio.
    // You can overide by finding the AudioContext state and resuming it after a user interaction like a "click" event.
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play();

      playButton.dataset.playing = "true";
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
    }
  });

  // if the track ends reset the player
  audioElement.addEventListener("ended", () => {
    playButton.dataset.playing = "false";
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    progressFilled.style.flexBasis = "0%";
    audioElement.currentTime = 0;
    audioElement.duration = audioElement.duration;
  });

  // Bridge the gap between gainNode and AudioContext so we can manipulate volume (gain)
  const gainNode = audioCtx.createGain();
  const volumeControl = document.querySelector(".player-volume");
  volumeControl.addEventListener("change", () => {
    gainNode.gain.value = volumeControl.value;
  });

  track.connect(gainNode).connect(audioCtx.destination);

  // Display currentTime and duration properties in real time
  function setTimes() {
    playerCurrentTime.textContent = new Date(audioElement.currentTime * 1000)
      .toISOString()
      .substr(11, 8);
    playerDuration.textContent = new Date(audioElement.duration * 1000)
      .toISOString()
      .substr(11, 8);
  }

  // Update player timeline progress visually
  function progressUpdate() {
    const percent = (audioElement.currentTime / audioElement.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
  }

  // Scrub player timeline to skip forward and back on click for easier UX
  let mousedown = false;

  function scrub(event) {
    const scrubTime =
      (event.offsetX / progress.offsetWidth) * audioElement.duration;
    audioElement.currentTime = scrubTime;
  }

  progress.addEventListener("click", scrub);
  progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));



}, false)