import Ship from "./ship";

class Gameboard 
{
    constructor(size = 10) 
    {
        this.size = size;

        this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
    }

    placeShip(ship, coord, alignment)
    {
        const shipSize = ship.length;
        let Xend = 0;
        let Yend = 0;

        if(alignment == 'horizontal')
        {
            Xend = coord[0] + (shipSize - 1);
            Yend = coord[1];
            if(Xend >= this.size)
            {
                return 'invalid horizontal position';
            }

            for(let x = coord[0]; x <= Xend; x++)
            {
                if(this.board[x][Yend] !== null)
                {
                    return 'position occupied';
                }
            }
            
            for(let x = coord[0]; x <= Xend; x++)
            {
                this.board[x][Yend] = ship;
            }
        }
        else if(alignment == 'vertical')
        {
            Xend = coord[0];
            Yend = coord[1] + (shipSize - 1);
            if(Yend >= this.size)
            {
                return 'invalid vertial position';
            }

            for(let y = coord[1]; y <= Yend; y++)
            {
                if(this.board[Xend][y] !== null)
                {
                    return 'position occupied';
                }
            }

            for(let y = coord[1]; y <= Yend; y++)
            {
                this.board[Xend][y] = ship;
            }
        }

        receiveAttack(coord)
        {

        }

        areAllShipsSunk()
        {
            
        }

    }
}