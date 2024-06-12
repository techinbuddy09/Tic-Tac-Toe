

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const backgroundMusic = document.getElementById('background-music');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    // Play music after user interaction
    document.body.addEventListener('click', () => {
        backgroundMusic.play();
    }, { once: true });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.getAttribute('data-index');

            if (board[index] || !gameActive) return;

            cell.textContent = currentPlayer;
            board[index] = currentPlayer;

            if (checkWin()) {
                message.textContent = `${currentPlayer} wins!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell)) {
                message.textContent = `It's a tie!`;
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    });

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        message.textContent = '';
        currentPlayer = 'X';
        gameActive = true;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === currentPlayer);
        });
    }
});