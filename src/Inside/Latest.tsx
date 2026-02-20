// import ItemData from "../assets/images/ItemData"
// import { Link } from "react-router-dom"
// import useCartStore from "../useCartStore"

// type ItemType = {
//   id: number
//   category: string
//   image: string
//   name: string
//   quantity: number
//   description: string
//   price: number // ✅ use number for arithmetic
// }

// const Latest = () => {
//   const items: ItemType[] = ItemData.map((it) => ({
//     ...it,
//     price: typeof it.price === "string" ? parseFloat(it.price) : it.price
//   })) // static data with prices coerced to numbers
//   const addToCart = useCartStore((state) => state.addToCart) // ✅ select action

//   return (
//     <>
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold">Latest Products</h1>
//       </div>
//       <div className="flex flex-wrap justify-center gap-6 p-4">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="w-[250px] bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform duration-300"
//           >
//             <Link to={`/product/${item.id}`}>
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-40 object-cover"
//               />
//             </Link>
//             <div className="p-3">
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-sm text-gray-600">{item.description}</p>
//               <p className="text-md font-bold text-blue-600 mt-2">
//                 ${item.price}
//               </p>
//               <button
//                 onClick={() =>
//                   addToCart({
//                     id: item.id,
//                     name: item.name,
//                     price: item.price,
//                     image: item.image
//                   })
//                 }
//                 className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default Latest
