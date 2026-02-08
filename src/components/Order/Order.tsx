import React from 'react'
import Items from '../../assets/images/ItemData'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const Order: React.FC = () => {
  return (
    <>
      <Header />

      <div className="mt-40 mb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
            Available Products
          </h1>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Items.map(product => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden rounded-t-2xl bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <p className="text-lg font-bold text-green-600">
                    {product.price}
                  </p>
                  <p className="text-gray-800 font-semibold truncate">
                    {product.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Order

