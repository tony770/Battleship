const player1Board = document.querySelector('.player1Board');
const player2Board = document.querySelector('.player2Board');
const gameInfo = document.querySelector('.gameInfo');

function createBoard()
{
    for(let r = 0; r < 10; r++)
    {
        for(let c = 0; c < 10; c++)
        {
            // Create a tile for player 1
            let player1Tile = document.createElement('div');
            player1Tile.id = 'p1' + r.toString() + c.toString();
            player1Tile.classList.add('p1tile');
            player1Board.appendChild(player1Tile);

            // Create a tile for player 2
            let player2Tile = document.createElement('div');
            player2Tile.id = 'p2' + r.toString() + c.toString();
            player2Tile.classList.add('p2tile');
            player2Board.appendChild(player2Tile);
        }
    }
}

function displayShipsOnScreen(player, shipCoordinates)
{
    const playerID = player == 'real' ? 'p1' : 'p2';
    shipCoordinates.forEach(ship => {
        ship.coordinates.forEach(([x, y]) => {
            const cell = document.getElementById(`${playerID}${x}${y}`);
            if(cell)
            {
                cell.classList.add('ship');
            }
        })
    })
}

function changeGameInfo(player, text)
{
    gameInfo.textContent = player + text;
}


export { createBoard, displayShipsOnScreen, changeGameInfo };