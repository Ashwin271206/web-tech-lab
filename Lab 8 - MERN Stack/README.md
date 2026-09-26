# ShopperzCart — MERN Stack Shopping Cart Project

A product catalog and shopping cart app, converted from a frontend-only React project into a full **MERN** (MongoDB, Express, React, Node.js) application. Also includes a simple **Task Manager** (Todo list) built end-to-end on the MERN stack, as required by the lab exercise.

## Features

- **Product Catalog** — browse, search, filter (category/price/rating), and sort products.
- **Shopping Cart** — add products to cart, adjust quantities, remove items, see live totals. Cart data is persisted in MongoDB.
- **Task Manager** — add, complete, and delete tasks. Tasks are fetched from and saved to MongoDB via a REST API.

## Tech Stack

| Layer     | Technology                        |
|-----------|------------------------------------|
| Frontend  | React (Vite)                       |
| Backend   | Node.js, Express                   |
| Database  | MongoDB Atlas (via Mongoose)       |

## Project Structure

```
Lab 8 - MERN ShopperzCart/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/       # Cart.jsx, TaskForm.jsx, TaskItem.jsx, TaskList.jsx, TodoApp.jsx
│       ├── CartContext.jsx   # Global cart state
│       ├── App.jsx
│       └── components.jsx    # Catalog UI (search, filters, product grid, etc.)
└── server/          # Express backend
    ├── models/       # Todo.js, Product.js, CartItem.js (Mongoose schemas)
    ├── routes/       # todos.js, products.js, cart.js (API endpoints)
    ├── server.js     # App entry point
    └── seed.js       # Loads the product catalog into MongoDB
```

## How to Run

**Prerequisites:** Node.js installed, and a MongoDB Atlas connection string.  

### 1. MongoDB Connection  
Download your .env file from MongoDB collection in place it inside server/ folder.

### 2. Backend

```bash
cd server
npm install
node seed.js              # one-time: loads products into your database
npm run dev                # starts the API on http://localhost:5000
```

### 3. Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev                # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The **Catalog** tab shows products (fetched from MongoDB); the **Tasks** tab shows the Todo manager (also backed by MongoDB). Click the cart icon in the header to view/manage your cart.

## API Endpoints

| Method | Endpoint            | Description                  |
|--------|----------------------|-------------------------------|
| GET    | `/api/products`      | Get all products              |
| GET    | `/api/todos`         | Get all tasks                 |
| POST   | `/api/todos`         | Add a new task                |
| PUT    | `/api/todos/:id`     | Update a task                 |
| DELETE | `/api/todos/:id`     | Delete a task                 |
| GET    | `/api/cart`          | Get all cart items            |
| POST   | `/api/cart`          | Add item to cart              |
| PUT    | `/api/cart/:id`      | Update cart item quantity     |
| DELETE | `/api/cart/:id`      | Remove item from cart         |
| DELETE | `/api/cart`          | Clear the cart                |
