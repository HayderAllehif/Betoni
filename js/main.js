/* ========================================
   Pirkanmaan Betonilattiat - Main JS
   ======================================== */

// ========== Mobile Menu ==========
const burger = document.querySelector('.hamburger');
const drawer = document.getElementById('mobile-menu');
const scrim = document.getElementById('scrim');

function closeMenu() {
  burger.setAttribute('aria-expanded', 'false');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('open');
  document.body.classList.remove('noscroll');
}

function openMenu() {
  burger.setAttribute('aria-expanded', 'true');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  scrim.classList.add('open');
  document.body.classList.add('noscroll');
}

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  expanded ? closeMenu() : openMenu();
});

scrim.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

drawer.addEventListener('click', (e) => {
  if (e.target.matches('a')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 920) closeMenu();
});

// ========== Footer Year ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== Theme Toggle ==========
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
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

// Initialize theme
setTheme(getPreferredTheme());

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'light' : 'dark');
  }
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  
  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('Virhe lähetyksessä. Yritä uudelleen tai soita meille.');
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  }
});

// Reset form function (global)
window.resetForm = function() {
  contactForm.reset();
  contactForm.style.display = 'block';
  formSuccess.style.display = 'none';
  submitBtn.disabled = false;
  submitBtn.classList.remove('loading');
};
