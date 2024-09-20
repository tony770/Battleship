export default class Player 
{
    constructor(name, gameboard)
    {
        this.name = name;
        this.gameboard = gameboard;
    }

    getPlayerName()
    {
        return this.name;
    }
}