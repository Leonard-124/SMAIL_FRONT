
import ItemData from "../assets/images/ItemData"

type ItemType = {
  id: number
  category: string
  image: string
  name: string
  quantity: number
  description: string
  price: String
}

const Latest = () => {
  const items: ItemType[] = ItemData // fetched directly

  return (
    <>
    <div className="text-center">
        <h1>Latest Proucts</h1>
    </div>
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="w-[250px] bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-md font-bold text-blue-600 mt-2">
              ${item.price}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Latest
