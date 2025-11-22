// Module Mandelbrot
function generateMandelbrot() {
    const maxIterations = parseInt(document.getElementById("mandelbrotIterations").value) || 50;
    const canvas = document.getElementById("mandelbrotCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;

    const xMin = -2.5, xMax = 1.0;
    const yMin = -1.25, yMax = 1.25;

    for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
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

export function initMandelbrot() {
    document.getElementById("mandelbrotBtn").addEventListener("click", generateMandelbrot);
    generateMandelbrot();
}
