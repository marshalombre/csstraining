// ===============================
// NAVIGATION MENU PRINCIPAL
// ===============================
function initMainMenu() {
    const mainMenuButtons = document.querySelectorAll('.main-menu-btn');
    const mainSections = document.querySelectorAll('.main-section');

    mainMenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;

            // Remove active class from all buttons and sections
            mainMenuButtons.forEach(btn => btn.classList.remove('active'));
            mainSections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(`${section}-section`).classList.add('active');
        });
    });
}

function initGameTabs() {
    const gameTabButtons = document.querySelectorAll('.game-tab-button');
    const gamePanes = document.querySelectorAll('.game-pane');

    gameTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameId = button.dataset.game;

            // Remove active class from all tabs and panes
            gameTabButtons.forEach(btn => btn.classList.remove('active'));
            gamePanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            button.classList.add('active');
            document.getElementById(`${gameId}-game`).classList.add('active');
        });
    });
}

// Ce fichier contient les implémentations simplifiées des jeux
// Pour une version complète de production, chaque jeu devrait être dans son propre fichier

// Les fonctions mathématiques sont exportées depuis math-tabs.js
// Nous allons seulement initialiser les jeux ici

// ===============================
// JEU 1: TETRIS
// ===============================
class TetrisGame {
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

        // Draw board
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    this.ctx.fillStyle = this.colors[this.board[y][x] - 1];
                    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                }
            }
        }

        // Draw current piece
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
                y++; // Check same row again
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

// ===============================
// JEU 2: PONG
// ===============================
class PongGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 400;

        this.paddle1 = { x: 10, y: 150, width: 10, height: 100, dy: 0 };
        this.paddle2 = { x: 580, y: 150, width: 10, height: 100, dy: 0 };
        this.ball = { x: 300, y: 200, radius: 8, dx: 4, dy: 4 };
        this.score = { player: 0, ai: 0 };
        this.isPlaying = false;
        this.gameLoop = null;

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.paddle1.y = e.clientY - rect.top - this.paddle1.height / 2;
        });

        this.draw();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw center line
        this.ctx.strokeStyle = '#fff';
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(300, 0);
        this.ctx.lineTo(300, 400);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw paddles
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        // Move ball
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Ball collision with top/bottom
        if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.dy *= -1;
        }

        // Ball collision with paddles
        if (this.ball.x - this.ball.radius < this.paddle1.x + this.paddle1.width &&
            this.ball.y > this.paddle1.y && this.ball.y < this.paddle1.y + this.paddle1.height) {
            this.ball.dx *= -1;
        }

        if (this.ball.x + this.ball.radius > this.paddle2.x &&
            this.ball.y > this.paddle2.y && this.ball.y < this.paddle2.y + this.paddle2.height) {
            this.ball.dx *= -1;
        }

        // Scoring
        if (this.ball.x < 0) {
            this.score.ai++;
            document.getElementById('pong-score-ai').textContent = this.score.ai;
            this.resetBall();
        }
        if (this.ball.x > this.canvas.width) {
            this.score.player++;
            document.getElementById('pong-score-player').textContent = this.score.player;
            this.resetBall();
        }

        // AI paddle movement
        if (this.ball.x > 300) {
            if (this.paddle2.y + this.paddle2.height / 2 < this.ball.y) {
                this.paddle2.y += 3;
            } else {
                this.paddle2.y -= 3;
            }
        }

        this.draw();
    }

    resetBall() {
        this.ball.x = 300;
        this.ball.y = 200;
        this.ball.dx *= -1;
    }

    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.gameLoop = setInterval(() => this.update(), 1000 / 60);
        }
    }

    reset() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.score = { player: 0, ai: 0 };
        document.getElementById('pong-score-player').textContent = '0';
        document.getElementById('pong-score-ai').textContent = '0';
        this.resetBall();
        this.draw();
    }
}

// ===============================
// JEU 3: SNAKE
// ===============================
class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.gridSize = 20;
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.food = this.randomFood();
        this.score = 0;
        this.highScore = 0;
        this.isPlaying = false;
        this.gameLoop = null;

        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            switch (e.key) {
                case 'ArrowUp': if (this.direction.y === 0) this.direction = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (this.direction.y === 0) this.direction = { x: 0, y: 1 }; break;
                case 'ArrowLeft': if (this.direction.x === 0) this.direction = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (this.direction.x === 0) this.direction = { x: 1, y: 0 }; break;
            }
        });

        this.draw();
    }

    randomFood() {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
        };
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#0f0';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw food
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }

    update() {
        const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

        // Check collision with walls
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('snake-score').textContent = this.score;
            this.food = this.randomFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.gameLoop = setInterval(() => this.update(), 150);
        }
    }

    reset() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById('snake-high').textContent = this.highScore;
        }
        this.score = 0;
        document.getElementById('snake-score').textContent = '0';
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.food = this.randomFood();
        this.draw();
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        alert(`Game Over! Score: ${this.score}`);
        this.reset();
    }
}

// ===============================
// JEU 4: BREAKOUT
// ===============================
class BreakoutGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 400;

        this.paddle = { x: 250, y: 370, width: 100, height: 10 };
        this.ball = { x: 300, y: 350, radius: 8, dx: 4, dy: -4 };
        this.bricks = [];
        this.score = 0;
        this.lives = 3;
        this.isPlaying = false;
        this.gameLoop = null;

        this.initBricks();

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.paddle.x = e.clientX - rect.left - this.paddle.width / 2;
        });

        this.draw();
    }

    initBricks() {
        const rows = 5;
        const cols = 8;
        const brickWidth = 70;
        const brickHeight = 20;
        const padding = 5;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.bricks.push({
                    x: col * (brickWidth + padding) + padding,
                    y: row * (brickHeight + padding) + 30,
                    width: brickWidth,
                    height: brickHeight,
                    active: true,
                    color: `hsl(${row * 60}, 70%, 50%)`
                });
            }
        }
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw bricks
        this.bricks.forEach(brick => {
            if (brick.active) {
                this.ctx.fillStyle = brick.color;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });

        // Draw paddle
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);

        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Wall collision
        if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.canvas.width) {
            this.ball.dx *= -1;
        }
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.dy *= -1;
        }

        // Paddle collision
        if (this.ball.y + this.ball.radius > this.paddle.y &&
            this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
            this.ball.dy *= -1;
        }

        // Brick collision
        this.bricks.forEach(brick => {
            if (brick.active &&
                this.ball.x > brick.x && this.ball.x < brick.x + brick.width &&
                this.ball.y > brick.y && this.ball.y < brick.y + brick.height) {
                this.ball.dy *= -1;
                brick.active = false;
                this.score += 10;
                document.getElementById('breakout-score').textContent = this.score;
            }
        });

        // Bottom collision (lose life)
        if (this.ball.y > this.canvas.height) {
            this.lives--;
            document.getElementById('breakout-lives').textContent = this.lives;
            if (this.lives > 0) {
                this.ball.x = 300;
                this.ball.y = 350;
                this.ball.dx = 4;
                this.ball.dy = -4;
            } else {
                this.gameOver();
            }
        }

        // Win condition
        if (this.bricks.every(brick => !brick.active)) {
            alert('You Win!');
            this.reset();
        }

        this.draw();
    }

    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.gameLoop = setInterval(() => this.update(), 1000 / 60);
        }
    }

    reset() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.score = 0;
        this.lives = 3;
        document.getElementById('breakout-score').textContent = '0';
        document.getElementById('breakout-lives').textContent = '3';
        this.ball = { x: 300, y: 350, radius: 8, dx: 4, dy: -4 };
        this.bricks = [];
        this.initBricks();
        this.draw();
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        alert(`Game Over! Score: ${this.score}`);
    }
}

// Initialisation au chargement - sera complété avec les 4 autres jeux
let tetrisGame, pongGame, snakeGame, breakoutGame;

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le menu principal
    initMainMenu();
    initGameTabs();

    // Initialiser les jeux
    tetrisGame = new TetrisGame('tetris-canvas');
    pongGame = new PongGame('pong-canvas');
    snakeGame = new SnakeGame('snake-canvas');
    breakoutGame = new BreakoutGame('breakout-canvas');

    // Event listeners pour Tetris
    document.getElementById('tetris-start').addEventListener('click', () => tetrisGame.start());
    document.getElementById('tetris-pause').addEventListener('click', () => tetrisGame.pause());
    document.getElementById('tetris-reset').addEventListener('click', () => tetrisGame.reset());

    // Contrôles clavier pour Tetris
    document.addEventListener('keydown', (e) => {
        if (!tetrisGame.isPlaying) return;
        switch (e.key) {
            case 'ArrowLeft': tetrisGame.moveLeft(); tetrisGame.draw(); break;
            case 'ArrowRight': tetrisGame.moveRight(); tetrisGame.draw(); break;
            case 'ArrowDown': tetrisGame.moveDown(); tetrisGame.draw(); break;
            case 'ArrowUp': tetrisGame.rotate(); tetrisGame.draw(); break;
            case ' ': while (!tetrisGame.collision()) tetrisGame.moveDown(); tetrisGame.draw(); break;
        }
    });

    // Event listeners pour Pong
    document.getElementById('pong-start').addEventListener('click', () => pongGame.start());
    document.getElementById('pong-reset').addEventListener('click', () => pongGame.reset());

    // Event listeners pour Snake
    document.getElementById('snake-start').addEventListener('click', () => snakeGame.start());
    document.getElementById('snake-reset').addEventListener('click', () => snakeGame.reset());

    // Event listeners pour Breakout
    document.getElementById('breakout-start').addEventListener('click', () => breakoutGame.start());
    document.getElementById('breakout-reset').addEventListener('click', () => breakoutGame.reset());

    console.log('✅ Jeux 1-4 initialisés');
});
