import { translations } from './translations.js';

export class LanguageManager {
    constructor() {
        this.availableLanguages = ['fr', 'en', 'de', 'es', 'it'];
        this.currentLang = localStorage.getItem('theme-lang') || 'fr';
        this.langSelect = document.getElementById('langSelect');

        this.init();
    }

    init() {
        if (this.langSelect) {
            this.langSelect.value = this.currentLang;
            this.langSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
        }
        this.updateUI();
    }

    setLanguage(lang) {
        if (this.availableLanguages.includes(lang)) {
            this.currentLang = lang;
            localStorage.setItem('theme-lang', lang);
            if (this.langSelect) {
                this.langSelect.value = lang;
            }
            this.updateUI();
        }
    }

    updateUI() {
        const langData = translations[this.currentLang];
        if (!langData) return;

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = this.getNestedValue(langData, key);

            if (value) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = value;
                } else {
                    el.innerHTML = value; // Use innerHTML to support <strong> tags
                }
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
}
