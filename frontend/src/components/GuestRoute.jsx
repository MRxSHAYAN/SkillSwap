import { Navigate, Outlet } from "react-router-dom";

/**
 * GuestRoute — blocks logged-in users from accessing login/register pages.
 * If a token exists in localStorage, redirect straight to /dashboard.
 * If no token, render the page normally via <Outlet />.
 */
export default function GuestRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
