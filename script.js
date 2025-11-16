// ===============================
// THEME LOGIC
// ===============================

function applyTheme(theme) {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-theme-target]');

  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme-preference', theme);

  buttons.forEach((btn) => {
    const target = btn.getAttribute('data-theme-target');
    btn.classList.toggle('theme-btn--active', target === theme);
  });
}

function getInitialTheme() {
  const stored = localStorage.getItem('theme-preference');
  if (stored === 'light' || stored === 'neutral' || stored === 'night') {
    return stored;
  }
  return 'light';
}

function setupThemeSwitcher() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Inject theme switcher buttons
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.innerHTML = `
    <button type="button" class="theme-btn" data-theme-target="light">Clair</button>
    <button type="button" class="theme-btn" data-theme-target="neutral">Neutre</button>
    <button type="button" class="theme-btn" data-theme-target="night">Nuit</button>
  `;
  nav.after(switcher);

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const buttons = switcher.querySelectorAll('[data-theme-target]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-target');
      applyTheme(theme);
    });
  });
}

// ===============================
// NAV & SCROLL
// ===============================

function setupNavScroll() {
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      navLinks.forEach((l) => l.classList.remove('nav__link--active'));
      link.classList.add('nav__link--active');
    });
  });
}

// ===============================
// PORTFOLIO FILTERS
// ===============================

function setupPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projects.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';

      filterButtons.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      projects.forEach((project) => {
        const projectCategory = project.dataset.category || 'all';
        if (category === 'all' || category === projectCategory) {
          project.style.display = 'flex';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

// ===============================
// MOBILE SIDEBAR TOGGLE (OPTIONNEL)
// ===============================

function setupMobileMenu() {
  const toggleBtn = document.getElementById('sidebarMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--open');
  });
}

// ===============================
// INIT
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  setupThemeSwitcher();
  setupNavScroll();
  setupPortfolioFilters();
  setupMobileMenu();
});
