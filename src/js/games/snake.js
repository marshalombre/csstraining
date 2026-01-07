// Jeu Snake
export class SnakeGame {
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
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0f0';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

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

        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;
        }

        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

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
