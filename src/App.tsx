import { Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Developer from "./pages/Developer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Services from "./pages/Services"
import Home from "./components/Home"
import Dashboard from "./Inside/Dashboard"
import Category from "./Inside/Category"
import Cart from "./Inside/Cart"
//import ProductId from "./Inside/ProductId"
import Checkout from "./Inside/Checkout/Checkout"
import Order from "./components/Order/Order"
import Products from "./components/Products/Products"
import ProductCard from "./components/Products/ProductCard"
import Contact from "./components/Contact"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={< Home /> } />
        <Route path="/contact" element={< Contact /> } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/product/:id" element={<ProductId />} /> */}
        <Route path="/product/:id" element={<ProductCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<h1 className="text-center text-2xl font-mono">Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

