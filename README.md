# Tim's Homelab Portfolio

A personal portfolio website built with plain HTML, CSS, and JavaScript. Designed around a Linux terminal aesthetic, where navigation is driven by typing commands into a terminal interface embedded on every page.

---

## Overview

The site serves as an archive of personal IT projects, homelab documentation, learning goals, and ongoing work. It is modular — each page is a standalone HTML file, making it easy to edit or extend individual sections without touching the rest of the site.

---

## Structure

```
tims-homelab/
├── index.html           — Landing page (main terminal)
├── whoistim.html        — Profile, skills, socials
├── projects.html        — Accomplished projects
├── curprojects.html     — Ongoing projects with progress
├── goals.html           — Personal and project goals
├── homelab.html         — Environment, workflow, topology
├── assets/
│   ├── css/
│   │   └── style.css    — All shared styles
│   ├── js/
│   │   ├── terminal.js  — Navigation logic and auto-type
│   │   └── projects.js  — Project data and render logic
│   └── img/             — Project images and profile photo
```

---

## How Navigation Works

Every page contains a terminal input. The user types a command and presses Enter to navigate to another page. Commands can also be clicked from the cheatsheet displayed below each terminal.

Available commands:

```
root      — return to the landing page
whoistim  — go to the profile page
prjs      — go to the projects page
curprjs   — go to the ongoing projects page
goals     — go to the goals page
homelab   — go to the homelab page
help      — list all commands
clear     — clear terminal output
```

Commands also accept the `cd` prefix, for example `cd prjs` works the same as `prjs`.

---

## How to Add a Project

Open `assets/js/projects.js` and add a new object to the `PROJECTS` array following the existing structure:

```javascript
{
  id: 'your-project-id',
  name: 'Project Name',
  date: '2026',
  folder: 'github-repo-name',
  image: 'assets/img/your-image.jpg',
  purpose: 'Brief description of what the project does.',
  stack: [
    { component: 'Component', tech: 'Technology' },
  ],
  architecture: `your architecture here`,
  structure: `your folder structure here`,
  howItWorks: 'Explanation of how the project works.',
  errors: [
    { title: 'Error title', fix: 'How it was fixed.' },
  ],
  takeaways: [
    'Key lesson learned',
  ],
}
```

Add the corresponding image to `assets/img/` and it will appear automatically in the projects page.

---

## How to Add an Ongoing Project

Open `curprojects.html` and add a new object to the `CUR_PROJECTS` array in the script section at the bottom:

```javascript
{
  id: 'unique-id',
  folder: 'folder-display-name',
  name: 'Project Name',
  purpose: 'What this project is and what it aims to achieve.',
  image: 'assets/img/your-image.jpg',
  progress: 60,  // percentage 0-100
}
```

---

## How to Run Locally

No build tools or dependencies required. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

Opening `index.html` directly as a file also works in most browsers.

---

## Hosting

The site is a fully static site — no backend, no database, no build step. It can be deployed to any static hosting platform.

Recommended: Cloudflare Pages

1. Push the repository to GitHub
2. Go to Cloudflare Pages and connect the repository
3. Set build command to none, output directory to `/`
4. Deploy — the site will be live at `yourname.pages.dev`

The site auto-deploys on every push to the connected branch.

---

## Stack

- HTML5
- CSS3 (custom properties, CSS Grid, Flexbox)
- Vanilla JavaScript (no frameworks, no dependencies)
- Google Fonts — JetBrains Mono

---

## License

MIT
