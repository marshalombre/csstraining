export let isDark = false;

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    isDark = newTheme === 'dark';
    
    document.getElementById('themeToggle').textContent = 
        newTheme === 'light' ? '🌙' : '☀️';
}

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);