export function createShip (size) {
    let hits = 0;
    let length = size;
    function hit () {
        hits += 1;
    }
    function isSunk () {
        if (hits >= length) {
            return true;
        } else {
            return false;
        }
    }
    return { hit, isSunk }
}