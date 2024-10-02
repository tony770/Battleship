export default class Gameboard 
{
    constructor(size = 10) 
    {
        this.size = size;
        this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
        this.ships = [];
    }

    placeShip(ship, coord, alignment)
    {
        const shipID = this.ships.length + 1;
        this.ships.push(ship);
        const shipSize = ship.length;
        let Xend = 0;
        let Yend = 0;

        if(coord[0] < 0 || coord[1] < 0)
        {
            return false;
        }

        if(alignment == 'horizontal')
        {
            Xend = coord[0] + (shipSize - 1);
            Yend = coord[1];
            if(Xend >= this.size || !this.isAreaFree(coord[0], coord[1], shipSize, 'horizontal'))
            {
                return false;
            }

            for(let x = coord[0]; x <= Xend; x++)
            {
                if(this.board[x][Yend] !== null)
                {
                    return false;
                }
            }
            
            for(let x = coord[0]; x <= Xend; x++)
            {
                ship.coordinates.push([x, Yend]);
                this.board[x][Yend] = shipID;
            }
        }
        else if(alignment == 'vertical')
        {
            Xend = coord[0];
            Yend = coord[1] + (shipSize - 1);
            if(Yend >= this.size || !this.isAreaFree(coord[0], coord[1], shipSize, 'vertical'))
            {
                return false;
            }

            for(let y = coord[1]; y <= Yend; y++)
            {
                if(this.board[Xend][y] !== null)
                {
                    return false;
                }
            }

            for(let y = coord[1]; y <= Yend; y++)
            {
                ship.coordinates.push([Xend, y]);
                this.board[Xend][y] = shipID;
            }
        }
        return true;
    }

    isAreaFree(x, y, length, orientation) {
        let startX = x - 1; // Start one cell before the ship
        let endX = x + (orientation === 'horizontal' ? length : 1); // End one cell after the ship
        let startY = y - 1; // Start one cell above the ship
        let endY = y + (orientation === 'vertical' ? length : 1); // End one cell below the ship
    
        // Make sure we don't go out of bounds
        startX = Math.max(0, startX);
        endX = Math.min(this.size - 1, endX);
        startY = Math.max(0, startY);
        endY = Math.min(this.size - 1, endY);
    
        // Check the area around the ship's intended position
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (this.board[i][j] !== null) {
                    return false; // Adjacent ship detected
                }
            }
        }
        return true;
    }

    receiveAttack(coord)
    {
        const x = coord[0], y = coord[1];
        const target = this.board[x][y];

        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return 'Invalid attack position';
        }

        if(target == 'miss')return 'Already missed';
        if(target == 'hit')return 'Already hit';
        if(target == null)
        {
            this.board[x][y] = 'miss';
            return 'Miss';
        }

        const shipID = target;
        const ship = this.ships[shipID - 1];
        ship.hit();
        this.board[x][y] = 'hit';
        return 'Hit';
    }

    isAlreadyAttacked(coord)
    {
        const target = this.board[coord[0]][coord[1]];
        if(target == 'hit' || target == 'miss')
        {
            return true;
        }
        return false
    }

    areAllShipsSunk()
    {
        return this.ships.every(ship => ship.isSunk());
    }

    getAllShipCoordinates() {
        const shipCoordinates = [];
        this.ships.forEach(ship => {
            shipCoordinates.push({
                name: ship.name,
                coordinates: ship.coordinates
            });
        });
        return shipCoordinates;
    }
}