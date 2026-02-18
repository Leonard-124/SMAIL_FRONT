// import { useParams } from 'react-router-dom'
// import Footer from '../Home/Footer'
// import { useEffect, useState } from "react"
// import { Loader2Icon } from 'lucide-react'
// import useCartStore from '../../useCartStore'
// import Header2 from '../Home/Header2'

// interface Product {
//   _id: string
//   image: string
//   name: string
//   description: string
//   price: number
// }

// const ProductCard = () => {
//   const { id } = useParams<{ id: string }>()
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)

//   const addToCart = useCartStore((state) => state.addToCart)

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/v1/prodCat/${id}`)
//         if (!res.ok) throw new Error(`Failed to fetch product ${res.status}`)
//         const result = await res.json()
//         setProduct(result)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) getProduct()
//   }, [id])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600 animate-spin ">
//         <Loader2Icon className='h-12 w-12'/>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
//         The item is not available.
//       </div>
//     )
//   }

//   return (
//     <>
//       <Header2 />

//       <div className="mt-32 mb-20 px-4">
//         <div className="max-w-6xl mx-auto bg-white  rounded-2xl overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

//             {/* Product Image & Details */}
//             <div className="flex flex-col gap-6">
//               <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-100">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="space-y-3">
//                 <h2 className="text-3xl font-bold text-gray-800">
//                   {product.name}
//                 </h2>
//                 <p className="text-2xl font-semibold text-green-600">
//                   KSH {product.price}/kg
//                 </p>
//                 <p className="text-gray-600 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             </div>

//             {/* Contact & Payment Info */}
//             <div className="flex flex-col justify-center gap-6">
//               <h3 className="text-2xl font-extrabold text-gray-800">
//                 Order via WhatsApp
//               </h3>

//               <p className="text-gray-600">
//                 Click to contact us on WhatsApp to confirm your order:
//               </p>

//               <div className="flex justify-between gap-3">
//                 <a
//                   href="https://wa.me/+254798878676"
//                   className="inline-flex items-center justify-center rounded-xl bg-green-400 px-6 py-3 text-white font-semibold hover:bg-green-300 transition"
//                 >
//                   WhatsApp: 0798 878 676
//                 </a>

//                 <a
//                   href="https://wa.me/+254717188268"
//                   className="inline-flex items-center justify-center rounded-xl bg-green-400 px-6 py-3 text-white font-semibold hover:bg-green-300 transition"
//                 >
//                   WhatsApp: 0717 188 268
//                 </a>
//               </div>

//               <div className="border-t pt-6 space-y-2">
//                 <h4 className="text-xl font-bold text-gray-800">
//                   Payment Details
//                 </h4>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Business Number:</span> 880100
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Account Number:</span> 081148
//                 </p>
//                 <p className='font-bold'>OR</p>
//                 <div className='flex justify-between'>
//                   <button onClick={()=>addToCart({
//                   id: product._id,
//                   name: product.name,
//                   price: product.price,
//                   image: product.image
//                 })} className='bg-gray-200 p-1 rounded-md tracking-[-1px] font-bold'>
//                   Add To Cart
//                 </button>
//                 <div className='bg-gray-200 p-1 rounded-md tracking-[-1px] font-bold'>
//                   <a href="/cart">Continue to Cart</a>
//                 </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
        
//       </div>

//       <Footer />
//     </>
//   )
// }

// export default ProductCard
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useParams, Link } from "react-router-dom";
import Footer from "../Home/Footer";
import { useEffect, useState } from "react";
import { Loader2, ShoppingCart, MessageCircle, ArrowLeft, Minus, Plus } from "lucide-react";
import useCartStore from "../../useCartStore";
import Header2 from "../Home/Header2";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const ProductCard = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const cart = useCartStore((s) => s.cart);
  const cartItem = product ? cart.find((i) => i.id === product._id) : null;

  useEffect(() => {
    if (!id) return;
    // ✅ FIX: uses VITE_API_URL env variable
    fetch(`${API}/prodCat/${id}`)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ id: product._id, name: product.name, price: product.price, image: product.image });
    if (qty > 1 && product) setQuantity(product._id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]">
      <Loader2 className="w-12 h-12 animate-spin text-green-600" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf7] gap-4">
      <p className="text-xl font-semibold text-gray-600">Product not found</p>
      <Link to="/order" className="text-green-700 hover:underline text-sm">Browse all products</Link>
    </div>
  );

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <Link to="/order" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* Product Image */}
            <div className="sticky top-28">
              <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {product.category || "Premium Cereal"}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {product.name}
                </h1>
                <div className="text-3xl font-bold text-green-700">
                  KSH {product.price.toLocaleString()}
                  <span className="text-base font-normal text-gray-400 ml-1">/kg</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">About this product</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity selector */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">Quantity (kg)</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    = KSH {(product.price * qty).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <button onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                  style={{ background: added ? "#22c55e" : "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                  <ShoppingCart className="w-4 h-4" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
                {cartItem && (
                  <Link to="/cart"
                    className="px-5 py-3.5 rounded-xl font-semibold text-green-700 text-sm border-2 border-green-200 hover:border-green-400 transition-colors whitespace-nowrap">
                    View Cart ({cartItem.quantity})
                  </Link>
                )}
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-green-50 rounded-2xl border border-green-100 p-5 mt-2">
                <p className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Order directly via WhatsApp
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="https://wa.me/+254798878676" target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white transition-all">
                    0798 878 676
                  </a>
                  <a href="https://wa.me/+254717188268" target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white transition-all">
                    0717 188 268
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-green-100 flex gap-6">
                  <div>
                    <p className="text-xs text-green-600 font-medium">Business No.</p>
                    <p className="text-sm font-bold text-green-800">880100</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium">Account No.</p>
                    <p className="text-sm font-bold text-green-800">081148</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCard;



