// Run with: node seed.js
// Populates the MongoDB Atlas database with the ShopperzCart product catalog.
require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  // Electronics
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 799, quantity: 26, rating: 4.3 },
  { id: 2, name: 'Keyboard', category: 'Electronics', price: 3499, quantity: 0, rating: 3.8 },
  { id: 3, name: 'Universal Adapter', category: 'Electronics', price: 1499, quantity: 18, rating: 4.2 },
  { id: 4, name: 'Bluetooth Earbuds', category: 'Electronics', price: 2299, quantity: 10, rating: 4.5 },
  { id: 5, name: 'Gaming Headphones', category: 'Electronics', price: 6799, quantity: 12, rating: 4.8 },
  { id: 6, name: '24-inch HD Monitor', category: 'Electronics', price: 8999, quantity: 0, rating: 3.7 },

  // Clothing
  { id: 7, name: 'Oversized T-Shirt', category: 'Clothing', price: 599, quantity: 42, rating: 4.1 },
  { id: 8, name: 'Baggy Jeans', category: 'Clothing', price: 1899, quantity: 20, rating: 3.9 },
  { id: 9, name: 'Formal Shirt', category: 'Clothing', price: 1499, quantity: 15, rating: 4.4 },
  { id: 10, name: 'Hoodie', category: 'Clothing', price: 999, quantity: 0, rating: 2.8 },
  { id: 11, name: 'Jersey', category: 'Clothing', price: 499, quantity: 28, rating: 3.5 },
  { id: 12, name: 'Leather Jacket', category: 'Clothing', price: 5499, quantity: 5, rating: 4.7 },

  // Grocery
  { id: 13, name: 'Basmati Rice', category: 'Grocery', price: 699, quantity: 48, rating: 4.6 },
  { id: 14, name: 'Groundnut Oil', category: 'Grocery', price: 949, quantity: 0, rating: 3.6 },
  { id: 15, name: 'Honey', category: 'Grocery', price: 379, quantity: 32, rating: 4.8 },
  { id: 16, name: 'Coffee Powder', category: 'Grocery', price: 279, quantity: 55, rating: 4.2 },
  { id: 17, name: 'Dry Fruits & Nuts', category: 'Grocery', price: 1199, quantity: 14, rating: 4.5 },
  { id: 18, name: 'Peanut Butter', category: 'Grocery', price: 449, quantity: 0, rating: 2.5 },

  // Accessories
  { id: 19, name: 'Leather Wallet', category: 'Accessories', price: 899, quantity: 30, rating: 4.3 },
  { id: 20, name: 'Sunglasses', category: 'Accessories', price: 1499, quantity: 0, rating: 3.4 },
  { id: 21, name: 'Backpack', category: 'Accessories', price: 2399, quantity: 16, rating: 4.6 },
  { id: 22, name: 'Analog Watch', category: 'Accessories', price: 4299, quantity: 11, rating: 4.4 },
  { id: 23, name: 'Leather Belt', category: 'Accessories', price: 799, quantity: 25, rating: 3.7 },
  { id: 24, name: 'Bracelet', category: 'Accessories', price: 699, quantity: 0, rating: 2.4 },

  // Fitness
  { id: 25, name: '5kg Dumbbell', category: 'Fitness', price: 1099, quantity: 18, rating: 4.5 },
  { id: 26, name: 'Resistance Band', category: 'Fitness', price: 649, quantity: 40, rating: 4.2 },
  { id: 27, name: 'Skipping Rope', category: 'Fitness', price: 399, quantity: 36, rating: 3.3 },
  { id: 28, name: 'Wrist Strap', category: 'Fitness', price: 899, quantity: 0, rating: 1.9 },
  { id: 29, name: 'Yoga Mat', category: 'Fitness', price: 3299, quantity: 8, rating: 4.7 },
  { id: 30, name: 'Gym Duffel Bag', category: 'Fitness', price: 1699, quantity: 13, rating: 4.3 },

  // Home & Kitchen
  { id: 31, name: 'Stainless Steel Cookware Set', category: 'Home & Kitchen', price: 4599, quantity: 6, rating: 4.6 },
  { id: 32, name: 'Electric Kettle', category: 'Home & Kitchen', price: 1599, quantity: 22, rating: 4.4 },
  { id: 33, name: 'Ceramic Dinner Set', category: 'Home & Kitchen', price: 2899, quantity: 9, rating: 3.8 },
  { id: 34, name: 'Microfiber Bath Towel', category: 'Home & Kitchen', price: 699, quantity: 35, rating: 3.2 },
  { id: 35, name: 'Storage Containers Set', category: 'Home & Kitchen', price: 999, quantity: 0, rating: 2.9 },
  { id: 36, name: 'Induction Cooktop', category: 'Home & Kitchen', price: 3199, quantity: 11, rating: 4.5 },

  // Beauty
  { id: 37, name: 'Vitamin C Face Serum', category: 'Beauty', price: 649, quantity: 24, rating: 4.3 },
  { id: 38, name: 'Hydrating Face Wash', category: 'Beauty', price: 349, quantity: 40, rating: 3.4 },
  { id: 39, name: 'Anti-Dandruff Shampoo', category: 'Beauty', price: 599, quantity: 0, rating: 2.6 },
  { id: 40, name: 'Hair Dryer', category: 'Beauty', price: 2199, quantity: 12, rating: 4.5 },
  { id: 41, name: 'Beard Grooming Kit', category: 'Beauty', price: 1399, quantity: 18, rating: 4.2 },
  { id: 42, name: 'Body Lotion 400ml', category: 'Beauty', price: 499, quantity: 27, rating: 3.6 },

  // Office Supplies
  { id: 43, name: 'A4 Notebook Pack', category: 'Office Supplies', price: 299, quantity: 60, rating: 4.4 },
  { id: 44, name: 'Gel Pen Set', category: 'Office Supplies', price: 199, quantity: 45, rating: 3.3 },
  { id: 45, name: 'Desk Organizer', category: 'Office Supplies', price: 749, quantity: 19, rating: 4.2 },
  { id: 46, name: 'Office Chair', category: 'Office Supplies', price: 6999, quantity: 0, rating: 1.8 },
  { id: 47, name: 'Study Lamp', category: 'Office Supplies', price: 1399, quantity: 17, rating: 4.5 },
  { id: 48, name: 'Laptop Stand With Cooler', category: 'Office Supplies', price: 4299, quantity: 0, rating: 1.6 },
]

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not set. Create a .env file first (see .env.example).')
      process.exit(1)
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB Atlas')

    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log(`Seeded ${products.length} products into the database`)

    await mongoose.disconnect()
    console.log('Done. Disconnected.')
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err.message)
    process.exit(1)
  }
}

seed()
