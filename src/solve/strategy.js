/**
 * Created by tfinateri on 6/2/2017.
 */

window.solveRubik = window.solveRubik || {};

function (ns)  {
    var model;

    ns.setModel = function(inModel) {
        model = inModel;
    }

    function newTransform(face, clockwise) {
        return {
            face: face,
            clockwise: clockwise
        };
    }

    ns.Phase = {
        solve: function() {
            while (!this.isComplete()) {
                this.chooseTransforms();
                this.transformList.forEach(function(transform) {
                    model.executeTransform(transform);
                });
                transformList = [];
            }
        },
        transformList: [],
        isComplete: function() {
            return true;
        },
        chooseTransforms: function() {

        }
    }

    var faces = {
        FRONT: 0,
        RIGHT: 1,
        BACK: 2,
        LEFT: 3,
        UP: 4,
        DOWN: 5
    };

    function opposite(face) {
        if (face === faces.FRONT) {
            return faces.BACK;
        }
        if (face === faces.BACK) {
            return faces.FRONT;
        }
        if (face === faces.LEFT) {
            return faces.RIGHT;
        }
        if (face === faces.RIGHT) {
            return faces.LEFT;
        }
        if (face === faces.UP) {
            return faces.DOWN;
        }
        if (face === faces.DOWN) {
            return faces.UP;
        }
    }

    var BottomCross = Object.create(ns.Phase);
    BottomCross.isComplete = function() {
        return model.bottomCrossIsCorrect(faces.DOWN);
    };

    BottomCross.chooseTransforms = function() {
        var correctBottomCrossFace = model.getCorrectBottomCrossFace(); //want the face that it touches back, with its other color
        var correctBottomCrossPieces = model.getCorrectBottomCrossPieces();
        // ex return value: [ { touches: 1, other: 2 } ]
        if (correctBottomCrossPieces.empty()) {
            if (!correctBottomCrossFace.empty()) {
                var piece = correctBottomCrossFace[0];
                if (opposite(piece.touches) === piece.other) {
                    this.transformList.push(newTransform(faces.DOWN, true));
                    this.transformList.push(newTransform(faces.DOWN, true));
                }
                else if (piece.touches < piece.other || piece.touches == 3) {
                    this.transformList.push(newTransform(faces.DOWN, true));
                }
                else {
                    this.transformList.push(newTransform(faces.DOWN, false));
                }
                return;
            }
        }
        var edgePiece = model.getIncorrectEdgeByColor(faces.DOWN);
        //ex { color1: 1, face1: 2, color2: 5, face2: 4 }
        var correctPositions = [];
        correctBottomCrossPieces.forEach(function(elem) {
            correctPositions.push(elem.touches);
        });
        var touchesFace;
        if (face1 === faces.DOWN) {
            touchesFace = face2;
        }
        else {
            touchesFace = face1;
        }
        var pivotFace;
        if (touchesFace === faces.FRONT) {
            pivotFace = faces.LEFT;
        }
        else {
            pivotFace = touchesFace - 1;
        }
        if (edgePiece.color1 === edgePiece.face2 && edgePiece.color2 === edgePiece.face1) {
            this.transformList.push(newTransform(touchesFace, true));
            this.transformList.push(newTransform(faces.DOWN, false));
            this.transformList.push(newTransform(pivotFace, true));
            this.transformList.push(newTransform(faces.DOWN, true));
        }
        else if (edgePiece.color1 === edgePiece.face2 || edgePiece.color2 === edgePiece.face1) {
            if (touchesFace === opposite(color1) || touchesFace === opposite(color2)) {
                this.transformList.push(newTransform(touchesFace, true));
                        this.transformList.push(newTransform(faces.DOWN, true));
                this.transformList.push(newTransform(pivotFace, true));
                this.transformList.push(newTransform(faces.DOWN, false));
            }
            else {

            }
        }
    }



} (window.solveRubik);
