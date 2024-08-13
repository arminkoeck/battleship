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

  test("ships can't be stacked", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "x");
    gameboard.placeShip([2, 2], 2, "y");
    gameboard.placeShip([3, 0], 3, "y");
    const ships = gameboard.listShips();
    expect(ships[0].coordinates).toEqual([
      [2, 2],
      [3, 2],
    ]);
    expect(ships[1]).toBeUndefined();
  });

  test("Fields can be attacked and ships placed on those fields receive the attacks", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "x");
    const ships = gameboard.listShips();
    gameboard.receiveAttack([2, 2]);
    expect(ships[0].ship.isSunk()).toBe(false);
    gameboard.receiveAttack([3, 2]);
    expect(ships[0].ship.isSunk()).toBe(true);
  });

  test("same field can't be attacked twice", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "x");
    gameboard.receiveAttack([2, 2]);
    expect(gameboard.receiveAttack([2, 2])).toBeNull();
  });

  test("gameboard can check if all ships are sunk", () => {
    const gameboard = createGameboard();
    gameboard.placeShip([2, 2], 2, "x");
    gameboard.placeShip([5, 5], 3, "y");
    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);
    expect(gameboard.allSunk()).toBe(false);
    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([5, 6]);
    expect(gameboard.allSunk()).toBe(false);
    gameboard.receiveAttack([5, 7]);
    expect(gameboard.allSunk()).toBe(true);
  });

  // test("save missed attacks", () => {

  // })

  // test("ships left", () => {

  // })
});
