// Theme toggle
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme;
}

document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
});
