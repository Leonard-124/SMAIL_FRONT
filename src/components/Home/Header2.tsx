// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.jpeg";
// import cartIcon from "../../assets/images/shopping-cart.png";
// import useCartStore from "../../useCartStore";
// import { useAuth } from "../Auth/Authcontext"

// const Header2 = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const cart = useCartStore((state) => state.cart);
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     setIsMenuOpen(false);
//     await logout();
//     navigate("/login");
//   };

//   const navLinks = [
//     { label: "Products", to: "/products" },
//     { label: "Dashboard", to: "/dashboard" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f8e2]/95 backdrop-blur-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <img src={logo} alt="Almo Farm" className="h-12 w-auto rounded-md" />
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.to}
//                 className="font-medium text-gray-700 hover:text-green-700 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <button
//               onClick={handleLogout}
//               className="font-medium text-gray-700 hover:text-red-600 transition-colors"
//             >
//               Logout
//             </button>

//             {/* Cart icon with badge */}
//             <Link
//               to="/cart"
//               aria-label={`Cart (${cartCount} items)`}
//               className="relative flex items-center"
//             >
//               <img src={cartIcon} alt="Cart" className="h-7 w-7" />
//               {cartCount > 0 && (
//                 <span
//                   aria-hidden="true"
//                   className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center text-[11px] font-semibold"
//                 >
//                   {cartCount > 99 ? "99+" : cartCount}
//                 </span>
//               )}
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-4">
//             {/* Cart icon visible on mobile too */}
//             <Link
//               to="/cart"
//               aria-label={`Cart (${cartCount} items)`}
//               className="relative"
//             >
//               <img src={cartIcon} alt="Cart" className="h-7 w-7" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center text-[11px] font-semibold">
//                   {cartCount > 99 ? "99+" : cartCount}
//                 </span>
//               )}
//             </Link>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isMenuOpen}
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.to}
//                 className="font-medium text-gray-700 hover:text-green-700 transition-colors py-1"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="text-left font-medium text-red-600 py-1"
//             >
//               Logout
//             </button>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header2;
/////////////////////////////////////////////////////////////////////////////////////////

import { Menu, X, ShoppingCart, Leaf } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../useCartStore";
import { useAuth } from "../Auth/Authcontext"

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalItems());
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Products", to: "/products" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm"
      style={{ fontFamily: "'Lato', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
              <Leaf className="text-white" style={{ width: 16, height: 16 }} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Almo Farm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                {link.label}
              </Link>
            ))}
            <button onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
              Log Out
            </button>

            <Link to="/cart" aria-label={`Cart (${cartCount} items)`}
              className="relative ml-2 w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all">
              <ShoppingCart className="w-4.5 h-4.5 text-gray-700" style={{ width: 18, height: 18 }} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold leading-none flex items-center justify-center"
                  style={{ minWidth: 18, height: 18, padding: "0 4px" }}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" aria-label={`Cart (${cartCount} items)`} className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ minWidth: 16, height: 16 }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 transition">
                  {link.label}
                </Link>
              ))}
              <button onClick={handleLogout}
                className="text-left px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition">
                Log Out
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header2;