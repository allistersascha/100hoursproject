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

const playIconCont = document.getElementById("playIcon");
const muteIconCont = document.getElementById("muteIcon");
const audioPlayerCont = document.getElementById("audioContainer");
const seekSlider = document.getElementById("seekSlider");
const volumeSlider = document.getElementById("volumeSlider")
const audio = document.querySelector('audio');
const durationCont = document.getElementById('duration');
const currentTimeCont = document.getElementById('currentTime');
const outputCont = document.getElementById('volumeOutput');

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) audioPlayerCont.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerCont.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}
