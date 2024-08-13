import { createShip } from "./ships.js";

export function createGameboard() {
  const boardSize = 9;
  const gameboard = createFields(boardSize);
  let ships = [];

  function getBoard() {
    return gameboard;
  }

  function getBoardSize() {
    return boardSize;
  }

  // function _checkFieldForShip(newFields, curShips) {
  //   function arraysHaveEqualSubArray(arr1, arr2) {
  //     return arr1.some((subArray1) =>
  //       arr2.some(
  //         (subArray2) => JSON.stringify(subArray1) === JSON.stringify(subArray2)
  //       )
  //     );
  //   }
  // }

  function _getShipFields (shipFields,length, direction) {
    for (let i = 0; i < length - 1; i++) {
      if (direction === "x") {
        let nextField = [shipFields[i][0] + 1, shipFields[i][1]];
        shipFields.push(nextField);
      } else if (direction === "y") {
        let nextField = [shipFields[i][0], shipFields[i][1] + 1];
        shipFields.push(nextField);
      }
    }
  }

  function placeShip(location, length, direction) {
    if (direction === "x" && location[0] + (length - 1) > boardSize) {
      return;
    }
    if (direction === "y" && location[1] + (length - 1) > boardSize) {
      return;
    }

    let shipFields = [location];
    _getShipFields(shipFields, length, direction)
    
    // _checkFieldForShip (shipFields, ships)
    ships.push({ ship: createShip(length), coordinates: shipFields });
  }

  function listShips() {
    return ships;
  }

  function receiveAttack(field) {
    if (gameboard[field[1]][field[0]].status === "hit") {
      return null;
    } else {
      gameboard[field[1]][field[0]].status = "hit";
      for (let i = 0; i < ships.length; i++) {
        let ship = ships[i].ship;
        let coordinates = ships[i].coordinates;
        for (let j = 0; j < coordinates.length; j++) {
          if (JSON.stringify(coordinates[j]) === JSON.stringify(field)) {
            ship.hit();
          }
        }
      }
    }
  }

  return { placeShip, listShips, receiveAttack, getBoardSize, getBoard };
}

function createFields(boardSize) {
  let board = [];
  for (let i = 0; i <= boardSize; i++) {
    let row = [];
    for (let j = 0; j <= boardSize; j++) {
      let field = { status: null };
      row.push(field);
    }
    board.push(row);
  }
  return board;
}
