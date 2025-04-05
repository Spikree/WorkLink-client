import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const isAuthRoute = location.pathname === "/" || location.pathname === "/auth";

  if (isCheckingAuth) {
    return null;
  }

  if (authUser && isAuthRoute) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default AuthRoutes;
