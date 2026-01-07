// Point d'entrée principal de l'application
import { Navigation } from './navigation.js';
import { ThemeManager } from './theme.js';
import { LanguageManager } from './language.js';
import { initCollapsibles } from './collapsibles.js';

// Import des modules mathématiques
import { initPrimes } from '../math/primes.js';
import { initFibonacci } from '../math/fibonacci.js';
import { initPalette } from '../math/palette.js';
import { initPascal } from '../math/pascal.js';
import { initMandelbrot } from '../math/mandelbrot.js';
import { initUlam } from '../math/ulam.js';
import { initWeierstrass } from '../math/weierstrass.js';
import { initSurface3D } from '../math/surface3d.js';

// Import des jeux
import { TetrisGame } from '../games/tetris.js';
import { PongGame } from '../games/pong.js';
import { SnakeGame } from '../games/snake.js';
import { BreakoutGame } from '../games/breakout.js';
import { MemoryGame } from '../games/memory.js';
import { Game2048 } from '../games/2048.js';
import { FlappyBirdGame } from '../games/flappy.js';
import { SpaceInvadersGame } from '../games/invaders.js';

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation de l\'application...');

    // Vérifier que Plotly est chargé
    if (typeof Plotly !== 'undefined') {
        console.log('✅ Plotly est chargé (version:', Plotly.BUILD, ')');
    } else {
        console.warn('⚠️ Plotly n\'est pas chargé - les graphiques mathématiques ne fonctionneront pas');
    }

    try {
        // Sélection automatique du texte au focus pour tous les inputs (Global UX)
        document.addEventListener('focusin', (event) => {
            if (event.target.tagName === 'INPUT' && (event.target.type === 'number' || event.target.type === 'text')) {
                // Utiliser setTimeout pour s'assurer que le focus est bien établi avant de sélectionner
                setTimeout(() => {
                    event.target.select();
                }, 0);
            }
        });

        // Initialiser la navigation et le thème
        console.log('📍 Initialisation navigation...');
        new Navigation();
        console.log('🎨 Initialisation thème...');
        new ThemeManager();
        console.log('🌐 Initialisation langues...');
        new LanguageManager();
        console.log('📂 Initialisation collapsibles...');
        initCollapsibles();

        // Initialiser les visualisations mathématiques
        console.log('🔢 Initialisation modules mathématiques...');
        initPrimes();
        initFibonacci();
        initPalette();
        initPascal();
        initMandelbrot();
        initUlam();
        initWeierstrass();
        initSurface3D();

        // Initialiser les jeux
        console.log('🎮 Initialisation jeux...');
        const tetrisGame = new TetrisGame('tetris-canvas');
        const pongGame = new PongGame('pong-canvas');
        const snakeGame = new SnakeGame('snake-canvas');
        const breakoutGame = new BreakoutGame('breakout-canvas');
        const memoryGame = new MemoryGame('memory-grid');
        const game2048 = new Game2048('2048-grid');
        const flappyGame = new FlappyBirdGame('flappy-canvas');
        const invadersGame = new SpaceInvadersGame('invaders-canvas');

        // Event listeners pour Tetris
        document.getElementById('tetris-start').addEventListener('click', () => tetrisGame.start());
        document.getElementById('tetris-pause').addEventListener('click', () => tetrisGame.pause());
        document.getElementById('tetris-reset').addEventListener('click', () => tetrisGame.reset());

        // Event listeners pour Pong
        document.getElementById('pong-start').addEventListener('click', () => pongGame.start());
        document.getElementById('pong-reset').addEventListener('click', () => pongGame.reset());

        // Event listeners pour Snake
        document.getElementById('snake-start').addEventListener('click', () => snakeGame.start());
        document.getElementById('snake-reset').addEventListener('click', () => snakeGame.reset());

        // Event listeners pour Breakout
        document.getElementById('breakout-start').addEventListener('click', () => breakoutGame.start());
        document.getElementById('breakout-reset').addEventListener('click', () => breakoutGame.reset());

        // Event listeners pour Memory
        document.getElementById('memory-start').addEventListener('click', () => memoryGame.reset());
        document.getElementById('memory-reset').addEventListener('click', () => memoryGame.reset());

        // Event listeners pour 2048
        document.getElementById('2048-start').addEventListener('click', () => game2048.reset());
        document.getElementById('2048-reset').addEventListener('click', () => game2048.reset());

        // Event listeners pour Flappy Bird
        document.getElementById('flappy-start').addEventListener('click', () => flappyGame.start());
        document.getElementById('flappy-reset').addEventListener('click', () => flappyGame.reset());

        // Event listeners pour Space Invaders
        document.getElementById('invaders-start').addEventListener('click', () => invadersGame.start());
        document.getElementById('invaders-reset').addEventListener('click', () => invadersGame.reset());

        console.log('✅ Application initialisée avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        console.error('Stack trace:', error.stack);
    }
});
