# 🎨 CSS Training - Web Experiments

[![Architecture](https://img.shields.io/badge/Architecture-Modular_ES6-green)](.)
[![Modules](https://img.shields.io/badge/Modules-20_files-blue)](./src/js)
[![License](https://img.shields.io/badge/License-MIT-yellow)](.)

> Modern web application featuring 8 interactive mathematical visualizations and 8 classic games, built with vanilla JavaScript and premium design aesthetics.

---

## 🌟 Overview

This application demonstrates modern JavaScript architecture and clean design principles. Perfect for learning ES6 modules, CSS animations, and interactive visualizations.

**Key Features:**
- ✨ **20 JavaScript modules** - One file per feature
- 🎨 **Premium Design** - Elegant color palette, modern typography
- 📊 **8 Mathematical Visualizations** - Interactive charts (Plotly.js)
- 🎮 **8 Classic Games** - Built with Canvas API
- 📱 **100% Responsive** - Fluid media queries
- ♿ **Accessible** - Keyboard navigation, descriptive buttons
- 🌓 **Dark/Light Mode** - Theme switching with localStorage
- 🌍 **Multi-Language** - English, French, German, Spanish, Italian

---

## 📂 Project Structure

```
cssTraining/
├── src/
│   ├── html/
│   │   └── index.html              # Structure & navigation
│   ├── css/
│   │   ├── components/             # Component styles
│   │   └── style.css               # Premium design system
│   └── js/
│       ├── core/                   # System modules
│       │   ├── app.js              # ES6 entry point
│       │   ├── navigation.js       # Menu & tab management
│       │   ├── theme.js            # Light/dark theme
│       │   ├── language.js         # Language management (i18n)
│       │   ├── translations.js     # Translation dictionary
│       │   └── collapsibles.js     # Toggle buttons
│       ├── math/                   # Visualizations (8)
│       │   ├── primes.js
│       │   ├── fibonacci.js
│       │   ├── palette.js
│       │   ├── pascal.js
│       │   ├── mandelbrot.js
│       │   ├── ulam.js
│       │   ├── weierstrass.js
│       │   └── surface3d.js
│       └── games/                  # Canvas games (8)
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

## 🚀 Quick Start

### Prerequisites

- Modern browser (Chrome, Firefox, Edge, Safari)
- No installation required!

### Running Locally

```bash
# Option 1: Double-click the HTML file
src/html/index.html

# Option 2: Local server (recommended for ES6 modules)
npx serve src/html
# Open http://localhost:3000
```

> **Note:** ES6 modules require HTTP server (not `file://`) in Chrome

---

## 🎯 Features

### Mathematical Experiments

| Experiment | Description | Tech |
|------------|-------------|------|
| **Prime Numbers** | Ulam spiral visualization | Plotly.js |
| **Fibonacci Sequence** | Animated golden spiral | Canvas, geometry |
| **Color Palette** | Harmonious HSL generation | Color theory |
| **Pascal's Triangle** | Sierpinski pattern | Combinatorics |
| **Mandelbrot Set** | Infinite zoom fractal | Complex math |
| **Ulam Spiral** | Prime distribution | Number patterns |
| **Weierstrass Function** | Continuous non-differentiable | Analysis |
| **3D Surface** | Parametric torus | Plotly 3D |

### Interactive Games

| Game | Controls | Difficulty |
|------|----------|------------|
| **Tetris** 🧱 | ← → ↓ ↑ Space | ⭐⭐⭐ |
| **Pong** 🏓 | Mouse / ↑ ↓ | ⭐ |
| **Snake** 🐍 | ← → ↑ ↓ | ⭐⭐ |
| **Breakout** 🧱 | Mouse / ← → | ⭐⭐ |
| **Memory** 🎴 | Click | ⭐ |
| **2048** 🔢 | ← → ↑ ↓ | ⭐⭐⭐ |
| **Flappy Bird** 🐦 | Space / Click | ⭐⭐⭐⭐ |
| **Space Invaders** 👾 | ← → Space | ⭐⭐⭐ |

---

## 💎 Design System

### Color Palette

```css
/* Light Theme */
--primary: #5B6B6E;        /* Elegant blue-gray */
--text: #3E3E3E;           /* Anthracite gray */
--background: #FFFFFF;
--card: #F9F9F9;

/* Dark Theme */
--primary: #7A8E92;
--text: #E6E6E6;
--background: #1A1A1A;
--card: #252525;
```

### Typography

- **Primary Font:** Inter (Google Fonts)
- **Hierarchy:** H1 48px → H5 20px
- **Body:** 18-20px with 140% line-height
- **Responsive:** Fluid `clamp()` without harsh breakpoints

### Spacing System

```css
--spacer-1300: 140px;   /* Major sections */
--spacer-850: 95px;     /* Headers */
--spacer-600: 70px;     /* Cards */
--spacer-400: 45px;     /* Elements */
--spacer-150: 17px;     /* Compact */
```

---

## 🏗️ Modular Architecture

### Before → After

| Before | After |
|--------|-------|
| 3 large files (1878 lines) | 20 modular files |
| Monolithic mixed code | One file = One feature |
| `math-tabs.js` (608 L) | 8 files `math/*.js` |
| `games.js` + `games-part2.js` | 8 files `games/*.js` |

### Benefits

✅ **Maintainability** - Isolated, testable code  
✅ **Scalability** - Easy to add features  
✅ **Performance** - Automatic tree shaking  
✅ **Collaboration** - No Git conflicts  
✅ **Testing** - Independent modules  

### ES6 Import

```javascript
// Single entry point
<script type="module" src="../js/core/app.js"></script>

// app.js imports everything automatically
import { Navigation } from './navigation.js';
import { initPrimes } from '../math/primes.js';
import { TetrisGame } from '../games/tetris.js';
```

---

## 🛠️ Technologies

### Core Stack

- **HTML5** - Modern semantic structure
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript ES6+** - Modules, classes, arrow functions

### Libraries

- **Plotly.js** - Interactive mathematical charts
- **Google Fonts** - Inter (premium typography)
- **Canvas API** - High-performance 2D game rendering

### CSS Features

- CSS Variables (custom properties)
- CSS Grid & Flexbox
- Responsive media queries
- `@keyframes` animations
- `clamp()` for fluid responsiveness
- `cubic-bezier()` for micro-animations

---

## 📱 Responsive Design

The application adapts to all screen sizes:

- **Desktop** (>1920px) - Full-width layout
- **Laptop** (1280-1920px) - Optimized layout
- **Tablet** (768-1280px) - Adapted grid
- **Mobile** (320-768px) - Vertical stack

```css
/* Example: Fluid spacing without breakpoints */
padding: clamp(20px, 4vw, 60px);
```

---

## 🎓 Learning Resources

This application is ideal for learning:

### Modern JavaScript

- ES6 Modules (`import`/`export`)
- Classes and OOP
- Event listeners and state management
- Canvas API and animations
- DOM manipulation

### Advanced CSS

- Custom properties (CSS variables)
- Light/dark themes
- Animations and transitions
- Responsive with `clamp()`
- Grid & Flexbox layouts

### Architecture

- Separation of concerns
- Maintainable modular code
- Local state management (games)
- SPA navigation (Single Page App)

---

## 🤝 Contributing

Improvements and suggestions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/NewGame`)
3. Commit your changes (`git commit -m 'Add new game'`)
4. Push to the branch (`git push origin feature/NewGame`)
5. Open a Pull Request

---

## 📄 License

MIT License - Free to use for learning and education

---

## 🙏 Credits

- **Typography** - [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- **Visualizations** - [Plotly.js](https://plotly.com/javascript/)
- **Icons** - Native emoji

---

<div align="center">

**Made with ❤️ for modern web development learning**

[▲ Back to top](#-css-training---web-experiments)

</div>
