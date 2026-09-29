# Light & Dark Mode — Theme Toggle for Personal Website

An extension of the Lab 1 personal website that adds a **Light / Dark theme toggle** using CSS custom properties and vanilla **JavaScript**. The chosen theme is remembered across visits using `localStorage`, and the initial theme follows the operating system's colour-scheme preference.

## Features

- **Theme Toggle Button** — a single button in the navbar switches between light and dark mode, with a sun/moon icon.
- **CSS Variables for Theming** — all colours are defined as custom properties on `:root` and overridden under `html[data-theme="light"]`.
- **Persistent Preference** — the selected theme is saved in `localStorage` and re-applied on reload.
- **System Preference Detection** — on the first visit, the theme is chosen using the `prefers-color-scheme` media query.
- **Smooth Transitions** — background and text colours animate when the theme changes.
- **Same Portfolio Content** — Home, Education, Experience, Projects, Skills, Profiles, and Contact pages, with a responsive hamburger menu.

## Tech Stack

| Layer     | Technology                                                       |
|-----------|-------------------------------------------------------------------|
| Markup    | HTML5                                                             |
| Styling   | CSS3 (custom properties, `data-theme` attribute, media queries)   |
| Scripting | Vanilla JavaScript (`localStorage`, `matchMedia`)                 |
| Fonts     | Google Fonts (Space Grotesk, Inter, JetBrains Mono)               |

## Project Structure

```
Lab 3 - Light & Dark Mode/
├── index.html      # Markup, embedded theme styles, navigation + theme toggle script
├── pfp.png         # Profile picture
└── favicon.png     # Browser tab icon
```

## How It Works

1. On load, the script reads the saved theme from `localStorage`; if none exists, it checks `prefers-color-scheme`.
2. `applyTheme()` sets `data-theme="light"` or `data-theme="dark"` on the `<html>` element and updates the toggle icon.
3. Since every colour in the stylesheet uses `var(--...)`, changing the attribute re-themes the whole page instantly.
4. Each click on the toggle flips the theme and saves the new value to `localStorage`.

## How to Run

No installation or build step is required.

1. Open the `Lab 3 - Light & Dark Mode` folder.
2. Double-click `index.html` to open it in any modern browser.
3. Click the moon/sun button in the navbar to switch themes.
