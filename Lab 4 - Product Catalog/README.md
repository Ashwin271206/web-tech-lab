# ShopperzCart — React Product Catalog

A product catalog app built with **React** (Vite) that lets users browse, search, filter, and sort a list of products. All filtering and sorting happens on the client using React state and hooks. This frontend-only project was later converted into the full MERN application in Lab 8.

## Features

- **Product Grid** — 48 products across 8 categories (Electronics, Clothing, Grocery, Accessories, Fitness, Beauty, Home & Kitchen, Office Supplies), each showing price, star rating, and stock status.
- **Search** — filter products by name as you type.
- **Category Filter** — select one or more categories from the sidebar.
- **Price Range Filter** — dual-handle slider with editable min/max inputs (₹0 – ₹10,000).
- **Rating Filter** — show only products at or above a chosen star rating.
- **Sorting** — by name (A–Z), price (low → high / high → low), or rating.
- **Out-of-Stock Handling** — out-of-stock products are always pushed to the end of the list.
- **Reset Filters** — clear all active filters in one click, with a live "N products found" count.

## Tech Stack

| Layer     | Technology                                             |
|-----------|---------------------------------------------------------|
| Frontend  | React 18 (components, props, `useState`, `useMemo`)     |
| Tooling   | Vite                                                    |
| Styling   | Plain CSS (`index.css`)                                 |
| Data      | Static JavaScript array (`products.js`)                 |

## Project Structure

```
Lab 4 - Product Catalog/
├── index.html
├── icon.svg
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # Entry point, renders <App />
    ├── App.jsx           # State for search, filters & sort; computes the filtered list
    ├── components.jsx    # SearchBar, Sidebar, PriceRangeSlider, RatingFilter, SortBy, ProductGrid, ProductCard, StarRating
    ├── products.js       # Product data (48 items)
    └── index.css         # Stylesheet
```

## How to Run

**Prerequisites:** Node.js (v18 or later) installed.

```bash
cd "Lab 4 - Product Catalog"
npm install
npm run dev                # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

To build a production version instead:

```bash
npm run build
npm run preview
```
