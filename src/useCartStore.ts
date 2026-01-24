import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define cart item type
export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

// Define store type
type CartStore = {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  setQuantity: (id: number, quantity: number) => void
  totalItems: () => number
  totalPrice: () => number
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add item to cart
      addToCart: (product) => {
        const cart = get().cart
        const existing = cart.find((item) => item.id === product.id)

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },

      // Remove item (decrease quantity or remove if 0)
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      // Clear cart
      clearCart: () => set({ cart: [] }),

      // Directly set quantity (useful for inputs)
      setQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      // Derived values
      totalItems: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
)

export default useCartStore