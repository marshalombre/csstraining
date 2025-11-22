// Module Fonction de Weierstrass
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

export function initWeierstrass() {
    document.getElementById("weierstrassBtn").addEventListener("click", generateWeierstrass);
    generateWeierstrass();
}
