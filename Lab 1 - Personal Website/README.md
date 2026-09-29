# Personal Website — HTML & CSS Portfolio

A single-page personal portfolio website built with plain **HTML**, **CSS**, and a small amount of vanilla **JavaScript**. It presents my education, work experience, projects, skills, online profiles, and contact details across multiple "pages" that are switched in place without reloading.

## Features

- **Multi-section Layout** — Home, Education, Experience, Projects, Skills, Profiles, and Contact, each shown as its own page via the navigation bar.
- **Hero Section** — introduction, quick stats, profile card with photo (falls back to initials if the image is missing), and a downloadable resume PDF.
- **Tables** — academic timeline and contact details presented using HTML tables.
- **Glassmorphism UI** — frosted-glass cards over an animated aurora gradient background, with custom Google Fonts.
- **Reveal Animations** — sections fade/slide in whenever a page is opened.
- **Responsive Design** — collapses into a hamburger menu on smaller screens; navbar shrinks on scroll.

## Tech Stack

| Layer     | Technology                                          |
|-----------|------------------------------------------------------|
| Markup    | HTML5                                                |
| Styling   | CSS3 (custom properties, grid, flexbox, animations)  |
| Scripting | Vanilla JavaScript (page switching, mobile menu)     |
| Fonts     | Google Fonts (Space Grotesk, Inter, JetBrains Mono)  |

## Project Structure

```
Lab 1 - Personal Website/
├── index.html      # All page sections + navigation script
├── style.css       # Full stylesheet (aurora background, glass cards, responsive rules)
├── pfp.png         # Profile picture
├── favicon.png     # Browser tab icon
└── Resume.pdf      # Downloadable resume
```

## How to Run

No installation or build step is required.

1. Open the `Lab 1 - Personal Website` folder.
2. Double-click `index.html` to open it in any modern browser.

Alternatively, open the folder in VS Code and use the **Live Server** extension to serve it at `http://127.0.0.1:5500`.
