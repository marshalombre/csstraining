// Jeu Memory
export class MemoryGame {
    constructor(gridId) {
        this.grid = document.getElementById(gridId);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.symbols = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎮', '🎯', '🎲', '🎵', '🎸', '🎹', '🎺', '🎻', '🎼', '🏆', '🏅', '⚽', '🏀'];
        this.init();
    }

    init() {
        this.grid.innerHTML = '';
        const cardSymbols = this.symbols.slice(0, 18).concat(this.symbols.slice(0, 18));
        cardSymbols.sort(() => Math.random() - 0.5);

        cardSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.textContent = '';
            card.addEventListener('click', () => this.flipCard(card));
            this.grid.appendChild(card);
            this.cards.push(card);
        });
    }

    flipCard(card) {
        if (this.flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        if (!this.startTime) {
            this.start();
        }

        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            document.getElementById('memory-moves').textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        setTimeout(() => {
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;

                if (this.matchedPairs === 18) {
                    this.gameWin();
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }
            this.flippedCards = [];
        }, 600);
    }

    start() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('memory-time').textContent = elapsed;
        }, 1000);
    }

    reset() {
        clearInterval(this.timerInterval);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        document.getElementById('memory-moves').textContent = '0';
        document.getElementById('memory-time').textContent = '0';
        this.init();
    }

    gameWin() {
        clearInterval(this.timerInterval);
        const time = Math.floor((Date.now() - this.startTime) / 1000);
        alert(`Bravo ! Terminé en ${this.moves} coups et ${time} secondes !`);
    }
}
