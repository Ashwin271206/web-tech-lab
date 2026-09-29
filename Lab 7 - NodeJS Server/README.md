# Node.js HTTP Server — Serving Static Pages

A basic web server built using only Node.js core modules (**`http`**, **`fs`**, and **`path`**) — no Express or other frameworks. It serves static HTML pages from the `public/` folder, sets the correct content type for each file, logs every incoming request, and returns a 404 page for unknown routes.

## Features

- **HTTP Server** — created with `http.createServer()` and listening on port `3000`.
- **Static File Serving** — `/` and `/index.html` serve the homepage, `/about.html` serves the About page.
- **Asynchronous File Reading** — pages are read using `fs.readFile()` without blocking the server.
- **Content-Type Detection** — the file extension is mapped to the correct MIME type (HTML, CSS, JS, PNG, JPG, GIF).
- **Request Logging Middleware** — each request is logged to the console with a timestamp, method, and URL.
- **Error Handling** — unknown routes or missing files return a `404 - Page Not Found` response; server errors are logged.

## Tech Stack

| Layer     | Technology                                  |
|-----------|----------------------------------------------|
| Backend   | Node.js (`http`, `fs`, `path` core modules)  |
| Frontend  | Static HTML pages with inline CSS            |

## Project Structure

```
Lab 7 - NodeJS Server/
├── server.js         # HTTP server, logging middleware, routing & file serving
└── public/
    ├── index.html    # Homepage
    └── about.html    # About page
```

## How to Run

**Prerequisites:** Node.js installed. No `npm install` is needed since only built-in modules are used.

```bash
cd "Lab 7 - NodeJS Server"
node server.js             # starts the server on http://localhost:3000
```

Open `http://localhost:3000` in your browser. Use the button on the homepage to go to the About page, and watch the terminal for request logs. Press `Ctrl + C` to stop the server.

## Routes

| Method | URL             | Response                         |
|--------|------------------|-----------------------------------|
| GET    | `/`              | `public/index.html`               |
| GET    | `/index.html`    | `public/index.html`               |
| GET    | `/about.html`    | `public/about.html`               |
| GET    | any other path   | `404 - Page Not Found`            |
