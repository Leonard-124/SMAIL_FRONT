

import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="bg-red-300 text-xl ">
        <div className="text-xl font-mono flex justify-between h-20 items-center">
        <Link to="/home">Femuki Stores</Link>
        <input type="text" placeholder="Search for product"  className=" border-2"/>
        <Link to="/category">Category</Link>
        <Link to="/cart">Cart</Link>
        </div>
        
    </div>
  )
}

export default Navbar
