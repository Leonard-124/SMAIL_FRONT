// import { Link } from "react-router-dom"

// const Navbar = () => {
//   return (
//     <>
//       <div className="flex justify-between gap-4 p-3 ">
//         <div>
//             <Link to="/" className="text-3xl font-600 text-gray-800">SMAIL</Link>
//         </div>
//         <input type="text" placeholder="Type here"  className="p-2 border-radius-1.0 "/>
//         <div className="flex gap-4 text-2xl font-500 leading-1.5 tracking-[-1.5px]">
//             <Link to="/services">Services</Link>
//             <Link to="/blog">Blog</Link>
//             <Link to="/developer-options">Developer Options</Link>
//             <Link to="/sign-up">Sign Up</Link>
//             <Link to="/login">Login</Link>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Navbar
////////////////////////////////////////////////////////////////////

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="bg-[#D9D9D9]  w-full">
        <div className="flex justify-between h-20 items-center rounded-xl shadow-md m-1">
          <div className="text-3xl font-mono text-red-400 mr-4 ">
            <h1>SMAIL</h1>
          </div>
          <div className="flex gap-5 text-2xl font-light">
            <Link to="/product">Product</Link>
            <Link to="/deloper-options">Developer Options</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
          <div className="text-2xl font-medium">
            <Link to="/profile">Profile</Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar

