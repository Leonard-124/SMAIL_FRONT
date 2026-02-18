

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Leaf, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string })?.email || "";

  const [step, setStep] = useState<"code" | "password">("code");
  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(`${API}/auth/verify-reset-code`, { email, code });
      setResetToken(response.data.resetToken);
      setStep("password");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Invalid or expired code. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/auth/reset-password`, {
        token: resetToken,
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to reset password. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = newPassword.length === 0 ? 0
    : newPassword.length < 6 ? 1
    : newPassword.length < 10 ? 2 : 3;

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Left panel */}
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
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Almo Farm</span>
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create a new<br />
            <span style={{ color: "#b7e4c7" }}>password</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xs">
            Almost there! Just set a new secure password and you're all set.
          </p>
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 -mb-16 -mr-16"
            style={{ background: "radial-gradient(circle, #b7e4c7, transparent)" }} />
        </div>
      </div>

      {/* Right panel */}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Password reset successful!
              </h2>
              <p className="text-gray-500 text-sm mb-8">Redirecting you to sign in…</p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
              </div>
            </div>
          ) : step === "code" ? (
            <>
              <Link to="/forgot-password" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>

              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Enter reset code
              </h1>
              <p className="text-gray-500 mb-10 text-sm">
                We sent a 6-digit code to your email. Enter it below to continue.
              </p>

              <form onSubmit={handleVerifyCode} className="space-y-5">
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reset Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm text-center text-2xl tracking-widest font-mono"
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
                  disabled={isSubmitting || code.length !== 6}
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                  style={{ background: (isSubmitting || code.length !== 6) ? "#9ca3af" : "linear-gradient(135deg, #1a4731, #2d6a4f)", cursor: (isSubmitting || code.length !== 6) ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Verifying…" : "Verify Code"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                <Link to="/forgot-password" className="text-green-700 font-semibold hover:underline">Resend</Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Set new password
              </h1>
              <p className="text-gray-500 mb-10 text-sm">
                Choose a strong password to secure your account
              </p>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-sm pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all"
                          style={{ background: i <= passwordStrength ? (passwordStrength === 1 ? "#ef4444" : passwordStrength === 2 ? "#f59e0b" : "#22c55e") : "#e5e7eb" }} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                  style={{ background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #1a4731, #2d6a4f)", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Resetting…" : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
