const MathUtils = require('./math-utils');

function sample(min, max) {
    return MathUtils.randomBetween(min, max)
}

function avgByKey(arr, key) {}


module.exports = class View {
    constructor(x, x1, y, y1) {
        this.x = x;
        this.x1 = x1;
        this.y = y;
        this.y1 = y1;

        this.samples = [];
        this.avg = {r:0, g: 0, b:0};
        this.totals = {r:0, g: 0, b:0};
    }

    sampleN(n) {
        let samples = [];

        for (let i=0; i<n; i++) {
            samples.push({x: this.sampleX(), y: this.sampleY()});
        }

        return samples;
    }

    addSamples(samples) {
        this.samples = this.samples.concat(samples);

        samples.forEach((sample)=> {
            this.totals.r += sample.r;
            this.totals.g += sample.g;
            this.totals.b += sample.b;
        });

        this.avg.r = this.totals.r / this.samples.length;
        this.avg.g = this.totals.g / this.samples.length;
        this.avg.b = this.totals.b / this.samples.length;
    }

    processSamples() {

    }

    sampleX() {
        return sample(this.x, this.x1);
    }

    sampleY() {
        return sample(this.y, this.y1);
    }
}