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
            if(Xend >= this.size)
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
            if(Yend >= this.size)
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