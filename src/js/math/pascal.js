// Module Triangle de Pascal
function generatePascal() {
    const n = parseInt(document.getElementById("pascalInput").value) || 12;
    const canvas = document.getElementById("pascalCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic Scaling
    const padding = 40;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;

    // Calculate optimal cell size to fit width and height
    // Width = n * cellSize
    // Height = n * cellSize
    const cellSize = Math.min(availableWidth / n, availableHeight / n);

    // Calculate total dimensions with new cell size
    const totalWidth = n * cellSize;

    // Center the triangle
    const startX = (canvas.width / 2); // Top vertex x-coordinate
    const startY = (canvas.height - n * cellSize) / 2; // Vertical centering

    const triangle = [];
    for (let i = 0; i < n; i++) {
        triangle[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                triangle[i][j] = 1;
            } else {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
    }

    // Determine if text should be shown based on cell size
    const showText = cellSize >= 18;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            // Calculate x based on row center
            // Each row i has width i * cellSize? No.
            // Standard Pascal presentation: staggered.
            // x = startX + (j - i/2) * cellSize
            const x = startX + (j - i / 2) * cellSize;
            const y = startY + i * cellSize;

            if (triangle[i][j] % 2 === 0) {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            } else {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }

            // Draw slightly smaller rect for gap effect
            const gap = Math.max(1, cellSize * 0.1);
            ctx.fillRect(x - cellSize / 2 + gap / 2, y + gap / 2, cellSize - gap, cellSize - gap);

            if (showText) {
                ctx.fillStyle = '#ffffff';
                ctx.font = `bold ${Math.min(cellSize * 0.4, 14)}px 'Inter', serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // Only show number if it fits safely in standard JS number (implicit)
                // or just show it.
                ctx.fillText(triangle[i][j], x, y + cellSize / 2);
            }
        }
    }
}

export function initPascal() {
    document.getElementById("pascalBtn").addEventListener("click", generatePascal);
    generatePascal();
}
