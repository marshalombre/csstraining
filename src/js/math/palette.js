// Module Palette de Couleurs
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

export function initPalette() {
    document.getElementById("generatePaletteBtn").addEventListener("click", generatePalette);
    generatePalette();
}
