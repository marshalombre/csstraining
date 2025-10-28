// Ajoutez au début du fichier
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const collBtn = document.querySelector(".collapsible-btn");
const collContent = document.querySelector(".collapsible-content");

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    // Mettre à jour le graphique si il existe
    if (chart) {
        chart.options.scales.x.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid');
        chart.options.scales.y.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid');
        chart.update();
    }
}

themeToggle.addEventListener('click', toggleTheme);

console.log("Script chargé");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");
    const drawBtn = document.getElementById('drawBtn');
    drawBtn.addEventListener('click', () => {
        console.log("Bouton cliqué");
        renderFromInput();
    });
});

collBtn.addEventListener('click', function() {
    const collContent = this.nextElementSibling;
    if (collContent) {
        if (collContent.style.maxHeight && collContent.style.maxHeight !== '0px') {
            collContent.style.maxHeight = '0';
        } else {
            collContent.style.maxHeight = collContent.scrollHeight + 'px';
        }
    }
});

function renderFromInput() {
    const n = parseInt(document.getElementById('nInput').value);
    console.log("Valeur n:", n);
    if (n > 0) {
        const data = generateData(n);
        console.log("Data générée:", data);
        plot(data);
    }
}

function plot(data) {
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);

    const isDark = html.getAttribute('data-theme') === 'dark';
    
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

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    // Redessiner le graphe avec le nouveau thème
    const n = parseInt(document.getElementById('nInput').value);
    if (n > 0) {
        const data = generateData(n);
        plot(data);
    }
}
// Ajouter cette fonction dans script.js
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generateData(n) {
    let y = 0;
    const data = [];
    
    for (let x = 0; x <= n; x++) {
        if (isPrime(x)) y++;
        data.push({x, y});
    }
    
    return data;
}
// Dans script.js, ajouter après le DOMContentLoaded existant
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");
    
    // Bouton existant
    const drawBtn = document.getElementById('drawBtn');
    drawBtn.addEventListener('click', () => {
        console.log("Bouton cliqué");
        renderFromInput();
    });

    // Nouvel écouteur pour l'input
    const input = document.getElementById('nInput');
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            console.log("Touche Enter pressée");
            renderFromInput();
        }
    });
});