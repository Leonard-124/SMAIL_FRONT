



import useCartStore from "../useCartStore"
import { Link } from "react-router-dom"

const Cart = () => {
  const cart = useCartStore((state) => state.cart)
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const totalItems = useCartStore((state) => state.totalItems)
  const totalPrice = useCartStore((state) => state.totalPrice)

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    // remove until quantity is correct
    const item = cart.find((i) => i.id === itemId)
    if (!item) return

    if (newQuantity > item.quantity) {
      // add difference
      for (let i = 0; i < newQuantity - item.quantity; i++) {
        addToCart({ id: item.id, name: item.name, price: item.price })
      }
    } else {
      // decrease until quantity matches
      for (let i = 0; i < item.quantity - newQuantity; i++) {
        removeFromCart(item.id)
      }
    }
  }

  return (
    <div className="mt-20 px-4">
      {/* Header Row */}
      <div className="flex justify-evenly items-center font-semibold text-lg tracking-wide border-b pb-2">
        <div>Product</div>
        <div>Title</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Remove</div>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="text-center mt-10 text-gray-600">Your cart is empty</div>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-evenly items-center border-b py-4 text-gray-800"
          >
            {/* Product Image + Name */}
            <div className="flex items-center">
              <img
                src={item.image || "https://via.placeholder.com/48"}
                alt={item.name}
                className="w-12 h-12 object-cover mr-4 rounded"
              />
              <span className="font-medium">{item.name}</span>
            </div>

            {/* Price */}
            <span className="text-blue-600 font-semibold">Ksh {item.price}</span>

            {/* Quantity Controls */}
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, Number(e.target.value))
                }
                className="w-12 text-center border-t border-b"
              />
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Total */}
            <span className="font-semibold">Ksh {item.price * item.quantity}</span>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="flex justify-end mt-8 gap-6 items-center text-lg">
          <span className="font-bold">Total Items: {totalItems()}</span>
          <span className="font-bold">Total Price: Ksh {totalPrice()}</span>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>
      )}
      <div>
        <Link to={`/checkout`}>Proceed to Checkout.</Link>
      </div>
    </div>
  )
}

export default Cart
