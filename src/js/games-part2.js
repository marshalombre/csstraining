// Suite du fichier games.js - Les 4 derniers jeux

// ===============================
// JEU 5: MEMORY
// ===============================
class MemoryGame {
    constructor(gridId) {
        this.grid = document.getElementById(gridId);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.symbols = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎮', '🎯', '🎲', '🎵', '🎸', '🎹', '🎺', '🎻', '🎼', '🏆', '🏅', '⚽', '🏀'];
        this.init();
    }

    init() {
        this.grid.innerHTML = '';
        const cardSymbols = this.symbols.slice(0, 18).concat(this.symbols.slice(0, 18));
        cardSymbols.sort(() => Math.random() - 0.5);

        cardSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.textContent = '';
            card.addEventListener('click', () => this.flipCard(card));
            this.grid.appendChild(card);
            this.cards.push(card);
        });
    }

    flipCard(card) {
        if (this.flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        if (!this.startTime) {
            this.start();
        }

        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            document.getElementById('memory-moves').textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        setTimeout(() => {
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;

                if (this.matchedPairs === 18) {
                    this.gameWin();
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }
            this.flippedCards = [];
        }, 600);
    }

    start() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('memory-time').textContent = elapsed;
        }, 1000);
    }

    reset() {
        clearInterval(this.timerInterval);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        document.getElementById('memory-moves').textContent = '0';
        document.getElementById('memory-time').textContent = '0';
        this.init();
    }

    gameWin() {
        clearInterval(this.timerInterval);
        const time = Math.floor((Date.now() - this.startTime) / 1000);
        alert(`Bravo ! Terminé en ${this.moves} coups et ${time} secondes !`);
    }
}

// ===============================
// JEU 6: 2048
// ===============================
class Game2048 {
    constructor(gridId) {
        this.gridElement = document.getElementById(gridId);
        this.size = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = 0;
        this.init();

        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.move(e.key);
            }
        });
    }

    init() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        document.getElementById('2048-score').textContent = '0';
        this.addRandomTile();
        this.addRandomTile();
        this.render();
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    render() {
        this.gridElement.innerHTML = '';
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile-2048';
                const value = this.grid[i][j];
                if (value !== 0) {
                    tile.textContent = value;
                    tile.dataset.value = value;
                }
                this.gridElement.appendChild(tile);
            }
        }
    }

    move(direction) {
        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        if (direction === 'ArrowLeft') {
            for (let i = 0; i < this.size; i++) {
                const row = this.mergeRow(this.grid[i]);
                this.grid[i] = row;
            }
        } else if (direction === 'ArrowRight') {
            for (let i = 0; i < this.size; i++) {
                const row = this.mergeRow(this.grid[i].reverse()).reverse();
                this.grid[i] = row;
            }
        } else if (direction === 'ArrowUp') {
            for (let j = 0; j < this.size; j++) {
                const col = this.grid.map(row => row[j]);
                const merged = this.mergeRow(col);
                for (let i = 0; i < this.size; i++) {
                    this.grid[i][j] = merged[i];
                }
            }
        } else if (direction === 'ArrowDown') {
            for (let j = 0; j < this.size; j++) {
                const col = this.grid.map(row => row[j]).reverse();
                const merged = this.mergeRow(col).reverse();
                for (let i = 0; i < this.size; i++) {
                    this.grid[i][j] = merged[i];
                }
            }
        }

        if (JSON.stringify(this.grid) !== oldGrid) {
            this.addRandomTile();
            this.render();

            if (this.isGameOver()) {
                alert(`Game Over! Score: ${this.score}`);
            }
        }
    }

    mergeRow(row) {
        // Remove zeros
        let newRow = row.filter(x => x !== 0);

        // Merge
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                this.score += newRow[i];
                document.getElementById('2048-score').textContent = this.score;
                if (this.score > this.bestScore) {
                    this.bestScore = this.score;
                    document.getElementById('2048-best').textContent = this.bestScore;
                }
                newRow.splice(i + 1, 1);
            }
        }

        // Add zeros
        while (newRow.length < this.size) {
            newRow.push(0);
        }

        return newRow;
    }

    isGameOver() {
        // Check for empty cells
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) return false;
            }
        }

        // Check for possible merges
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size - 1; j++) {
                if (this.grid[i][j] === this.grid[i][j + 1] || this.grid[j][i] === this.grid[j + 1][i]) {
                    return false;
                }
            }
        }

        return true;
    }

    reset() {
        this.init();
    }
}

// ===============================
// JEU 7: FLAPPY BIRD
// ===============================
class FlappyBirdGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 600;

        this.bird = { x: 50, y: 300, velocity: 0, gravity: 0.5, jump: -10, size: 20 };
        this.pipes = [];
        this.score = 0;
        this.bestScore = 0;
        this.isPlaying = false;
        this.gameLoop = null;
        this.pipeGap = 150;
        this.pipeWidth = 50;
        this.frameCount = 0;

        this.canvas.addEventListener('click', () => {
            if (this.isPlaying) this.bird.velocity = this.bird.jump;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && this.isPlaying) {
                e.preventDefault();
                this.bird.velocity = this.bird.jump;
            }
        });

        this.draw();
    }

    draw() {
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw bird
        this.ctx.fillStyle = '#ff0';
        this.ctx.fillRect(this.bird.x - this.bird.size / 2, this.bird.y - this.bird.size / 2, this.bird.size, this.bird.size);

        // Draw pipes
        this.ctx.fillStyle = '#0f0';
        this.pipes.forEach(pipe => {
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.top);
            this.ctx.fillRect(pipe.x, pipe.top + this.pipeGap, this.pipeWidth, this.canvas.height - pipe.top - this.pipeGap);
        });
    }

    update() {
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;

        // Add pipes
        if (this.frameCount % 90 === 0) {
            const top = Math.random() * (this.canvas.height - this.pipeGap - 100) + 50;
            this.pipes.push({ x: this.canvas.width, top: top });
        }

        // Move pipes
        this.pipes.forEach(pipe => {
            pipe.x -= 2;

            // Score
            if (pipe.x + this.pipeWidth === this.bird.x) {
                this.score++;
                document.getElementById('flappy-score').textContent = this.score;
            }
        });

        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => pipe.x > -this.pipeWidth);

        // Collision detection
        if (this.bird.y < 0 || this.bird.y > this.canvas.height) {
            this.gameOver();
            return;
        }

        this.pipes.forEach(pipe => {
            if (this.bird.x + this.bird.size / 2 > pipe.x && this.bird.x - this.bird.size / 2 < pipe.x + this.pipeWidth) {
                if (this.bird.y - this.bird.size / 2 < pipe.top || this.bird.y + this.bird.size / 2 > pipe.top + this.pipeGap) {
                    this.gameOver();
                }
            }
        });

        this.frameCount++;
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
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            document.getElementById('flappy-best').textContent = this.bestScore;
        }
        this.score = 0;
        document.getElementById('flappy-score').textContent = '0';
        this.bird = { x: 50, y: 300, velocity: 0, gravity: 0.5, jump: -10, size: 20 };
        this.pipes = [];
        this.frameCount = 0;
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
// JEU 8: SPACE INVADERS
// ===============================
class SpaceInvadersGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;

        this.player = { x: 275, y: 550, width: 50, height: 30, speed: 5 };
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.score = 0;
        this.lives = 3;
        this.isPlaying = false;
        this.gameLoop = null;
        this.keys = {};

        this.initEnemies();

        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ' && this.isPlaying) {
                e.preventDefault();
                this.shoot();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        this.draw();
    }

    initEnemies() {
        this.enemies = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                this.enemies.push({
                    x: col * 60 + 50,
                    y: row * 50 + 50,
                    width: 40,
                    height: 30,
                    active: true
                });
            }
        }
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw player
        this.ctx.fillStyle = '#0f0';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Draw enemies
        this.ctx.fillStyle = '#f00';
        this.enemies.forEach(enemy => {
            if (enemy.active) {
                this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        });

        // Draw bullets
        this.ctx.fillStyle = '#fff';
        this.bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, 4, 10);
        });

        this.enemyBullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, 4, 10);
        });
    }

    shoot() {
        this.bullets.push({
            x: this.player.x + this.player.width / 2 - 2,
            y: this.player.y,
            speed: 7
        });
    }

    update() {
        // Move player
        if (this.keys['ArrowLeft'] && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }

        // Move bullets
        this.bullets.forEach(bullet => bullet.y -= bullet.speed);
        this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        this.enemyBullets.forEach(bullet => bullet.y += bullet.speed);
        this.enemyBullets = this.enemyBullets.filter(bullet => bullet.y < this.canvas.height);

        // Enemy shooting
        if (Math.random() < 0.02) {
            const activeEnemies = this.enemies.filter(e => e.active);
            if (activeEnemies.length > 0) {
                const enemy = activeEnemies[Math.floor(Math.random() * activeEnemies.length)];
                this.enemyBullets.push({
                    x: enemy.x + enemy.width / 2 - 2,
                    y: enemy.y + enemy.height,
                    speed: 3
                });
            }
        }

        // Collision detection - bullets with enemies
        this.bullets.forEach((bullet, bIndex) => {
            this.enemies.forEach(enemy => {
                if (enemy.active &&
                    bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
                    bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                    enemy.active = false;
                    this.bullets.splice(bIndex, 1);
                    this.score += 10;
                    document.getElementById('invaders-score').textContent = this.score;
                }
            });
        });

        // Collision detection - enemy bullets with player
        this.enemyBullets.forEach((bullet, index) => {
            if (bullet.x > this.player.x && bullet.x < this.player.x + this.player.width &&
                bullet.y > this.player.y && bullet.y < this.player.y + this.player.height) {
                this.enemyBullets.splice(index, 1);
                this.lives--;
                document.getElementById('invaders-lives').textContent = this.lives;
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        });

        // Win condition
        if (this.enemies.every(e => !e.active)) {
            alert('Victory!');
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
        document.getElementById('invaders-score').textContent = '0';
        document.getElementById('invaders-lives').textContent = '3';
        this.bullets = [];
        this.enemyBullets = [];
        this.player.x = 275;
        this.initEnemies();
        this.draw();
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        alert(`Game Over! Score: ${this.score}`);
    }
}

// Initialisation des jeux 5-8
let memoryGame, game2048, flappyGame, invadersGame;

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les jeux 5-8
    memoryGame = new MemoryGame('memory-grid');
    game2048 = new Game2048('2048-grid');
    flappyGame = new FlappyBirdGame('flappy-canvas');
    invadersGame = new SpaceInvadersGame('invaders-canvas');

    // Event listeners pour Memory
    document.getElementById('memory-start').addEventListener('click', () => memoryGame.reset());
    document.getElementById('memory-reset').addEventListener('click', () => memoryGame.reset());

    // Event listeners pour 2048
    document.getElementById('2048-start').addEventListener('click', () => game2048.reset());
    document.getElementById('2048-reset').addEventListener('click', () => game2048.reset());

    // Event listeners pour Flappy Bird
    document.getElementById('flappy-start').addEventListener('click', () => flappyGame.start());
    document.getElementById('flappy-reset').addEventListener('click', () => flappyGame.reset());

    // Event listeners pour Space Invaders
    document.getElementById('invaders-start').addEventListener('click', () => invadersGame.start());
    document.getElementById('invaders-reset').addEventListener('click', () => invadersGame.reset());

    console.log('✅ Jeux 5-8 initialisés');
    console.log('🎉 Tous les jeux sont prêts !');
});
