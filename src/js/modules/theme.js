let isDark = false;
export { isDark };

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.dataset.theme = newTheme;
    isDark = newTheme === 'dark';
    
    document.getElementById('themeToggle').textContent = 
        newTheme === 'light' ? '🌙' : '☀️';
}

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);