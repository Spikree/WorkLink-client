import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  const isAuthRoute = location.pathname === "/" || location.pathname === "/auth";

  if (isCheckingAuth) {
    return null;
  }

  if (authUser && isAuthRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthRoutes;
