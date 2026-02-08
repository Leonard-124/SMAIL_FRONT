import { useParams } from 'react-router-dom'
import Items from '../../assets/images/ItemData'
import Header from '../Header'
import Footer from '../Footer'

const ProductCard = () => {
  const { id } = useParams()
  const product = Items.find((I) => I.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        The item is not available.
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="mt-32 mb-20 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

            {/* Product Image & Details */}
            <div className="flex flex-col gap-6">
              <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-2xl font-semibold text-green-600">
                  {product.price}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Contact & Payment Info */}
            <div className="flex flex-col justify-center gap-6">
              <h3 className="text-2xl font-extrabold text-gray-800">
                Order via WhatsApp
              </h3>

              <p className="text-gray-600">
                Click to contact us on WhatsApp to confirm your order:
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/+254798878676"
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
                >
                  WhatsApp: 0798 878 676
                </a>

                <a
                  href="https://wa.me/+254717188268"
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
                >
                  WhatsApp: 0717 188 268
                </a>
              </div>

              <div className="border-t pt-6 space-y-2">
                <h4 className="text-xl font-bold text-gray-800">
                  Payment Details
                </h4>
                <p className="text-gray-700">
                  <span className="font-semibold">Business Number:</span> 880100
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Account Number:</span> 081148
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductCard




