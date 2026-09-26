const express = require('express')
const router = express.Router()
const CartItem = require('../models/CartItem')

// GET /api/cart - fetch all cart items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().sort({ createdAt: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/cart - add an item to the cart (or bump quantity if it already exists)
router.post('/', async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body
    if (!productId || !name || price == null) {
      return res.status(400).json({ message: 'productId, name and price are required' })
    }

    const existing = await CartItem.findOne({ productId })
    if (existing) {
      existing.quantity += quantity || 1
      const saved = await existing.save()
      return res.json(saved)
    }

    const newItem = new CartItem({ productId, name, price, quantity: quantity || 1 })
    const saved = await newItem.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/cart/:id - update quantity of a cart item
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' })
    }
    const updated = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true })
    if (!updated) return res.status(404).json({ message: 'Cart item not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/cart/:id - remove one item from the cart
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Cart item not found' })
    res.json({ message: 'Item removed', id: req.params.id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/cart - clear the entire cart
router.delete('/', async (req, res) => {
  try {
    await CartItem.deleteMany({})
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
