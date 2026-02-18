// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import Header2 from '../Home/Header2'
// import Footer from '../Home/Footer'
// import useCartStore from '../../useCartStore'
// import { LoaderCircleIcon } from 'lucide-react'
// import Trending from './Trending'

// interface Product {
//   _id: string 
//   image: string
//   description: string
//   name: string
//   price: number
// }

// const Order: React.FC = () => {
//   const [data, setData] = useState<Product[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const addToCart = useCartStore((state) => state.addToCart)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/v1/prodCat")
//         if (!res.ok) throw new Error(`Failed to fetch ${res.status}`)
//         const result = await res.json()
//         setData(result)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProduct()
//   }, [])

//   return (
//     <>
//       <Header2 />
//       <Trending/>
//       <div className="mt-20 mb-20 px-4">
//         <div className="max-w-7xl mx-auto">

//           {/* Page Title */}
//           <h1 className="text-3xl text-center font-extrabold text-gray-800 mb-10">
//             Cereals Available <span className='text-2xl text-red-600 tracking-[-1.5px]  animate-bounce'>Order Now</span>
//           </h1>

//           {/* Products Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <LoaderCircleIcon className="w-12 h-12 animate-spin text-gray-600" />
//             </div>
//           ) : data.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {data.map((product) => (
//                 <div
//                   key={product._id}
//                   className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
//                 >
//                   {/* Image */}
//                   <Link to={`/product/${product._id}`}>
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition duration-300"
//                     />
//                   </Link>

//                   {/* Content */}
//                   <div className="p-4 space-y-2">
//                     <p className="text-lg font-bold text-green-600">
//                       KSH {product.price}/KG
//                     </p>
//                     <p className="text-gray-800 font-semibold truncate">
//                       {product.name}
//                     </p>
//                     <button
//                       onClick={() =>
//                         addToCart({
//                           id: product._id,
//                           name: product.name,
//                           price: product.price,
//                           image: product.image,
//                         })
//                       }
//                       className="mt-2 w-full bg-gray-500 text-white py-2 px-3 rounded-lg hover:bg-gray-600 transition font-medium"
//                     >
//                       Add To Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-600">No products found.</div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }

// export default Order
//////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "../Home/Header2";
import Footer from "../Home/Footer";
import useCartStore from "../../useCartStore";
import { Loader2, ShoppingCart, Star } from "lucide-react";
import Trending from "./Trending";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

interface Product {
  _id: string;
  image: string;
  description: string;
  name: string;
  price: number;
  category: string;
}

const Order: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    // ✅ FIX: uses VITE_API_URL env variable instead of hardcoded localhost
    fetch(`${API}/prodCat`)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product._id, name: product.name, price: product.price, image: product.image });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <Trending />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full mb-4 inline-block">
              Fresh Today
            </span>
            <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Available Cereals
            </h1>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
              Sourced directly from our Kenyan highlands. All prices per kilogram.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((product) => (
                <div key={product._id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 overflow-hidden">
                  <Link to={`/product/${product._id}`} className="block overflow-hidden">
                    <div className="relative h-44 overflow-hidden bg-gray-50">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-gray-700">Fresh</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-semibold text-gray-900 truncate mb-1 hover:text-green-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-bold text-sm">KSH {product.price.toLocaleString()}/kg</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                        style={{
                          background: addedId === product._id ? "#22c55e" : "#1a4731",
                          color: "white",
                        }}>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {addedId === product._id ? "Added!" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">No products available at this time.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;

