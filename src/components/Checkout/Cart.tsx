// import useCartStore from "../../useCartStore"
// import { Link } from "react-router-dom"
// import { Delete } from "lucide-react"
// import Header2 from "../Home/Header2"
// import Footer from "../Home/Footer"

// const Cart = () => {
//   const cart = useCartStore((state) => state.cart)
//   const addToCart = useCartStore((state) => state.addToCart)
//   const removeFromCart = useCartStore((state) => state.removeFromCart)
//   const clearCart = useCartStore((state) => state.clearCart)
//   const totalItems = useCartStore((state) => state.totalItems)
//   const totalPrice = useCartStore((state) => state.totalPrice)

//   const handleQuantityChange = (itemId: number, newQuantity: number) => {
//     if (newQuantity < 1) return
//     const item = cart.find((i) => i.id === itemId)
//     if (!item) return

//     if (newQuantity > item.quantity) {
//       for (let i = 0; i < newQuantity - item.quantity; i++) {
//         addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
//       }
//     } else {
//       for (let i = 0; i < item.quantity - newQuantity; i++) {
//         removeFromCart(item.id)
//       }
//     }
//   }

//   return (
//     <>
//     <Header2/>
//     <div className="mt-24 px-6">
//       {cart.length === 0 ? (
//         <div className="text-center mt-16 text-gray-600 text-lg">
//           Your cart is empty. <Link to="/" className="text-blue-600 hover:underline">Continue shopping</Link>
//         </div>
//       ) : (
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden p-1.5">
//           {/* Cart Table */}
//           <div className="divide-y">
//             <div className="grid grid-cols-6 font-semibold text-gray-700 bg-gray-100 py-3 px-4">
//               <div className="col-span-2">Product</div>
//               <div>Price</div>
//               <div>Quantity</div>
//               <div>Total</div>
//               <div>Remove</div>
//             </div>

//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-6 items-center py-4 px-4 text-gray-800"
//               >
//                 {/* Product */}
//                 <div className="col-span-2 flex items-center gap-4">
//                   <img
//                     src={item.image || "https://via.placeholder.com/64"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-lg border"
//                   />
//                   <span className="font-medium">{item.name}</span>
//                 </div>

//                 {/* Price */}
//                 <div className="text-blue-600 font-semibold">Ksh {item.price}</div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
//                     aria-label="Decrease quantity"
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(item.id, Number(e.target.value))
//                     }
//                     className="w-12 text-center border-t border-b"
//                   />
//                   <button
//                     onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                     className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
//                     aria-label="Increase quantity"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Total */}
//                 <div className="font-semibold">Ksh {item.price * item.quantity}</div>

//                 {/* Remove */}
//                 <div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700 font-medium"
//                   >
//                     <Delete/>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50 px-6 py-6">
//             <div className="space-y-1 text-lg">
//               <p className="font-bold">Total Items: {totalItems()}</p>
//               <p className="font-bold">Total Price: Ksh {totalPrice()}</p>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={clearCart}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Clear Cart
//               </button>
//               <Link
//                 to="/checkout"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
//               >
//                 Proceed to Checkout →
//               </Link>
//             </div>
//           </div>
//           <div>
//             <p className="text-center text-red-400 font-bold tracking-[-1px]">OR follow the process below.</p>
//                         <div className="flex flex-col justify-center gap-6">
//               <h3 className="text-2xl font-extrabold text-gray-800">
//                 Confirm Order via WhatSApp
//               </h3>

//               <p className="text-gray-600">
//                 Click to contact us on WhatsApp to confirm your order:
//               </p>

//               <div className="flex justify-between gap-3 w-[500px]">
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

//               <div className="border-t pt-6 space-y-2 m-2">
//                 <h4 className="text-xl font-bold text-gray-800">
//                   Payment Details
//                 </h4>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Business Number:</span> 880100
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Account Number:</span> 081148
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default Cart;
//////////////////////////////////////////////////////////////////////////////////////////////
import useCartStore from "../../useCartStore";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";
import Header2 from "../Home/Header2";
import Footer from "../Home/Footer";

const Cart = () => {
  const cart = useCartStore((s) => s.cart);
  const setQuantity = useCartStore((s) => s.setQuantity); // ✅ FIX: use setQuantity instead of looping addToCart
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="flex items-center gap-4 mb-10">
            <Link to="/order" className="flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart
            {cart.length > 0 && <span className="ml-3 text-base font-normal text-gray-500">({totalItems()} items)</span>}
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
              <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-5" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</h2>
              <p className="text-gray-400 mb-8 text-sm">Add some fresh produce to get started</p>
              <Link to="/order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                <ShoppingBag className="w-4 h-4" /> Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 items-center hover:border-green-100 transition-colors">
                    <img
                      src={item.image || "https://placehold.co/80x80/e8f5e9/1a4731?text=🌿"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate mb-1">{item.name}</h3>
                      <p className="text-green-700 font-bold text-sm">KSH {item.price.toLocaleString()}/kg</p>
                    </div>
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition font-bold text-lg leading-none">
                        −
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition font-bold text-lg leading-none">
                        +
                      </button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-gray-900">KSH {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> Clear all items
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-5 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal ({totalItems()} items)</span>
                      <span>KSH {totalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery</span>
                      <span className="text-green-600 font-medium">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span>KSH {totalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                    Proceed to Checkout →
                  </Link>
                </div>

                {/* WhatsApp fallback */}
                <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
                  <p className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Or order via WhatsApp
                  </p>
                  <div className="space-y-2">
                    <a href="https://wa.me/+254798878676" target="_blank" rel="noopener noreferrer"
                      className="block text-center py-2.5 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white transition-all">
                      0798 878 676
                    </a>
                    <a href="https://wa.me/+254717188268" target="_blank" rel="noopener noreferrer"
                      className="block text-center py-2.5 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white transition-all">
                      0717 188 268
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-100">
                    <p className="text-xs text-green-700 font-medium mb-1">Direct Payment:</p>
                    <p className="text-xs text-green-600">Business No: <strong>880100</strong></p>
                    <p className="text-xs text-green-600">Account No: <strong>081148</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;