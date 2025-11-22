// ===============================
// THEME TOGGLE
// ===============================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.dataset.theme = newTheme;
    document.getElementById('themeToggle').textContent = newTheme === 'light' ? '🌙' : '☀️';
}

// ===============================
// TABS FUNCTIONALITY
// ===============================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===============================
// PRIMES - FUNCTIONS
// ===============================
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generatePrimeData(n) {
    let y = 0;
    const data = [];
    for (let x = 0; x <= n; x++) {
        if (isPrime(x)) y++;
        data.push({ x, y });
    }
    return data;
}

function plotPrimes(data) {
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);

    const isDark = document.documentElement.dataset.theme === 'dark';

    const trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        line: {
            shape: 'hv',
            color: 'rgb(75, 192, 192)'
        }
    };

    const layout = {
        title: 'Fonction des Nombres Premiers',
        xaxis: {
            title: 'Nombre',
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: isDark ? '#ffffff' : '#333333'
        },
        yaxis: {
            title: 'Nombres premiers rencontrés',
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: isDark ? '#ffffff' : '#333333'
        },
        paper_bgcolor: isDark ? '#333333' : '#ffffff',
        plot_bgcolor: isDark ? '#333333' : '#ffffff',
        font: {
            color: isDark ? '#ffffff' : '#333333'
        }
    };

    Plotly.newPlot('myChart', [trace], layout);
}

// ===============================
// FIBONACCI - FUNCTIONS
// ===============================
function generateFibonacci() {
    const n = parseInt(document.getElementById("fibInput").value) || 10;
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    document.getElementById("fibResults").innerHTML = `<strong>Suite :</strong> ${fib.join(', ')}`;

    // Dessiner la spirale de Fibonacci
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

        // Dessiner l'arc de cercle
        ctx.beginPath();
        const radius = fib[i] * size;
        const startAngle = (i % 4) * Math.PI / 2;
        const endAngle = startAngle + Math.PI / 2;
        const centerX = x + (i % 4 === 0 ? radius : i % 4 === 1 ? radius : i % 4 === 2 ? 0 : 0);
        const centerY = y + (i % 4 === 0 ? 0 : i % 4 === 1 ? radius : i % 4 === 2 ? radius : 0);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();

        // Positionner le prochain carré
        if (i % 4 === 0) y -= fib[i] * size;
        else if (i % 4 === 1) x -= fib[i] * size;
        else if (i % 4 === 2) y += fib[i] * size;
        else x += fib[i] * size;
    }
}

// ===============================
// COLOR PALETTE - FUNCTIONS
// ===============================
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return [h * 360, s * 100, l * 100];
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generatePalette() {
    const baseColor = document.getElementById("colorInput").value;
    const [h, s, l] = hexToHSL(baseColor);

    const palette = [
        { name: "Base", color: baseColor },
        { name: "Complémentaire", color: HSLToHex((h + 180) % 360, s, l) },
        { name: "Triadique 1", color: HSLToHex((h + 120) % 360, s, l) },
        { name: "Triadique 2", color: HSLToHex((h + 240) % 360, s, l) },
        { name: "Analogique 1", color: HSLToHex((h + 30) % 360, s, l) },
        { name: "Analogique 2", color: HSLToHex((h - 30 + 360) % 360, s, l) }
    ];

    const display = document.getElementById("paletteDisplay");
    display.innerHTML = palette.map(p => `
        <div style="text-align: center;">
            <div style="width: 120px; height: 120px; background: ${p.color}; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 10px; cursor: pointer;" 
                 onclick="navigator.clipboard.writeText('${p.color}'); alert('Couleur copiée: ${p.color}')"></div>
            <div style="font-weight: bold;">${p.name}</div>
            <div style="font-family: monospace; font-size: 12px;">${p.color}</div>
        </div>
    `).join('');
}

// ===============================
// PASCAL TRIANGLE - FUNCTIONS
// ===============================
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

    // Generate Pascal's triangle
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

    // Draw the triangle
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            const x = startX + (j - i / 2) * cellSize;
            const y = startY + i * cellSize;

            // Color based on odd/even (reveals Sierpinski triangle)
            if (triangle[i][j] % 2 === 0) {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            } else {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }

            ctx.fillRect(x - cellSize / 2, y, cellSize - 2, cellSize - 2);

            // Draw the number in the cell
            ctx.fillStyle = '#ffffff'; // White text for contrast
            ctx.font = `bold ${Math.min(cellSize / 3, 14)}px 'PT Serif', serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(triangle[i][j], x, y + cellSize / 2);
        }
    }
}

// ===============================
// MANDELBROT - FUNCTIONS
// ===============================
function generateMandelbrot() {
    const maxIterations = parseInt(document.getElementById("mandelbrotIterations").value) || 50;
    const canvas = document.getElementById("mandelbrotCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;

    // Mandelbrot set bounds
    const xMin = -2.5, xMax = 1.0;
    const yMin = -1.25, yMax = 1.25;

    for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
            // Map pixel to complex plane
            const x0 = xMin + (px / width) * (xMax - xMin);
            const y0 = yMin + (py / height) * (yMax - yMin);

            let x = 0, y = 0;
            let iteration = 0;

            while (x * x + y * y <= 4 && iteration < maxIterations) {
                const xTemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xTemp;
                iteration++;
            }

            // Color based on iterations
            if (iteration === maxIterations) {
                ctx.fillStyle = '#000000';
            } else {
                const hue = (iteration / maxIterations) * 360;
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            }
            ctx.fillRect(px, py, 1, 1);
        }
    }
}

// ===============================
// ULAM SPIRAL - FUNCTIONS
// ===============================
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

    // Generate spiral coordinates
    const grid = Array(size).fill().map(() => Array(size).fill(0));
    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    let num = 1;
    let step = 1;

    grid[y][x] = num++;

    // Spiral pattern: right, up, left, left, down, down, right, right, right, ...
    while (num <= size * size) {
        // Move right
        for (let i = 0; i < step && num <= size * size; i++) {
            x++;
            if (x < size && y < size) grid[y][x] = num++;
        }
        // Move up
        for (let i = 0; i < step && num <= size * size; i++) {
            y--;
            if (x < size && y >= 0) grid[y][x] = num++;
        }
        step++;
        // Move left
        for (let i = 0; i < step && num <= size * size; i++) {
            x--;
            if (x >= 0 && y >= 0) grid[y][x] = num++;
        }
        // Move down
        for (let i = 0; i < step && num <= size * size; i++) {
            y++;
            if (x >= 0 && y < size) grid[y][x] = num++;
        }
        step++;
    }

    // Draw the spiral
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] > 0) {
                if (isPrime(grid[i][j])) {
                    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                } else {
                    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface-color');
                }
                ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
}

// ===============================
// WEIERSTRASS - FUNCTIONS
// ===============================
function generateWeierstrass() {
    const terms = parseInt(document.getElementById("weierstrassTerms").value) || 20;
    const a = 0.5;
    const b = 7;

    const xValues = [];
    const yValues = [];

    for (let x = -2; x <= 2; x += 0.01) {
        let y = 0;
        for (let n = 0; n < terms; n++) {
            y += Math.pow(a, n) * Math.cos(Math.pow(b, n) * Math.PI * x);
        }
        xValues.push(x);
        yValues.push(y);
    }

    const isDark = document.documentElement.dataset.theme === 'dark';

    const trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        line: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
            width: 1
        }
    };

    const layout = {
        title: 'Fonction de Weierstrass',
        xaxis: {
            title: 'x',
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: isDark ? '#ffffff' : '#333333'
        },
        yaxis: {
            title: 'f(x)',
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: isDark ? '#ffffff' : '#333333'
        },
        paper_bgcolor: isDark ? '#333333' : '#ffffff',
        plot_bgcolor: isDark ? '#333333' : '#ffffff',
        font: {
            color: isDark ? '#ffffff' : '#333333'
        }
    };

    Plotly.newPlot('weierstrassChart', [trace], layout);
}

// ===============================
// 3D SURFACE - FUNCTIONS
// ===============================
function generate3DSurface() {
    const resolution = parseInt(document.getElementById("surfaceResolution").value) || 50;

    const xValues = [];
    const yValues = [];
    const zValues = [];

    for (let i = 0; i < resolution; i++) {
        const x = -5 + (10 * i) / resolution;
        xValues.push(x);
        yValues.push(x);
    }

    for (let i = 0; i < resolution; i++) {
        const row = [];
        for (let j = 0; j < resolution; j++) {
            const x = xValues[j];
            const y = yValues[i];
            const r = Math.sqrt(x * x + y * y) + 0.1;
            const z = Math.sin(r) / r;
            row.push(z);
        }
        zValues.push(row);
    }

    const isDark = document.documentElement.dataset.theme === 'dark';

    const data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'surface',
        colorscale: 'Viridis'
    }];

    const layout = {
        title: 'Surface Paramétrique 3D',
        scene: {
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' },
            zaxis: { title: 'Z' }
        },
        paper_bgcolor: isDark ? '#333333' : '#ffffff',
        plot_bgcolor: isDark ? '#333333' : '#ffffff',
        font: {
            color: isDark ? '#ffffff' : '#333333'
        }
    };

    Plotly.newPlot('surfaceChart', data, layout);
}

// ===============================
// COLLAPSIBLE BUTTONS
// ===============================
function initCollapsibles() {
    const collapsibleButtons = [
        '.collapsible-btn',
        '.collapsible-btn-fib',
        '.collapsible-btn-palette',
        '.collapsible-btn-pascal',
        '.collapsible-btn-mandelbrot',
        '.collapsible-btn-ulam',
        '.collapsible-btn-weierstrass',
        '.collapsible-btn-surface'
    ];

    collapsibleButtons.forEach(selector => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', function () {
                const content = this.nextElementSibling;
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0';
                    content.classList.remove('open');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.classList.add('open');
                }
            });
        }
    });
}

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Page chargée - Initialisation...');

    // Initialize tabs
    initTabs();
    console.log('✅ Onglets initialisés');

    // Initialize collapsibles
    initCollapsibles();
    console.log('✅ Boutons pliables initialisés');

    // Theme toggle button
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    console.log('✅ Bouton de thème initialisé');

    // Prime numbers - Draw button
    document.getElementById('drawBtn').addEventListener('click', () => {
        const n = parseInt(document.getElementById('nInput').value);
        if (n > 0) {
            const data = generatePrimeData(n);
            plotPrimes(data);
        }
    });
    console.log('✅ Bouton Tracer initialisé');

    // Prime numbers - Enter key support
    document.getElementById("nInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("drawBtn").click();
        }
    });

    // Fibonacci - Generate button
    document.getElementById("fibBtn").addEventListener("click", generateFibonacci);
    console.log('✅ Bouton Fibonacci initialisé');

    // Fibonacci - Initialize on load
    generateFibonacci();
    console.log('✅ Fibonacci généré au chargement');

    // Palette - Generate button
    document.getElementById("generatePaletteBtn").addEventListener("click", generatePalette);
    console.log('✅ Bouton Palette initialisé');

    // Palette - Initialize on load
    generatePalette();
    console.log('✅ Palette générée au chargement');

    // Pascal Triangle - Generate button
    document.getElementById("pascalBtn").addEventListener("click", generatePascal);
    console.log('✅ Bouton Pascal initialisé');

    // Pascal - Initialize on load
    generatePascal();
    console.log('✅ Triangle de Pascal généré au chargement');

    // Mandelbrot - Generate button
    document.getElementById("mandelbrotBtn").addEventListener("click", generateMandelbrot);
    console.log('✅ Bouton Mandelbrot initialisé');

    // Mandelbrot - Initialize on load
    generateMandelbrot();
    console.log('✅ Mandelbrot généré au chargement');

    // Ulam Spiral - Generate button
    document.getElementById("ulamBtn").addEventListener("click", generateUlam);
    console.log('✅ Bouton Ulam initialisé');

    // Ulam - Initialize on load
    generateUlam();
    console.log('✅ Spirale d\'Ulam générée au chargement');

    // Weierstrass - Generate button
    document.getElementById("weierstrassBtn").addEventListener("click", generateWeierstrass);
    console.log('✅ Bouton Weierstrass initialisé');

    // Weierstrass - Initialize on load
    generateWeierstrass();
    console.log('✅ Fonction de Weierstrass générée au chargement');

    // 3D Surface - Generate button
    document.getElementById("surfaceBtn").addEventListener("click", generate3DSurface);
    console.log('✅ Bouton Surface 3D initialisé');

    // 3D Surface - Initialize on load
    generate3DSurface();
    console.log('✅ Surface 3D générée au chargement');

    console.log('🎉 Toutes les fonctionnalités sont prêtes !');
});
