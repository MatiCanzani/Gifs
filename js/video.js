const api = {
    key: 'ATDGCeQL69UOv824DfYCEyprGDROLk3l',
    uploadUrl: 'http://upload.giphy.com/v1/gifs',
    baseUrl: 'http://api.giphy.com/v1/gifs',

};

let recorderGif;
let recorderVideo;
let localGif;
const data = new FormData();
let blob;

const startGif = () => {
    document.getElementById('startGif').style.display = 'none';
    document.getElementById('gif-creation-cntr').style.display = 'block';
    document.getElementById('rec-cntr').style.display = 'none';
    getStream();

}
const reviewDarkmode = () => {
    storagetheme = localStorage.getItem("storagetheme");
    if(storagetheme !== 'day'){
    localStorage.setItem("storagetheme", "night");
    document.getElementById('css-style').href = './Sass/sailor-night.css';
    }
    if(storagetheme == 'day'){
    localStorage.setItem("storagetheme", "day");
    document.getElementById('css-style').href = './Sass/sailor-day.css';
    }
}

const getStream = async () => {
    video.srcObject = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 832,
            height: 434
        }
    })
    video.play();
};

const capture = () => {
    document.getElementById('cap-cntr').style.display = 'none';
    document.getElementById('rec-cntr').style.display = 'block';
    document.getElementById('upper-text-bar').textContent = 'Capturando tu Gifo';
    recorderGif = RecordRTC(video.srcObject, ({
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    }));
    recorderGif.startRecording();

};

const stopRec = () => {
    recorderGif.stopRecording(() => {
        document.getElementById('upper-text-bar').textContent = 'Vista Previa';
        document.getElementById('rec-cntr').style.display = 'none';
        document.getElementById('video').style.display = 'none';
        document.getElementById('x-btn').style.display = 'none';
        document.getElementById('prev-btn').style.display = 'block';
        blob = recorderGif.getBlob();
        let myGifUrl = URL.createObjectURL(blob);
        const videoCntr = document.getElementById('gif-play');
        const gifPreview = document.createElement('img');
        gifPreview.id = 'prev-gif';
        gifPreview.className = 'gif-preview';
        gifPreview.src = myGifUrl;
        videoCntr.appendChild(gifPreview);
        // document.getElementById('prev-gif').src = myGifUrl;
        data.append('file', blob, 'myGif.gif');
        data.get('file');
        console.log(data.get('file'));
        console.log(myGifUrl);
        const videoReady = document.getElementById('video-done');
        const gifReady = document.createElement('img');
        gifReady.id = 'video-ready';
        gifReady.src = myGifUrl;
        videoReady.appendChild(gifReady);
    })
}

const downloadGif = () => {
    invokeSaveAsDialog(blob);
};


const gifUpload = async () => {
    try {
        let myId = await fetch(`${api.uploadUrl}?api_key=${api.key}`, {
            method: "POST",
            body: data,
            //mode: "no-cors"
        })
        const response = await myId.json();
        localGif =  response.data.id
        return localGif
    }
    catch (err) {
        console.log(err)
    }
}

let gifLocals = JSON.parse(localStorage.getItem('Gif Id')) || [];
console.log(gifLocals);
const uploadLocal = (id) => {
    console.log(id);
    console.log(gifLocals);
    gifLocals.push(localGif);
    localStorage.setItem('Gif Id', JSON.stringify(gifLocals));
}

const uploadGif = async () => {
    uploadLocal(await gifUpload());
    document.getElementById('video').style.display = 'none';
    document.getElementById('loading-cntr').style.visibility = 'visible';
    document.getElementById('cancel-btn').style.display = 'block';
    document.getElementById('prev-btn').style.display = 'none';
    ready();
    document.getElementById('prev-gif').style.display = 'none';

}

const reCapture = () => {
    document.getElementById('prev-btn').style.display = 'none';
    capture();
}

const cancel = () => {
    document.getElementById('cancel-btn').style.display = 'none';
    stopRec();
}

const ready = () => {
    setTimeout(() => {
        document.getElementById('gif-creation-cntr').style.display = 'none';
        document.getElementById('ready-cntr').style.display = 'block';
    }, 3000);
    document.getElementById('cancel-btn').style.display = 'none';
    
    //videoReady.src = (myVideoUrl);
}

const startAgain = () =>{
    document.getElementById('ready-cntr').style.display = 'none';
    document.getElementById('startGif').style.display = 'none';
    document.getElementById('loading-cntr').style.visibility = 'hidden';
    document.getElementById('upper-text-bar').textContent = 'Un Chequeo Antes de Empezar';
    document.getElementById('cap-cntr').style.display = 'block';
    document.getElementById('gif-creation-cntr').style.display = 'block';
    document.getElementById('video').style.display = 'block';
    getStream();

}

window.onload = () => {
    reviewDarkmode();

}



