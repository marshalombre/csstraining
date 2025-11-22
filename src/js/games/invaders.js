// Jeu Space Invaders
export class SpaceInvadersGame {
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

        this.ctx.fillStyle = '#0f0';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        this.ctx.fillStyle = '#f00';
        this.enemies.forEach(enemy => {
            if (enemy.active) {
                this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        });

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
        if (this.keys['ArrowLeft'] && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }

        this.bullets.forEach(bullet => bullet.y -= bullet.speed);
        this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        this.enemyBullets.forEach(bullet => bullet.y += bullet.speed);
        this.enemyBullets = this.enemyBullets.filter(bullet => bullet.y < this.canvas.height);

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
