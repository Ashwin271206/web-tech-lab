# University Website — React Router Menu Navigation

A **React.js**-based menu navigation system for a university website, with menus for About Us, Academics, Admissions, Research, Campus Life, and Contact Us. Relevant sections open dropdown sub-menus, and **React Router** provides smooth client-side navigation between pages. The project demonstrates React components, props, JSX, event handling, and routing.

## Features

- **Navigation Bar** — top-level menus generated from a single data file (`navData.js`) and passed down as props.
- **Dropdown Menus** — About Us, Academics, Admissions, and Research each open a dropdown with their sub-pages.
- **Client-side Routing** — 18 routes defined with React Router; unknown URLs fall back to the Home page.
- **Reusable Components** — shared `PageHeader`, `SectionLinks`, `Footer`, and SVG `Icons` used across pages.
- **Scroll to Top** — the page scrolls back to the top on every route change.
- **Custom Styling** — pastel theme written in plain CSS, no external CSS framework.

## Pages & Routes

| Menu         | Route(s)                                                                              |
|--------------|----------------------------------------------------------------------------------------|
| Home         | `/`                                                                                    |
| About Us     | `/about`, `/about/vision-mission`, `/about/leadership`, `/about/departments`            |
| Academics    | `/academics`, `/academics/undergraduate`, `/academics/postgraduate`, `/academics/phd`   |
| Admissions   | `/admissions`, `/admissions/eligibility`, `/admissions/application-process`, `/admissions/important-dates` |
| Research     | `/research`, `/research/areas`, `/research/publications`                                |
| Campus Life  | `/campus-life`                                                                         |
| Contact Us   | `/contact`                                                                             |

## Tech Stack

| Layer     | Technology                            |
|-----------|----------------------------------------|
| Frontend  | React 18 (components, props, JSX)      |
| Routing   | React Router DOM v6                    |
| Tooling   | Vite                                   |
| Styling   | Plain CSS (`styles.css`)               |

## Project Structure

```
Lab 5 - University Website/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── components/   # Navbar, DropdownMenu, Footer, Icons, PageHeader, SectionLinks, ScrollToTop
    ├── data/         # navData.js (drives the nav bar + dropdowns via props)
    ├── pages/        # Home, CampusLife, ContactUs + about/, academics/, admissions/, research/ subfolders
    ├── App.jsx       # All <Routes> definitions (React Router)
    ├── main.jsx      # Entry point, wraps App in <BrowserRouter>
    └── styles.css    # Full stylesheet (pastel theme)
```

## How to Run

**Prerequisites:** Node.js (v18 or later) installed.

```bash
cd "Lab 5 - University Website"
npm install
npm run dev                # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser and use the navigation bar to move between pages.

To build a production version instead:

```bash
npm run build
npm run preview
```
