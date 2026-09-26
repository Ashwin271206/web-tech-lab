const mongoose = require('mongoose')

// Schema for catalog products
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  rating: { type: Number, required: true },
})

module.exports = mongoose.model('Product', ProductSchema)
