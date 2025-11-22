// Jeu Flappy Bird
export class FlappyBirdGame {
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

        this.ctx.fillStyle = '#ff0';
        this.ctx.fillRect(this.bird.x - this.bird.size / 2, this.bird.y - this.bird.size / 2, this.bird.size, this.bird.size);

        this.ctx.fillStyle = '#0f0';
        this.pipes.forEach(pipe => {
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.top);
            this.ctx.fillRect(pipe.x, pipe.top + this.pipeGap, this.pipeWidth, this.canvas.height - pipe.top - this.pipeGap);
        });
    }

    update() {
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;

        if (this.frameCount % 90 === 0) {
            const top = Math.random() * (this.canvas.height - this.pipeGap - 100) + 50;
            this.pipes.push({ x: this.canvas.width, top: top });
        }

        this.pipes.forEach(pipe => {
            pipe.x -= 2;

            if (pipe.x + this.pipeWidth === this.bird.x) {
                this.score++;
                document.getElementById('flappy-score').textContent = this.score;
            }
        });

        this.pipes = this.pipes.filter(pipe => pipe.x > -this.pipeWidth);

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
