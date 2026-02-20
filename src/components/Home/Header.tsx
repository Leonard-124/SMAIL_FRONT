
import { Menu, X, ShoppingBasket, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Authcontext"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/#why-us" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => { await logout(); navigate("/login"); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/98 shadow-sm backdrop-blur-md" : "bg-transparent"}`}
      style={{ fontFamily: "'Lato', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
              <Leaf className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Almo Farm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                  Sign In
                </Link>
                <Link to="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/order"
              className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
              <ShoppingBasket className="w-4 h-4" /> Order Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg">
            <nav className="flex flex-col gap-1 px-2">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-green-700 rounded-xl hover:bg-green-50 transition">
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/#dashboard" onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-green-50 transition">Category</Link>
                  <button onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="text-left px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-green-50 transition">Log In</Link>
                  <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-green-50 transition">Sign Up</Link>
                </>
              )}
              <Link to="/order" onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                <ShoppingBasket className="w-4 h-4" /> Order Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
