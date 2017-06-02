const MathUtils = require('./math-utils');

function sample(min, max) {
    return MathUtils.randomBetween(min, max)
}

module.exports = class View {
    constructor(x, x1, y, y1) {
        this.x = x;
        this.x1 = x1;
        this.y = y;
        this.y1 = y1;
    }

    sampleN(n) {
        let samples = [];

        for (let i=0; i<n; i++) {
            samples.push({x: this.sampleX(), y: this.sampleY()});
        }

        return samples;
    }

    sampleX() {
        return sample(this.x, this.x1);
    }

    sampleY() {
        return sample(this.x, this.x1);
    }
}