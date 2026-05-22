// =========================================
// Projects Page Data & Logic
// =========================================

const PROJECTS = [
  {
    id: 'lemp-ubuntu',
    name: 'LEMP Stack — Ubuntu Server',
    date: '2025',
    folder: 'lemp-stack-ubuntu-server',
    purpose: 'A complete LEMP stack deployed on a bare Ubuntu server for hosting PHP web applications with a relational MySQL database.',
    stack: [
      { component: 'Web Server', tech: 'Nginx' },
      { component: 'Backend',    tech: 'PHP 8.3-FPM' },
      { component: 'Database',   tech: 'MySQL' },
      { component: 'OS',         tech: 'Ubuntu Server' },
    ],
    architecture: `Ubuntu Server
├── Nginx (Web Server) :80
│   └── PHP 8.3-FPM
│       └── PHP Web Application
│           └── MySQL → dbfarm2
└── SSH Access (key-based)`,
    structure: `lemp-stack-ubuntu-server/
├── configs/
│   └── nginx_server_block.conf
├── scripts/
│   └── fix_permissions.sh
├── sql/
│   └── schema.sql
├── .gitignore
└── README.md`,
    howItWorks: `Nginx receives browser requests and forwards .php files to PHP-FPM for processing. PHP-FPM executes the application code and communicates with MySQL to fetch or store data. fix_permissions.sh sets correct ownership to www-data. db_import.sh creates the dbfarm2 schema.`,
    errors: [
      { title: '502 Bad Gateway', fix: 'PHP-FPM was not running. Verified socket path matched installed PHP version.' },
      { title: 'MySQL Access Denied', fix: 'Recreated user with correct credentials and re-granted privileges.' },
    ],
    takeaways: [
      'Nginx + PHP-FPM is faster and more memory-efficient than Apache + mod_php',
      'Always run mysql_secure_installation before exposing a server',
      'Web root permissions must be set to www-data to avoid 403 errors',
    ],
  },
  {
    id: 'proot-lemp',
    name: 'LEMP Stack — Android proot',
    date: '2026',
    folder: 'proot-lemp-android',
    purpose: 'Full LEMP stack running inside a proot Debian environment on Android ARM64. No root, no laptop, no cloud.',
    stack: [
      { component: 'Web Server', tech: 'Nginx 1.26.3' },
      { component: 'Backend',    tech: 'PHP 8.4-FPM' },
      { component: 'Database',   tech: 'MariaDB 11.8.6' },
      { component: 'OS',         tech: 'Debian 13 (proot)' },
      { component: 'Platform',   tech: 'Android ARM64' },
    ],
    architecture: `Android Phone
└── Termux
    └── proot Debian (ARM64)
        ├── Nginx :8080
        │   └── PHP 8.4-FPM
        │       └── Farm Management System
        │           └── MariaDB → dbfarm2
        └── Cloudflare Tunnel (planned)`,
    structure: `proot-lemp-android/
├── configs/
│   └── nginx_server_block.conf
├── scripts/
│   ├── startlemp.sh
│   ├── stoplemp.sh
│   └── statuslemp.sh
└── README.md`,
    howItWorks: `proot creates an isolated Debian environment inside Termux on Android. Services are started manually since proot has no systemd. Nginx runs on port 8080 because proot cannot bind ports below 1024. Acode editor accesses files via a symlink from Termux to the proot web root.`,
    errors: [
      { title: 'Port 80 Permission Denied', fix: 'Changed Nginx to listen on port 8080 — proot cannot bind privileged ports.' },
      { title: 'ping binary missing', fix: 'Installed iputils-ping and set SUID bit for www-data execution.' },
    ],
    takeaways: [
      'A modern Android phone is capable of running a full production-style web stack',
      'proot limitations are all workable with small configuration adjustments',
      'Symlinks bridge proot filesystem to Termux for seamless mobile editing',
    ],
  },
  {
    id: 'dvwa-pentest',
    name: 'DVWA Pentest Writeup',
    date: '2026',
    folder: 'dvwa-pentest-writeup',
    purpose: 'Full web application penetration test on DVWA covering 10 attack vectors, conducted entirely on Android ARM64.',
    stack: [
      { component: 'Target',   tech: 'DVWA (Security: Low)' },
      { component: 'Platform', tech: 'Android ARM64 proot' },
      { component: 'Tools',    tech: 'curl, hashcat, hydra, mitmproxy' },
    ],
    architecture: `Attack Chain
├── SQL Injection → credential dump
├── Hash Cracking → plaintext passwords
├── XSS (Reflected, Stored, DOM)
├── Brute Force → valid credentials
├── Command Injection → RCE via web shell
├── File Upload → RCE via shell.php
├── CSRF → account takeover
└── Blind SQLi → DB enumeration`,
    structure: `dvwa-pentest-writeup/
├── 01-sql-injection/
├── 02-hash-cracking/
├── 03-xss-reflected/
├── 04-xss-stored/
├── 05-xss-dom/
├── 06-brute-force/
├── 07-command-injection/
├── 08-file-upload/
├── 09-csrf/
└── 10-sql-injection-blind/`,
    howItWorks: `Each attack module contains a README with the vulnerability explanation, exploitation steps, and payloads used, plus bash/PHP scripts used during the attack. All attacks were performed on a self-hosted local environment.`,
    errors: [
      { title: 'Hydra http-get-form broken on ARM', fix: 'Used a curl-based bash loop as a functional equivalent.' },
      { title: 'ping binary missing for Command Injection', fix: 'Installed iputils-ping, set SUID bit.' },
    ],
    takeaways: [
      'All 10 DVWA attack modules completed on Android ARM64',
      'DOM XSS is the hardest to detect — payload never reaches the server',
      'Stored XSS is the most dangerous — one payload affects all visitors indefinitely',
    ],
  },
  {
    id: 'gemini-agent',
    name: 'Termux Gemini AI Agent',
    date: '2026',
    folder: 'termux-gemini-ai-agent',
    purpose: 'CLI-based agentic AI system powered by Gemini. Executes terminal commands, automates Git, and controls remote machines via SSH from Termux.',
    stack: [
      { component: 'AI Engine', tech: 'Gemini API' },
      { component: 'Runtime',   tech: 'Python 3 on Termux' },
      { component: 'Platform',  tech: 'Android ARM64' },
    ],
    architecture: `Termux (Android)
└── main.py (Agent loop)
    ├── Gemini API (reasoning)
    ├── executor.sh (safe command runner)
    ├── agents/
    │   ├── gitmaster.md
    │   └── sysmaster.md
    └── memory.json`,
    structure: `termux-gemini-ai-agent/
├── main.py
├── config.json
├── memory.json
├── agents/
│   ├── gitmaster.md
│   └── sysmaster.md
└── scripts/
    ├── executor.sh
    └── boot_start.sh`,
    howItWorks: `The agent receives a natural language prompt, sends it to Gemini API for reasoning, extracts a terminal command from the response, checks it against a safety blacklist, prompts for confirmation, then executes it. Results are fed back to the agent for the next step.`,
    errors: [
      { title: 'No persistent background process', fix: 'Used tmux for persistent sessions and Termux:Boot for auto-start.' },
      { title: 'Shell variable expansion on PHP write', fix: 'Used single quotes to prevent $variable interpretation.' },
    ],
    takeaways: [
      'Agentic AI is fundamentally different from a chatbot — it acts, not just answers',
      'Safety filtering and confirmation prompts are essential before autonomous execution',
      'tmux + Termux:Boot solves the Android background process limitation',
    ],
  },
];

function renderProjects() {
  const list   = document.getElementById('project-list');
  const detail = document.getElementById('project-detail');
  if (!list || !detail) return;

  // Build folder list
  list.innerHTML = PROJECTS.map((p, i) => `
    <div class="folder-item ${i === 0 ? 'active' : ''}" data-id="${p.id}">
      <span class="folder-icon">📁</span>
      <span>${p.folder}</span>
    </div>
  `).join('');

  // Render detail
  function showProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;

    document.querySelectorAll('.folder-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === id);
    });

    detail.innerHTML = `
      <div class="fade-in">
        <div class="proj-name">${p.name}</div>
        <div class="proj-date" style="color:var(--text-dim);font-size:11px;margin-bottom:16px">${p.date}</div>

        <div class="proj-section-title">Purpose</div>
        <div class="proj-text">${p.purpose}</div>

        <div class="proj-section-title">Stack</div>
        <table class="proj-table">
          <tr><th>Component</th><th>Technology</th></tr>
          ${p.stack.map(s => `<tr><td>${s.component}</td><td style="color:var(--cyan)">${s.tech}</td></tr>`).join('')}
        </table>

        <div class="proj-section-title">Architecture</div>
        <pre class="proj-pre">${p.architecture}</pre>

        <div class="proj-section-title">Project Structure</div>
        <pre class="proj-pre">${p.structure}</pre>

        <div class="proj-section-title">How It Works</div>
        <div class="proj-text">${p.howItWorks}</div>

        <div class="proj-section-title">Errors Encountered</div>
        ${p.errors.map(e => `
          <div class="proj-error">
            <span style="color:var(--red)">✗ ${e.title}</span>
            <div style="color:var(--text-dim);font-size:11px;margin-top:4px">Fix: ${e.fix}</div>
          </div>
        `).join('')}

        <div class="proj-section-title">Takeaways</div>
        <ul class="proj-list">
          ${p.takeaways.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  showProject(PROJECTS[0].id);

  list.addEventListener('click', function(e) {
    const item = e.target.closest('.folder-item');
    if (item) showProject(item.dataset.id);
  });
}

document.addEventListener('DOMContentLoaded', renderProjects);
