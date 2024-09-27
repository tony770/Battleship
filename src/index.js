import './styles.css';
import { initializeGame } from "./game";
import { createBoard } from './ui';

const startButton = document.querySelector('.start')
let gameInProgress = false;

window.onload = function()
{
    createBoard();
}

startButton.addEventListener('click', () => {
    if(!gameInProgress)
    {
        initializeGame();
        gameInProgress = true;
    }
})
