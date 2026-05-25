// =========================================
// Tim's Homelab — Terminal + Theme
// =========================================

const ROUTES = {
  'root':         'index.html',
  'home':         'index.html',
  'whoistim':     'whoistim.html',
  'goals':        'goals.html',
  'prjs':         'projects.html',
  'projects':     'projects.html',
  'curprjs':      'curprojects.html',
  'current':      'curprojects.html',
  'homelab':      'homelab.html',
  'help':         null,
  'clear':        null,
  'theme':        null,
};

const HELP_TEXT = `
<span style="color:var(--accent)">available commands:</span>
  <span style="color:var(--cyan)">home</span>          — return to main terminal
  <span style="color:var(--cyan)">whoistim</span>      — who is Tim
  <span style="color:var(--cyan)">projects</span>      — accomplished projects
  <span style="color:var(--cyan)">current</span>       — ongoing projects
  <span style="color:var(--cyan)">goals</span>         — personal &amp; project goals
  <span style="color:var(--cyan)">homelab</span>       — homelab environment
  <span style="color:var(--cyan)">theme light</span>   — switch to light mode
  <span style="color:var(--cyan)">theme dark</span>    — switch to dark mode
  <span style="color:var(--cyan)">help</span>          — show this message
  <span style="color:var(--cyan)">clear</span>         — clear terminal
`;

// =========================================
// Theme
// =========================================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme === 'light' ? 'light' : 'dark';
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

// =========================================
// Terminal
// =========================================
function initTerminal(inputId, outputId) {
  const input  = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  if (!input) return;

  input.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    const raw = input.value.trim().toLowerCase().replace(/^cd\s+/, '');
    input.value = '';
    if (!raw) return;

    // Theme command
    if (raw.startsWith('theme ')) {
      const mode = raw.split(' ')[1];
      if (mode === 'light' || mode === 'dark') {
        applyTheme(mode);
        if (output) output.innerHTML += `<div style="color:var(--accent)">theme switched to ${mode} mode</div>`;
      } else {
        if (output) output.innerHTML += `<div style="color:var(--red)">usage: theme light | theme dark</div>`;
      }
      if (output) output.scrollTop = output.scrollHeight;
      return;
    }

    if (raw === 'clear') {
      if (output) output.innerHTML = '';
      return;
    }

    if (raw === 'help') {
      if (output) output.innerHTML += HELP_TEXT;
      if (output) output.scrollTop = output.scrollHeight;
      return;
    }

    if (ROUTES[raw] !== undefined) {
      if (output) output.innerHTML += `<div style="color:var(--text-dim)">$ cd ${raw}</div><div style="color:var(--accent)">navigating...</div>`;
      setTimeout(() => { window.location.href = ROUTES[raw]; }, 380);
    } else {
      if (output) output.innerHTML += `<div style="color:var(--red)">bash: ${raw}: command not found &nbsp;—&nbsp; type <span style="color:var(--accent)">help</span> for commands.</div>`;
    }

    if (output) output.scrollTop = output.scrollHeight;
  });
}

// Clickable cheatsheet
function initCheatsheet() {
  document.querySelectorAll('.cmd').forEach(el => {
    el.addEventListener('click', function() {
      const cmd = this.dataset.cmd;
      if (ROUTES[cmd] !== undefined && ROUTES[cmd] !== null) {
        window.location.href = ROUTES[cmd];
      }
    });
  });
}

// Auto-type
function autoType(outputId, lines, delay = 750) {
  const output = document.getElementById(outputId);
  if (!output) return;
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    output.innerHTML += `<div class="fade-in" style="color:var(--text-dim)">${lines[i]}</div>`;
    i++;
    setTimeout(next, delay);
  }
  setTimeout(next, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initTerminal('main-input', 'main-output');
  initTerminal('nav-input',  'nav-output');
  initCheatsheet();
});
