// =========================================
// Tim's Homelab — Terminal Navigation
// =========================================

const ROUTES = {
  'root':     'index.html',
  'whoistim': 'whoistim.html',
  'goals':    'goals.html',
  'prjs':     'projects.html',
  'curprjs':  'curprojects.html',
  'homelab':  'homelab.html',
  'help':     null,
  'clear':    null,
};

const HELP_TEXT = `
<span style="color:var(--green)">available commands:</span>
  <span style="color:var(--cyan)">root</span>      — return to main terminal
  <span style="color:var(--cyan)">whoistim</span>  — who is Tim
  <span style="color:var(--cyan)">prjs</span>      — accomplished projects
  <span style="color:var(--cyan)">curprjs</span>   — ongoing projects
  <span style="color:var(--cyan)">goals</span>     — personal & project goals
  <span style="color:var(--cyan)">homelab</span>   — homelab environment
  <span style="color:var(--cyan)">help</span>      — show this message
  <span style="color:var(--cyan)">clear</span>     — clear terminal
`;

function initTerminal(inputId, outputId) {
  const input  = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  if (!input) return;

  input.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase().replace(/^cd\s+/, '');
    input.value = '';

    if (!cmd) return;

    if (cmd === 'clear') {
      if (output) output.innerHTML = '';
      return;
    }

    if (cmd === 'help') {
      if (output) output.innerHTML += HELP_TEXT;
      return;
    }

    if (ROUTES[cmd] !== undefined) {
      if (output) output.innerHTML += `<div style="color:var(--text-dim)">$ cd ${cmd}</div><div style="color:var(--green)">navigating...</div>`;
      setTimeout(() => { window.location.href = ROUTES[cmd]; }, 400);
    } else {
      if (output) output.innerHTML += `<div style="color:var(--red)">bash: ${cmd}: command not found. type <span style="color:var(--green)">help</span> for commands.</div>`;
    }

    if (output) output.scrollTop = output.scrollHeight;
  });
}

// Clickable cheatsheet commands
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

// Auto-type animation
function autoType(outputId, lines, delay = 800) {
  const output = document.getElementById(outputId);
  if (!output) return;
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    output.innerHTML += `<div class="fade-in" style="color:var(--text-dim)">${lines[i]}</div>`;
    i++;
    setTimeout(next, delay);
  }
  setTimeout(next, 600);
}

document.addEventListener('DOMContentLoaded', function() {
  initTerminal('main-input', 'main-output');
  initTerminal('nav-input',  'nav-output');
  initCheatsheet();
});
