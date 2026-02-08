
import { Leaf } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth text-primary-foreground/90 py-8">
      <div className="container-width section-padding py-0!">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-serif font-semibold">Almo Farm</span>
              <p className="text-sm text-primary-foreground/70">
                © {currentYear} Almo Farm Produce Suppliers. From our Farms, to your Family.
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-accent transition-colors">
              Terms
            </a>
            <a href="/contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
