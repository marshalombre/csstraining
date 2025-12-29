// Module Fibonacci
export function generateFibonacci() {
    const n = parseInt(document.getElementById("fibInput").value) || 10;
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    document.getElementById("fibResults").innerHTML = `<strong>Suite :</strong> ${fib.join(', ')}`;

    const canvas = document.getElementById("fibCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const numSquares = Math.min(n, 20); // Support more terms with auto-scaling
    if (numSquares < 2) return;

    const rel_rects = [];

    // 1. Calculate relative positions in unit scale (size = fib value)
    let rx = 0, ry = 0, rw = fib[1], rh = fib[1];
    rel_rects.push({ x: rx, y: ry, size: rw });

    for (let i = 1; i < numSquares; i++) {
        let s = fib[i + 1];
        let rect = {};
        const dir = i % 4; // 1:R, 2:U, 3:L, 0:D

        if (dir === 1) { // Right
            rect = { x: rx + rw, y: ry, size: s };
            rw += s;
        } else if (dir === 2) { // Up
            rect = { x: rx + rw - s, y: ry - s, size: s };
            ry -= s;
            rh += s;
        } else if (dir === 3) { // Left
            rect = { x: rx - s, y: ry, size: s };
            rx -= s;
            rw += s;
        } else if (dir === 0) { // Down
            rect = { x: rx, y: ry + rh, size: s };
            rh += s;
        }
        rel_rects.push(rect);
    }

    // 2. Find bounding box of unit squares
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    rel_rects.forEach(r => {
        minX = Math.min(minX, r.x);
        maxX = Math.max(maxX, r.x + r.size);
        minY = Math.min(minY, r.y);
        maxY = Math.max(maxY, r.y + r.size);
    });

    const totalW = maxX - minX;
    const totalH = maxY - minY;

    // 3. Calculate scale to fit in 800x800 with padding
    const padding = 80;
    const scale = Math.min((canvas.width - padding) / totalW, (canvas.height - padding) / totalH);

    // 4. Center the entire bounding box
    const offsetX = (canvas.width - totalW * scale) / 2 - minX * scale;
    const offsetY = (canvas.height - totalH * scale) / 2 - minY * scale;

    const rects = rel_rects.map(r => ({
        x: r.x * scale + offsetX,
        y: r.y * scale + offsetY,
        size: r.size * scale
    }));

    // Draw squares with unique colors
    const colors = [
        'rgba(231, 76, 60, 0.1)',  // Red
        'rgba(230, 126, 34, 0.1)', // Orange
        'rgba(241, 196, 15, 0.1)', // Yellow
        'rgba(46, 204, 113, 0.1)', // Green
        'rgba(52, 152, 219, 0.1)', // Blue
        'rgba(155, 89, 182, 0.1)', // Purple
        'rgba(26, 188, 156, 0.1)', // Turquoise
        'rgba(52, 73, 94, 0.1)',   // Dark Blue
        'rgba(243, 156, 18, 0.1)', // Sunflower
        'rgba(192, 57, 43, 0.1)',  // Pomegranate
        'rgba(39, 174, 96, 0.1)',  // Nephritis
        'rgba(142, 68, 173, 0.1)'  // Wisteria
    ];

    const borderColors = [
        '#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#3498DB', '#9B59B6',
        '#1ABC9C', '#34495E', '#F39C12', '#C0392B', '#27AE60', '#8E44AD'
    ];

    ctx.lineWidth = 1;
    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        const colorIndex = i % colors.length;

        ctx.fillStyle = colors[colorIndex];
        ctx.strokeStyle = borderColors[colorIndex];

        ctx.fillRect(rect.x, rect.y, rect.size, rect.size);
        ctx.strokeRect(rect.x, rect.y, rect.size, rect.size);
    }

    // Draw the continuous spiral curve
    ctx.beginPath();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 4;

    for (let i = 1; i < rects.length; i++) {
        const rect = rects[i];
        const dir = i % 4;

        let centerX, centerY, startAngle, endAngle;

        // Arc Center and Angles based on direction
        // In Canvas: 0=Right, PI/2=Down, PI=Left, 1.5PI=Up
        switch (dir) {
            case 1: // Right
                centerX = rect.x;
                centerY = rect.y;
                startAngle = Math.PI / 2;
                endAngle = 0;
                break;
            case 2: // Up
                centerX = rect.x;
                centerY = rect.y + rect.size;
                startAngle = 0;
                endAngle = 1.5 * Math.PI;
                break;
            case 3: // Left
                centerX = rect.x + rect.size;
                centerY = rect.y + rect.size;
                startAngle = 1.5 * Math.PI;
                endAngle = Math.PI;
                break;
            case 0: // Down
                centerX = rect.x + rect.size;
                centerY = rect.y;
                startAngle = Math.PI;
                endAngle = Math.PI / 2;
                break;
        }

        const startX = centerX + rect.size * Math.cos(startAngle);
        const startY = centerY + rect.size * Math.sin(startAngle);

        if (i === 1) {
            ctx.moveTo(startX, startY);
        }

        // Use anticlockwise=true to go from 90 to 0, 0 to 270, 270 to 180, 180 to 90
        ctx.arc(centerX, centerY, rect.size, startAngle, endAngle, true);
    }

    ctx.stroke();
}

export function initFibonacci() {
    document.getElementById("fibBtn").addEventListener("click", generateFibonacci);
    generateFibonacci();
}
