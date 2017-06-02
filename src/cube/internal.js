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

var compass = [{
        above: f.UP,
        below: f.DOWN,
        toLeft: f.LEFT,
        toRight: f.RIGHT
    },
    {
        above: f.UP,
        below: f.DOWN,
        toLeft: f.FRONT,
        toRight: f.BACK
    },
    {
        above: f.UP,
        below: f.DOWN,
        toLeft: f.RIGHT,
        toRight: f.LEFT
    },
    {
        above: f.UP,
        below: f.DOWN,
        toLeft: f.BACK,
        toRight: f.FRONT
    },
    {
        above: f.RIGHT,
        below: f.LEFT,
        toLeft: f.BACK,
        toRight: f.FRONT
    },
    {
        above: f.LEFT,
        below: f.RIGHT,
        toLeft: f.BACK,
        toRight: f.FRONT
    }
];

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

function Cube(colors, data) {
    this.pieces = [];

    this.colors = colors;

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
    };

    this.getPiece = function(face1, face2, face3 = null) {
        if (face3 == null) {
            return this.getEdge(face1, face2)
        } else {
            return this.getCorner(face1, face2, face3)
        }
    };

    this.getEdge = function(face1, face2) {
        for(var piece = 0; piece < this.pieces.length; ++piece) {
            var isCorrectEdge = true;
            for(var face = 0; face < 6; ++face) {
                if((face == face1 || face == face2) && !this.pieces[piece].hasFace(face)) {
                    isCorrectEdge = false;
                    break;
                }
                else if(face != face1 && face != face2 && this.pieces[piece].hasFace(face)) {
                    isCorrectEdge = false;
                    break;
                }
            }
            if(isCorrectEdge) {
                return this.pieces[piece];
            }
        }
    };

    this.getCorner = function(face1, face2, face3) {
        for(var piece = 0; piece < this.pieces.length; ++piece) {
            var isCorrectEdge = true;
            for(var face = 0; face < 6; ++face) {
                if((face == face1 || face == face2 || face == face3) && !this.pieces[piece].hasFace(face)) {
                    isCorrectEdge = false;
                    break;
                }
                else if(face != face1 && face != face2 && face != face3 && this.pieces[piece].hasFace(face)) {
                    isCorrectEdge = false;
                    break;
                }
            }
            if(isCorrectEdge) {
                return this.pieces[piece];
            }
        }
    };
}