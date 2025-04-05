import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return null;
  }

  return authUser ? <Outlet /> : <Navigate to={"/auth"} state={{ from: location }}/>;
};

export default ProtectedRoutes;
