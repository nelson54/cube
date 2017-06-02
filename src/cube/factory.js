module.exports = class CubeFactory {

    constructor() {
        this.sides = [];
    }

    addSide (array) {
        //array is a 3x3 of a side
        this.sides.push(array);
    }

    getCube () {
        var colors = [];
        for(var side = 0; side < this.sides.length; ++side) {
            colors.push(this.sides[side][1][1])
        }

        return new Cube(colors, this.sides);
    }
};