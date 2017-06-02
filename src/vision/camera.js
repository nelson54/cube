let ImageCapture = require('image-capture').ImageCapture;

function gotMedia(mediaStream, canvas) {
    // Extract video track.
    let videoDevice = mediaStream.getVideoTracks()[0];
    // Check if this device supports a picture mode...
    return new ImageCapture(videoDevice);
}

function stopCamera(error) {
    console.error(error);
    if (videoDevice) videoDevice.stop();  // turn off the camera
}

function processFrame(imageBitmap, canvas) {
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
}

module.exports = class Camera {
    constructor(){
        this.canvas = document.getElementById('camera');
    }

    start (){
        navigator.mediaDevices.getUserMedia({video: true})
            .then((mediaStream)=>gotMedia(mediaStream, this.canvas))
            .then((captureDevice)=> this.captureDevice = captureDevice)
            .catch((err)=>{console.log(err)});
    }

    getFrame(canvas) {
        if (this.captureDevice) {
            return this.captureDevice.grabFrame()
                .then((imageBitmap)=>processFrame(imageBitmap, canvas))
                .catch((err)=> {
                    console.error(err);
                });
        } else {
            return Promise.resolve();
        }
    }
};
