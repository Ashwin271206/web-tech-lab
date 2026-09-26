const mongoose = require('mongoose')

// Schema for items added to the shopping cart
const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('CartItem', CartItemSchema)
