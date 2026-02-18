import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/Authcontext"

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // While we're doing the silent refresh on mount, show a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8e2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-green-700 mx-auto mb-5" />
          <p className="text-gray-600 font-medium">Loading your session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the page the user was trying to reach
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}