import Items from '../../assets/images/ItemData'
import Footer from '../Footer'
import Header from '../Header'

const Products = () => {
  return (
    <>
      <Header />

      <div className="mt-28 bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Page Header */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Cereals offered at AlmoFarm Produce.
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully selected cereals, crafted to deliver
              quality, reliability, and value. Each cereal tells a story.
            </p>
          </header>

          {/* Blog-Style Product List */}
          <div className="space-y-20">
            {Items.map((product, index) => (
              <article
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                {/* Image */}
                <div
                  className={`${
                    index % 2 === 1 ? 'md:order-2' : ''
                  } w-full h-80 overflow-hidden rounded-2xl bg-gray-200`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {product.name}
                  </h2>

                  <p className="text-xl font-semibold text-green-600">
                    {product.price}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Optional CTA */}
                  <div className="pt-4">
                    <a
                      href={`/product/${product.id}`}
                      className="inline-block text-blue-600 font-semibold hover:underline"
                    >
                      Order Now →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Products


