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


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={< Home /> } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/developer-options" element={<Developer />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App

