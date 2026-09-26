import { useState, useEffect } from 'react'
import { useCart } from './CartContext.jsx'

// BrandIcon component
export function BrandIcon({ size = 26 }) {
  return (
    <img src="/icon.svg" width={size} height={size} alt="Logo" className="brand-icon"/>
  );
}
// PriceRangeSlider constants & component
export const ABSOLUTE_MIN = 0
export const ABSOLUTE_MAX = 10000
const STEP = 50

function clamp(val, lo, hi) {
  return Math.min(Math.max(val, lo), hi)
}

export function PriceRangeSlider({ min, max, onChange }) {
  const [minInput, setMinInput] = useState(String(min))
  const [maxInput, setMaxInput] = useState(String(max))

  useEffect(() => {
    setMinInput(String(min))
    setMaxInput(String(max))
  }, [min, max])

  const minPct = ((min - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100
  const maxPct = ((max - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100

  const handleMinSlider = (e) => {
    const val = clamp(Number(e.target.value), ABSOLUTE_MIN, max - STEP)
    onChange(val, max)
  }

  const handleMaxSlider = (e) => {
    const val = clamp(Number(e.target.value), min + STEP, ABSOLUTE_MAX)
    onChange(min, val)
  }

  const commitMinInput = () => {
    const val = clamp(Number(minInput) || 0, ABSOLUTE_MIN, max - STEP)
    onChange(val, max)
  }

  const commitMaxInput = () => {
    const val = clamp(Number(maxInput) || ABSOLUTE_MAX, min + STEP, ABSOLUTE_MAX)
    onChange(min, val)
  }

  return (
    <div className="price-slider">
      <div className="price-slider__track-wrap">
        <div className="price-slider__track" />
        <div
          className="price-slider__track-fill"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          step={STEP}
          value={min}
          onChange={handleMinSlider}
          className="price-slider__input price-slider__input--min"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          step={STEP}
          value={max}
          onChange={handleMaxSlider}
          className="price-slider__input price-slider__input--max"
          aria-label="Maximum price"
        />
      </div>

      <div className="price-slider__inputs">
        <div className="price-box">
          <span className="price-box__prefix">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={commitMinInput}
            onKeyDown={(e) => e.key === 'Enter' && commitMinInput()}
            aria-label="Minimum price input"
          />
        </div>
        <span className="price-box__sep">to</span>
        <div className="price-box">
          <span className="price-box__prefix">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={commitMaxInput}
            onKeyDown={(e) => e.key === 'Enter' && commitMaxInput()}
            aria-label="Maximum price input"
          />
        </div>
      </div>
    </div>
  )
}

// StarRating component
export function StarRating({ rating, size = 'sm' }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <span className={`star-rating star-rating--${size}`} aria-label={`${rating} out of 5 stars`}>
      {stars.map((n) => {
        const fill = Math.max(0, Math.min(1, rating - (n - 1)))
        return (
          <span className="star-slot" key={n}>
            <span className="star-base">★</span>
            <span className="star-fill" style={{ width: `${fill * 100}%` }}>
              ★
            </span>
          </span>
        )
      })}
      <span className="rating-number">{rating.toFixed(1)}</span>
    </span>
  )
}

// ProductCard component
const CATEGORY_COLORS = {
  Electronics: '#3b6e8f',
  Clothing: '#a1633f',
  Grocery: '#4c7a52',
  Accessories: '#8a5a9e',
  Fitness: '#b0562e',
  'Home & Kitchen': '#3f7d6e',
  Beauty: '#b4517c',
  'Office Supplies': '#7a7440',
}

export function ProductCard({ product }) {
  const inStock = product.quantity > 0
  const dotColor = CATEGORY_COLORS[product.category] || '#7793e2'
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className={`product-card ${!inStock ? 'is-out-of-stock' : ''}`}>
      <div className="card-tag">
        <span className="category-dot" style={{ backgroundColor: dotColor }} />
        <span className="category-label">{product.category}</span>
      </div>

      <h3 className="product-name">{product.name}</h3>

      <StarRating rating={product.rating} />

      <div className="card-footer">
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
        {inStock ? (
          <span className="stock-badge in-stock">{product.quantity} in stock</span>
        ) : (
          <span className="stock-badge out-of-stock">Out of Stock</span>
        )}
      </div>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={!inStock}
      >
        {justAdded ? 'Added ✓' : inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </article>
  )
}

// ProductGrid component
export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No products match your filters</p>
        <p className="empty-subtitle">Try a different search term, category, or price range.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// RatingFilter component (single rating value selection using radio inputs)
export function RatingFilter({ selected, onChange }) {
  const options = [4, 3, 2, 1]

  return (
    <div className="checkbox-list">
      {options.map((stars) => (
        <label key={stars} className="radio-row">
          <input
            type="radio"
            name="rating-filter"
            checked={selected === stars}
            onChange={() => onChange(stars)}
          />
          <span className="radio-dot" />
          <span className="rating-option__stars">
            {'★'.repeat(stars)}
            <span className="rating-option__stars-dim">{'★'.repeat(5 - stars)}</span>
          </span>
          <span className="checkbox-text">& Up</span>
        </label>
      ))}
    </div>
  )
}

// SearchBar component
export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search products by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products by name"
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}

// Sidebar component
export function Sidebar({
  categories,
  selectedCategories,
  onCategoryToggle,
  priceMin,
  priceMax,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onReset,
  hasActiveFilters,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__scroll">
        <div className="sidebar__header">
          <h2>Filters</h2>
          {hasActiveFilters && (
            <button className="sidebar__reset" onClick={onReset}>
              Clear all
            </button>
          )}
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__title">Category</h3>
          <div className="checkbox-list">
            {categories.map((cat) => (
              <label key={cat} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryToggle(cat)}
                />
                <span className="checkbox-box" />
                <span
                  className="category-dot"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] || '#6b6f7a' }}
                />
                <span className="checkbox-text">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__section">
          <h3 className="sidebar__title">Price</h3>
          <PriceRangeSlider min={priceMin} max={priceMax} onChange={onPriceChange} />
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__section">
          <h3 className="sidebar__title">Customer Rating</h3>
          <RatingFilter selected={selectedRating} onChange={onRatingChange} />
        </div>
      </div>
    </aside>
  )
}

// SortBy component
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
]

export function SortBy({ value, onChange }) {
  return (
    <aside className="sortby">
      <h3 className="sidebar__title">Sort By</h3>
      <div className="sortby__list">
        {SORT_OPTIONS.map((opt) => (
          <label key={opt.value} className="radio-row">
            <input
              type="radio"
              name="sortby"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="radio-dot" />
            <span className="checkbox-text">{opt.label}</span>
          </label>
        ))}
      </div>
    </aside>
  )
}
