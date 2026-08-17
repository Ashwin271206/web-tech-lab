# CS3801 Web Technologies Lab 
# Lab : 5 University Website

React.js-based menu navigation system for a university website containing menus such as About Us, Academics, Admissions, Research, Campus Life, Placements, and Contact Us, with dropdown menus for relevant sections and use React components, props, JSX, event handling, and React Router to provide smooth navigation between pages.

## Folder structure
```
src/
  components/   Navbar, DropdownMenu, Footer, Icons, PageHeader, SectionLinks, ScrollToTop
  data/         navData.js  (drives the nav bar + dropdowns via props)
  pages/        Home, CampusLife, ContactUs, and About/Academics/Admissions/Research subfolders
  App.jsx       All <Routes> definitions (React Router)
  main.jsx      Entry point, wraps App in <BrowserRouter>
  styles.css    Full stylesheet (pastel theme, no external CSS framework)
```

## How to run

1. Install Node.js (v18 or later) from https://nodejs.org if you don't have it.
2. Unzip this project, then open a terminal in the project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open the URL it prints (usually **http://localhost:5173**) in your browser.

To build a production version instead:
```
npm run build
npm run preview
