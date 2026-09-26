require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todos')
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB Atlas
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set. Create a .env file first (see .env.example).')
  process.exit(1)
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

// API routes
app.use('/api/todos', todoRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
