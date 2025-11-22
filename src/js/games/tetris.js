// Jeu Tetris
export class TetrisGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 300;
        this.canvas.height = 600;
        this.blockSize = 30;
        this.cols = 10;
        this.rows = 20;
        this.board = [];
        this.score = 0;
        this.level = 1;
        this.currentPiece = null;
        this.gameLoop = null;
        this.isPlaying = false;
        this.isPaused = false;

        this.pieces = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[0, 1, 0], [1, 1, 1]], // T
            [[1, 1, 0], [0, 1, 1]], // S
            [[0, 1, 1], [1, 1, 0]], // Z
            [[1, 0, 0], [1, 1, 1]], // L
            [[0, 0, 1], [1, 1, 1]] // J
        ];
        this.colors = ['#00f0f0', '#f0f000', '#a000f0', '#00f000', '#f00000', '#f0a000', '#0000f0'];

        this.init();
        this.setupControls();
    }

    init() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = Array(this.cols).fill(0);
        }
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    this.ctx.fillStyle = this.colors[this.board[y][x] - 1];
                    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                }
            }
        }

        if (this.currentPiece) {
            this.ctx.fillStyle = this.colors[this.currentPiece.color];
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        this.ctx.fillRect(
                            (this.currentPiece.x + x) * this.blockSize,
                            (this.currentPiece.y + y) * this.blockSize,
                            this.blockSize - 1,
                            this.blockSize - 1
                        );
                    }
                }
            }
        }
    }

    newPiece() {
        const index = Math.floor(Math.random() * this.pieces.length);
        this.currentPiece = {
            shape: this.pieces[index],
            color: index,
            x: Math.floor(this.cols / 2) - 1,
            y: 0
        };
    }

    collision() {
        const shape = this.currentPiece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newX = this.currentPiece.x + x;
                    const newY = this.currentPiece.y + y;
                    if (newX < 0 || newX >= this.cols || newY >= this.rows) return true;
                    if (newY >= 0 && this.board[newY][newX]) return true;
                }
            }
        }
        return false;
    }

    merge() {
        const shape = this.currentPiece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    this.board[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.color + 1;
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.cols).fill(0));
                linesCleared++;
                y++;
            }
        }
        if (linesCleared > 0) {
            this.score += linesCleared * 100 * this.level;
            document.getElementById('tetris-score').textContent = this.score;
        }
    }

    moveDown() {
        this.currentPiece.y++;
        if (this.collision()) {
            this.currentPiece.y--;
            this.merge();
            this.clearLines();
            this.newPiece();
            if (this.collision()) {
                this.gameOver();
            }
        }
    }

    moveLeft() {
        this.currentPiece.x--;
        if (this.collision()) this.currentPiece.x++;
    }

    moveRight() {
        this.currentPiece.x++;
        if (this.collision()) this.currentPiece.x--;
    }

    rotate() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        const prev = this.currentPiece.shape;
        this.currentPiece.shape = rotated;
        if (this.collision()) this.currentPiece.shape = prev;
    }

    update() {
        if (!this.isPaused) {
            this.moveDown();
            this.draw();
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            switch (e.key) {
                case 'ArrowLeft': this.moveLeft(); this.draw(); break;
                case 'ArrowRight': this.moveRight(); this.draw(); break;
                case 'ArrowDown': this.moveDown(); this.draw(); break;
                case 'ArrowUp': this.rotate(); this.draw(); break;
                case ' ': while (!this.collision()) this.moveDown(); this.draw(); break;
            }
        });
    }

    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.newPiece();
            this.gameLoop = setInterval(() => this.update(), 500);
        }
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    reset() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.isPaused = false;
        this.score = 0;
        this.level = 1;
        document.getElementById('tetris-score').textContent = '0';
        document.getElementById('tetris-level').textContent = '1';
        this.init();
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        alert(`Game Over! Score: ${this.score}`);
    }
}
