module.exports = class MathUtils {
    static randomBetween (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static numberToHex(number) {
        var hex = number.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    static rgbToHex(r, g, b) {
        return `#${MathUtils.numberToHex(r)}${MathUtils.numberToHex(g)}${MathUtils.numberToHex(b)}`
    }
}