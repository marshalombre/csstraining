// Module Fibonacci
function generateFibonacci() {
    const n = parseInt(document.getElementById("fibInput").value) || 10;
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    document.getElementById("fibResults").innerHTML = `<strong>Suite :</strong> ${fib.join(', ')}`;

    const canvas = document.getElementById("fibCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let x = 300, y = 300;
    let size = 5;
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

    ctx.lineWidth = 2;
    for (let i = 0; i < Math.min(fib.length, 12); i++) {
        ctx.strokeStyle = colors[i % colors.length];
        ctx.strokeRect(x, y, fib[i] * size, fib[i] * size);

        ctx.beginPath();
        const radius = fib[i] * size;
        const startAngle = (i % 4) * Math.PI / 2;
        const endAngle = startAngle + Math.PI / 2;
        const centerX = x + (i % 4 === 0 ? radius : i % 4 === 1 ? radius : i % 4 === 2 ? 0 : 0);
        const centerY = y + (i % 4 === 0 ? 0 : i % 4 === 1 ? radius : i % 4 === 2 ? radius : 0);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();

        if (i % 4 === 0) y -= fib[i] * size;
        else if (i % 4 === 1) x -= fib[i] * size;
        else if (i % 4 === 2) y += fib[i] * size;
        else x += fib[i] * size;
    }
}

export function initFibonacci() {
    document.getElementById("fibBtn").addEventListener("click", generateFibonacci);
    generateFibonacci();
}
