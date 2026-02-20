import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
}

const Trending = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/prodCat`);
        if (!res.ok) throw new Error("HTTP error");
        const data: Product[] = await res.json();

        // Take first 5 products
        setProducts(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [products]);

  const handleBuyNow = () => {
    const product = products[currentImage];
    if (product) {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mt-20 bg-red-50">
      <div className="flex flex-col items-center justify-center md:ml-9 mb-6 md:mb-0">
        <h1 className="text-4xl font-bold text-gray-700 mt-12">
          Available
        </h1>
        <h1 className="text-4xl font-bold text-gray-700 mt-12">
          Cereals
        </h1>
      </div>

      <div className="flex w-full md:w-[1050px] h-[450px] relative rounded-xl overflow-hidden shadow-lg m-3">
        {products.length > 0 ? (
          <>
            <img
              src={products[currentImage].image}
              alt={products[currentImage].name}
              className="w-full h-full object-cover transition duration-700"
            />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
              <h2 className="text-2xl font-semibold text-white drop-shadow">
                {products[currentImage].name}
              </h2>
              <button
                onClick={handleBuyNow}
                className="mt-4 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-500 transition text-lg"
              >
                Make Order →
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            Loading trending products...
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;