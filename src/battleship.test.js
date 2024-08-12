import { createShip } from "./ships.js";
import { createGameboard } from "./gameboard.js";

describe("Ships", () => {
  test("ship is only sunk when enough hits", () => {
    let ship = createShip(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  test("places ship along x axis", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "x");
    const ships = gameboard.listShips();
    expect(ships[0].coordinates).toEqual([
      [2, 2],
      [3, 2],
    ]);
  });

  test("places ship along y axis", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "y");
    const ships = gameboard.listShips();
    expect(ships[0].coordinates).toEqual([
      [2, 2],
      [2, 3],
    ]);
  });

  test("ships cant be placed outside of board", () => {
    const gameboard = createGameboard();
    let maxSize = gameboard.getBoardSize();
    gameboard.placeShip([maxSize, 0], 2, "x");
    gameboard.placeShip([0, maxSize], 2, "y");
    const ships = gameboard.listShips();
    expect(ships).toEqual([]);
  });



  // test("attack misses shot", () => {

  // })

  // test("save missed attacks", () => {

  // })

  // test("ships left", () => {

  // })
});
