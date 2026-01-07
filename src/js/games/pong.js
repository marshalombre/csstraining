// Jeu Pong
export class PongGame {
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
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = '#fff';
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(300, 0);
        this.ctx.lineTo(300, 400);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.dy *= -1;
        }

        if (this.ball.x - this.ball.radius < this.paddle1.x + this.paddle1.width &&
            this.ball.y > this.paddle1.y && this.ball.y < this.paddle1.y + this.paddle1.height) {
            this.ball.dx *= -1;
        }

        if (this.ball.x + this.ball.radius > this.paddle2.x &&
            this.ball.y > this.paddle2.y && this.ball.y < this.paddle2.y + this.paddle2.height) {
            this.ball.dx *= -1;
        }

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
