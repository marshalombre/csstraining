import { isDark } from './theme.js';  // Import isDark instead of using html directly

export function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

export function generateData(n) {
    let y = 0;
    const data = [];
    for (let x = 0; x <= n; x++) {
        if (isPrime(x)) y++;
        data.push({x, y});
    }
    return data;
}

export function plot(data) {
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);
    
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

    try {
        Plotly.newPlot('myChart', [trace], layout);
    } catch (error) {
        console.error('Error plotting graph:', error);
    }
}

function init() {
    const drawBtn = document.getElementById('drawBtn');
    drawBtn?.addEventListener('click', () => {
        const n = Number.parseIn(document.getElementById('nInput').value);
        if (n > 0) {
            const data = generateData(n);
            plot(data);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);