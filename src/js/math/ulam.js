// Module Spirale d'Ulam
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generateUlam() {
    const size = parseInt(document.getElementById("ulamInput").value) || 40;
    const canvas = document.getElementById("ulamCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 800;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = Math.min(canvas.width, canvas.height) / size;

    const grid = Array(size).fill().map(() => Array(size).fill(0));
    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    let num = 1;
    let step = 1;

    grid[y][x] = num++;

    while (num <= size * size) {
        for (let i = 0; i < step && num <= size * size; i++) {
            x++;
            if (x < size && y < size) grid[y][x] = num++;
        }
        for (let i = 0; i < step && num <= size * size; i++) {
            y--;
            if (x < size && y >= 0) grid[y][x] = num++;
        }
        step++;
        for (let i = 0; i < step && num <= size * size; i++) {
            x--;
            if (x >= 0 && y >= 0) grid[y][x] = num++;
        }
        for (let i = 0; i < step && num <= size * size; i++) {
            y++;
            if (x >= 0 && y < size) grid[y][x] = num++;
        }
        step++;
    }

    // Determine if text should be shown based on cell size
    const showText = cellSize >= 15;
    const fontSize = Math.max(cellSize * 0.4, 8); // Minimum 8px font

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] > 0) {
                const isPrimeVal = isPrime(grid[i][j]);

                if (isPrimeVal) {
                    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                } else {
                    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface-color');
                }
                ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);

                // Add numbers to squares
                if (showText) {
                    // Set contrasting color for text
                    if (isPrimeVal) {
                        // On primary color, standard text color might be hard to read depending on theme
                        // Let's assume white for primary (usually dark/saturated)
                        ctx.fillStyle = '#ffffff';
                    } else {
                        // On surface color, use standard text color
                        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
                    }

                    ctx.font = `${fontSize}px 'Inter', sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(grid[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
                }
            }
        }
    }
}

export function initUlam() {
    document.getElementById("ulamBtn").addEventListener("click", generateUlam);
    generateUlam();
}
