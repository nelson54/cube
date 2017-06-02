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

    let grid = new Grid(size, size);

    let canvas = document.getElementById('grid');
    let ctx = canvas.getContext('2d');

    console.log('test');

    function displaySamples(n) {

        let imageData = ctx.getImageData(0, 0, size, size).data;

        let samples = grid
            .map((view) => view.sampleN(n))
            .reduce((all, samples) => {
                return all.concat(samples);
            }, []);

        for (let sample of samples) {
            getRgb(imageData, sample.x, sample.y);
            ctx.fillStyle = getRgb(imageData, sample.x, sample.y);
            ctx.fillRect(sample.x, sample.y, sampleWidth, sampleWidth);
        }
        isDone = true;
    }

    function normalize(x, y) {
        return (y * size + x) * 4;
    }

    function getRgb(data, x, y) {
        let base = normalize(x, y);
        let r = data[base],
            g = data[base+1],
            b = data[base+2];

        return MathUtils.rgbToHex(r, g, b);
    }
});