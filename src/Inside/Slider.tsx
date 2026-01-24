
import { useState, useEffect } from "react"
import Avon from "../assets/images/Avon.jpg"
import Choco from "../assets/images/Choco.jpg"
import Guiness from "../assets/images/guiness.jpg"

const Slider = () => {
  const Images = [Avon, Choco, Guiness]
  const [imageIndex, setImageIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % Images.length)
    }, 3000)

    return () => clearInterval(interval) // cleanup
  }, [])

  return (
    <div className="flex mt-24">
      <div className=" text-red-400 bg-[#fafafa86] text-center ">
        <h1 className="text-4xl">Get the product that amazes you only here at Femuki Stores</h1>
      </div>
      <div className="w-full">
        <img
          src={Images[imageIndex]}
          alt={`Product ${imageIndex + 1}`}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}

export default Slider
 