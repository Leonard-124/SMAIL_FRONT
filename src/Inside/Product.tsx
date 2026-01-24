
import useCartStore from '../useCartStore'

interface ProductProps {
    id: number;
    category: string;
    image: string;
    name: string;
    quantity: number;
    description: string;
    price: string;
}
const Product = (props: ProductProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div>
        <h2>Products</h2>
        {products.map((p) => (
            <div key={p.id}>
                {p.name} - ${p.price}
                <button onClick={() =>addToCart(p)}>Add to Cart</button>
            </div>
        ))}
      
    </div>
  )
}

export default Product
