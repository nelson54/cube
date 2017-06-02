const Grid = require('./vision/grid');
const Camera = require('./vision/camera');
const MathUtils = require('./vision/math-utils');

document.addEventListener("DOMContentLoaded", function(event) {
    let isDone = true;
    let framerate = 10/1000;
    let camera = new Camera();
    let sampleSize = 100;
    camera.start();

    camera.getFrame();

    setInterval(function() {
        if(isDone) {
            isDone = false;
            camera.getFrame(canvas)
                .then(()=> displaySamples(sampleSize));
        }

    }, framerate);

    let size = 300;
    let sampleWidth = 5;

    let grid = window.grid = new Grid(size, size);

    let canvas = document.getElementById('grid');
    let ctx = canvas.getContext('2d');

    console.log('test');

    function displaySamples(n) {

        let imageData = ctx.getImageData(0, 0, size, size).data;

        grid
            .forEach((view=> {
                let samples = view.sampleN(n).map((sample) => {
                    getRgb(imageData, sample.x, sample.y);
                    let rgb = getRgb(imageData, sample.x, sample.y);

                    ctx.fillStyle = MathUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
                    ctx.fillRect(sample.x, sample.y, sampleWidth, sampleWidth);
                    return rgb;
                });

                view.addSamples(samples);
            }));


        isDone = true;
    }

    function normalize(x, y) {
        return (y * size + x) * 4;
    }

    function getRgb(data, x, y) {
        let base = normalize(x, y);

        return {r:data[base], g:data[base+1], b:data[base+2]};
    }
});