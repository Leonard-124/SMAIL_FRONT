// import { Link } from "react-router-dom"
// import { useState } from "react"
// import useCartStore from "../../useCartStore"
// import axios from "axios"

// const Checkout = () => {
//   const cart = useCartStore((s) => s.cart)
//   const totalItems = useCartStore((s) => s.totalItems)
//   const totalPrice = useCartStore((s) => s.totalPrice)

//   const [phone, setPhone] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState({ type: "", text: "" })

//   const handlePayment = async () => {
//     // Validate phone number
//     if (!phone || phone.length < 10) {
//       setMessage({ type: "error", text: "Please enter a valid phone number" })
//       return
//     }

//     if (cart.length === 0) {
//       setMessage({ type: "error", text: "Your cart is empty" })
//       return
//     }

//     setLoading(true)
//     setMessage({ type: "", text: "" })

//     try {
//       const response = await axios.post("https://1b6d2b9a7744.ngrok-free.app/api/mpesa/stkpush", {
//         phone: phone,
//         amount: totalPrice(),
//         accountReference: `Order-${Date.now()}`,
//         transactionDesc: `Payment for ${totalItems()} items`
//       })

//       if (response.data.success) {
//         setMessage({
//           type: "success",
//           text: "STK Push sent! Please check your phone and enter your M-Pesa PIN."
//         })
        
//         // Optional: Poll for payment status
//         const checkoutRequestId = response.data.data.CheckoutRequestID
//         setTimeout(() => checkPaymentStatus(checkoutRequestId), 10000)
//       }
//     } catch (error) {
//       console.error("Payment error:", error)
//       let errMsg = "Failed to initiate payment. Please try again."
//       if (axios.isAxiosError(error) && error.response?.data) {
//         errMsg = (error.response.data as any)?.message || errMsg
//       } else if (error instanceof Error) {
//         errMsg = error.message || errMsg
//       } else if (typeof error === "string") {
//         errMsg = error
//       }
//       setMessage({
//         type: "error",
//         text: errMsg
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const checkPaymentStatus = async (checkoutRequestId: string) => {
//     try {
//       const response = await axios.post("https://1b6d2b9a7744.ngrok-free.app/api/mpesa/query", {
//         checkoutRequestId
//       })
      
//       const resultCode = response.data.data.ResultCode
      
//       if (resultCode === "0") {
//         setMessage({
//           type: "success",
//           text: "Payment successful! Your order has been confirmed."
//         })
//         // Clear cart or redirect to success page
//       } else if (resultCode === "1032") {
//         setMessage({
//           type: "error",
//           text: "Payment cancelled by user"
//         })
//       } else {
//         setMessage({
//           type: "error",
//           text: "Payment failed. Please try again."
//         })
//       }
//     } catch (error) {
//       console.error("Status check error:", error)
//     }
//   }

//   if (cart.length === 0 && !message.text) {
//     return (
//       <div className="text-center mt-20 text-gray-600">
//         Your cart is empty.{" "}
//         <Link to="/home" className="text-blue-500 underline">
//           Go shopping
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">Order Summary</h1>

//       <div className="mb-6 space-y-2">
//         <div className="flex justify-between">
//           <span className="font-medium">Total Items:</span>
//           <span>{totalItems()}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Price to Pay:</span>
//           <span className="text-xl font-bold text-blue-600">
//             Ksh {totalPrice().toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="mb-6">
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Enter M-Pesa Phone Number
//         </label>
//         <input
//           id="phone"
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="07XX XXX XXX or 2547XX XXX XXX"
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           disabled={loading}
//         />
//       </div>

//       {message.text && (
//         <div
//           className={`mb-4 p-3 rounded ${
//             message.type === "success"
//               ? "bg-green-100 text-green-700 border border-green-400"
//               : "bg-red-100 text-red-700 border border-red-400"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <div className="text-center">
//         <button
//           onClick={handlePayment}
//           disabled={loading}
//           className={`inline-block px-6 py-2 rounded text-white transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </div>

//       <p className="text-xs text-gray-500 text-center mt-4">
//         You will receive a prompt on your phone to complete the payment!
//       </p>
//     </div>
//   )
// }

// export default Checkout;
////////////////////////////////////////////////////////////////////////////////////////////

import { Link } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../../useCartStore";
import api from "../Auth/api"; // ✅ FIX: use authenticated api instance, not raw axios with ngrok URL
import { ShoppingBag, Phone, CheckCircle2, AlertCircle } from "lucide-react";

const Checkout = () => {
  const cart = useCartStore((s) => s.cart);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  const handlePayment = async () => {
    if (!phone || phone.replace(/\s/g, "").length < 10) {
      setMessage({ type: "error", text: "Please enter a valid Kenyan phone number" });
      return;
    }
    if (cart.length === 0) {
      setMessage({ type: "error", text: "Your cart is empty" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // ✅ FIX: POST to /api/mpesa/stkpush via backend (no hardcoded ngrok URL)
      // The VITE_API_URL base is http://localhost:4000/api/v1, so we use the full path
      const response = await api.post(
        "/../../api/mpesa/stkpush", // Relative to server root
        {
          phone,
          amount: totalPrice(),
          accountReference: `AlmoFarm-${Date.now()}`,
          transactionDesc: `${totalItems()} item order`,
        },
        { baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:4000" }
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "✓ M-Pesa prompt sent! Enter your PIN on your phone." });
        const checkoutRequestId = response.data.data?.CheckoutRequestID;
        if (checkoutRequestId) {
          setTimeout(() => checkPaymentStatus(checkoutRequestId), 12000);
        }
      }
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to initiate payment. Please try again.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (checkoutRequestId: string) => {
    try {
      const response = await api.post(
        "/api/mpesa/query",
        { checkoutRequestId },
        { baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:4000" }
      );
      const resultCode = response.data.data?.ResultCode;
      if (resultCode === "0" || resultCode === 0) {
        setMessage({ type: "success", text: "Payment confirmed! Thank you for your order." });
        clearCart();
      } else if (resultCode === "1032") {
        setMessage({ type: "error", text: "Payment was cancelled." });
      }
    } catch {
      // Silently ignore polling errors
    }
  };

  if (cart.length === 0 && !message.text) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-5" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Nothing to check out</h2>
          <p className="text-gray-400 text-sm mb-6">Your cart is empty</p>
          <Link to="/order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
      <div className="max-w-lg mx-auto px-4 pt-20 pb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Checkout
        </h1>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 text-sm mb-4 uppercase tracking-wide">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate pr-4">{item.name} × {item.quantity}</span>
                <span className="font-medium text-gray-900 flex-shrink-0">KSH {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-xl text-green-700">KSH {totalPrice().toLocaleString()}</span>
          </div>
        </div>

        {/* M-Pesa Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 text-sm mb-5 uppercase tracking-wide flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-600" /> M-Pesa Payment
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="07XX XXX XXX or 2547XX XXX XXX"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent focus:bg-white transition text-sm"
            />
          </div>

          {message.text && (
            <div className={`flex items-start gap-3 p-4 rounded-xl mb-4 text-sm ${
              message.type === "success" ? "bg-green-50 border border-green-100 text-green-700" : "bg-red-50 border border-red-100 text-red-600"
            }`}>
              {message.type === "success"
                ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
              <span>{message.text}</span>
            </div>
          )}

          <button onClick={handlePayment} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
            style={{ background: loading ? "#9ca3af" : "linear-gradient(135deg, #1a6b3a, #2d9e5f)", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
              : "Pay with M-Pesa"}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">You'll receive an M-Pesa prompt on your phone</p>
        </div>

        <div className="text-center">
          <Link to="/cart" className="text-sm text-gray-400 hover:text-green-700 transition-colors">← Back to Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
