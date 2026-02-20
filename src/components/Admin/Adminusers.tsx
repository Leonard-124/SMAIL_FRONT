
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Auth/api";
import { useAuth } from "../Auth/Authcontext";
import { Search, Trash2, Key, ArrowLeft, AlertCircle } from "lucide-react";
import Header2 from "../Home/Header2";
import Footer from "../Home/Footer";

const ADMIN_EMAILS = ["leonardoduor91@gmail.com", "alvynox097@gmail.com"];

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [resetModal, setResetModal] = useState<{ show: boolean; userId: number | null }>({
    show: false,
    userId: null,
  });
  const [newPassword, setNewPassword] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [page, user, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get(`/admin/users?page=${page}&search=${search}`);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err: any) {
      if (err.response?.status === 403) navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    try {
      await api.put(`/admin/users/${resetModal.userId}/password`, { newPassword });
      alert("Password reset successfully");
      setResetModal({ show: false, userId: null });
      setNewPassword("");
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  if (!user || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-[#fafaf7]" style={{ fontFamily: "'Lato', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              User Management
            </h1>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by username or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                Search
              </button>
            </div>
          </form>

          {/* Users Table */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{u.username}</div>
                        {ADMIN_EMAILS.includes(u.email.toLowerCase()) && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Admin</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setResetModal({ show: true, userId: u.id })}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                            <Key className="w-4 h-4" />
                          </button>
                          {!ADMIN_EMAILS.includes(u.email.toLowerCase()) && (
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Showing {users.length} of {pagination.total} users
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50">
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                      className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reset User Password</h2>
            <input
              type="password"
              placeholder="New password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleResetPassword}
                className="flex-1 py-3 rounded-xl font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                Reset Password
              </button>
              <button
                onClick={() => {
                  setResetModal({ show: false, userId: null });
                  setNewPassword("");
                }}
                className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminUsers;