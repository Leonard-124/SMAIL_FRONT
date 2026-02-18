
// import { create } from "zustand"
// import { persist, createJSONStorage } from "zustand/middleware"

// // ─── Types ────────────────────────────────────────────────────────────────────

// export type CartItem = {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image?: string
// }

// type CartStore = {
//   cart: CartItem[]
//   userId: string | null

//   // ── Lifecycle ──────────────────────────────────────────────────────────────
//   // Call after login / silent-refresh — switches the active persist key to
//   // "cart_<userId>" and loads that user's saved cart into memory.
//   initCart: (userId: string) => void

//   // Call on logout — cart is already persisted by zustand/persist on every
//   // mutation, so this just wipes memory without touching localStorage.
//   clearCartSession: () => void

//   // ── Mutations ─────────────────────────────────────────────────────────────
//   addToCart: (product: Omit<CartItem, "quantity">) => void
//   removeFromCart: (id: number) => void
//   clearCart: () => void
//   setQuantity: (id: number, quantity: number) => void

//   // ── Derived values ────────────────────────────────────────────────────────
//   totalItems: () => number
//   totalPrice: () => number
// }

// // ─── Store ────────────────────────────────────────────────────────────────────

// const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       userId: null,

//       // ── Lifecycle ──────────────────────────────────────────────────────────

//       initCart: (userId: string) => {
//         const key = `cart_${userId}`

//         // Switch the persist middleware to this user's key
//         useCartStore.persist.setOptions({ name: key })

//         // Load whatever is already saved under that key
//         useCartStore.persist.rehydrate()

//         // Also stamp userId into state so other selectors can read it
//         set({ userId })
//       },

//       clearCartSession: () => {
//         // Cart is already saved to localStorage on every mutation via
//         // zustand/persist — just clear memory and reset key to "cart_guest"
//         // so a different user logging in next won't see this cart.
//         set({ cart: [], userId: null })
//         useCartStore.persist.setOptions({ name: "cart_guest" })
//       },

//       // ── Mutations ──────────────────────────────────────────────────────────

//       addToCart: (product) => {
//         const cart = get().cart
//         const existing = cart.find((item) => item.id === product.id)

//         if (existing) {
//           set({
//             cart: cart.map((item) =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//             ),
//           })
//         } else {
//           set({ cart: [...cart, { ...product, quantity: 1 }] })
//         }
//       },

//       removeFromCart: (id) =>
//         set((state) => ({
//           cart: state.cart
//             .map((item) =>
//               item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//             )
//             .filter((item) => item.quantity > 0),
//         })),

//       clearCart: () => set({ cart: [] }),

//       setQuantity: (id, quantity) =>
//         set((state) => ({
//           cart:
//             quantity < 1
//               ? state.cart.filter((item) => item.id !== id)
//               : state.cart.map((item) =>
//                   item.id === id ? { ...item, quantity } : item
//                 ),
//         })),

//       // ── Derived values ─────────────────────────────────────────────────────

//       totalItems: () =>
//         get().cart.reduce((sum, item) => sum + item.quantity, 0),

//       totalPrice: () =>
//         get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     }),
//     {
//       name: "cart_guest", // default key — overwritten to "cart_<userId>" by initCart
//       storage: createJSONStorage(() => localStorage),
//       // Only persist cart items — not userId or derived functions
//       partialize: (state) => ({ cart: state.cart }),
//     }
//   )
// )

// export default useCartStore

//////////////////////////////////////////////////////////////////////////////////////////////////

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ✅ FIX: id is `string` — MongoDB _id values are strings, not numbers
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  cart: CartItem[];
  userId: string | null;
  initCart: (userId: string) => void;
  clearCartSession: () => void;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setQuantity: (id: string, quantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      userId: null,

      initCart: (userId: string) => {
        useCartStore.persist.setOptions({ name: `cart_${userId}` });
        useCartStore.persist.rehydrate();
        set({ userId });
      },

      clearCartSession: () => {
        set({ cart: [], userId: null });
        useCartStore.persist.setOptions({ name: "cart_guest" });
      },

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      // ✅ FIX: parameter types updated from number to string
      removeFromCart: (id: string) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      // ✅ FIX: uses setQuantity directly — Cart.tsx no longer needs addToCart loops
      setQuantity: (id: string, quantity: number) =>
        set((state) => ({
          cart:
            quantity < 1
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),

      totalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart_guest",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;