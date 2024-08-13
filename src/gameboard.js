import { createShip } from "./ships.js";

export function createGameboard() {
  const boardSize = 9;
  const gameboard = _createFields(boardSize);
  let ships = [];

  function getBoard() {
    return gameboard;
  }

  function getBoardSize() {
    return boardSize;
  }

  function _createFields(boardSize) {
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

  function _isShipOnCoordinates(newCoordinates) {
    for (let i = 0; i < ships.length; i++) {
      const oldCoordinates = ships[i].coordinates;
      const isMatch = oldCoordinates.some((oldField) =>
        newCoordinates.some(
          (newField) => JSON.stringify(oldField) === JSON.stringify(newField)
        )
      );
      if (isMatch) return true;
    }
    return false;
  }

  function _getShipFields(location, length, direction) {
    let shipCoordinates = [location];
    for (let i = 0; i < length - 1; i++) {
      if (direction === "x") {
        let nextField = [shipCoordinates[i][0] + 1, shipCoordinates[i][1]];
        shipCoordinates.push(nextField);
      } else if (direction === "y") {
        let nextField = [shipCoordinates[i][0], shipCoordinates[i][1] + 1];
        shipCoordinates.push(nextField);
      }
    }
    return shipCoordinates;
  }

  function _isShipOffBoard(location, length, direction) {
    return (
      (direction === "x" && location[0] + (length - 1) > boardSize) ||
      (direction === "y" && location[1] + (length - 1) > boardSize)
    );
  }

  function placeShip(location, length, direction) {
    if (_isShipOffBoard(location, length, direction)) return;
    const shipCoordinates = _getShipFields(location, length, direction);
    if (_isShipOnCoordinates(shipCoordinates)) return;
    ships.push({ ship: createShip(length), coordinates: shipCoordinates });
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

  function allSunk () {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  return { placeShip, listShips, receiveAttack, getBoardSize, getBoard, allSunk };
}
