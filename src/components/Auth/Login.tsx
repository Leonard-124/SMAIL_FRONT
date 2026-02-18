// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useAuth } from "../Auth/Authcontext"
// import axios from "axios";

// const Login: React.FC = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Redirect to where the user came from, or home
//   const from = (location.state as { from?: Location })?.from?.pathname || "/";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     try {
//       await login(form.email, form.password);
//       navigate(from, { replace: true });
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.error || "Login failed. Please try again.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-[#f8f8e2] to-lime-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//         <h2 className="text-3xl font-semibold text-center text-green-700 mb-2">
//           Welcome Back 👋
//         </h2>
//         <p className="text-center text-gray-500 text-sm mb-8">
//           Sign in to your Almo Farm account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               placeholder="••••••••"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition"
//             />
//           </div>

//           {error && (
//             <p role="alert" className="text-red-600 text-sm font-medium text-center">
//               ❌ {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-green-700 text-white py-2.5 rounded-lg font-medium hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Signing in…" : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
//           <p>
//             Don't have an account?{" "}
//             <Link
//               to="/sign-up"
//               className="text-green-700 font-medium hover:underline"
//             >
//               Sign up
//             </Link>
//           </p>
//           <Link
//             to="/forgot-password"
//             className="block text-green-600 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

///////////////////////////////////////////////

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../Auth/Authcontext"
import axios from "axios";
import { Leaf, ArrowRight, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end"
        style={{ background: "linear-gradient(160deg, #1a4731 0%, #2d6a4f 40%, #52b788 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 p-14 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Almo Farm Produce
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            From our<br />
            <span style={{ color: "#b7e4c7" }}>farms,</span><br />
            to your family.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xs">
            Kenya's freshest produce, harvested daily and delivered with care.
          </p>
          {/* Decorative circles */}
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 -mb-16 -mr-16"
            style={{ background: "radial-gradient(circle, #b7e4c7, transparent)" }} />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#fafaf7]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-green-800 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Almo Farm</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome back
          </h1>
          <p className="text-gray-500 mb-10 text-sm">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
              <input
                name="email" type="email" autoComplete="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <span className="text-base">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
              style={{ background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #1a4731, #2d6a4f)", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
              {isSubmitting ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-green-700 font-semibold hover:underline">Create one</Link>
            </p>
            <Link to="/forgot-password" className="block text-sm text-gray-400 hover:text-green-700 transition">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
