
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Leaf, ArrowLeft, Mail, ArrowRight } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      setSuccess(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to send reset code. Please try again.");
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
              Almo Farm
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Forgot your<br />
            <span style={{ color: "#b7e4c7" }}>password?</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xs">
            No worries! We'll send a reset code to your email address.
          </p>
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

          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Check your email
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We've sent a 6-digit reset code to <strong>{email}</strong>. 
                Enter the code to reset your password.
              </p>
              <Link to="/reset-password" state={{ email }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                Enter Reset Code <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-gray-400 mt-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button onClick={() => setSuccess(false)} className="text-green-700 font-semibold hover:underline">
                  try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>

              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Reset password
              </h1>
              <p className="text-gray-500 mb-10 text-sm">
                Enter your email and we'll send you a code to reset your password
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-base">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                  style={{ background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #1a4731, #2d6a4f)", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <>Send Reset Code <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link to="/login" className="text-green-700 font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
