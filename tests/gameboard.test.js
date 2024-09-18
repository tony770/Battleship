import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

describe('Gameboard', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        gameboard = new Gameboard(10);
        ship = new Ship(3);
    });

    describe('placeShip()', () => {
        test('places a ship horizontally at a valid position', () => {
            const result = gameboard.placeShip(ship, [0, 0], 'horizontal');
            expect(result).toBe('Ship placed successfully');
            expect(gameboard.board[0][0]).toBe(1);
            expect(gameboard.board[1][0]).toBe(1);
            expect(gameboard.board[2][0]).toBe(1);
        });

        test('places a ship vertically at a valid position', () => {
            const result = gameboard.placeShip(ship, [0, 0], 'vertical');
            expect(result).toBe('Ship placed successfully');
            expect(gameboard.board[0][0]).toBe(1);
            expect(gameboard.board[0][1]).toBe(1);
            expect(gameboard.board[0][2]).toBe(1);
        });

        test('returns error if ship exceeds horizontal boundary', () => {
            const result = gameboard.placeShip(ship, [8, 0], 'horizontal');
            expect(result).toBe('Invalid horizontal position');
        });

        test('returns error if ship exceeds vertical boundary', () => {
            const result = gameboard.placeShip(ship, [0, 8], 'vertical');
            expect(result).toBe('Invalid vertical position');
        });

        test('returns error if position is already occupied', () => {
            gameboard.placeShip(ship, [0, 0], 'horizontal');
            const result = gameboard.placeShip(new Ship(2), [0, 0], 'vertical');
            expect(result).toBe('Position occupied');
        });
    });

    describe('receiveAttack()', () => {
        test('records a hit when a ship is attacked', () => {
            gameboard.placeShip(ship, [0, 0], 'horizontal');
            const result = gameboard.receiveAttack([0, 0]);
            expect(result).toBe('Hit');
            expect(gameboard.board[0][0]).toBe('hit');
        });

        test('records a miss when attacking an empty cell', () => {
            const result = gameboard.receiveAttack([0, 0]);
            expect(result).toBe('Miss');
            expect(gameboard.board[0][0]).toBe('miss');
        });

        test('returns error if cell is already hit', () => {
            gameboard.placeShip(ship, [0, 0], 'horizontal');
            gameboard.receiveAttack([0, 0]); 
            const result = gameboard.receiveAttack([0, 0]);
            expect(result).toBe('Already hit');
        });

        test('returns error if cell is already missed', () => {
            gameboard.receiveAttack([0, 0]);
            const result = gameboard.receiveAttack([0, 0]);
            expect(result).toBe('Already missed');
        });
    });

    describe('areAllShipsSunk()', () => {
        test('returns false if not all ships are sunk', () => {
            gameboard.placeShip(ship, [0, 0], 'horizontal');
            expect(gameboard.areAllShipsSunk()).toBe(false);
        });

        test('returns true if all ships are sunk', () => {
            gameboard.placeShip(ship, [0, 0], 'horizontal');
            gameboard.receiveAttack([0, 0]);
            gameboard.receiveAttack([1, 0]);
            gameboard.receiveAttack([2, 0]);
            expect(gameboard.areAllShipsSunk()).toBe(true);
        });
    });
});