import { useState, useMemo } from "react"
import Items from "../assets/images/ItemData"
import Navbar from "./Navbar"
import Footer from "../Main/Footer"
import { Link } from "react-router-dom"

type ItemType = {
  id: number
  category: string
  image: string
  name: string
  quantity: number
  description: string
  price: number
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const items: ItemType[] = Items

  // ✅ derive categories dynamically
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category)))
    return ["All", ...unique]
  }, [items])

  // ✅ filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items
    return items.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  }, [items, selectedCategory])

  return (
    <>
    <Navbar/>
        <div className="bg-gray-100 min-h-screen p-6 mt-20">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link to={`/products/${item.id}`}
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
              <p className="text-md font-bold text-blue-600 mt-2">
                Ksh {item.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Stock: {item.quantity}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-10">
          No items found in <span className="font-semibold">{selectedCategory}</span>
        </p>
      )}
    </div>
    <Footer />
    </>

  )
}

export default Category;
