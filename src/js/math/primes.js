// Module Nombres Premiers
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
    if (typeof Plotly === 'undefined') {
        console.error('Plotly is not loaded yet');
        return;
    }
    
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

export function initPrimes() {
    document.getElementById('drawBtn').addEventListener('click', () => {
        const n = parseInt(document.getElementById('nInput').value);
        if (n > 0) {
            const data = generatePrimeData(n);
            plotPrimes(data);
        }
    });

    document.getElementById("nInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("drawBtn").click();
        }
    });
}
