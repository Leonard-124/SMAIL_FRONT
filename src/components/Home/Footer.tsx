import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0f2419", fontFamily: "'Lato', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row gap-12 pb-10 border-b" style={{ borderColor: "#1f3d2b" }}>
          {/* Brand */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2d6a4f, #52b788)" }}>
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Almo Farm
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6b9e7e" }}>
              From our Kenyan highlands to your family's table. Fresh produce, delivered with care and grown with generations of wisdom.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://wa.me/+254798878676", label: "WhatsApp" },
                { href: "https://twitter.com", label: "Twitter" },
                { href: "https://instagram.com", label: "Instagram" },
              ].map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                  style={{ color: "#6b9e7e", border: "1px solid #1f3d2b" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "#b7e4c7"; (e.target as HTMLElement).style.borderColor = "#2d6a4f"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "#6b9e7e"; (e.target as HTMLElement).style.borderColor = "#1f3d2b"; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#52b788" }}>Shop</h4>
              <ul className="space-y-2.5">
                {[["Products", "/products"], ["Order Now", "/order"], ["Cart", "/cart"]].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors" style={{ color: "#6b9e7e" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = "#b7e4c7")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = "#6b9e7e")}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#52b788" }}>Company</h4>
              <ul className="space-y-2.5">
                {[["About Us", "/#about"], ["Our Story", "/#about"], ["Services", "/services"]].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors" style={{ color: "#6b9e7e" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = "#b7e4c7")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = "#6b9e7e")}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#52b788" }}>Legal</h4>
              <ul className="space-y-2.5">
                {[["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Contact", "/contact"]].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm transition-colors" style={{ color: "#6b9e7e" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = "#b7e4c7")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = "#6b9e7e")}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:w-56">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#52b788" }}>Contact</h4>
            <div className="space-y-3">
              <a href="https://wa.me/+254798878676"
                className="flex items-center gap-2 text-sm" style={{ color: "#6b9e7e" }}>
                📱 0798 878 676
              </a>
              <a href="https://wa.me/+254717188268"
                className="flex items-center gap-2 text-sm" style={{ color: "#6b9e7e" }}>
                📱 0717 188 268
              </a>
              <div className="mt-4 p-3 rounded-xl" style={{ background: "#1a3525" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#52b788" }}>M-Pesa Paybill</p>
                <p className="text-xs" style={{ color: "#6b9e7e" }}>Business: <strong className="text-white">880100</strong></p>
                <p className="text-xs" style={{ color: "#6b9e7e" }}>Account: <strong className="text-white">081148</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#3d6b4f" }}>
            © {year} Almo Farm Produce Suppliers. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#3d6b4f" }}>
            From our Farms, to your Family 🌿
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
