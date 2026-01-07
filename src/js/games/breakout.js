// Jeu Breakout
export class BreakoutGame {
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

        this.bricks.forEach(brick => {
            if (brick.active) {
                this.ctx.fillStyle = brick.color;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });

        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);

        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.canvas.width) {
            this.ball.dx *= -1;
        }
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.dy *= -1;
        }

        if (this.ball.y + this.ball.radius > this.paddle.y &&
            this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
            this.ball.dy *= -1;
        }

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
