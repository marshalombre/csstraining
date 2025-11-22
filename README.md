# 🎨 CSS Training - Expérimentations Web

[![Design](https://img.shields.io/badge/Design-Pictet_Premium-A67B5B)](https://pictet.com)
[![Architecture](https://img.shields.io/badge/Architecture-Modular_ES6-green)](.)
[![TypeScript](https://img.shields.io/badge/Modules-20_files-blue)](./src/js)

> Application web premium présentant 8 visualisations mathématiques interactives et 8 jeux classiques, avec un design inspiré de Pictet.com

---

## 🌟 Vue d'ensemble

Cette application démontre une architecture JavaScript moderne et modulaire, combinée à un design premium sobre et élégant. Parfait pour apprendre le JavaScript ES6, les animations CSS et les visualisations interactives.

**Points forts :**
- ✨ **20 modules JavaScript** séparés (un pour chaque fonction)
- 🎨 **Design Pictet** - Palette sobre, typographie premium Inter
- 📊 **8 visualisations mathématiques** interactives (Plotly.js)
- 🎮 **8 jeux classiques** (Canvas API)
- 📱 **100% Responsive** avec media queries fluides
- ♿ **Accessible** - Navigation au clavier, boutons descriptifs

---

## 📂 Structure du Projet

```
cssTraining/
├── src/
│   ├── html/
│   │   └── index.html              # Structure & navigation
│   ├── css/
│   │   └── style.css               # Design premium Pictet (780 lignes)
│   └── js/
│       ├── core/                   # Modules système
│       │   ├── app.js              # Point d'entrée ES6
│       │   ├── navigation.js       # Gestion menu & tabs
│       │   ├── theme.js            # Thème clair/sombre
│       │   └── collapsibles.js     # Boutons déroulants
│       ├── math/                   # Visualisations (8)
│       │   ├── primes.js
│       │   ├── fibonacci.js
│       │   ├── palette.js
│       │   ├── pascal.js
│       │   ├── mandelbrot.js
│       │   ├── ulam.js
│       │   ├── weierstrass.js
│       │   └── surface3d.js
│       └── games/                  # Jeux Canvas (8)
│           ├── tetris.js
│           ├── pong.js
│           ├── snake.js
│           ├── breakout.js
│           ├── memory.js
│           ├── 2048.js
│           ├── flappy.js
│           └── invaders.js
└── README.md
```

---

## 🚀 Démarrage Rapide

### Prérequis

- Navigateur moderne (Chrome, Firefox, Edge, Safari)
- Aucune installation requise !

### Lancement

```bash
# Option 1 : Double-cliquer sur le fichier HTML
src/html/index.html

# Option 2 : Serveur local (recommandé)
npx serve src/html
# Ouvrir http://localhost:3000
```

> **Note :** Les modules ES6 nécessitent un serveur HTTP (pas `file://`) pour Chrome

---

## 🎯 Fonctionnalités

### Expériences Mathématiques

| Expérience | Description | Technologies |
|------------|-------------|--------------|
| **Nombres Premiers** | Spirale d'Ulam interactive | Plotly.js |
| **Suite de Fibonacci** | Spirale dorée animée | Canvas, géométrie |
| **Palette de Couleurs** | Génération harmonieuse HSL | Théorie des couleurs |
| **Triangle de Pascal** | Motif de Sierpinski | Combinatoire |
| **Ensemble de Mandelbrot** | Fractale zoom infini | Calcul complexe |
| **Spirale d'Ulam** | Distribution des premiers | Patterns numériques |
| **Fonction de Weierstrass** | Continue non-dérivable | Analyse |
| **Surface 3D** | Tore paramétrique | Plotly 3D |

### Jeux Interactifs

| Jeu | Contrôles | Difficulté |
|-----|-----------|------------|
| **Tetris** 🧱 | ← → ↓ ↑ Espace | ⭐⭐⭐ |
| **Pong** 🏓 | Souris / ↑ ↓ | ⭐
 |
| **Snake** 🐍 | ← → ↑ ↓ | ⭐⭐ |
| **Breakout** 🧱 | Souris / ← → | ⭐⭐ |
| **Memory** 🎴 | Clic | ⭐ |
| **2048** 🔢 | ← → ↑ ↓ | ⭐⭐⭐ |
| **Flappy Bird** 🐦 | Espace / Clic | ⭐⭐⭐⭐ |
| **Space Invaders** 👾 | ← → Espace | ⭐⭐⭐ |

---

## 💎 Design Premium

### Palette Inspirée Pictet

```css
/* Thème Clair */
--primary: #5B6B6E;        /* Bleu-gris élégant */
--text: #3E3E3E;           /* Gris anthracite */
--background: #FFFFFF;
--card: #F9F9F9;

/* Thème Sombre */
--primary: #7A8E92;
--text: #E6E6E6;
--background: #1A1A1A;
--card: #252525;
```

### Typographie

- **Police principale :** Inter (Google Fonts)
- **Hiérarchie :** H1 48px → H5 20px
- **Corps :** 18-20px avec line-height 140%
- **Responsive :** clamp() fluide sans breakpoints brutaux

### Espacement (Système Pictet)

```css
--spacer-1300: 140px;   /* Sections majeures */
--spacer-850: 95px;     /* Headers */
--spacer-600: 70px;     /* Cartes */
--spacer-400: 45px;     /* Éléments */
--spacer-150: 17px;     /* Compact */
```

---

## 🏗️ Architecture Modulaire

### Avant → Après

| Avant | Après |
|-------|-------|
| 3 gros fichiers (1878 lignes) | 20 fichiers modulaires |
| Code monolithique mélangé | Un fichier = Une fonction |
| `math-tabs.js` (608 L) | 8 fichiers `math/*.js` |
| `games.js` + `games-part2.js` | 8 fichiers `g

ames/*.js` |

### Avantages

✅ **Maintenabilité** - Code isolé et testable  
✅ **Scalabilité** - Ajout facile de nouvelles features  
✅ **Performance** - Tree shaking automatique  
✅ **Collaboration** - Pas de conflits Git  
✅ **Tests** - Modules indépendants testables  

### Import ES6

```javascript
// Point d'entrée unique
<script type="module" src="../js/core/app.js"></script>

// app.js importe tout automatiquement
import { Navigation } from './navigation.js';
import { initPrimes } from '../math/primes.js';
import { TetrisGame } from '../games/tetris.js';
```

---

## 🛠️ Technologies

### Core Stack

- **HTML5** - Structure sémantique moderne
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript ES6+** - Modules, classes, arrow functions

### Bibliothèques

- **Plotly.js** - Graphiques mathématiques interactifs
- **Google Fonts** - Inter (typographie premium)
- **Canvas API** - Rendu jeux 2D haute performance

### Features CSS

- CSS Variables (custom properties)
- CSS Grid & Flexbox
- Media queries responsives
- Animations `@keyframes`
- `clamp()` pour responsivité fluide
- `cubic-bezier()` pour micro-animations

---

## 📱 Responsive Design

L'application s'adapte à toutes les tailles d'écrans :

- **Desktop** (>1920px) - Vue tabulaire pleine largeur
- **Laptop** (1280-1920px) - Layout optimisé
- **Tablet** (768-1280px) - Grille adaptée
- **Mobile** (320-768px) - Stack vertical

```css
/* Exemple : Espacement fluide sans breakpoints */
padding: clamp(20px, 4vw, 60px);
```

---

## 🎓 Apprentissage

Cette application est idéale pour apprendre :

### JavaScript Moderne

- Modules ES6 (`import`/`export`)
- Classes et orienté objet
- Event listeners et gestion d'état
- Canvas API et animations
- Manipulation du DOM

### CSS Avancé

- Custom properties (CSS variables)
- Thèmes clair/sombre
- Animations et transitions
- Responsive avec `clamp()`
- Grid & Flexbox layout

### Architecture

- Séparation des préoccupations
- Code modulaire maintenable
- Gestion d'état local (jeux)
- Navigation SPA (Single Page App)

---

## 🤝 Contribution

Idées d'améliorations bienvenues !

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NouveauJeu`)
3. Commit (`git commit -m 'Ajout nouveau jeu'`)
4. Push (`git push origin feature/NouveauJeu`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Projet d'apprentissage - Utilisation libre pour études

---

## 🙏 Crédits

- **Design** - Inspiration [Pictet.com](https://pictet.com)
- **Typographie** - [Inter](https://fonts.google.com/specimen/Inter) par Rasmus Andersson
- **Visualisations** - [Plotly.js](https://plotly.com/javascript/)
- **Icônes** - Emoji natifs

---

<div align="center">

**Fait avec ❤️ pour l'apprentissage du développement web moderne**

[▲ Retour en haut](#-css-training---expérimentations-web)

</div>
