import { useParams } from "react-router-dom"
import Items from "../assets/images/ItemData"
import useCartStore from "../useCartStore"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"

type ItemType = {
  id: number
  category: string
  price?: number | string
  image: string
  name: string
  quantity: number
  description: string
}

const ProductId = () => {
  const { id } = useParams()
  const product = Items.find((I) => I.id === Number(id))
  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Product not found
      </div>
    )
  }

  return (
    <>
    <Navbar />
        <div className="w-full mx-auto  bg-white shadow-lg rounded-lg p-6 mt-20">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-md"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-lg font-semibold text-blue-600 mb-4">
            Ksh {product.price.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <Link to={`/checkout`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Continue to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default ProductId







