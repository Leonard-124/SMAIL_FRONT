

import { useState } from "react";
import { Menu, X} from "lucide-react"; //Leaf
import logo from "../assets/images/logo.jpeg"
import { ShoppingBasket } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Products", href: "/products" },
    { label: "Why Us", href: "#why-us" },
    { label: "Order Now", href: "/order", img: <ShoppingBasket className="h-6 w-5"/>}
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 bg-[#f8f8e2] bordegr-b border-border">
      <div className="container-width section-padding py-4!">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Almo Farm" className="h-12 w-auto rounded-md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex font-medium text-foreground/80 hover:text-primary transition-colors"
              >  {link.img}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors w-full">
            <ShoppingBasket className="h-6 w-5 " />Order Now
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
