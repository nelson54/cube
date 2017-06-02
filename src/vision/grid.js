let View = require('./view');

function apply(context, func) {
    return (args) => func.apply(context, args);
}

module.exports = class Grid {
    constructor(height, width) {
        this.boxes = [];
        this.height = height;
        this.width = width;

        this.sizeOfGridSquares = this.findSizeOfGridSquares();
        this.boxes = this.buildBoxes();
    }

    map(func) {
        return this.boxes.map(apply(this, func))
    }

    each(func) {
        this.boxes.forEach(apply(this, func))
    }

    findSizeOfGridSquares() {
        return Math.min(this.height, this.width) / 3;
    }

    buildBoxes() {
        let boxes = [], baseX, baseY;

        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                baseX = x * this.sizeOfGridSquares;
                baseY = y * this.sizeOfGridSquares;
                boxes.push(new View(baseX, baseX + this.sizeOfGridSquares, baseY, baseY + this.sizeOfGridSquares))
            }
        }

        return boxes;
    }
}
