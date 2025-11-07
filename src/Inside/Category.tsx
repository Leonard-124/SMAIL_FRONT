import Items from "../assets/images/ItemData"

type ItemType = {
  id: number
  category: string
  image: string
  name: string
  quantity: number
  description: string
  price: String
}

const Category = () => {
  const items: ItemType[]  = Items
  return (
    <>
    <div className="bg-red-200">
      <div>
        <p>Lotions</p>
        <p>Socks</p>
        <p>Snacks</p>
        <p>Water</p>
        <p>Electronics</p>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Category
