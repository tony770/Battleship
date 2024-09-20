import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./player";

function initializeGame()
{
    const playerBoard = new Gameboard();
    const computerBoard = new Gameboard();

    const player = new Player('Person', playerBoard);
    const computer = new Player('computer', computerBoard);

    //place real player ships (preset positions)
    const playerPresets = getPresetShips();
    playerPresets.forEach(({ ship, startPosition }) => {
        player.gameboard.placeShip(ship, startPosition, ship.alignment);
    })

    //place computer ships (random positions)
    defaultShipPresets.forEach(preset => {
        placeRandomShip(preset.name, preset.size, computer.gameboard);
    })
}

function getPresetShips()
{
    return [
        {
            ship: new Ship('Carrier', 5, 'horizontal'),
            startPosition: [0, 0]
        },
        {
            ship: new Ship('Battleship', 4, 'vertical'),
            startPosition: [2, 3]
        },
        {
            ship: new Ship('Cruiser', 3, 'horizontal'),
            startPosition: [5, 5]
        },
        {
            ship: new Ship('Submarine', 3, 'vertical'),
            startPosition: [7, 2]
        },
        {
            ship: new Ship('Destroyer', 2, 'horizontal'),
            startPosition: [9, 8]
        }
    ]
}

function placeRandomShip(name, length, gameboard)
{
    const newShip = new Ship(name, length, Math.random() < 0.5 ? 'horizontal' : 'vertical');
    const maxAttempts = 100;

    for(let attempts = 0; attempts < maxAttempts; attempts++)
    {
        const [x, y] = getRandomCoordinate(gameboard.size);
        if(gameboard.placeShip(newShip, [x, y], newShip.alignment))
        {
            return true;
        }
    }
    return false;
}

function getRandomCoordinate(size)
{
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    return [x, y];
}

const defaultShipPresets = [
    { name: 'Carrier', size: 5 },
    { name: 'Battleship', size: 4 },
    { name: 'Cruiser', size: 3 },
    { name: 'Submarine', size: 3 },
    { name: 'Destroyer', size: 2 },
];