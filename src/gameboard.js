import { createShip } from "./ships.js";

export function createGameboard() {
  const boardSize = 9;
  const board = createFields(boardSize);
  console.log(board);
  let ships = [];

  function placeShip(location, length, direction) {
    let shipFields = [location];

    if (direction === "x" && ((location[0] + (length - 1)) > boardSize)) {
      return
    }

    if (direction === "y" && (location[1] + (length - 1)) > boardSize) {
      return
    }

    for (let i = 0; i < (length - 1); i++) {
      if (direction === "x") {
        let nextField = [shipFields[i][0] + 1, shipFields[i][1]];
        shipFields.push(nextField);
      } else if (direction === "y") {
        let nextField = [shipFields[i][0], shipFields[i][1] + 1];
        shipFields.push(nextField);
      }
    }
    ships.push({ ship: createShip(length), coordinates: shipFields });
  }

  function listShips() {
    return ships;
  }

  return { placeShip, listShips };
}

function createFields(boardSize) {
  let board = [];
  for (let i = 0; i <= boardSize; i++) {
    let row = [];
    for (let j = 0; j <= boardSize; j++) {
      let field = { value: null, status: "open" };
      row.push(field);
    }
    board.push(row);
  }
  return board;
}

createGameboard();
