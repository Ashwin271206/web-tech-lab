import { useCart } from '../CartContext.jsx'

// CartIcon - shown in the header, opens the cart drawer, shows item count badge
export function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      </svg>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </button>
  )
}

// CartDrawer - slide-out panel listing all cart items and the total price
export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2>Your Cart {totalItems > 0 && `(${totalItems})`}</h2>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <p className="cart-empty__subtitle">Add some products to get started.</p>
            </div>
          ) : (
            <ul className="cart-item-list">
              {cartItems.map((item) => (
                <li className="cart-item" key={item._id}>
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.name}</span>
                    <span className="cart-item__price">₹{item.price.toLocaleString('en-IN')} each</span>
                  </div>
                  <div className="cart-item__controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="cart-item__qty">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item__subtotal">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item._id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span className="cart-total-price">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-drawer__actions">
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="cart-checkout-btn">Checkout</button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
