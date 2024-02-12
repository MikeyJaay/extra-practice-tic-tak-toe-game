// Step 1 - initilize game board
const gameBoard = document.getElementById('gameBoard');
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Starting player

function initializeGame() {
    gameBoard.innerHTML = ''; // Clear the game board
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('game-cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.addEventListener('click', handleCellClick, { once: true });
        gameBoard.appendChild(cellElement);
    });
}

document.addEventListener('DOMContentLoaded', initializeGame); // Initialize game when the DOM is fully loaded


// Step 2 - Creates Grid
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return; // Cell already filled or game not active
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Step 3 
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = gameState[condition[0]], b = gameState[condition[1]], c = gameState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    // Check for draw
    const isDraw = !gameState.includes('');
    if (isDraw) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Step 4 Restart game
const restartButton = document.getElementById('restartButton');

restartButton.addEventListener('click', initializeGame);

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X'; // Reset to starting player
    initializeGame(); // Re-initialize the game board
}


