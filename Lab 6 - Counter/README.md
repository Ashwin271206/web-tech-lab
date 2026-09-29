# Counter App — React Components, Props & State

A simple counter application built with **React** (Vite) that increments and decrements a number. The app is deliberately split into many small components to demonstrate **component composition**, passing data down through **props**, lifting **state** up to a parent, and handling events via callback props.

## Features

- **Increment / Decrement** — buttons to increase or decrease the counter value.
- **Single Source of State** — the count is stored once in `App` using the `useState` hook.
- **Props Down, Events Up** — the count flows down to the display components as a prop, and button clicks call handler functions passed down from `App`.
- **Component Hierarchy** — the UI is broken into nested, reusable components.

## Component Tree

```
App                      # holds `count` state + increment/decrement handlers
├── Display              # receives count
│   ├── Header           # "Counter App" title
│   └── Counter          # shows the current count
└── ButtonSection        # receives onIncrement / onDecrement
    └── Button
        ├── IncrementButton
        └── DecrementButton
```

## Tech Stack

| Layer     | Technology                             |
|-----------|-----------------------------------------|
| Frontend  | React 18 (`useState`, props, events)    |
| Tooling   | Vite                                    |
| Styling   | Plain CSS (`style.css`)                 |

## Project Structure

```
Lab 6 - Counter/
├── index.html
├── package.json
└── src/
    ├── main.jsx      # Entry point, renders <App />
    ├── App.jsx       # All components + counter state
    └── style.css     # Stylesheet
```

## How to Run

**Prerequisites:** Node.js (v18 or later) installed.

```bash
cd "Lab 6 - Counter"
npm install
npm run dev                # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser.
