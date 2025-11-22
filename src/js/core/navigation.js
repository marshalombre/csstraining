// Navigation entre sections principales et tabs
export class Navigation {
    constructor() {
        this.mainMenuButtons = document.querySelectorAll('.main-menu-btn');
        this.mainSections = document.querySelectorAll('.main-section');
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.gameTabButtons = document.querySelectorAll('.game-tab-button');
        this.gamePanes = document.querySelectorAll('.game-pane');

        this.init();
    }

    init() {
        this.initMainMenu();
        this.initMathTabs();
        this.initGameTabs();
    }

    initMainMenu() {
        this.mainMenuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.dataset.section;

                // Remove active class from all
                this.mainMenuButtons.forEach(btn => btn.classList.remove('active'));
                this.mainSections.forEach(sec => sec.classList.remove('active'));

                // Add active class
                button.classList.add('active');
                document.getElementById(`${section}-section`).classList.add('active');
            });
        });
    }

    initMathTabs() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                // Remove active class
                this.tabButtons.forEach(btn => btn.classList.remove('active'));
                this.tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    initGameTabs() {
        this.gameTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const gameId = button.dataset.game;

                // Remove active class
                this.gameTabButtons.forEach(btn => btn.classList.remove('active'));
                this.gamePanes.forEach(pane => pane.classList.remove('active'));

                // Add active class
                button.classList.add('active');
                document.getElementById(`${gameId}-game`).classList.add('active');
            });
        });
    }
}
