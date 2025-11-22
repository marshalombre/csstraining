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

    const cellSize = Math.min(40, 600 / n);
    const startX = canvas.width / 2;
    const startY = 50;

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

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            const x = startX + (j - i / 2) * cellSize;
            const y = startY + i * cellSize;

            if (triangle[i][j] % 2 === 0) {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            } else {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }

            ctx.fillRect(x - cellSize / 2, y, cellSize - 2, cellSize - 2);

            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.min(cellSize / 3, 14)}px 'Inter', serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(triangle[i][j], x, y + cellSize / 2);
        }
    }
}

export function initPascal() {
    document.getElementById("pascalBtn").addEventListener("click", generatePascal);
    generatePascal();
}
