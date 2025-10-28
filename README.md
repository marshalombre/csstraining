# Web Development Training Site

**A personal training site where I build web pages and small web applications step by step to learn front-end development from scratch.**

---

## Project overview

This repository is my learning playground. I create pages and small applications progressively to practice and deepen my understanding of **HTML**, **CSS**, and **JavaScript**. The goal is to learn by doing: build, test, break, fix, and improve.

- Starting point: **zero knowledge**
- Focus: fundamentals of web development (structure, styling, interactivity)
- Method: small, self-contained pages/apps added over time

---

## What you will find here

- Simple static pages demonstrating layout and styling
- Small JavaScript applications and experiments
- Examples of DOM manipulation, events, and basic logic
- Assets used in examples (images, fonts, icons)
- Optional build outputs in `dist/` (if I start using a bundler)

---

## Project structure (single-folder view)

```
src/
  ├─ assets/        # images, fonts, icons
  ├─ css/           # stylesheets
  ├─ js/            # scripts and modules
  ├─ html/          # additional HTML pages (optional)
  └─ index.html     # main entry page

dist/               # generated files (ignored by git)
tests/              # optional tests
```

> Note: This repo is organized so I can add a new folder/page for each learning exercise or small app.

---

## How to run the site locally

No special tooling is required. Open the HTML files in your browser:

1. Open `src/index.html` in any modern browser.

If you want live reloading during development, you can use a simple dev server (Node.js optional):

```bash
# install live-server globally (optional)
npm install -g live-server

# run live server from project root and serve the src folder
live-server src
```

---

## Examples of pages / apps I plan to build

- ✅ HTML basics: semantic structure and forms  
- ✅ CSS layout practice: Flexbox and Grid examples  
- ✅ Styling experiments: responsive header, navigation  
- 🔜 JavaScript: DOM manipulation, form validation  
- 🔜 Small apps: To-do, calculator, mini-game  
- 🔜 Progressive enhancements and accessibility checks

(Checked items are conceptual milestones; I will update this list as I build.)

---

## Learning goals

- Understand semantic HTML and good document structure  
- Become comfortable creating responsive layouts with CSS  
- Learn vanilla JavaScript for interactive behavior and state management  
- Build a small portfolio of projects demonstrating progress

---

## Git & contribution notes

- This is a personal training repository. Contributions are welcome but optional—please open an issue or PR if you have suggestions.
- Branching model I use:
  - `main` — stable snapshots or portfolio-ready pages
  - `dev` — ongoing work
  - `feature/<name>` — specific exercises or apps

---

## .gitignore (recommended)

Ignore common build and system files:

```
dist/
node_modules/
*.log
.DS_Store
.vscode/
```

---

## License

This repository is for personal learning and experimentation. Use the code freely for learning purposes. Add a license file if you plan to publish or share more widely (MIT recommended).

---

## About the author

**MarshalOmbre** — beginner web developer on a learning journey.  
I started from zero and am building this site to grow my skills through real practice.

---

## Contact

If you want to follow my progress or give feedback, add an issue or open a pull request on this repository.
