import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./player";
import { displayShipsOnScreen, changeGameInfo } from "./ui";

let currentPlayer = 'Player';
let gameInProgress = false;

function initializeGame()
{
    gameInProgress = true;
    changeGameInfo('Game in progress!!')
    const playerBoard = new Gameboard();
    const computerBoard = new Gameboard();

    const realPlayer = new Player('Person', playerBoard);
    const computer = new Player('Computer', computerBoard);

    //place real player ships (preset positions)
    const playerPresets = getPresetShips();
    playerPresets.forEach(({ ship, startPosition }) => {
        realPlayer.gameboard.placeShip(ship, startPosition, ship.alignment);
    })

    //place computer ships (random positions)
    defaultShipPresets.forEach(preset => {
        placeRandomShip(preset.name, preset.size, computer.gameboard);
    })

    //display player ships
    const playerShips = realPlayer.gameboard.getAllShipCoordinates();
    displayShipsOnScreen('real', playerShips);

    //display computer ships (hidden)
    const computerShips = computer.gameboard.getAllShipCoordinates();
    displayShipsOnScreen('computer', computerShips);

    const p2Tiles = document.querySelectorAll('.p2tile');
    p2Tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const tileCoord = tile.id.slice(-2);
            const [x, y] = [tileCoord[0], tileCoord[1]];
            playerAttack(realPlayer.gameboard, computer.gameboard, [x, y], tile)
        })
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
            startPosition: [6, 1]
        },
        {
            ship: new Ship('Destroyer', 2, 'horizontal'),
            startPosition: [8, 8]
        }
    ]
}

function placeRandomShip(name, length, gameboard)
{
    const newShip = new Ship(name, length, Math.random() < 0.5 ? 'horizontal' : 'vertical');
    let placed = false;

    while(!placed)
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

function playerAttack(playerGameboard, computerGameboard, coord, tile)
{
    if (!gameInProgress) return;

    const hitConfirm = computerGameboard.receiveAttack(coord);
    if(hitConfirm == 'Miss')
    {
        tile.classList.add('miss');
    }
    else if(hitConfirm == 'Hit')
    {
        tile.classList.add('hit');
        if(checkWin(computerGameboard))
        {
            gameInProgress = false;
            return;
        }
    }
    setTimeout(() => {
        computerAttack(playerGameboard);
    }, 1000);
    switchTurn();
    return;
}

function computerAttack(gameboard)
{
    if (!gameInProgress) return;

    let [x, y] = getRandomValidCoord(gameboard);
    const tile = document.getElementById('p1' + x + y)
    const hitConfirm = gameboard.receiveAttack([x, y]);
    if(hitConfirm == 'Miss')
    {
        tile.classList.add('miss')
    }
    else if(hitConfirm == 'Hit')
    {
        tile.classList.add('hit');
        if(checkWin(gameboard))
        {
            gameInProgress = false;
            return;
        }
    }
    switchTurn();
    return;
}

function getRandomValidCoord(gameboard)
{
    let x, y;
    do{
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while(gameboard.isAlreadyAttacked([x, y]));

    return [x, y]
}

function switchTurn()
{
    currentPlayer = (currentPlayer == 'Player') ? 'Computer' : 'Player';
    changeGameInfo(currentPlayer + ", it's your turn!!");
    if (currentPlayer == 'Player') {
        enableComputerBoard(); // Enable clicks on the computer's board for the player
    } else {
        disableComputerBoard(); // Disable clicks on the computer's board during its turn
    }
}

function checkWin(gameboard) {
    const gameover = gameboard.areAllShipsSunk();
    console.log('Game over status:', gameover);

    if(gameover)
    {
        changeGameInfo(currentPlayer + ' Wins');
        disableComputerBoard();
        return true;
    }
    return false;
}

function disableComputerBoard()
{
    const p2Tiles = document.querySelectorAll('.p2tile')
    p2Tiles.forEach(tile => {
        tile.style.pointerEvents = 'none';
    })
}

function enableComputerBoard() {
    const p2Tiles = document.querySelectorAll('.p2tile');
    p2Tiles.forEach(tile => {
        tile.style.pointerEvents = 'auto'; // Enable click events
    });
}


export { initializeGame };