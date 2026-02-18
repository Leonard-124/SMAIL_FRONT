// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../Auth/Authcontext"
// import axios from "axios";

// const Signup: React.FC = () => {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (form.password.length < 8) {
//       setError("Password must be at least 8 characters.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await register(
//         form.username,
//         form.email,
//         form.password,
//         form.confirmPassword
//       );
//       setSuccess("Account created! Redirecting to login…");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.error || "Signup failed. Please try again.");
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
//           Create Your Account
//         </h2>
//         <p className="text-center text-gray-500 text-sm mb-8">
//           Join Almo Farm today
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Username
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               autoComplete="username"
//               placeholder="johndoe"
//               value={form.username}
//               onChange={handleChange}
//               required
//               minLength={2}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition"
//             />
//           </div>

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
//               autoComplete="new-password"
//               placeholder="Min. 8 characters"
//               value={form.password}
//               onChange={handleChange}
//               required
//               minLength={8}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               autoComplete="new-password"
//               placeholder="Repeat your password"
//               value={form.confirmPassword}
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

//           {success && (
//             <p role="status" className="text-green-600 text-sm font-medium text-center">
//               ✅ {success}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-green-700 text-white py-2.5 rounded-lg font-medium hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Creating account…" : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-700 font-medium hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
/////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth/Authcontext"
import axios from "axios";
import { Leaf, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const Signup: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setIsSubmitting(true);
    try {
      await register(form.username, form.email, form.password, form.confirmPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3;

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end"
        style={{ background: "linear-gradient(160deg, #1a4731 0%, #2d6a4f 50%, #40916c 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 p-14 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Almo Farm</span>
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join 5,000+<br />
            <span style={{ color: "#b7e4c7" }}>happy families</span><br />
            across Kenya.
          </h2>
          <div className="space-y-3">
            {["Farm-fresh produce delivered daily", "Direct from our Kenyan highlands", "Quality guaranteed on every order"].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#b7e4c7" }} />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 -mb-16 -mr-16"
            style={{ background: "radial-gradient(circle, #b7e4c7, transparent)" }} />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#fafaf7]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-green-800 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Almo Farm</span>
          </div>

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Account Created!</h2>
              <p className="text-gray-500 text-sm">Redirecting you to sign in…</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Create account</h1>
              <p className="text-gray-500 mb-10 text-sm">Join Almo Farm and start ordering fresh produce</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                    <input name="username" type="text" autoComplete="username" placeholder="johndoe"
                      value={form.username} onChange={handleChange} required minLength={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com"
                      value={form.email} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input name="password" type={showPassword ? "text" : "password"} autoComplete="new-password"
                        placeholder="Min. 8 characters" value={form.password} onChange={handleChange} required minLength={8}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm pr-12" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-1 flex-1 rounded-full transition-all"
                            style={{ background: i <= passwordStrength ? (passwordStrength === 1 ? "#ef4444" : passwordStrength === 2 ? "#f59e0b" : "#22c55e") : "#e5e7eb" }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm password</label>
                    <input name="confirmPassword" type="password" autoComplete="new-password"
                      placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm" />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-base">⚠</span><span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                  style={{ background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #1a4731, #2d6a4f)", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                  {isSubmitting
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account…</>
                    : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-green-700 font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;