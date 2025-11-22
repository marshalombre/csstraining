// Jeu 2048
export class Game2048 {
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
        let newRow = row.filter(x => x !== 0);

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

        while (newRow.length < this.size) {
            newRow.push(0);
        }

        return newRow;
    }

    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) return false;
            }
        }

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
