module.exports = class MathUtils {
    static randomBetween (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}