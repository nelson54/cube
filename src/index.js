const Grid = require('./vision/grid');

let size = 300;
let sampleSize = 5;

let grid = new Grid(size, size);

let canvas = document.getElementById('grid');
let ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, size, size);

function displaySamples(n) {


    grid
        .map((view) => view.sampleN(n))
        .reduce((samples, all) => {
            return all.concat(samples);
        }, []);

    for (let sample of samples) {
        ctx.fillStyle = 'green';
        ctx.fillRect(sample.x, sample.y, sampleSize, sampleSize);
    }
}