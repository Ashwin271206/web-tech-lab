# BlogVault — Blog / Post Management (React + Express + MongoDB Atlas)

A full-stack blog management application where users can **create, view, update, and delete** blog posts. The **React** frontend talks to an **Express.js REST API** using `fetch()`, and posts are stored in **MongoDB Atlas** using the official MongoDB Node.js driver.

```
React frontend  ->  fetch()  ->  Express REST API  ->  MongoDB Atlas
   (app/)                          (server/)
```

## Features

- **Home** — shows the latest posts with excerpt, author, date, reading time, and tags.
- **Create Post** — form with title, author, tags, and content, with character limits and field-level error messages from the API.
- **View Post** — full post page with metadata and tags.
- **Edit Post** — edit a post in place (`?edit=1`) and save changes with a `PATCH` request.
- **Delete Post** — delete from the post page or the archive, with a confirmation dialog.
- **Archive** — list of all posts with live search across title, author, tags, and content.
- **Server-side Validation** — required fields, length limits, and tag rules (max 6 tags, each ≤ 24 chars) are checked by the API.
- **Friendly Error Handling** — loading skeletons, empty states, error banners, a 404 page, and a React error boundary.

## Tech Stack

| Layer     | Technology                                   |
|-----------|-----------------------------------------------|
| Frontend  | React 18 (Vite), React Router                 |
| Backend   | Node.js, Express                              |
| Database  | MongoDB Atlas (official `mongodb` driver)     |

## Project Structure

```
Lab 9 - Blog Management/
├── app/                  # React frontend (Vite)
│   ├── index.html, vite.config.js, package.json
│   └── src/
│       ├── main.jsx, App.jsx, ErrorBoundary.jsx, index.css, utils.js
│       ├── components/   # PostSummary.jsx, PostForm.jsx, ConfirmDialog.jsx, StatusMessage.jsx
│       └── pages/        # Home.jsx, Create.jsx, Post.jsx, Archive.jsx
└── server/               # Express backend
    ├── .env, package.json
    ├── loadEnvironment.js  # Loads server/.env into process.env
    ├── db/conn.js          # MongoDB Atlas connection
    ├── routes/posts.js     # /api/posts endpoints
    └── index.js            # App entry point
```

## How to Run

**Prerequisites:** Node.js (v18.11 or later), and a MongoDB Atlas account (free M0 cluster is enough).

### 1. MongoDB Atlas Setup (one time)

1. Atlas -> **Database Access** -> *Add New Database User* (username + password, "Read and write to any database").
2. Atlas -> **Network Access** -> *Add IP Address* -> **Add Current IP Address** (or `0.0.0.0/0` for a lab setup).
3. Atlas -> **Database** -> *Connect* -> **Drivers** -> copy the connection string.
4. Open `server/.env` and paste it as `ATLAS_URI=...`, replacing `<db_password>` with your real password.
   Special characters in the password must be URL-encoded (`@` -> `%40`, `#` -> `%23`, `/` -> `%2F`, `:` -> `%3A`).

The database (`blog`) and collection (`posts`) are created automatically on the first post.

### 2. Backend

```bash
cd server
npm install
npm start                  # starts the API on http://localhost:5050
```

You should see `[db] Connected to MongoDB Atlas` and `[api] Server running on http://localhost:5050`.

### 3. Frontend

In a second terminal:

```bash
cd app
npm install
npm run dev                # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser. Vite forwards every `/api/...` request to the Express server (see `app/vite.config.js`).

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | `/api/health`        | Health check                          |
| GET    | `/api/posts`         | Get all posts (newest first, optional `?limit=N`) |
| GET    | `/api/posts/:id`     | Get a single post                     |
| POST   | `/api/posts`         | Create a new post                     |
| PATCH  | `/api/posts/:id`     | Update a post (`PUT` also accepted)   |
| DELETE | `/api/posts/:id`     | Delete a post                         |

Post document: `{ _id, title, author, content, tags[], createdAt, updatedAt }`

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ATLAS_URI is missing or still contains placeholders` | Edit `server/.env` with your real connection string. |
| `bad auth` / `Authentication failed` | Wrong DB username/password (use the *database user*, not your Atlas login); URL-encode special characters. |
| `Server selection timed out` | Your IP isn't allowed: Atlas -> Network Access -> add it. |
| `EADDRINUSE :::5050` | Port in use. Change `PORT` in `server/.env` **and** the proxy port in `app/vite.config.js`. |
| Page shows "The API isn't responding" | The Express server isn't running — start it in the first terminal. |
