
// import { Route, Routes } from "react-router-dom";
// import { Suspense, lazy } from "react";

// // ─── Lazy-loaded pages (code-splitting) ──────────────────────────────────────
// const Home = lazy(() => import("./components/Home/Home"));
// const Blog = lazy(() => import("./pages/Blog"));
// const Developer = lazy(() => import("./pages/Developer"));
// const Services = lazy(() => import("./pages/Services"));
// const Contact = lazy(() => import("./components/Contact"));

// const Login = lazy(() => import("./components/Auth/Login"));
// const Signup = lazy(() => import("./components/Auth/Signup"));
// import ProtectedRoute from "./components/Auth/ProtectedRoute";

// const Dashboard = lazy(() => import("./Inside/Dashboard"));
// const Category = lazy(() => import("./Inside/Category"));

// const Products = lazy(() => import("./components/Products/Products"));
// const ProductCard = lazy(() => import("./components/Products/ProductCard"));

// const Cart = lazy(() => import("./components/Checkout/Cart"));
// const Checkout = lazy(() => import("./components/Checkout/Checkout"));
// const Order = lazy(() => import("./components/Order/Order"));

// // ─── Page-level loading fallback ─────────────────────────────────────────────
// function PageLoader() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f8e2]">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-700" />
//     </div>
//   );
// }

// const App = () => {
//   return (
//     <Suspense fallback={<PageLoader />}>
//       <Routes>
//         {/* ── Public routes ──────────────────────────────────────── */}
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/developer" element={<Developer />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/order" element={<Order />} />

//         {/* ── Auth routes ────────────────────────────────────────── */}
//         {/* Consistent lowercase paths throughout */}
//         <Route path="/sign-up" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* ── Protected routes ───────────────────────────────────── */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/category"
//           element={
//             <ProtectedRoute>
//               <Category />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductCard />
//             </ProtectedRoute>
//           }
//         />
//         {/* Single /checkout route — protected */}
//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />

//         {/* ── 404 ────────────────────────────────────────────────── */}
//         <Route
//           path="*"
//           element={
//             <div className="min-h-screen flex items-center justify-center bg-[#f8f8e2]">
//               <div className="text-center">
//                 <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
//                 <p className="text-xl text-gray-600 mb-6">Page not found</p>
//                 <a
//                   href="/"
//                   className="bg-green-700 text-white px-6 py-2.5 rounded-lg hover:bg-green-800 transition font-medium"
//                 >
//                   Go Home
//                 </a>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Suspense>
//   );
// };

// export default App;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// ─── Lazy-loaded pages (code-splitting) ──────────────────────────────────────
const Home = lazy(() => import("./components/Home/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const Developer = lazy(() => import("./pages/Developer"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./components/Contact"));

const Login = lazy(() => import("./components/Auth/Login"));
const Signup = lazy(() => import("./components/Auth/Signup"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const Dashboard = lazy(() => import("./Inside/Dashboard"));
const Category = lazy(() => import("./Inside/Category"));

const Products = lazy(() => import("./components/Products/Products"));
const ProductCard = lazy(() => import("./components/Products/ProductCard"));

const Cart = lazy(() => import("./components/Checkout/Cart"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Order = lazy(() => import("./components/Order/Order"));

// ─── Page-level loading fallback ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-700" />
    </div>
  );
}

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public routes ──────────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order" element={<Order />} />

        {/* ── Auth routes ────────────────────────────────────────── */}
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ── Protected routes ───────────────────────────────────── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* ── 404 ────────────────────────────────────────────────── */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Page not found</p>
                <a
                  href="/"
                  className="bg-green-700 text-white px-6 py-2.5 rounded-lg hover:bg-green-800 transition font-medium"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;