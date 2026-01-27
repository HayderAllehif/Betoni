/* ========================================
   Theme Toggle - Shared across all pages
   ======================================== */

(function() {
  const html = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  }

  // Initialize theme immediately
  setTheme(getPreferredTheme());

  // Setup toggle buttons when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(btn => btn.addEventListener('click', toggleTheme));
    
    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

  // Make toggle available globally
  window.toggleTheme = toggleTheme;
})();
