// Module Surface 3D Paramétrique
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

export function initSurface3D() {
    document.getElementById("surfaceBtn").addEventListener("click", generate3DSurface);
    generate3DSurface();
}
