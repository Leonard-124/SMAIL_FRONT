import { Link } from "react-router-dom"
import { useState } from "react"
import useCartStore from "../../useCartStore"
import axios from "axios"

const Checkout = () => {
  const cart = useCartStore((s) => s.cart)
  const totalItems = useCartStore((s) => s.totalItems)
  const totalPrice = useCartStore((s) => s.totalPrice)

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handlePayment = async () => {
    // Validate phone number
    if (!phone || phone.length < 10) {
      setMessage({ type: "error", text: "Please enter a valid phone number" })
      return
    }

    if (cart.length === 0) {
      setMessage({ type: "error", text: "Your cart is empty" })
      return
    }

    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await axios.post("https://1b6d2b9a7744.ngrok-free.app/api/mpesa/stkpush", {
        phone: phone,
        amount: totalPrice(),
        accountReference: `Order-${Date.now()}`,
        transactionDesc: `Payment for ${totalItems()} items`
      })

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "STK Push sent! Please check your phone and enter your M-Pesa PIN."
        })
        
        // Optional: Poll for payment status
        const checkoutRequestId = response.data.data.CheckoutRequestID
        setTimeout(() => checkPaymentStatus(checkoutRequestId), 10000)
      }
    } catch (error) {
      console.error("Payment error:", error)
      let errMsg = "Failed to initiate payment. Please try again."
      if (axios.isAxiosError(error) && error.response?.data) {
        errMsg = (error.response.data as any)?.message || errMsg
      } else if (error instanceof Error) {
        errMsg = error.message || errMsg
      } else if (typeof error === "string") {
        errMsg = error
      }
      setMessage({
        type: "error",
        text: errMsg
      })
    } finally {
      setLoading(false)
    }
  }

  const checkPaymentStatus = async (checkoutRequestId: string) => {
    try {
      const response = await axios.post("https://1b6d2b9a7744.ngrok-free.app/api/mpesa/query", {
        checkoutRequestId
      })
      
      const resultCode = response.data.data.ResultCode
      
      if (resultCode === "0") {
        setMessage({
          type: "success",
          text: "Payment successful! Your order has been confirmed."
        })
        // Clear cart or redirect to success page
      } else if (resultCode === "1032") {
        setMessage({
          type: "error",
          text: "Payment cancelled by user"
        })
      } else {
        setMessage({
          type: "error",
          text: "Payment failed. Please try again."
        })
      }
    } catch (error) {
      console.error("Status check error:", error)
    }
  }

  if (cart.length === 0 && !message.text) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Your cart is empty.{" "}
        <Link to="/home" className="text-blue-500 underline">
          Go shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Summary</h1>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Total Items:</span>
          <span>{totalItems()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Price to Pay:</span>
          <span className="text-xl font-bold text-blue-600">
            Ksh {totalPrice().toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter M-Pesa Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07XX XXX XXX or 2547XX XXX XXX"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />
      </div>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`inline-block px-6 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        You will receive a prompt on your phone to complete the payment
      </p>
    </div>
  )
}

export default Checkout
