
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Auth/api";
import { useAuth } from "../Auth/Authcontext";
import { Users, Package, Activity, TrendingUp, AlertCircle } from "lucide-react";
import Header2 from "../Home/Header2";
import Footer from "../Home/Footer";

const ADMIN_EMAILS = ["leonardoduor91@gmail.com", "alvynox097@gmail.com"];

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Check if user is admin
    if (!user || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      navigate("/");
      return;
    }

    fetchStats();
  }, [isAuthenticated, user, navigate]);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Failed to load dashboard statistics");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user.username}!</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
            </div>
          ) : stats ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.users.total}</h3>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-xs text-gray-400 mt-2">+{stats.users.newThisWeek} this week</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.products.total}</h3>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-xs text-orange-500 mt-2">{stats.products.lowStock} low stock</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.passwordResets.pending}</h3>
                  <p className="text-sm text-gray-600">Pending Resets</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all">
                    <Users className="w-5 h-5 text-green-700" />
                    <span className="font-semibold text-gray-700">Manage Users</span>
                  </button>

                  <button
                    onClick={() => navigate("/admin/products")}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all">
                    <Package className="w-5 h-5 text-green-700" />
                    <span className="font-semibold text-gray-700">Manage Products</span>
                  </button>

                  <button
                    onClick={() => navigate("/admin/products/new")}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-green-600 bg-green-600 hover:bg-green-700 transition-all">
                    <Package className="w-5 h-5 text-white" />
                    <span className="font-semibold text-white">Add Product</span>
                  </button>

                  <button
                    onClick={() => navigate("/admin/activity")}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all">
                    <Activity className="w-5 h-5 text-green-700" />
                    <span className="font-semibold text-gray-700">Activity Log</span>
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;