import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

const API_BASE = 'http://localhost:5000/api'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Fetch cart items from the backend
  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/cart`)
      const data = await res.json()
      setCartItems(data)
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    }
  }, [])

  // Add a product to the cart (POST to backend, then update local state)
  const addToCart = useCallback(async (product) => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        }),
      })
      const saved = await res.json()
      setCartItems((prev) => {
        const exists = prev.find((item) => item._id === saved._id)
        if (exists) {
          return prev.map((item) => (item._id === saved._id ? saved : item))
        }
        return [...prev, saved]
      })
    } catch (err) {
      console.error('Failed to add to cart:', err)
    }
  }, [])

  // Update quantity of a cart item
  const updateQuantity = useCallback(async (id, quantity) => {
    if (quantity < 1) return
    try {
      const res = await fetch(`${API_BASE}/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      const updated = await res.json()
      setCartItems((prev) => prev.map((item) => (item._id === id ? updated : item)))
    } catch (err) {
      console.error('Failed to update quantity:', err)
    }
  }, [])

  // Remove one item from the cart
  const removeFromCart = useCallback(async (id) => {
    try {
      await fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' })
      setCartItems((prev) => prev.filter((item) => item._id !== id))
    } catch (err) {
      console.error('Failed to remove from cart:', err)
    }
  }, [])

  // Clear the whole cart
  const clearCart = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/cart`, { method: 'DELETE' })
      setCartItems([])
    } catch (err) {
      console.error('Failed to clear cart:', err)
    }
  }, [])

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
