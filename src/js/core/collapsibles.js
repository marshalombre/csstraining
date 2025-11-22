// Module pour gérer les collapsibles
export function initCollapsibles() {
    const collapsibleSelectors = [
        '.collapsible-btn',
        '.collapsible-btn-fib',
        '.collapsible-btn-palette',
        '.collapsible-btn-pascal',
        '.collapsible-btn-mandelbrot',
        '.collapsible-btn-ulam',
        '.collapsible-btn-weierstrass',
        '.collapsible-btn-surface'
    ];

    collapsibleSelectors.forEach(selector => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', function () {
                const content = this.nextElementSibling;
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0';
                    content.classList.remove('open');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.classList.add('open');
                }
            });
        }
    });
}
