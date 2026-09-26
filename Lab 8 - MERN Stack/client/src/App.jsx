import { useState, useMemo, useEffect } from 'react'
import {
  SearchBar,
  Sidebar,
  SortBy,
  ProductGrid,
  BrandIcon,
  ABSOLUTE_MIN,
  ABSOLUTE_MAX
} from './components.jsx'
import { CartProvider, useCart } from './CartContext.jsx'
import { CartIcon, CartDrawer } from './components/Cart.jsx'
import TodoApp from './components/TodoApp.jsx'

const API_BASE = 'http://localhost:5000/api'

function Catalog({ searchTerm, setSearchTerm }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceMin, setPriceMin] = useState(ABSOLUTE_MIN)
  const [priceMax, setPriceMax] = useState(ABSOLUTE_MAX)
  const [selectedRating, setSelectedRating] = useState(null)
  const [sortBy, setSortBy] = useState('name-asc')

  // Fetch products from the backend (which reads from MongoDB)
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setLoadError('Could not load products from the server. Is the backend running?')
        setLoading(false)
      })
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  )

  const handlePriceChange = (min, max) => {
    setPriceMin(min)
    setPriceMax(max)
  }

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleRatingChange = (rating) => {
    setSelectedRating(rating)
  }

  const filteredProducts = useMemo(() => {
    let result = products
      .filter((p) => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
      .filter((p) => selectedCategories.length === 0 || selectedCategories.includes(p.category))
      .filter((p) => p.price >= priceMin && p.price <= priceMax)
      .filter((p) => selectedRating === null || p.rating >= selectedRating)

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price
        case 'price-asc':
          return a.price - b.price
        case 'rating-desc':
          return b.rating - a.rating
        case 'name-asc':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    result = [...result].sort((a, b) => {
      const aOut = a.quantity === 0 ? 1 : 0
      const bOut = b.quantity === 0 ? 1 : 0
      return aOut - bOut
    })

    return result
  }, [products, searchTerm, selectedCategories, priceMin, priceMax, selectedRating, sortBy])

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategories.length > 0 ||
    priceMin !== ABSOLUTE_MIN ||
    priceMax !== ABSOLUTE_MAX ||
    selectedRating !== null

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setPriceMin(ABSOLUTE_MIN)
    setPriceMax(ABSOLUTE_MAX)
    setSelectedRating(null)
  }

  if (loading) {
    return <p className="catalog-status">Loading products…</p>
  }

  if (loadError) {
    return <p className="catalog-status catalog-status--error">{loadError}</p>
  }

  return (
    <div className="app-body">
      <Sidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceChange={handlePriceChange}
        selectedRating={selectedRating}
        onRatingChange={handleRatingChange}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <main className="app-main">
        <section className="results-bar">
          <p className="results-count">
            <span className="count-number">{filteredProducts.length}</span>
            {' '}
            {filteredProducts.length === 1 ? 'product' : 'products'} found
            <span className="count-total"> (of {products.length} total)</span>
          </p>
        </section>

        <ProductGrid products={filteredProducts} />
      </main>

      <SortBy value={sortBy} onChange={setSortBy} />
    </div>
  )
}

function AppShell() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [searchTerm, setSearchTerm] = useState('')
  const { fetchCart } = useCart()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-mark">
              <BrandIcon />
            </span>
            <div>
              <h1>ShopperzCart</h1>
              <p className="brand-subtitle">Product Catalog</p>
            </div>
          </div>

          <nav className="header-tabs">
            <button
              className={`header-tab ${activeTab === 'catalog' ? 'header-tab--active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              Catalog
            </button>
            <button
              className={`header-tab ${activeTab === 'tasks' ? 'header-tab--active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
          </nav>

          {activeTab === 'catalog' && (
            <div className="header-search">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          )}

          <CartIcon />
        </div>
      </header>

      {activeTab === 'catalog' ? (
        <Catalog searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      ) : (
        <div className="tasks-page">
          <TodoApp />
        </div>
      )}

      <CartDrawer />
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  )
}

export default App
