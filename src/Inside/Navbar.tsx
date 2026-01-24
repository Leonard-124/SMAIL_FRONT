import { Link } from "react-router-dom"
import { useState } from "react"
import cart_icon from "../assets/images/shopping-cart.png"
import useCartStore from "../useCartStore"
import Items from "../assets/images/ItemData" // ✅ import your products

function Navbar() {
  const cart = useCartStore((state) => state.cart)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const [searchQuery, setSearchQuery] = useState("")

  // Filter products by name
  const filteredItems = Items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <nav className="bg-red-300 text-xl shadow-md fixed top-0 right-0 left-0 z-50">
      <div className="text-xl font-mono flex justify-between h-20 items-center px-6 relative">
        {/* Logo */}
        <Link to="/home" className="font-bold hover:text-white transition">
          Femuki Stores
        </Link>

        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for product"
            className="w-full border-2 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Search Results Dropdown */}
          {searchQuery && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded max-h-60 overflow-y-auto z-50">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition"
                    onClick={() => setSearchQuery("")} // clear search after click
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>

        {/* Category */}
        <Link
          to="/category"
          className="hover:text-white transition font-semibold"
        >
          Category
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={cart_icon}
            alt="Cart"
            height={40}
            width={40}
            className="hover:scale-105 transition-transform"
          />
          {cartCount > 0 && (
            <span className="absolute top-0 -right-1.5 bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center text-[12px] font-medium tracking-[0.5px]">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
