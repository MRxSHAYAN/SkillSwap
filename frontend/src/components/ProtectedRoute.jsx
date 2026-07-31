import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute — checks for a valid auth token in localStorage.
 * If no token exists, redirects the user to /login.
 * Wraps dashboard routes via <Outlet />.
 */
export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
