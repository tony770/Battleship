import Ship from "../src/ship";

describe('ship class', () => {
    test('should create a ship with correct length', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });

    test('should register a hit on the ship', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
        expect(ship.isSunk()).toBe(false);
    });

    test('should identify when the ship is sunk', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
})