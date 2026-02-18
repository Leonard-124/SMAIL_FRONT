
// import Footer from '../Home/Footer'
// import Header from '../Home/Header'
// import { useState, useEffect } from 'react'
// import { LoaderIcon } from 'lucide-react'

// interface Product {
//   _id: string
//   image: string
//   description: string
//   name: string
//   price: number
// }

// const Products = () => {
//   const [data, setData] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/v1/prodCat")
//         if (!res.ok) throw new Error(`Failed to fetch products ${res.status}`)
//         const result = await res.json()
//         setData(result)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   return (
//     <>
//       <Header />

//       <div className="mt-28 bg-gray-50 py-20 px-4">
//         <div className="max-w-6xl mx-auto">

//           {/* Page Header */}
//           <header className="mb-16 text-center">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
//               Cereals offered at AlmoFarm Produce
//             </h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Discover our carefully selected cereals, crafted to deliver
//               quality, reliability, and value. Each cereal tells a story.
//             </p>
//           </header>

//           {/* Product List */}
//           <div className="space-y-24">
//             {loading ? (
//               <div className="flex justify-center">
//                 <LoaderIcon className="h-12 w-12 animate-spin text-gray-700" />
//               </div>
//             ) : data.length > 0 ? (
//               <div className="space-y-24">
//                 {data.map((product, index) => (
//                   <div
//                     key={product._id}
//                     className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
//                   >
//                     {/* Product Image */}
//                     <div
//                       className={`${
//                         index % 2 === 1 ? 'md:order-2' : ''
//                       } w-full h-80 overflow-hidden rounded-2xl shadow-lg bg-gray-200`}
//                     >
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
//                       />
//                     </div>

//                     {/* Product Info */}
//                     <div className="space-y-4">
//                       <p className="text-3xl font-bold text-gray-800">
//                         {product.name}
//                       </p>
//                       <p className="text-xl font-semibold text-green-600">
//                         KSH {product.price}/kg
//                       </p>
//                       <p className="text-gray-700 leading-relaxed">
//                         {product.description}
//                       </p>
//                       <div className="pt-4">
//                         <a
//                           href={`/product/${product._id}`}
//                           className="inline-block bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
//                         >
//                           Order Now →
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-600">No products found.</div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }

// export default Products;
//////////////////////////////////////////////////////////////////////////////////////////////

import Footer from "../Home/Footer";
import Header from "../Home/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ FIX: use React Router Link not <a href>
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

interface Product {
  _id: string;
  image: string;
  description: string;
  name: string;
  price: number;
}

const Products = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIX: uses VITE_API_URL env variable
    fetch(`${API}/prodCat`)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full mb-5 inline-block">
              Our Produce
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cereals at Almo Farm
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Carefully cultivated in Kenya's fertile highlands. Every grain tells the story of our land.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          ) : data.length > 0 ? (
            <div className="space-y-20">
              {data.map((product, index) => (
                <div key={product._id}
                  className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Image */}
                  <div className="w-full md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-lg group">
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  {/* Info */}
                  <div className="w-full md:w-1/2 space-y-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2 block">Premium Cereal</span>
                      <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {product.name}
                      </h2>
                    </div>
                    <div className="text-2xl font-bold text-green-700">KSH {product.price.toLocaleString()}<span className="text-base font-normal text-gray-400">/kg</span></div>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <div className="flex gap-3 pt-2">
                      {/* ✅ FIX: <Link> instead of <a href> — prevents full page reload */}
                      <Link to={`/product/${product._id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                        Order Now →
                      </Link>
                      <Link to={`/product/${product._id}`}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-green-700 text-sm border-2 border-green-200 hover:border-green-400 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">No products available.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;



