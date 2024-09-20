export default class Ship 
{
    constructor(name, length, alignment) 
    {
        this.name = name;
        this.length = length;
        this.alignment = alignment;
        this.hits = 0;
    }
    
    hit()
    {
        this.hits++;
    }

    isSunk()
    {
        return this.hits >= this.length;
    }
}

