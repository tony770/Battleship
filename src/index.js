import './styles.css';

import { initializeGame } from "./game";
import { createBoard } from './ui';

window.onload = function()
{
    initializeGame();
    createBoard();
}
