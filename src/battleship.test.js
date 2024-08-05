import { createShip } from "./ships.js";
import {} from "./gameboard.js"

// ships
test("not sunk before enough hits", () => {
    let first = createShip(3);
    first.hit();
    first.hit();
    expect(first.isSunk()).toBe(false);
})

test("sunk when enough hits", () => {
    let first = createShip(3);
    first.hit();
    first.hit();
    first.hit();
    expect(first.isSunk()).toBe(true);
})

// gameboard
test("places ship at specific coordinate", () => {

})

test("gameboard receives attacks on the proper fields", () => {
    
})

test("gameboard attack ", () => {
    
})

test("game won", () => {
    
})
