# Student Information Web Server

A simple Student Information System built using only **Node.js core modules**:
`http`, `fs`, `url`, and `path`. No Express, no React, no external dependencies.

## Features
- List students (with optional search/filter by name, department, year)
- Add a new student
- Update an existing student
- Delete a student
- Simple pastel-themed HTML/CSS/vanilla-JS UI
- Data persisted to `data/students.json` using the `fs` module

## Requirements
- Node.js v14 or higher (no npm packages required)

## Setup & Run

1. Unzip the project and open a terminal in the project folder.
2. (Optional) Install dependencies — there are none, but this keeps npm happy:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   or directly:
   ```
   node server.js
   ```
4. Open your browser at:
   ```
   http://localhost:3000
   ```

To use a different port:
```
PORT=4000 node server.js
```

## API Endpoints

| Method | Endpoint                  | Description                         |
|--------|----------------------------|--------------------------------------|
| GET    | /api/students              | Get all students (supports ?search=, ?department=, ?year=) |
| GET    | /api/students/:id          | Get a single student by ID          |
| POST   | /api/students               | Add a new student                   |
| PUT    | /api/students/:id           | Update an existing student           |
| DELETE | /api/students/:id           | Delete a student                     |

### Example POST body
```json
{
  "name": "John Doe",
  "age": 21,
  "department": "Computer Science",
  "year": 2,
  "email": "john.doe@example.com"
}
```

## Project Structure
```
Lab 10 - FS & HTTP & URL/
├── server.js          # Main server (http, fs, url modules)
├── package.json
├── data/
│   └── students.json  # Student data store
└── public/
    ├── index.html      # UI
    ├── style.css        # Pastel styling
    └── app.js            # Frontend logic (fetch calls to API)
```
