const player1Board = document.querySelector('.player1Board');
const player2Board = document.querySelector('.player2Board');

export function createBoard()
{
    for(let r = 0; r < 10; r++)
    {
        for(let c = 0; c < 10; c++)
        {
            // Create a tile for player 1
            let player1Tile = document.createElement('div');
            player1Tile.id = 'p1-' + r.toString() + '-' + c.toString();
            player1Tile.classList.add('tile');
            player1Board.appendChild(player1Tile);

            // Create a tile for player 2
            let player2Tile = document.createElement('div');
            player2Tile.id = 'p2-' + r.toString() + '-' + c.toString();
            player2Tile.classList.add('tile');
            player2Board.appendChild(player2Tile);
        }
    }
}