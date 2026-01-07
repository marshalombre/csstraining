
export class Game2048 {
    constructor(gridId) {
        this.gridContainer = document.getElementById(gridId);
        this.size = 4;
        this.tiles = []; // Flat array of active Tile objects
        this.score = 0;
        this.bestScore = 0;
        this.isMoving = false;

        this.init();

        this.handleInput = this.handleInput.bind(this);
        document.addEventListener('keydown', this.handleInput);
    }

    handleInput(e) {
        if (this.isMoving) return;

        const map = {
            'ArrowUp': 0, // Up
            'ArrowRight': 1, // Right
            'ArrowDown': 2, // Down
            'ArrowLeft': 3 // Left
        };

        if (map[e.key] !== undefined) {
            e.preventDefault();
            this.move(map[e.key]);
        }
    }

    init() {
        this.score = 0;
        this.tiles = [];
        this.updateScore(0);
        this.setupGrid();
        this.addRandomTile();
        this.addRandomTile();
    }

    reset() {
        this.init();
    }

    setupGrid() {
        this.gridContainer.innerHTML = '';
        // Create 16 static background cells
        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            this.gridContainer.appendChild(cell);
        }
    }

    // Helper to get position in styles
    getPositionStyle(x, y) {
        // The grid container has 16px padding on all sides
        // Inner space = 100% - 2*16px = 100% - 32px
        // The grid has: 4 cells + 3 gaps of 12px between them
        // Each cell width: (innerSpace - 3*12px) / 4 = (100% - 32px - 36px) / 4 = (100% - 68px) / 4
        // Position: padding + index * (cellWidth + gap)
        const padding = 16;
        const gap = 12;
        
        return {
            left: x === 0 ? `${padding}px` : `calc(${padding}px + ${x} * ((100% - 68px) / 4 + ${gap}px))`,
            top: y === 0 ? `${padding}px` : `calc(${padding}px + ${y} * ((100% - 68px) / 4 + ${gap}px))`
        };
    }

    addRandomTile() {
        if (this.tiles.length >= 16) return;

        let available = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (!this.getTileAt(x, y)) {
                    available.push({ x, y });
                }
            }
        }

        if (available.length > 0) {
            const pos = available[Math.floor(Math.random() * available.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            this.createTile(pos.x, pos.y, value);
        }
    }

    createTile(x, y, value) {
        const tile = new Tile(x, y, value);
        this.setTilePosition(tile, x, y);

        console.log(`Creating tile at ${x}, ${y} with value ${value}`); // Debug

        this.gridContainer.appendChild(tile.element);
        this.tiles.push(tile);

        // Add pop animation - use a slight delay to ensure positioning is applied first
        setTimeout(() => {
            tile.element.classList.add('tile-new');
        }, 10);

        return tile;
    }

    setTilePosition(tile, x, y) {
        tile.x = x;
        tile.y = y;
        const styles = this.getPositionStyle(x, y);
        // Apply left and top positioning
        tile.element.style.left = styles.left;
        tile.element.style.top = styles.top;
    }

    getTileAt(x, y) {
        return this.tiles.find(t => t.x === x && t.y === y && !t.markedForDeletion);
    }

    removeTile(tile) {
        this.tiles = this.tiles.filter(t => t !== tile);
        tile.element.remove();
    }

    move(direction) {
        // 0: Up, 1: Right, 2: Down, 3: Left
        const vector = this.getVector(direction);
        const traversals = this.buildTraversals(vector);
        let moved = false;

        // Reset merge flags
        this.tiles.forEach(t => t.mergedFrom = null);

        traversals.x.forEach(x => {
            traversals.y.forEach(y => {
                const tile = this.getTileAt(x, y);

                if (tile) {
                    const positions = this.findFarthestPosition({ x, y }, vector);
                    const next = this.getTileAt(positions.next.x, positions.next.y);

                    if (next && next.value === tile.value && !next.mergedFrom) {
                        // Merge
                        const merged = new Tile(positions.next.x, positions.next.y, tile.value * 2);
                        merged.mergedFrom = [tile, next];

                        // Move tile to next position visually
                        this.moveTileVisual(tile, positions.next.x, positions.next.y);

                        // Determine styles for new merged tile
                        this.setTilePosition(merged, positions.next.x, positions.next.y);
                        merged.element.classList.add('tile-merged');

                        // Remove old tiles from logic array immediately, but keep DOM
                        // We need to keep 'next' in DOM until animation finishes? 
                        // Actually, simplest is: update state, render.
                        // But we want to animate.

                        // Mark tiles for removal
                        tile.markedForDeletion = true;
                        next.markedForDeletion = true;

                        // Add merged tile
                        this.tiles.push(merged);
                        this.gridContainer.appendChild(merged.element);

                        // Cleanup after animation
                        setTimeout(() => {
                            this.removeTileVisual(tile);
                            this.removeTileVisual(next);
                            merged.element.classList.remove('tile-merged');
                        }, 200);

                        this.score += merged.value;
                        this.updateScore(this.score);
                        moved = true;
                    } else {
                        // Just move
                        this.moveTileVisual(tile, positions.farthest.x, positions.farthest.y);
                        if (x !== positions.farthest.x || y !== positions.farthest.y) {
                            moved = true;
                        }
                    }
                }
            });
        });

        if (moved) {
            this.addRandomTile();
            if (this.isGameOver()) {
                setTimeout(() => alert('Game Over!'), 300);
            }
        }
    }

    moveTileVisual(tile, x, y) {
        tile.x = x;
        tile.y = y;
        this.setTilePosition(tile, x, y);
    }

    removeTileVisual(tile) {
        if (tile.element.parentNode) {
            tile.element.parentNode.removeChild(tile.element);
        }
        this.tiles = this.tiles.filter(t => t !== tile);
    }

    getVector(direction) {
        const map = {
            0: { x: 0, y: -1 }, // Up
            1: { x: 1, y: 0 },  // Right
            2: { x: 0, y: 1 },  // Down
            3: { x: -1, y: 0 }  // Left
        };
        return map[direction];
    }

    buildTraversals(vector) {
        const traversals = { x: [], y: [] };

        for (let pos = 0; pos < this.size; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }

        // Always traverse from the farthest cell in the chosen direction
        if (vector.x === 1) traversals.x = traversals.x.reverse();
        if (vector.y === 1) traversals.y = traversals.y.reverse();

        return traversals;
    }

    findFarthestPosition(cell, vector) {
        let previous;

        // Progress towards the vector direction until an obstacle is found
        do {
            previous = cell;
            cell = { x: previous.x + vector.x, y: previous.y + vector.y };
        } while (
            this.withinBounds(cell) &&
            !this.getTileAt(cell.x, cell.y)
        );

        return {
            farthest: previous,
            next: cell // Used to check if a merge is required
        };
    }

    withinBounds(position) {
        return position.x >= 0 && position.x < this.size &&
            position.y >= 0 && position.y < this.size;
    }

    updateScore(score) {
        const scoreEl = document.getElementById('2048-score');
        if (scoreEl) scoreEl.textContent = score;

        if (score > this.bestScore) {
            this.bestScore = score;
            const bestEl = document.getElementById('2048-best');
            if (bestEl) bestEl.textContent = this.bestScore;
        }
    }

    isGameOver() {
        if (this.tiles.length < 16) return false; // There is empty space

        // Check for possible merges
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            for (let direction = 0; direction < 4; direction++) {
                const vector = this.getVector(direction);
                const neighbor = { x: tile.x + vector.x, y: tile.y + vector.y };
                if (this.withinBounds(neighbor)) {
                    const other = this.getTileAt(neighbor.x, neighbor.y);
                    if (other && other.value === tile.value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

class Tile {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.markedForDeletion = false;

        this.element = document.createElement('div');
        this.element.className = 'tile-2048';
        this.element.textContent = value;
        this.element.dataset.value = value;
    }
}
