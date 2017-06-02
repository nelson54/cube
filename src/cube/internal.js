/**
 * Created by cazimmerman on 6/2/2017.
 */
var f = {
    FRONT: 0,
    RIGHT: 1,
    BACK: 2,
    LEFT: 3,
    UP: 4,
    DOWN: 5
};

function Piece(valueArray) {
    this.faces = valueArray;

    this.setFace = function(face, color) {
        this.faces[face] = color;
    };

    this.getFace = function(face) {
        return this.faces[face];
    };

    this.hasFace = function(face) {
        return this.faces[face] != 0;
    };
}

function Cube() {
    this.pieces = [];

    this.cubeInit = function(data) {
        this.pieces.push(new Piece([data[f.FRONT][0][0], 0, 0, data[f.LEFT][0][2], data[f.UP][2][2]], 0));

        this.pieces.push(new Piece([data[f.FRONT][0][1], 0, 0, 0, data[f.UP][1][2], 0]));

        this.pieces.push(new Piece([data[f.FRONT][0][2], data[f.RIGHT][0][0], 0, 0, data[f.UP][0][2], 0]));

        this.pieces.push(new Piece([data[f.FRONT][1][0], 0, 0, data[f.LEFT][1][2], 0, 0]));

        this.pieces.push(new Piece([data[f.FRONT][1][2], data[f.RIGHT][1][0], 0, 0, 0, 0]));

        this.pieces.push(new Piece([data[f.FRONT][2][0], 0, 0, data[f.LEFT][2][2], 0, data[f.DOWN][0][2]]));

        this.pieces.push(new Piece([data[f.FRONT][2][1], 0, 0, 0, 0, data[f.DOWN][1][2]]));

        this.pieces.push(new Piece([data[f.FRONT][2][2], data[f.RIGHT][2][0], 0, 0, 0, data[f.DOWN][2][2]]));

        this.pieces.push(new Piece([0, data[f.RIGHT][2][1], 0, 0, 0, data[f.DOWN][2][1]]));

        this.pieces.push(new Piece([0, data[f.RIGHT][0][1], 0, 0, data[f.UP][0][1], 0]));

        this.pieces.push(new Piece([0, 0, 0, data[f.LEFT][0][1], data[f.UP][2][1], 0]));

        this.pieces.push(new Piece([0, 0, 0, data[f.LEFT][2][1], 0, data[f.DOWN][0][1]]));

        this.pieces.push(new Piece([0, data[f.RIGHT][0][2], data[f.BACK][0][0], 0, data[f.UP][0][0], 0]));

        this.pieces.push(new Piece([0, 0, data[f.BACK][0][1], 0, data[f.UP][1][0], 0]));

        this.pieces.push(new Piece([0, 0, data[f.BACK][0][2], data[f.LEFT][0][0], data[f.UP][2][0], 0]));

        this.pieces.push(new Piece([0, data[f.RIGHT][1][2], data[f.BACK][1][0], 0, 0, 0]));

        this.pieces.push(new Piece([0, 0, data[f.BACK][1][2], data[f.LEFT][1][0], 0, 0]));

        this.pieces.push(new Piece([0, data[f.RIGHT][2][2], data[f.BACK][2][0], 0, 0, data[f.DOWN][2][0]]));

        this.pieces.push(new Piece([0, 0, data[f.BACK][2][1], 0, 0, data[f.DOWN][1][0]]));

        this.pieces.push(new Piece([0, 0, data[f.BACK][2][2], data[f.LEFT][2][0], 0, data[f.DOWN][0][0]]));
    }
}